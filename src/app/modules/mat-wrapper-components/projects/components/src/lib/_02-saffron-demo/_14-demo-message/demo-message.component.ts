import { Component, OnInit } from '@angular/core';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
import { SaffronButtonComponent } from '../../_01-components/_03-saffron-button/saffron-button.component';
import { SaffronButtonTypes } from '../../_01-components/_03-saffron-button/models/saffron-button-types';
import { SaffronMessageComponent } from '../../_01-components/_22-saffron-message/saffron-message.component';
import { CommonModule } from '@angular/common';
import { SaffronContrastMessage, SaffronErrorMessage, SaffronInfoMessage, SaffronMessageModel, SaffronSecondaryMessage, SaffronSuccessMessage, SaffronWarnMessage } from '../../_01-components/_22-saffron-message/models/saffrom-message-types';
import { SaffronMessageService } from '../../_01-components/_22-saffron-message/services/saffron-message.service';

@Component({
  selector: 'demo-message',
  templateUrl: './demo-message.component.html',
  styleUrls: ['./demo-message.component.scss'],
  standalone: true,
  imports: [CommonModule, SaffronFieldsetDirective, SaffronButtonComponent]
})
export class DemoMessageComponent implements OnInit {
  readonly default: boolean[] = [true, false, false, false, false];
  SaffronButtonTypes = SaffronButtonTypes;
  successMessage: SaffronMessageModel = SaffronSuccessMessage;
  infoMessage: SaffronMessageModel = SaffronInfoMessage;
  warnMessage: SaffronMessageModel = SaffronWarnMessage;

  errorMessage: SaffronMessageModel = SaffronErrorMessage;
  secondaryMessage: SaffronMessageModel = SaffronSecondaryMessage;
  contrastMessage: SaffronMessageModel = SaffronContrastMessage;

  constructor(private messageService: SaffronMessageService) { }

  ngOnInit(): void { }

  openSeccess() {
    this.messageService.showMessage(this.successMessage);
  }

  openInfo() {
    this.messageService.showMessage(this.infoMessage);
  }

  openWarn() {
    this.messageService.showMessage(this.warnMessage);
  }

  openError() {
    this.messageService.showMessage(this.errorMessage);
  }

  openSecondary() {
    this.messageService.showMessage(this.secondaryMessage);
  }

  openContrast() {
    this.messageService.showMessage(this.contrastMessage);
  }
}
