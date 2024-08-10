import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { MillionPipe, DurationPipe } from '@gbrepo/business';
import { ImagesService } from '../shared/image.service';
import { Image } from '../shared/image.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MillionPipe, DurationPipe],
  providers: [ImagesService],
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  // * Injectors
  private imagesService = inject(ImagesService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private location = inject(Location);

  // * Variables
  public image: Image | undefined;
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
      this.imagesService
        .get(this.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((image) => {
          this.image = image;
          this.cd.markForCheck();
        });
    }
  }

  // ********
  // * Events
  // ********
  onClickBackButton(): void {
    this.location.back();
  }
}
