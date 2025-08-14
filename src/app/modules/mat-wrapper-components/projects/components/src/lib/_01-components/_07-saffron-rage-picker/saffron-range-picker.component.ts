import {
  FormGroup,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SaffronInputLabelComponent } from '../_05-saffron-input-label/saffron-input-label.component';
import { SaffronInputErrorComponent } from '../_04-saffron-input-error/saffron-input-error.component';
import { PERSIAN_DATE_FORMATS, SaffronPersianDateAdapter } from '../_06-saffron-date-picker/models/saffron-material.persian-date.adapter';

@Component({
  selector: 'saffron-range-picker',
  templateUrl: './saffron-range-picker.component.html',
  styleUrls: ['./saffron-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SaffronInputLabelComponent,
    SaffronInputErrorComponent,
    MatDatepickerModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: SaffronPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],
})
export class SaffronRangePickerComponent implements OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() startControlName = '';
  @Input() endControlName = '';
  @Input() placeholder: string = '';

  control!: AbstractControl;
  startTitle = 'تاریخ شروع';
  endTitle = 'تاریخ پایان';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setControl(changes);
  }

  private setControl(changes: SimpleChanges) {
    if (
      changes['formGroup'] ||
      changes['startControlName'] ||
      changes['endControlName']
    ) {
      this.control = this.formGroup.controls[this.startControlName];
    }
  }

  blurred() {
    this.control.markAsTouched();
  }
}
