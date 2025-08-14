import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SaffronMessageModel } from './models/saffrom-message-types';

@Component({
    selector: 'saffron-message',
    templateUrl: './saffron-message.component.html',
    styleUrls: ['./saffron-message.component.scss'],
    imports: [CommonModule, MatIconModule],
    standalone: true
})
export class SaffronMessageComponent implements OnInit, AfterViewInit {
  @Input() message?: SaffronMessageModel;

  @HostBinding('style.position') get positionType() {
    return this.message?.positionType ?? 'unset';
  }

  @HostBinding('style.zIndex') zIndex: number | string = 0;

  @HostBinding('style.top') top: string = '65px';
  @HostBinding('style.display') display: 'block' | 'none' = 'block';

    constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        this.placeNewMessage();
    }

    private placeNewMessage() {
        // Use setTimeout to defer the calculation of the top position
        setTimeout(() => {
            const existingMessages = document.querySelectorAll('saffron-message');
            const messageHeight = this.elementRef.nativeElement.offsetHeight;
            this.top = `${65 + (existingMessages.length) * messageHeight}px`;
            // Manually trigger change detection to update the view
            this.changeDetector.detectChanges();
        });
    }

  ngOnInit(): void {
    this.zIndex = this.getMaxZIndex();
  }

  private getMaxZIndex(): number {
    const allElements = document.querySelectorAll('*');
    let maxZIndex = 0;

    allElements.forEach((el: Element) => {
      const zIndex = window.getComputedStyle(el).zIndex;
      if (zIndex !== 'auto' && !isNaN(Number(zIndex))) {
        maxZIndex = Math.max(maxZIndex, Number(zIndex));
      }
    });

    return maxZIndex;
  }

  onClose() {
  }
}
