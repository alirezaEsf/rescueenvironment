import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  private viewContainerRef!: ViewContainerRef;

  registerViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  getViewContainerRef() {
    return this.viewContainerRef;
  }
}
