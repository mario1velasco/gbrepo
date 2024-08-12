/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service'; // Replace with your actual service path
import { createApi } from 'unsplash-js';

describe('ImageService', () => {
  let service: ImageService;
  let unsplashApiSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);

    // Mock the Unsplash API
    unsplashApiSpy = jest.spyOn(
      createApi({ accessKey: 'your-access-key' }),
      'search' as never
    );
    jest.spyOn(createApi({ accessKey: 'your-access-key' }), 'photos' as never);
    jest.spyOn(createApi({ accessKey: 'your-access-key' }), 'users' as never);
    jest.spyOn(
      createApi({ accessKey: 'your-access-key' }),
      'collections' as never
    );
    jest.spyOn(createApi({ accessKey: 'your-access-key' }), 'topics' as never);
  });

  // ***********************************
  // * Search Methods
  // ***********************************

  it('should search for photos', (done) => {
    const mockResponse = { response: [{ id: '1', description: 'photo1' }] };
    unsplashApiSpy.getPhotos.mockReturnValue(Promise.resolve(mockResponse));

    service.searchPhotos('nature').subscribe((result) => {
      expect(result).toEqual(mockResponse.response);
      done();
    });
  });

  // ... similar tests for searchUsers and searchCollections

  // ***********************************
  // * Photos Methods
  // ***********************************

  it('should list photos', (done) => {
    const mockResponse = { response: [{ id: '1', description: 'photo1' }] };
    unsplashApiSpy.list.mockReturnValue(Promise.resolve(mockResponse));

    service.listPhotos().subscribe((result) => {
      expect(result).toEqual(mockResponse.response);
      done();
    });
  });

  // ... similar tests for other Photos methods

  // ***********************************
  // * Users Methods
  // ***********************************

  it('should get user details', (done) => {
    const mockResponse = { response: { username: 'testuser' } };
    unsplashApiSpy.get.mockReturnValue(Promise.resolve(mockResponse));

    service.getUser('testuser').subscribe((result: any) => {
      expect(result).toEqual(mockResponse.response);
      done();
    });
  });

  // ... similar tests for other Users methods

  // ***********************************
  // * Collections Methods
  // ***********************************

  it('should list collections', (done) => {
    const mockResponse = { response: { results: [], total: 0 } };
    unsplashApiSpy.list.mockReturnValue(Promise.resolve(mockResponse));

    service.listCollections().subscribe((result: any) => {
      expect(result).toEqual(mockResponse.response);
      done();
    });
  });

  // ... similar tests for other Collections methods

  // ***********************************
  // * Topics Methods
  // ***********************************

  it('should list topics', (done) => {
    const mockResponse = { response: { results: [], total: 0 } };
    unsplashApiSpy.list.mockReturnValue(Promise.resolve(mockResponse));

    service.listTopics().subscribe((result: any) => {
      expect(result).toEqual(mockResponse.response);
      done();
    });
  });

  // ... similar tests for other Topics methods

  // *******************
  // * Error Handling
  // *******************

  it('should handle errors from Unsplash API', (done) => {
    const mockError = { errors: ['Some API error'] };
    unsplashApiSpy.getPhotos.mockReturnValue(Promise.reject(mockError));

    service.searchPhotos('error').subscribe({
      error: (error: Error) => {
        expect(error.message).toBe(mockError.errors[0]);
        done();
      },
    });
  });
});
