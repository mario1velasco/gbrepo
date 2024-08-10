import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { createApi } from 'unsplash-js';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //  * Variables
  // TODO: Add your Unsplash access key into .env
  unsplash = createApi({
    accessKey: 'xxxxxx',
  });

  //  *******************
  //  ****** API Calls ****
  //  *******************
  /**
   * The function `get()` retrieves photos from the Unsplash API, handling success and errors using
   * Observables in TypeScript.
   * @returns The `get()` function returns an Observable that makes a call to the Unsplash API to
   * search for photos with the query 'nature'. It then maps the API response to handle success and
   * errors. If the API call is successful, it returns the photos array directly. If there is an error,
   * it throws an error. The function also catches any errors that occur during the Observable stream
   * and logs an error
   */
  get(): Observable<Photos> {
    // Create an Observable from the Unsplash API call
    return from(
      this.unsplash.search.getPhotos({
        query: 'nature',
        page: 1,
        perPage: 10,
      })
    ).pipe(
      // Map the API response to handle success and errors
      map((result) => {
        if (result.type === 'success') {
          return result.response; // Return the photos array directly
        } else {
          throw new Error(result.errors[0]); // Throw an error if not successful
        }
      }),
      // Catch any errors that occur during the Observable stream
      catchError((error) => {
        console.error('Error fetching photos:', error);
        // TODO:You can return a default value or an error Observable here
        // return of([]); // Return an empty array in case of error

        // Or you can re-throw the error to be handled further up the stream:
        return throwError(() => error);
      })
    );
  }
}
