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
import { SaffronSelectAllValue, SaffronSelectModel } from '../../_01-components/_09-saffron-select/models/saffron-select.model';
@Component({
  selector: 'demo-select',
  templateUrl: './demo-select.component.html',
  styleUrls: ['./demo-select.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SaffronSelectComponent]
})
export class DemoSelect {
  autoCompleteSelectedItem = '';
  public numberValue: number = 1000;
  public accountNumber: string = 'شماره حساب';
  public selectPlaceHolder: string = 'مدرک تحصیلی';
  public paperCountPlaceHolder: string = 'تعداد برگ چک';
  public formGroup!: FormGroup;
  public degree: SaffronSelectModel[] = [
    { value: 'bc', title: 'کارشناسی' },
    { value: 'msc', title: 'کارشناسی ارشد' },
    { value: 'phd', title: 'دکتری' },
  ];

  public paperCountItems: SaffronSelectModel[] = [
    { value: '25', title: '25 برگی' },
    { value: '50', title: '50 برگی' },
    { value: '100', title: '100 برگی' },
    { value: '200', title: '200 برگی' },
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
