import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Image, ImagesList } from './image.types';
import { ApiService } from '@gbrepo/business';

@Injectable()
export class ImagesService {
  // * Injectors
  private apiService = inject(ApiService);

  /**
   * The function `getList` retrieves a list of images from a specified API endpoint.
   * @returns An Observable of an array of ImagesList objects is being returned.
   */
  getList(): Observable<ImagesList[]> {
    const path = `/images`;
    return this.apiService.get(path) as Observable<ImagesList[]>;
  }
  /**
   * This function retrieves a image by its ID from an API using TypeScript and returns it as an
   * Observable.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * image. It is used to retrieve a specific image from the API by appending it to the URL endpoint.
   * @returns An Observable of type Image is being returned.
   */
  get(id: string): Observable<Image> {
    const path = `/images/${id}`;
    return this.apiService.get(path) as Observable<Image>;
  }
}
