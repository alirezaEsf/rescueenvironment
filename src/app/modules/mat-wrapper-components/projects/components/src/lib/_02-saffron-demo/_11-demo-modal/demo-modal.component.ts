import { Component, ViewEncapsulation } from '@angular/core';
import { SaffronButtonTypes } from '../../_01-components/_03-saffron-button/models/saffron-button-types';
import { SaffronModalButton } from '../../_01-components/_19-saffron-modal/models/saffron-modal-button';
import { SaffronButtonComponent } from '../../_01-components/_03-saffron-button/saffron-button.component';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
import { SaffronModalComponent } from '../../_01-components/_19-saffron-modal/saffron-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss'],
  imports: [SaffronButtonComponent, SaffronFieldsetDirective, SaffronModalComponent, MatDialogModule],
  standalone: true
})
export class DemoModal {
  SaffronButtonTypes = SaffronButtonTypes;
  openDefaultModal: boolean = false;
  openCustomModal: boolean = false;
  customButtons: SaffronModalButton[] = [
    {
      id: '1',
      action: () => {
        this.openCustomModal = false;
      },
      title: 'ثبت تغییرات',
      buttonType: SaffronButtonTypes.Primary,
    },
    {
      id: '2',
      action: () => {
        this.openCustomModal = false;
      },
      title: 'بازگشت',
      buttonType: SaffronButtonTypes.Basic,
    },
  ];
}
