# Unsplash Monorepo

This monorepo manages the development of the Unsplash application and its associated libraries.

## Projects

- **unsplash**: The main Angular application.
- **unsplash-e2e**: End-to-end tests for the Unsplash application using Cypress.
- **business**: Core business logic for the Unsplash application.
- **ui**: Reusable UI components for the Unsplash application.

## Getting Started

1. **Clone the repository:**

   - `git clone https://github.com/mario1velasco/gbrepo.git`

2. **Install dependencies:**

   - We used node V.20.16.0 (check .nvmrc file)
   - `npm install -g nx`
   - `npm install`

## Development

### Unsplash App

- **Development Server**:

  - Command: `nx serve unsplash`
  - Access the app at: [http://localhost:4200/](http://localhost:4200/)
  - The app will automatically reload if you change any source files.

- **Build**:

  - Command: `nx build unsplash`
  - Builds the project for production.
  - The build artifacts will be stored in the `dist/` directory.
  - Use the `--prod` flag for a production build with optimizations.

- **Unit Tests**:
  - Command: `nx test unsplash`
  - Executes unit tests using Jest.

### Unsplash E2E Tests

- **Prerequisites**: Make sure the main application is running (`nx serve unsplash`).
- **Run E2E Tests**:
  - Command: `nx e2e unsplash-e2e`
  - Executes end-to-end tests using Cypress.

### Business Library

- **Unit Tests**:
  - Command: `nx test business`
  - Executes unit tests using Jest.

### UI Library

- **Unit Tests**:

  - Command: `nx test ui`
  - Executes unit tests using Jest.

- **Storybook**:
  - Command: `nx storybook ui`
  - View and interact with the UI components in Storybook at: [http://localhost:4400/](http://localhost:4400/)

## Additional Commands

- **See NX Graph:** `nx graph`
- **Lint All Projects:** `nx lint`
- **Run All Unit Tests:** `nx test`
- **See All Available Commands and Options:** `nx help`

# IMPORTANT TO READ: What I have done

# My UI Library

This UI library provides a set of reusable Angular components for building user interfaces. It is designed to be integrated into Nx projects and leverages Tailwind CSS for styling.

## Features

### Core Components

- **Button**

  - Basic button functionality with customization options.
  - Thoroughly tested with unit tests.
  - Styled with Tailwind.
  - Visually documented with Storybook stories.

- **Dropdown**

  - Provides a dropdown selection interface.
  - Styled with Tailwind.
  - Implement ControlValueAccessor

- **Paginator**

  - Enables pagination for displaying large sets of data.
  - Styled with Tailwind.
  - Use of Input signals
  - Use of getters

# My Business Library

This business library provides essential services and utilities for handling common business logic within your Nx project.

## Features

### Services

- **Device Service** (`device.service.ts`)

  - Likely provides information about the user's device or browser, such as screen size, type, etc.
  - Useful for implementing responsive designs or tailoring features based on device capabilities.

- **Local Storage Service** (`local-storage.service.ts`)
  - Offers a convenient interface for interacting with the browser's local storage.
  - Simplifies storing and retrieving data locally.

### Directives

- **Scroll End Directive** (`scroll-end.directive.ts`)

  - Probably triggers an event or action when the user scrolls to the end of an element.
  - Can be used for implementing infinite scrolling or lazy loading.

### Pipes

- **Duration Pipe** (`duration.pipe.ts`)

  - Presumably formats time durations into a human-readable format (e.g., "2 hours 30 minutes").

# Unsplash App

This Angular application, built using Nx, interacts with the Unsplash API to provide features related to searching and viewing images.

When you go to details it get the data that was stored in LocalStorage to prevent to many API calls.

# Features

## Pages

- **Dashboard** (`dashboard.component`)

  - Serves as the main landing page or home screen of the application.
  - Use of Lazy Loading

* **Not Found** (`not-found.component`)

  - Renders when a URL not matching.

## Images List Component (`images-list.component`)

This Angular component presents a dynamic list of images, offering filtering, sorting, and pagination capabilities.

### Features

- **Image Retrieval**

  - Fetches images using the `ImageService`, primarily from the Unsplash API.
  - Employs a development-friendly mock API call to avoid exceeding rate limits.
  - The `searchPhotos` method handles image searches based on user input.

- **Filtering and Sorting**

  - Utilizes a reactive form (`ImageFormType`) to capture user preferences.
  - The `onSubmitFiltersForm` and `onDesktopFormValuesChange` methods dynamically apply filters and sorting to the image list.
  - Filtering and sorting logic is implemented in the `updateImagesList` method.

- **Pagination**
  - Manages pagination with `currentPage`, `pageSize`, and `total` signals.
  - Responds to user interactions with the paginator using `onPageChange` and `onPageSizeChange`.

### Sub-Components

- **`ImagesListFilterComponent`**

  - Provides the user interface for filtering options.

- **`ImagesListResultsComponent`**
  - Renders the actual image list or grid.

### Dependencies

- **`ImageService`**
  - Handles interaction with the image data source (Unsplash API and local storage).
- **`DeviceService`**
  - Offers information about the user's device for potential responsive behavior.
- **`FormBuilder`, `Validators`**
  - Used for constructing and managing the reactive form for filtering/sorting.

### Additional Notes

- Employs signals for a reactive state management approach.
- Includes error handling for Unsplash API responses.
- Utilizes the `takeUntilDestroyed` operator for efficient subscription cleanup.

### Potential Enhancements

- Expand filtering and sorting options.
- Implement features for image interaction (previews, lightboxes, favoriting).
- Optimize performance for large image sets (lazy loading, virtualization).
- Add thorough unit and end-to-end tests.

## Image Component (`image.component`)

This Angular component is designed to display detailed information about a single image. It retrieves image data based on an ID passed through the route and presents it in a user-friendly format.

### Features

- **Image Retrieval:**

  - Fetches image details using the `ImageService` and the provided image ID.
  - Redirects to the '/images' route if the image is not found.

- **Image Display:**

  - Presents the image along with relevant details like:
    - Description
    - Author information (name, username, profile picture)
    - Upload date (conditionally displayed based on screen size)
    - Image dimensions
    - Likes count
    - Photographer's bio, location, and portfolio link (conditionally displayed)

- **User Interaction:**
  - Includes a "Download" button that links to the image's download location.
  - Provides a "Back" button to navigate back to the image list.

### Dependencies

- **`ImageService`:**
  - Handles the retrieval of image data.
- **`ActivatedRoute`, `Router`:**
  - Used for accessing route parameters and navigation.
- **`DatePipe`:**
  - Formats the image upload date.
- **`ButtonComponent`:**
  - Presumably a custom button component from your UI library.
- **`NgIf`:**
  - Conditionally renders elements based on data availability.

## Reusable service

## Image Service

This Angular service provides a centralized way to interact with image-related data, primarily through the Unsplash API. It also utilizes local storage for caching and persistence.

### Features

- **Image Management:**

  - `photos` getter/setter: Stores and retrieves an array of `BasicPhoto` objects from local storage.
  - `findPhoto(id)`: Locates a specific photo by its ID within the stored photos.

- **Unsplash API Integration:**

  - **Search Methods:**
    - `searchPhotos(query, page, perPage, color, orientation, orderBy)`: Searches for photos based on various criteria.
    - `searchUsers(query, page, perPage)`: Searches for users.
    - `searchCollections(query, page, perPage)`: Searches for collections.
  - **Photos Methods:**
    - `listPhotos(page, perPage, orderBy)`: Lists all photos.
    - `getPhoto(photoId)`: Retrieves a single photo by ID.
    - `getPhotoStats(photoId)`: Gets statistics for a specific photo.
    - `getRandomPhoto(...)`: Fetches a random photo based on optional parameters.
    - `trackPhotoDownload(downloadLocation)`: Tracks a photo download.
  - **Users Methods:**
    - `getUser(username)`: Gets details about a specific user.
    - `getUserPhotos(...)`: Retrieves photos uploaded by a user.
    - `getUserLikes(...)`: Retrieves photos liked by a user.
    - `getUserCollections(username, page, perPage)`: Gets collections created by a user.
  - **Collections Methods:**
    - `listCollections(page, perPage)`: Lists all collections.
    - `getCollection(collectionId)`: Retrieves a single collection by ID.
    - `getCollectionPhotos(...)`: Gets photos from a specific collection.
    - `getRelatedCollections(collectionId)`: Finds collections related to a given collection.
  - **Topics Methods:**
    - `listTopics(...)`: Lists all topics or specific topics based on IDs or slugs.
    - `getTopic(topicIdOrSlug)`: Retrieves details about a single topic.
    - `getTopicPhotos(...)`: Gets photos associated with a specific topic.

- **Error Handling:**
  - `handleUnsplashResponse`: A private method to process Unsplash API responses, handling errors gracefully and returning the response data.

### Dependencies

- **`LocalStorageService`:** Used for storing and retrieving image data locally.
- **`unsplash-js`:** The Unsplash JavaScript library for interacting with the Unsplash API.
- **`rxjs`:** Provides Observables for handling asynchronous operations.

# License

- This project is licensed under the [MIT License](LICENSE).
