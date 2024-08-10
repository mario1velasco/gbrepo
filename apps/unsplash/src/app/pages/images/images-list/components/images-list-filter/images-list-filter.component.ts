import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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
  @Input() public form:
    | FormGroup<{
        title: FormControl<string | null>;
        releaseYear: FormControl<string | null>;
      }>
    | undefined;
}
