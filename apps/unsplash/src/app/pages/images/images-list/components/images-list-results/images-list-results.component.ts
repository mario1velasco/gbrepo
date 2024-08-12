import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  input,
  output,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Basic as BasicPhoto } from 'unsplash-js/dist/methods/photos/types';
import { ButtonComponent, PaginatorComponent } from '@gbrepo/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, ButtonComponent, NgIf, PaginatorComponent],
  selector: 'app-images-list-results',
  standalone: true,
  templateUrl: './images-list-results.component.html',
  styleUrls: ['./images-list-results.component.scss'],
})
export class ImagesListResultsComponent {
  // * Injectors
  private router = inject(Router);

  // * Inputs
  imagesList = input.required<BasicPhoto[]>();
  // * Outputs
  pageChange = output<number>();
  pageSizeChange = output<number>();

  // * Variables
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  total = input.required<number>();

  /**
   * The trackByImageId function in TypeScript returns the unique identifier of a image item based on
   * its 'id' property.
   * @param {number} index - The `index` parameter represents the index of the current item in the
   * array being iterated over.
   * @param {BasicPhoto} item - The `item` parameter in the `trackByImageId` function refers to an
   * object of type `BasicPhoto`.
   * @returns The function `trackByImageId` returns the `id` property of the `item` object, which is
   * used as the unique identifier for tracking purposes.
   */
  public trackByImageId(index: number, item: BasicPhoto): string {
    return item.id; // Use the 'id' property as the unique identifier
  }

  // ************
  // * EVENTS
  // ************

  /**
   * The function `onImageBtnClick` navigates to a specific image page based on the image's ID when a
   * button is clicked.
   * @param {BasicPhoto} image - The `image` parameter is an object of type `BasicPhoto` that
   * represents a specific image in a list of images. It likely contains properties such as `id`,
   * `title`, `genre`, `releaseDate`, etc., that provide information about the image.
   */
  onImageBtnClick(image: BasicPhoto) {
    this.router.navigate(['/images', image.id]);
  }

  // onPageChange(page: number) {
  //   console.log(page);
  // }

  // onPageSizeChange(newPageSize: number) {
  //   console.log(newPageSize);
  // }
}
