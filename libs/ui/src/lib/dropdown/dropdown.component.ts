/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  // * Injectors
  private cd = inject(ChangeDetectorRef);

  // * Inputs & Outputs
  @Input() options: string[] = [];
  @Input() placeholder = 'Select an option';
  @Input() selectedOption: string | null = null;
  @Output() selectionChange = new EventEmitter<string>();

  // * Variables
  isOpen = false;
  // * ControlValueAccessor functions
  onChange = (value: unknown): void => {};
  onTouched = () => {};

  // *************
  // * EVENTS
  // *************
  onCLickToggleDropdown() {
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  onClickSelectOption(option: string) {
    this.selectedOption = option;
    this.onChange(this.selectedOption);
    this.onTouched();
    this.isOpen = false;
    this.cd.markForCheck();
    this.selectionChange.emit(option);
  }
  // * ControlValueAccessor implementation
  writeValue(value: string): void {
    this.selectedOption = value;
    this.onChange(this.selectedOption);
    this.onTouched();
    this.cd.markForCheck();
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
