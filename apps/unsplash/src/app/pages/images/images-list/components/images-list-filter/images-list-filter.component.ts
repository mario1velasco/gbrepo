import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageFormType } from '../../../shared/image.types';
import { ButtonComponent, DropdownComponent } from '@gbrepo/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownComponent,
    ButtonComponent,
    NgClass,
  ],
  selector: 'app-images-list-filter',
  standalone: true,
  templateUrl: './images-list-filter.component.html',
  styleUrls: ['./images-list-filter.component.scss'],
})
export class ImagesListFilterComponent {
  // * Inputs
  @Input() public form: ImageFormType | undefined;
  // * Outputs
  @Output() public formSubmit = new EventEmitter<void>();
  @Output() public formReset = new EventEmitter<void>();

  // * Variables
  public isMaximized = false;
  public isFormVisible = false;

  // *******************
  // * EVENTS
  // *******************
  onClickBtnToggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }
  onClickBtnToggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
