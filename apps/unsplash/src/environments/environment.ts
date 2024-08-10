import * as dotenv from 'dotenv';
try {
  dotenv.config();
} catch (error) {
  console.error('Error loading environment variables:', error);
  // Manejar el error de forma adecuada, por ejemplo,
  // proporcionando valores predeterminados o mostrando un mensaje de error al usuario
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  unsplashAccessKey: process.env['UNSPLASH_ACCESS_KEY'],
};
