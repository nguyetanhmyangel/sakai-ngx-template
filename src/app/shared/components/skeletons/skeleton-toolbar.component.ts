// src/app/shared/skeletons/skeleton-toolbar.component.ts
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-toolbar',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="card mb-3">
        <div class="flex flex-column md:flex-row md:align-items-center justify-content-between gap-3">
            <div class="flex gap-2 align-items-center w-full md:w-auto">
                <p-skeleton width="14rem" height="2.5rem" borderRadius="6px"></p-skeleton>
                <p-skeleton width="3rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            </div>

            <div class="flex gap-2 w-full md:w-auto justify-content-end">
                 <p-skeleton width="8rem" height="2.5rem" borderRadius="6px"></p-skeleton>
                 <p-skeleton width="3rem" height="2.5rem" borderRadius="6px"></p-skeleton>
                 <p-skeleton width="3rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            </div>
        </div>
    </div>
  `
})
export class SkeletonToolbarComponent {}
