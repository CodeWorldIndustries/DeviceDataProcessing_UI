import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { IoTDataService } from './services/device.service';
import { ToastrService } from 'ngx-toastr';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ HomeComponent ],
            providers: [
                { provide: IoTDataService, useValue: {} },
                { provide: ToastrService, useValue: {} },
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should add a file to the files array when onFileAdded is called', () => {
        const file = new File([], 'test.json');
        spyOn(component['toastrService'], 'error');
        component.onFileAdded({ addedFiles: [file], rejectedFiles: [] });
        expect(component.files.length).toBe(1);
        expect(component.files[0]).toBe(file);
        expect(component['toastrService'].error).not.toHaveBeenCalled();
    });

    it('should display an error message when onFileAdded is called with a rejected file', () => {
        const file = new File([], 'test.txt');
        spyOn(component['toastrService'], 'error');
        component.onFileAdded({ addedFiles: [], rejectedFiles: [file] });
        expect(component.files.length).toBe(0);
        expect(component['toastrService'].error).toHaveBeenCalledWith('You can only add JSON files.');
    });

    it('should display an error message when onFileAdded is called with a duplicate file name', () => {
        const file1 = new File([], 'test.json');
        const file2 = new File([], 'test.json');
        spyOn(component['toastrService'], 'error');
        component.onFileAdded({ addedFiles: [file1, file2], rejectedFiles: [] });
        expect(component.files.length).toBe(1);
        expect(component.files[0]).toBe(file1);
        expect(component['toastrService'].error).toHaveBeenCalledWith(`The JSON file ${file2.name} already exists.`);
    });
});
