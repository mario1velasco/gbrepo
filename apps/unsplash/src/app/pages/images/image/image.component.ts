import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { MillionPipe } from '@gbrepo/business';
import { ImageService } from '../shared/services/image.service';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { ButtonComponent } from '@gbrepo/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MillionPipe, DatePipe, ButtonComponent],
  providers: [ImageService],
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  // * Injectors
  private imagesService = inject(ImageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // * Variables
  public image: Basic | undefined;
  public id: string | null = this.route.snapshot.paramMap.get('imageId');

  // *****************
  // * Lifecycle hooks
  // *****************
  /**
   * The ngOnInit function in TypeScript is a lifecycle hook method used in Angular to initialize
   * component properties and make API calls.
   */
  ngOnInit(): void {
    if (this.id) {
      this.image = this.imagesService.findPhoto(this.id);
    }
    if (!this.image) {
      this.router.navigate(['/images']);
    }
  }

  // ********
  // * Events
  // ********
  onClickBackButton(): void {
    this.router.navigate(['/images']);
  }
}
