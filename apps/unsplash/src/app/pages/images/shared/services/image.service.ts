/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {
  Collections,
  Photos,
  Users,
} from 'unsplash-js/dist/methods/search/types/response';
import { ColorId, createApi, OrderBy, Orientation } from 'unsplash-js';
import { TopicOrderBy } from 'unsplash-js/dist/methods/topics';
import { Basic as BasicUser } from 'unsplash-js/dist/methods/users/types';
import {
  Basic as BasicTopic,
  Full as FullTopic,
} from 'unsplash-js/dist/methods/topics/types';
import { Basic as BasicPhoto } from 'unsplash-js/dist/methods/photos/types';
import { LocalStorageService } from '@gbrepo/business';
import { ImagesPaginator, OrderBy as OrderByType } from '../image.types';

@Injectable()
export class ImageService {
  // * Injectors
  private localStorageService = inject(LocalStorageService);
  // * Private variables
  private readonly unsplash;

  constructor() {
    // Create an instance of the Unsplash API with your access key
    this.unsplash = createApi({
      accessKey: 'jUlamOylY7AnQ6ySwEjDHD-ayY3OUVNA7lEeouODF40',
    });
  }

  // ***********************************
  // * General Methods
  // ***********************************

  /**
   * The function saves the imagesPaginator data to local storage using the localStorageService.
   * @param {ImagesPaginator} imagesPaginator - The `imagesPaginator` parameter is an object of type
   * `ImagesPaginator`, which likely contains information related to paginating through a collection of
   * images.
   */
  set imagesPaginator(imagesPaginator: ImagesPaginator) {
    this.localStorageService.saveData('imagesPaginator', imagesPaginator);
  }

  /**
   * This function retrieves data from local storage for pagination of images.
   * @returns An array of imagesPaginator data is being returned. If there is no data stored in the
   * 'imagesPaginator' key in the localStorageService, an empty array is returned.
   */
  get imagesPaginator() {
    return this.localStorageService.getData('imagesPaginator') || [];
  }

  /**
   * The function `findPhoto` searches for a photo by its ID within a collection of images.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * photo you want to find in the `imagesPaginator` results. The `findPhoto` function searches for a
   * photo with the specified `id` within the results array and returns the photo object if found.
   * @returns The `findPhoto` function is returning the photo object from the `imagesPaginator.results`
   * array that has the specified `id`.
   */
  findPhoto(id: string) {
    return this.imagesPaginator.results.find((photo) => photo.id === id);
  }

  // ***********************************
  // ********* API METHODS *************
  // ***********************************

  // ***********************************
  // * Search Methods
  // ***********************************

  /**
   * The function `searchPhotos` searches for photos based on the provided query and optional
   * parameters like page number, color, orientation, and order.
   * @param {string} query - The `query` parameter is a string that represents the search term used to
   * find photos. It is the main input for the search function and is used to retrieve relevant photos
   * based on the provided search term.
   * @param [page=1] - The `page` parameter in the `searchPhotos` function is used to specify the page
   * number of the search results to retrieve. By default, it is set to 1, meaning that the function
   * will initially fetch the search results from the first page. If you want to retrieve results from
   * subsequent pages
   * @param [perPage=10] - The `perPage` parameter in the `searchPhotos` function specifies the number
   * of photos to be displayed per page in the search results. By default, it is set to 10, but you can
   * adjust this value based on your requirements.
   * @param {ColorId} [color] - The `color` parameter in the `searchPhotos` function is used to specify
   * the color filter for the photos to be searched. It is of type `ColorId`, which likely represents
   * different color options that can be used as filters for the search query. This parameter is
   * optional, meaning it does not
   * @param {Orientation} [orientation] - The `orientation` parameter in the `searchPhotos` function is
   * an optional parameter that specifies the orientation of the photos to be searched for. It can have
   * one of the following values:
   * @param {OrderByType} [orderBy=relevant] - The `orderBy` parameter in the `searchPhotos` function
   * specifies the order in which the search results should be sorted. It has a default value of
   * `'relevant'`, but it can be overridden with other values. The possible values for `orderBy` are
   * typically related to how the search results are sorted
   * @returns The `searchPhotos` function is returning an object with the following properties:
   * - `results`: an array of `BasicPhoto` objects
   * - `total`: a number representing the total number of results
   * - `total_pages`: a number representing the total number of pages
   */
  searchPhotos(
    query: string,
    page = 1,
    perPage = 10,
    color?: ColorId,
    orientation?: Orientation,
    orderBy: OrderByType = 'relevant'
  ) {
    return this.handleUnsplashResponse<{
      results: BasicPhoto[];
      total: number;
      total_pages: number;
    }>(
      from(
        this.unsplash.search.getPhotos({
          query,
          page,
          perPage,
          color,
          orientation,
          orderBy,
        })
      )
    );
  }

  // Search for users
  searchUsers(query: string, page = 1, perPage = 10) {
    return this.handleUnsplashResponse<Users[]>(
      from(this.unsplash.search.getUsers({ query, page, perPage }))
    );
  }

  // Search for collections
  searchCollections(query: string, page = 1, perPage = 10) {
    return this.handleUnsplashResponse<Collections[]>(
      from(this.unsplash.search.getCollections({ query, page, perPage }))
    );
  }

  // ***********************************
  // * Photos Methods
  // ***********************************

  // List all photos
  listPhotos(page = 1, perPage = 10, orderBy?: OrderBy) {
    return this.handleUnsplashResponse<Photos[]>(
      from(this.unsplash.photos.list({ page, perPage, orderBy }))
    );
  }

