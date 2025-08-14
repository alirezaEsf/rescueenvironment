import { Component, OnInit } from '@angular/core';
import { SaffronCardButton } from '../../_01-components/_14-saffron-card-view/models/saffron-card-button';
import { SaffronFieldsetDirective } from '../directives/fieldset-directive/fieldset.directive';
import { SaffronFormContainerComponent } from '../../_01-components/_13-saffron-form-container/saffron-form-container.component';

@Component({
  selector: 'demo-form-container',
  templateUrl: './demo-form-container.component.html',
  styleUrls: ['./demo-form-container.component.scss'],
  standalone: true,
  imports: [SaffronFieldsetDirective, SaffronFormContainerComponent]
})
export class DemoFormContainerComponent implements OnInit {
  public actionButtons: SaffronCardButton[] = [
    {
      id: 'dis',
      title: 'غیر فعال',
      color: 'primary',
      disabled: true,
      action: () => {
        alert('action clicked');
      },
    },
    {
      id: 'action',
      title: 'انجام عملیات',
      color: 'primary',
      action: () => {
        alert('action clicked');
      },
    },
    {
      id: 'delete',
      title: 'پاک کردن',
      icon: 'delete',
      action: () => {
        alert('action clicked');
      },
    },
  ];

  constructor() { }

  ngOnInit(): void { }
}
