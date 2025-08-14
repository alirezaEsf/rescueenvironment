import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SaffronMenuModel } from './models/menu-model';
import { CommonModule } from '@angular/common';
import { DemoInput } from '../_02-demo-input/demo-input.component';
import { DemoDatePicker } from '../_03-demo-date-picker/demo-date-picker.component';
import { DemoButton } from '../_04-demo-button/demo-button.component';
import { DemoSelect } from '../_05-demo-auto-complete/demo-select.component';
import { DemoAutoComplete } from '../_05-demo-select/demo-auto-complete.component';
import { DemoTable } from '../_07-demo-table/demo-table.component';
import { DemoCardView } from '../_08-demo-card-view/demo-card-view.component';
import { DemoFormContainerComponent } from '../_09-demo-form-container/demo-form-container.component';
import { DemoTextArea } from '../_10-demo-text-area/demo-text-area.component';
import { DemoModal } from '../_11-demo-modal/demo-modal.component';
import { DemoConfirmDialog } from '../_12-demo-confirm-dialog/demo-confirm-dialog.component';
import { DemoLoader } from '../_13-demo-loader/demo-loader.component';
import { DemoMessageComponent } from '../_14-demo-message/demo-message.component';

@Component({
  selector: 'demo-viewer',
  templateUrl: './demo-viewer.component.html',
  styleUrls: ['./demo-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule],
})
export class DemoViewerComponent implements AfterViewInit {
  activeMenu: string = 'input';
  menuItems: SaffronMenuModel[] = [
    { id: 'DemoInput', title: 'ورودی', componentType: DemoInput },
    { id: 'DemoDatePicker', title: 'تقویم', componentType: DemoDatePicker },
    { id: 'DemoButton', title: 'دکمه', componentType: DemoButton },
    { id: 'DemoSelect', title: 'دراپ داون', componentType: DemoSelect },
    {
      id: 'DemoAutoComplete',
      title: 'اتوکامپلیت',
      componentType: DemoAutoComplete,
    },
    { id: 'DemoTable', title: 'جدول', componentType: DemoTable },
    { id: 'DemoCardView', title: 'کارت', componentType: DemoCardView },
    {
      id: 'DemoFormContainerComponent',
      title: 'قاب فرم',
      componentType: DemoFormContainerComponent,
    },
    { id: 'DemoTextArea', title: 'متن', componentType: DemoTextArea },
    { id: 'DemoModal', title: 'مودال', componentType: DemoModal },
    {
      id: 'DemoConfirmDialog',
      title: 'دیالوگ',
      componentType: DemoConfirmDialog,
    },
    { id: 'DemoLoader', title: 'لودینگ', componentType: DemoLoader },
    {
      id: 'DemoMessageComponent',
      title: 'پیام',
      componentType: DemoMessageComponent,
    },
    //
  ];

  @ViewChild(MatSidenav)
  private matSidenav!: MatSidenav;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  sideNavContent!: ViewContainerRef;

  @ViewChildren('menuLink')
  menuLinks!: QueryList<ElementRef>;

  constructor(private chRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.matSidenav.open();
    const menuItem = this.menuItems.find((item) => item.id === this.activeMenu);
    this.addDynamicComponent(menuItem);

    setTimeout(() => {
      (
        this.menuLinks.get(this.menuLinks.length - 1) as any
      )._elementRef.nativeElement.click();
    }, 500);
  }

  public menuClicked(menuItem: string) {
    try {
      this.sideNavContent.remove(0);
    } catch (error) {}

    const item = this.menuItems.find((item) => item.id === menuItem);
    this.addDynamicComponent(item);
  }

  private addDynamicComponent(menuItem: SaffronMenuModel | undefined) {
    if (menuItem) {
      const ref = this.sideNavContent.createComponent<any>(
        menuItem.componentType ?? DemoInput,
      );
    }

    this.chRef.detectChanges();
  }
}
