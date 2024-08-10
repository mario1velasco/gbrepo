import { Injectable, inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Image, ImagesList } from './image.types';
import { ApiService } from '@gbrepo/business';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

@Injectable()
export class ImagesService {
  // * Injectors
  private apiService = inject(ApiService);

  /**
   * The function `getList` retrieves a list of images from a specified API endpoint.
   * @returns An Observable of an array of ImagesList objects is being returned.
   */
  getList(): Observable<Photos> {
    // const path = `/images`;
    return this.apiService.get();
  }
  /**
   * This function retrieves a image by its ID from an API using TypeScript and returns it as an
   * Observable.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * image. It is used to retrieve a specific image from the API by appending it to the URL endpoint.
   * @returns An Observable of type Image is being returned.
   */
  get(): Observable<Photos> {
    // const path = `/images/${id}`;
    return this.apiService.get();
  }
}