  // Get a single photo
  getPhoto(photoId: string) {
    return this.handleUnsplashResponse<Photos[]>(
      from(this.unsplash.photos.get({ photoId }))
    );
  }

  // Get photo statistics
  getPhotoStats(photoId: string) {
    return this.handleUnsplashResponse<Photos[]>(
      from(this.unsplash.photos.getStats({ photoId }))
    );
  }

  // Get a random photo
  getRandomPhoto(
    query?: string,
    username?: string,
    featured?: boolean,
    collectionIds?: string[],
    topicIds?: string[],
    count?: number
  ) {
    return this.handleUnsplashResponse<Photos[]>(
      from(
        this.unsplash.photos.getRandom({
          query,
          username,
          featured,
          collectionIds,
          topicIds,
          count,
        })
      )
    );
  }

  // Track a photo download
  trackPhotoDownload(downloadLocation: string) {
    return this.handleUnsplashResponse<
      {
        url: string;
      }[]
    >(from(this.unsplash.photos.trackDownload({ downloadLocation })));
  }

  // ***********************************
  // * Users Methods
  // ***********************************

  // Get user details
  getUser(username: string) {
    return this.handleUnsplashResponse<Users[]>(
      from(this.unsplash.users.get({ username }))
    );
  }

  // Get photos uploaded by a user
  getUserPhotos(
    username: string,
    page = 1,
    perPage = 10,
    orderBy?: OrderBy,
    stats?: boolean,
    orientation?: Orientation
  ) {
    return this.handleUnsplashResponse<
      {
        results: BasicUser[];
        total: number;
      }[]
    >(
      from(
        this.unsplash.users.getPhotos({
          username,
          page,
          perPage,
          orderBy,
          stats,
          orientation,
        })
      )
    );
  }

  // Get photos liked by a user
  getUserLikes(
    username: string,
    page = 1,
    perPage = 10,
    orderBy?: OrderBy,
    orientation?: Orientation
  ) {
    return this.handleUnsplashResponse<
      {
        results: BasicUser[];
        total: number;
      }[]
    >(
      from(
        this.unsplash.users.getLikes({
          username,
          page,
          perPage,
          orderBy,
          orientation,
        })
      )
    );
  }

  // Get collections created by a user
  getUserCollections(username: string, page = 1, perPage = 10) {
    return this.handleUnsplashResponse<
      {
        results: BasicUser[];
        total: number;
      }[]
    >(from(this.unsplash.users.getCollections({ username, page, perPage })));
  }

  // ***********************************
  // * Collections Methods
  // ***********************************

  // List all collections
  listCollections(page = 1, perPage = 10) {
    return this.handleUnsplashResponse<
      {
        results: any[];
        total: number;
      }[]
    >(from(this.unsplash.collections.list({ page, perPage })));
  }

  // Get a single collection
  getCollection(collectionId: string) {
    return this.handleUnsplashResponse<any[]>(
      from(this.unsplash.collections.get({ collectionId }))
    );
  }

  // Get photos from a collection
  getCollectionPhotos(
    collectionId: string,
    page = 1,
    perPage = 10,
    orderBy?: OrderBy,
    orientation?: Orientation
  ) {
    return this.handleUnsplashResponse<
      {
        results: any[];
        total: number;
      }[]
    >(
      from(
        this.unsplash.collections.getPhotos({
          collectionId,
          page,
          perPage,
          orderBy,
          orientation,
        })
      )
    );
  }

  // Get related collections
  getRelatedCollections(collectionId: string) {
    return this.handleUnsplashResponse<any[]>(
      from(this.unsplash.collections.getRelated({ collectionId }))
    );
  }

  // ***********************************
  // * Topics Methods
  // ***********************************

  // List all topics
  listTopics(
    topicIdsOrSlugs?: string[],
    page = 1,
    perPage = 10,
    orderBy?: TopicOrderBy
  ) {
    return this.handleUnsplashResponse<
      {
        results: BasicTopic[];
        total: number;
      }[]
    >(
      from(
        this.unsplash.topics.list({
          topicIdsOrSlugs,
          page,
          perPage,
          orderBy,
        })
      )
    );
  }

  // Get a single topic
  getTopic(topicIdOrSlug: string) {
    return this.handleUnsplashResponse<FullTopic[]>(
      from(this.unsplash.topics.get({ topicIdOrSlug }))
    );
  }

  // Get photos from a topic
  getTopicPhotos(
    topicIdOrSlug: string,
    page = 1,
    perPage = 10,
    orderBy?: OrderBy,
    orientation?: Orientation
  ) {
    return this.handleUnsplashResponse<
      {
        results: BasicPhoto[];
        total: number;
      }[]
    >(
      from(
        this.unsplash.topics.getPhotos({
          topicIdOrSlug,
          page,
          perPage,
          orderBy,
          orientation,
        })
      )
    );
  }

  // *******************
  // ****** PRIVATE METHODS ****
  // *******************
  /**
   * The function `handleUnsplashResponse` processes an Observable response from Unsplash API, handling
   * errors and returning the response data.
   * @param response - The `response` parameter in the `handleUnsplashResponse` function is an
   * Observable that emits data from an API call to the Unsplash service.
   * @returns The `handleUnsplashResponse` function returns an Observable of type `T`.
   */
  private handleUnsplashResponse<T>(response: Observable<any>): Observable<T> {
    return response.pipe(
      map((result) => {
        if (result.errors) {
          throw new Error(result.errors[0]);
        } else {
          return result.response as T;
        }
      })
    );
  }
}
