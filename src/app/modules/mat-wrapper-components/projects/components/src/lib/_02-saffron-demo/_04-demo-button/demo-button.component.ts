import { Component } from '@angular/core';
import { SaffronButtonTypes } from '../../_01-components/_03-saffron-button/models/saffron-button-types';
import { CommonModule } from '@angular/common';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
import { SaffronButtonComponent } from '../../_01-components/_03-saffron-button/saffron-button.component';
@Component({
  selector: 'demo-button',
  templateUrl: './demo-button.component.html',
  standalone: true,
  imports: [CommonModule, SaffronFieldsetDirective, SaffronButtonComponent]
})
export class DemoButton {
  public SaffronButtonTypes = SaffronButtonTypes;

  public clicked() {
    console.log('clicked');
  }
}
