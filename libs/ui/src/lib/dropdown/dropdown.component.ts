import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  // * Injectors
  private cd = inject(ChangeDetectorRef);

  // * Inputs & Outputs
  @Input() options: string[] = [];
  @Input() placeholder = 'Select an option';
  @Input() selectedOption: string | null = null;
  @Output() selectionChange = new EventEmitter<string>();

  // * Variables
  isOpen = false;

  // *************
  // * EVENTS
  // *************
  onCLickToggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickSelectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.cd.markForCheck();
    this.selectionChange.emit(option);
  }
}
