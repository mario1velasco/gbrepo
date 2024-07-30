import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  {
    loadChildren: () =>
      import('./pages/images/images.module').then((m) => m.ImagesModule),
    path: 'images',
  },
  { path: '**', component: NotFoundComponent },
];
