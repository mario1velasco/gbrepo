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
    orderBy: ['', Validators.required],
    type: ['', Validators.required],
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
    // ? START: We mock the initial called API to don't reach the limit very fast
    this.imagesList = IMAGE_LIST_MOCK.results;
    this.imageService.photos = this.imagesList;
    this.total.set(IMAGE_LIST_MOCK.total);
    // ? END: We mock the initial called API to don't reach the limit very fast

    this.onDesktopFormValuesChange();
    this.cd.markForCheck();
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
    this.searchPhotos('nature', newPage, this.pageSize());
    this.currentPage.set(newPage);
  }

  /**
   * The function `onPageSizeChange` updates the page size for a photo search of nature.
   * @param {number} newPageSize - The `newPageSize` parameter is a number that represents the new page
   * size that is selected by the user. It is used in the `onPageSizeChange` function to update the
   * page size for displaying search results for photos of nature.
   */
  onPageSizeChange(newPageSize: number) {
    this.searchPhotos('nature', this.currentPage(), newPageSize);
    this.pageSize.set(newPageSize);
  }
  /**
   * The onSubmitFiltersForm function updates the images list based on the values in the form.
   */
  onSubmitFiltersForm() {
    this.updateImagesList(this.form.value);
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
      .subscribe((data) => {
        if (this.device() === 'desktop') {
          this.updateImagesList(data);
        }
      });
  }

  // *****************
  // * Private methods
  // *****************
  /**
   * The `searchPhotos` function in TypeScript searches for photos based on specified parameters and
   * updates the images list accordingly.
   * @param [type=nature] - The `type` parameter in the `searchPhotos` function specifies the type of
   * photos to search for. By default, it is set to 'nature', meaning that the function will search for
   * nature-related photos. However, you can provide a different type as an argument when calling the
   * function to search for
   * @param [currentPage=1] - The `currentPage` parameter in the `searchPhotos` function represents the
   * current page number of the search results that are being retrieved. It is used to determine which
   * page of results to fetch from the server.
   * @param [pageSize=10] - The `pageSize` parameter in the `searchPhotos` function determines the
   * number of photos to be displayed per page in the search results. In this case, the default value
   * for `pageSize` is set to 10, meaning that by default, 10 photos will be shown on each page of the
   * @param {OrderBy} [orderBy=relevant] - The `orderBy` parameter in the `searchPhotos` function is
   * used to specify the order in which the photos should be retrieved. It is of type `OrderBy` which
   * seems to be an enum or a custom type that defines different sorting options such as 'relevant',
   * 'latest', 'popular', etc
   */
  private searchPhotos(
    type = 'nature',
    currentPage = 1,
    pageSize = 10,
    orderBy: OrderBy = 'relevant'
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
    let { orderBy, type } = formValues;
    if (typeof orderBy !== 'string' || !isOrderBy(orderBy)) {
      orderBy = 'relevant';
    }
    if (typeof type !== 'string' || type === '') {
      type = 'nature';
    }
    this.searchPhotos(
      type,
      this.currentPage(),
      this.pageSize(),
      orderBy as OrderBy
    );
    this.cd.markForCheck();
  }
}
