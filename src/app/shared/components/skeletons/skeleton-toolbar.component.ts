import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-toolbar',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
        <div class="flex gap-2 align-items-center">
            <p-skeleton width="12rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            <p-skeleton width="3rem" height="2.5rem" borderRadius="6px"></p-skeleton>
        </div>

        <div class="flex gap-2">
            <p-skeleton width="8rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            <p-skeleton width="2.5rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            <p-skeleton width="2.5rem" height="2.5rem" borderRadius="6px"></p-skeleton>
        </div>
    </div>
  `
})
export class SkeletonToolbarComponent {}
