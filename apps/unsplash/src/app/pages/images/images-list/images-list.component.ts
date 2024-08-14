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
import { ImageFormType, isOrderBy, OrderBy } from '../shared/image.types';
import { ImagesListResultsComponent } from './components/images-list-results/images-list-results.component';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { ImagesListFilterComponent } from './components/images-list-filter/images-list-filter.component';
import { Basic as BasicPhoto } from 'unsplash-js/dist/methods/photos/types';
import { IMAGE_LIST_MOCK } from './mock/image-list.mock';
import { DeviceService } from '@gbrepo/business';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  private deviceService = inject(DeviceService);

  // * Variables
  public device = toSignal(this.deviceService.getDevice());
  public imagesList: BasicPhoto[] = [];
  public form: ImageFormType = this.fb.group({
    orderBy: ['relevant', Validators.required],
    type: ['', Validators.required],
  });
  public currentPage = signal(1);
  public pageSize = signal(10);
  public total = signal(0);
  public totalPages = signal(0);

  // *****************
  // * Lifecycle hooks
  // *****************
  /**
   * The ngOnInit function in TypeScript is a lifecycle hook method used in Angular to initialize
   * component properties and make API calls.
   */
  ngOnInit(): void {
    // ? We mock the initial called API to don't reach the limit of UNSPLASH API calls very fast
    this.loadDataWithoutAPICall();
    this.onDesktopFormValuesChange();
  }

  // ************
  // * EVENTS
  // ************
  /**
   * The onPageChange function searches for photos of nature on a new page and updates the current page
   * number.
   * @param {number} newPage - The `newPage` parameter is a number that represents the page number to
   * which the user wants to navigate.
   */
  onPageChange(newPage: number) {
    this.searchPhotos(newPage, this.pageSize());
    this.currentPage.set(newPage);
  }

  /**
   * The function `onPageSizeChange` updates the page size for a photo search of nature.
   * @param {number} newPageSize - The `newPageSize` parameter is a number that represents the new page
   * size that is selected by the user. It is used in the `onPageSizeChange` function to update the
   * page size for displaying search results for photos of nature.
   */
  onPageSizeChange(newPageSize: number) {
    this.searchPhotos(this.currentPage(), newPageSize);
    this.pageSize.set(newPageSize);
  }
  /**
   * The onSubmitFiltersForm function updates the images list based on the values in the form.
   */
  onSubmitFiltersForm() {
    this.currentPage.set(1);
    this.updateImagesList();
  }

  /**
   * The function `onDesktopFormValuesChange` listens for changes in form values, debounces them, and
   * updates the images list if the device is a desktop.
   */
  onDesktopFormValuesChange() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.device() === 'desktop') {
          this.currentPage.set(1);
          this.updateImagesList();
        }
      });
  }

  /**
   * The function `onResetSearch` resets form values and pagination settings before updating the images
   * list.
   */
  onResetSearch() {
    this.form.reset();
    this.pageSize.set(10);
    this.currentPage.set(1);
    this.total.set(0);
    this.totalPages.set(0);
    this.updateImagesList();
  }

  // *****************
  // * Private methods
  // *****************
  /**
   * The function `searchPhotos` searches for photos based on specified criteria and updates the images
   * list accordingly.
   * @param [currentPage=1] - The `currentPage` parameter in the `searchPhotos` function represents the
   * current page number of the paginated search results. It is used to determine which page of results
   * to fetch from the backend. The default value for `currentPage` is 1, meaning that by default, the
   * function will fetch the
   * @param [pageSize=10] - The `pageSize` parameter in the `searchPhotos` function represents the
   * number of photos to be displayed per page in the search results. In this case, it is set to a
   * default value of 10 if not specified. This means that when the function is called, it will
   * retrieve and display up
   */
  private searchPhotos(currentPage = 1, pageSize = 10): void {
    let orderBy = this.form.controls.orderBy.value;
    if (typeof orderBy !== 'string' || !isOrderBy(orderBy)) {
      orderBy = 'relevant';
    }
    const type = this.form.controls.type.value || 'nature';
    this.imageService
      .searchPhotos(
        type,
        currentPage,
        pageSize,
        undefined,
        undefined,
        orderBy as OrderBy
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((imagesList) => {
        this.imagesList = imagesList.results ? imagesList.results : [];
        this.total.set(imagesList.total);
        this.totalPages.set(imagesList.total_pages);
        this.saveImagesPaginator(imagesList);
        this.cd.markForCheck();
      });
  }
  /**
   * The function `updateImagesList` calls a method to search for photos based on the current page and
   * page size, and then marks the component for check.
   */
  private updateImagesList(): void {
    this.searchPhotos(this.currentPage(), this.pageSize());
    this.cd.markForCheck();
  }

  /**
   * The function `saveImagesPaginator` saves image search data including results, total count,
   * pagination details, and search parameters.
   * @param imagesList - The `imagesList` parameter is an object that contains the following
   * properties:
   */
  private saveImagesPaginator(imagesList: {
    results: BasicPhoto[];
    total: number;
    total_pages: number;
  }): void {
    let orderBy = this.form.controls.orderBy.value;
    if (typeof orderBy !== 'string' || !isOrderBy(orderBy)) {
      orderBy = 'relevant';
    }
    const imagesLastSearchData = {
      results: imagesList.results,
      total: imagesList.total,
      totalPages: imagesList.total_pages,
      pageSize: this.pageSize(),
      currentPage: this.currentPage(),
      orderBy: orderBy as OrderBy,
      type: this.form.controls.type.value,
    };
    this.imageService.imagesLastSearchData = imagesLastSearchData;
  }

  /**
   * The function `loadDataWithoutAPICall` sets data values based on either the results from an image
   * service or mock data.
   */
  private loadDataWithoutAPICall() {
    this.imagesList =
      this.imageService.imagesLastSearchData.results || IMAGE_LIST_MOCK.results;
    const total =
      this.imageService.imagesLastSearchData.total || IMAGE_LIST_MOCK.total;
    const totalPages =
      this.imageService.imagesLastSearchData.totalPages ||
      IMAGE_LIST_MOCK.total_pages;
    const pageSize = this.imageService.imagesLastSearchData.pageSize || 10;
    const currentPage = this.imageService.imagesLastSearchData.currentPage || 1;
    this.total.set(total);
    this.totalPages.set(totalPages);
    this.pageSize.set(pageSize);
    this.currentPage.set(currentPage);
    // We set the form values
    this.form.controls.orderBy.setValue(
      this.imageService.imagesLastSearchData.orderBy || 'relevant'
    );
    this.form.controls.type.setValue(
      this.imageService.imagesLastSearchData.type || ''
    );
    this.cd.markForCheck();
  }
}
