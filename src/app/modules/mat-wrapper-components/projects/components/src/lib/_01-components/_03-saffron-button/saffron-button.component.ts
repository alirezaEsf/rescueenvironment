import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'saffron-button',
  templateUrl: './saffron-button.component.html',
  styleUrls: ['./saffron-button.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinner,
    ],
})
export class SaffronButtonComponent {
  @Input()
  public title!: string;

  @Input()
  public buttonStyle!: string;

  @Input()
  public buttonClass!: string;

  @Input()
  public matIcon!: string;

  @Input()
  public buttonType!: string; // SaffronButtonTypes;

  @Input()
  public htmlButtonType: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  public tooltip!: string;

  @Input()
  public progressSpinner: boolean;

  @Input() formGroup!: FormGroup;

    @Input()
    public disabled: boolean;


  @Output()
  public buttonClicked = new EventEmitter();

  public clicked() {
    this.buttonClicked.emit();
  }
}
