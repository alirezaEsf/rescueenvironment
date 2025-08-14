import { Component } from '@angular/core';
import { SaffronConfirmDialogService } from '../../_01-components/_20-saffron-confirm-dialog/services/saffron-confirm-dialog.service';
import { SaffronButtonTypes } from '../../_01-components/_03-saffron-button/models/saffron-button-types';
import { CommonModule } from '@angular/common';
import { SaffronButtonComponent } from '../../_01-components/_03-saffron-button/saffron-button.component';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
@Component({
  selector: 'demo-confirm-dialog',
  templateUrl: './demo-confirm-dialog.component.html',
  styleUrls: ['./demo-confirm-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SaffronButtonComponent, SaffronFieldsetDirective]
})
export class DemoConfirmDialog {
  public SaffronButtonTypes = SaffronButtonTypes;

  constructor(private confirmDialogService: SaffronConfirmDialogService) { }
  onShowConfirm() {
    this.confirmDialogService
      .confirmDialog({
        title: 'سامانه',
        message: 'آیا از لغو ثبت چک اطمینان دارید؟',
        //acceptButonColor: 'red',
      })
      .subscribe((res: boolean) => { });
  }
}
