import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { fromEvent, startWith, map, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the application
})
export class DeviceService {
  /**
   * This TypeScript function returns an observable that emits the type of device ('desktop' or
   * 'mobile') based on the window width.
   * @returns The `getDevice()` function returns an Observable that emits the type of device based on
   * the window width. It will emit either 'desktop' or 'mobile' depending on whether the window width
   * is greater than or equal to 1024 pixels. The Observable will emit a new value whenever the window
   * is resized, and it will only emit a new value if the device type changes (i.e., distinct
   */
  getDevice() {
    const window = inject(DOCUMENT).defaultView!;
    return fromEvent(window, 'resize').pipe(
      startWith(window.innerWidth),
      map(() => {
        const mobile = window.innerWidth < 768;
        const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        if (mobile) {
          return 'mobile';
        }
        if (tablet) {
          return 'tablet';
        }
        return 'desktop';
      }),
      distinctUntilChanged()
    );
  }
}
