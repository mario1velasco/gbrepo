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

Bash
nx install

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

## License

- This project is licensed under the [MIT License](LICENSE).
