import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {IoTDataService} from './services/device.service';
import {IoTData} from './models/Iot-data.model';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
    public files: File[] = [];
    private unsubscribe$ = new Subject<void>();

    constructor(private _iotDataService: IoTDataService,
                private _toastrService: ToastrService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // ngOnInit
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        // subscribe to iot Data updates
        this._iotDataService.iotData$.pipe(takeUntil(this.unsubscribe$)).subscribe((response: IoTData[]) => {
            if(response) {
                this._iotDataService.downloadJSON(response)
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // onSelect
    // -----------------------------------------------------------------------------------------------------
    onFileAdded(event) {
        if (event.rejectedFiles.length > 0) {
            this._toastrService.error('You can only add JSON files.');
            return;
        }
        if (this.files.some(f => f.name === event.addedFiles[0].name)) {
            this._toastrService.error(`The JSON file ${event.addedFiles[0].name} already exists.`);
            return;
        }
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
