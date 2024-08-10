import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageComponent } from './image/image.component';
const routes: Route[] = [
  {
    component: ImagesListComponent,
    path: '',
  },
  {
    component: ImageComponent,
    path: ':imageId',
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ImagesModule {}
