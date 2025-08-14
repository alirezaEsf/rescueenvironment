import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { SaffronMessageComponent } from '../saffron-message.component';
import { SaffronContrastMessage, SaffronErrorMessage, SaffronInfoMessage, SaffronMessageModel, SaffronSecondaryMessage, SaffronSuccessMessage, SaffronWarnMessage } from '../models/saffrom-message-types';


@Injectable({
  providedIn: 'root',
})
export class SaffronMessageService {
  private viewContainerRef!: ViewContainerRef;

  constructor() { }

  registerViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  showSuccess(message: string) {
    this.showMessage({ ...SaffronSuccessMessage, message });
  }

  showInfo(message: string) {
    this.showMessage({ ...SaffronInfoMessage, message });
  }

  showWarn(message: string) {
    this.showMessage({ ...SaffronWarnMessage, message });
  }

  showError(message: string) {
    this.showMessage({ ...SaffronErrorMessage, message });
  }

  showSecondary(message: string) {
    this.showMessage({ ...SaffronSecondaryMessage, message });
  }

  showContrast(message: string) {
    this.showMessage({ ...SaffronContrastMessage, message });
  }

  showMessage(message: SaffronMessageModel) {
    message.positionType = 'absolute';

    if (!this.viewContainerRef) {
      console.error("ViewContainerRef not registered. Call registerViewContainerRef at startup.");
      return;
    }

    // Create the message component dynamically
    const componentRef = this.viewContainerRef.createComponent(SaffronMessageComponent);
    componentRef.instance.message = message;

    // Auto-remove the component after a timeout
    setTimeout(() => componentRef.destroy(), message.time ?? 5000);
  }
}
