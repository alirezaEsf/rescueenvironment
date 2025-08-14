import { Component } from '@angular/core';
import { SaffronButtonTypes } from '../../_01-components/_03-saffron-button/models/saffron-button-types';
import { SaffronLoaderService } from '../../_01-components/_21-saffron-loader/services/saffron-loader.service';
import { SaffronButtonComponent } from '../../_01-components/_03-saffron-button/saffron-button.component';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
@Component({
  selector: 'demo-loader',
  templateUrl: './demo-loader.component.html',
  styleUrls: ['./demo-loader.component.scss'],
  standalone: true,
  imports: [SaffronButtonComponent, SaffronFieldsetDirective]
})
export class DemoLoader {
  public SaffronButtonTypes = SaffronButtonTypes;
  constructor(private loaderService: SaffronLoaderService) { }

  public open() {
    this.loaderService.open();

    setTimeout(() => {
      this.loaderService.close();
    }, 1500);
  }
}
