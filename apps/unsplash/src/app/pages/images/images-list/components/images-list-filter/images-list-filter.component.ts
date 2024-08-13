import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageFormType } from '../../../shared/image.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, ReactiveFormsModule],
  selector: 'app-images-list-filter',
  standalone: true,
  templateUrl: './images-list-filter.component.html',
  styleUrls: ['./images-list-filter.component.scss'],
})
export class ImagesListFilterComponent {
  // * Inputs
  @Input() public form: ImageFormType | undefined;
}
