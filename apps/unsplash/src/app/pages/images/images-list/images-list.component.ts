import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { ImageFormType, OrderBy } from '../shared/image.types';
import { ImagesListResultsComponent } from './components/images-list-results/images-list-results.component';
import { FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { ImagesListFilterComponent } from './components/images-list-filter/images-list-filter.component';
import { Basic as BasicPhoto } from 'unsplash-js/dist/methods/photos/types';
import { IMAGE_LIST_MOCK } from './mock/image-list.mock';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImagesListResultsComponent, NgIf, ImagesListFilterComponent],
  providers: [ImageService],
  selector: 'app-images-list',
  standalone: true,
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
})
export class ImagesListComponent implements OnInit {
  // * Injectors
  private imageService = inject(ImageService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);

  // * Variables
  public imagesList: BasicPhoto[] = [];
  public form: ImageFormType = this.fb.group({
    orderBy: [''],
    type: [''],
  });
  public currentPage = signal(1);
  public pageSize = signal(10);
  public total = signal(0);

  // *****************
  // * Lifecycle hooks
  // *****************
  /**
   * The ngOnInit function in TypeScript is a lifecycle hook method used in Angular to initialize
   * component properties and make API calls.
   */
  ngOnInit(): void {
    // this.imageService.get().((imagesList) => {
    //   console.log(imagesList);
    //   debugger;
    // });
    this.imagesList = IMAGE_LIST_MOCK.results;
    this.imageService.photos = this.imagesList;
    this.total.set(IMAGE_LIST_MOCK.total);

    this.cd.markForCheck();
    // this.imageService
    //   .searchPhotos('nature', 1, 10)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((imagesList) => {
    //     console.log(imagesList);
    //     debugger;
    //     this.imagesList = imagesList.results ? imagesList.results : [];
    //     // this.allImagesList = imagesList;
    //     this.cd.markForCheck();
    //   });
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.updateImagesList(data);
      });
  }

  // ************
  // * EVENTS
  // ************
  onPageChange(newPage: number) {
    this.searchPhotos('nature', newPage, this.pageSize());
    this.currentPage.set(newPage);
  }

  onPageSizeChange(newPageSize: number) {
    this.searchPhotos('nature', this.currentPage(), newPageSize);
    this.pageSize.set(newPageSize);
  }

  // *****************
  // * Private methods
  // *****************
  private searchPhotos(
    type = 'nature',
    currentPage = 1,
    pageSize = 10,
    orderBy?: OrderBy
  ): void {
    this.imageService
      .searchPhotos(type, currentPage, pageSize, undefined, undefined, orderBy)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((imagesList) => {
        this.imagesList = imagesList.results ? imagesList.results : [];
        this.imageService.photos = imagesList.results;
        this.cd.markForCheck();
      });
  }
  /**
   * The function `updateImagesList` filters a list of images based on provided title and release year
   * criteria.
   * @param data - The `updateImagesList` method takes a parameter `data` which is a partial object
   * with optional properties `title` and `releaseYear`. These properties can be either a string or
   * `null`.
   */
  private updateImagesList(
    formValues: Partial<{ orderBy: string | null; type: string | null }>
  ): void {
    // this.imagesList = this.allImagesList.filter((image) => {
    //   if (
    //     form.title &&
    //     !image.title.toLowerCase().includes(form.title.toLowerCase())
    //   ) {
    //     return false;
    //   }
    //   if (
    //     form.releaseYear &&
    //     !image.release_date.substring(0, 4).includes(form.releaseYear)
    //   ) {
    //     return false;
    //   }
    //   return true;
    // });
    this.cd.markForCheck();
  }
}
