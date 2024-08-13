import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  // * Variables
  public isMaximized = false;
  public isFormVisible = false;

  // *******************
  // * EVENTS
  // *******************
  onSubmit() {
    console.log(this.form?.value);
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
