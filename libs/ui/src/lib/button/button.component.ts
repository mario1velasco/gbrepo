import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  /** Disable the button */
  @Input() disabled = false;
  /** The type of the button */
  @Input() type: 'button' | 'submit' = 'button';
  /** The text of the button */
  @Input() text: string | undefined;
  /** Event emitted when the button is clicked */
  @Output() btnClick = new EventEmitter<void>();
}
