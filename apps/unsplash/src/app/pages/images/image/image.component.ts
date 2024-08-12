import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location, NgIf } from '@angular/common';
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
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private location = inject(Location);

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
    // TODO Missing implementation
    // if (!this.image) {
    //   this.imagesService
    //     .get(this.id)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe((image) => {
    //       this.image = image;
    //       this.cd.markForCheck();
    //     });
    // }
  }

  // ********
  // * Events
  // ********
  onClickBackButton(): void {
    this.location.back();
  }
}
