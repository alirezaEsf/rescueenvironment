import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaffronTextAreaComponent } from '../../_01-components/_18-saffron-text-area/saffron-text-area.component';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
@Component({
  selector: 'demo-text-area',
  templateUrl: './demo-text-area.component.html',
  styleUrls: ['./demo-text-area.component.scss'],
  standalone: true,
  imports: [SaffronTextAreaComponent, SaffronFieldsetDirective]
})
export class DemoTextArea {
  text: string = `
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتاب‌های زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم‌افزارها شناخت بیشتری را برای طراحان رایانه ای علی‌الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.

لورم ایپسوم متن ساختگی است.`;

  public formGroup!: FormGroup;
  get desc() {
    return this.formGroup.get('desc');
  }

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      desc: [this.text, Validators.required],
      descTouched: [this.text, Validators.required],
    });

    this.formGroup.get('descTouched')?.markAllAsTouched();
  }
}
