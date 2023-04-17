import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {IridiumDeviceService} from './services/iridium-device.service';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {DeviceActivationResult, UpdateDeviceStatusResponse} from './models/iridium-device.models';
import {IridiumServicePlansService} from './services/iridium-service-plans.service';
import {BundleInfo} from './models/iridium-service-plans.models';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('deviceInput') deviceInput: ElementRef;
    public form: FormGroup;
    public deviceActivationResults: DeviceActivationResult[] = [];
    private unsubscribe$ = new Subject<void>();

    constructor(private _formBuilder: FormBuilder,
                private _iridiumDeviceService: IridiumDeviceService,
                private _iridiumServicePlansService: IridiumServicePlansService,
                private _toastrService: ToastrService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnInit
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        // subscribe to device updates
        this._iridiumDeviceService.updateDeviceStatusResponse$.pipe(takeUntil(this.unsubscribe$)).subscribe((response: UpdateDeviceStatusResponse) => {
            if(response) {
                this.deviceActivationResults.unshift(response?.results[0]);
            }
        });
        this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // Creates the form
    // -----------------------------------------------------------------------------------------------------
    createForm(): void {
        // Create form
        this.form = this._formBuilder.group({
            activate: true,
            imei: [null]
        });
        // Focus on form
        setTimeout(() => {
            this.deviceInput.nativeElement.focus();
        }, 100);
    }

    // -----------------------------------------------------------------------------------------------------
    // Removes the error from the DeviceUpdateStatusResponse failed array
    // -----------------------------------------------------------------------------------------------------
    removeError(index: number): void {
        this.deviceActivationResults.splice(index, 1);
    }

    // -----------------------------------------------------------------------------------------------------
    // onFormSubmit
    // -----------------------------------------------------------------------------------------------------
    onSubmit() {
        if (!this.form.controls.imei.value) {
            this.deviceActivationResults.unshift({
                imei: 'NULL',
                message: 'You must provide an IMEI',
                isSuccessful: false,
                status: null
            });
            this.deviceInput.nativeElement.focus();
            return;
        }
        Object.keys(this.form.controls).forEach((key) => {
            this.form.controls[key].markAsTouched();
        });
        if (this.form.valid) {
            // When device is being activated
            if (this.form.controls.activate.value === true) {
                this._iridiumDeviceService.activateDevice([this.form.controls.imei.value]).subscribe();
            }
            // When device is being deactivated
            if (this.form.controls.activate.value === false) {
                this._iridiumDeviceService.updateIridiumDeviceStatus({
                    status: this.form.controls.activate.value === true ? 'ACTIVATE' : 'DEACTIVATE',
                    imeis: [this.form.controls.imei.value]
                }).subscribe();
            }
            // Reset the form
            this.form.controls.imei.setValue(null);
            this.deviceInput.nativeElement.focus();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // Clears all the messages
    // -----------------------------------------------------------------------------------------------------
    clearAllMessages(): void {
        this.deviceActivationResults = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnDestroy
    // -----------------------------------------------------------------------------------------------------
    ngOnDestroy(): void {
        this._iridiumDeviceService.updateDeviceStatusResponse = null;
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
