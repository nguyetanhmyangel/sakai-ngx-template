// src/app/shared/skeletons/skeleton-dialog.component.ts
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-dialog',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="p-fluid">
        <div class="field">
            <p-skeleton width="30%" styleClass="mb-2"></p-skeleton>
            <p-skeleton height="2.5rem"></p-skeleton>
        </div>
        <div class="field">
            <p-skeleton width="40%" styleClass="mb-2"></p-skeleton>
            <p-skeleton height="2.5rem"></p-skeleton>
        </div>
        <div class="field">
            <p-skeleton width="20%" styleClass="mb-2"></p-skeleton>
            <p-skeleton height="5rem"></p-skeleton> </div>

        <div class="flex justify-content-end gap-2 mt-4">
             <p-skeleton width="5rem" height="2.5rem"></p-skeleton>
             <p-skeleton width="5rem" height="2.5rem"></p-skeleton>
        </div>
    </div>
  `
})
export class SkeletonDialogComponent {}
