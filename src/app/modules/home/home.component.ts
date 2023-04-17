import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {IoTDataService} from './services/device.service';
import {IoTData} from './models/Iot-data.model';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public files: File[] = [];
    private unsubscribe$ = new Subject<void>();

    constructor(private _formBuilder: FormBuilder,
                private _iotDataService: IoTDataService,
                private _toastrService: ToastrService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnInit
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        // subscribe to iot Data updates
        this._iotDataService.iotData$.pipe(takeUntil(this.unsubscribe$)).subscribe((response: IoTData[]) => {
            if(response) {
                this._toastrService.success('Files successfully merged')
                this._iotDataService.downloadJSON(response)
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // onSelect
    // -----------------------------------------------------------------------------------------------------
    onSelect(event) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    // -----------------------------------------------------------------------------------------------------
    // onRemove
    // -----------------------------------------------------------------------------------------------------
    onRemove(event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

    // -----------------------------------------------------------------------------------------------------
    // submit the files to be merged
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
            formData.append('files', this.files[i], this.files[i].name);
        }
        this._iotDataService.mergeIoTData(formData).subscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnDestroy
    // -----------------------------------------------------------------------------------------------------
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}