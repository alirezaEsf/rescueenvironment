import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaffronSelectComponent } from '../../_01-components/_09-saffron-select/saffron-select.component';
import { SaffronSelectAllValue } from '../../_01-components/_09-saffron-select/models/saffron-select.model';
import { SaffronAutoCompleteComponent } from '../../_01-components/_10-saffron-auto-complete/saffron-auto-complete.component';
import { SaffronAutoCompleteModel } from '../../_01-components/_10-saffron-auto-complete/models/saffron-auto-complete.model';
@Component({
  selector: 'demo-auto-complete',
  templateUrl: './demo-auto-complete.html',
  styleUrls: ['./demo-auto-complete.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SaffronAutoCompleteComponent]
})
export class DemoAutoComplete {
  autoCompleteSelectedItem = '';
  public numberValue: number = 1000;
  public accountNumber: string = 'شماره حساب';
  public selectPlaceHolder: string = 'مدرک تحصیلی';
  public paperCountPlaceHolder: string = 'تعداد برگ چک';
  public formGroup!: FormGroup;
  public degree: any[] = [
    { value: 'bc', viewValue: 'کارشناسی' },
    { value: 'msc', viewValue: 'کارشناسی ارشد' },
    { value: 'phd', viewValue: 'دکتری' },
  ];

  public paperCountItems: any[] = [
    { value: '25', title: '25 برگی' },
    { value: '50', title: '50 برگی' },
    { value: '100', title: '100 برگی' },
    { value: '200', title: '200 برگی' },
  ];

  autoCompleteOptions: SaffronAutoCompleteModel[] = [
    { title: 'شعبه 1', value: '1' },
    { title: 'شعبه 2', value: '2' },
    { title: 'شعبه 3', value: '3' },
    { title: 'شعبه 4', value: '4' },
    { title: 'شعبه 5', value: '5' },
    { title: 'شعبه 6', value: '6' },
    { title: 'شعبه 7', value: '7' },
    { title: 'شعبه 8', value: '8' },
    { title: 'شعبه 9', value: '9' },
    { title: 'شعبه 10', value: '10' },
    { title: 'شعبه 11', value: '11' },
    { title: 'شعبه 12', value: '12' },
    { title: 'شعبه 13', value: '13' },
    { title: 'شعبه 14', value: '14' },
    { title: 'شعبه 15', value: '15' },
    { title: 'شعبه 16', value: '16' },
    { title: 'شعبه 17', value: '17' },
    { title: 'شعبه 18', value: '18' },
    { title: 'شعبه 19', value: '19' },
    { title: 'شعبه 20', value: '20' },
  ];

  degreeControl!: AbstractControl;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      degree: ['bc'],
      multiSheetNo: [[SaffronSelectAllValue]],
      paperCount: [null, Validators.required],
      requiredDegree: [null, Validators.required],
      autoComplete: [/* undefined */ '1', Validators.required],
      disbaledSelect: [{ value: 'bc', disabled: true }, Validators.required],
    });

    this.formGroup.get('requiredDegree')?.markAllAsTouched();

    this.formGroup
      .get('autoComplete')
      ?.valueChanges.subscribe((newValue: string) => {
        this.autoCompleteSelectedItem = newValue;
      });

    (window as any).DemoSelect = this;

    this.degreeControl = this.formGroup.get('degree') as AbstractControl;
  }
}
