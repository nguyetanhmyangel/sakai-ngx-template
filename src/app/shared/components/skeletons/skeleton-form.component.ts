// src/app/shared/skeletons/skeleton-form.component.ts
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-form',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `
    <div class="card">
        <div class="grid p-fluid">
            @for (item of itemsArray(); track $index) {
                <div [class]="colClass()">
                    <div class="field mb-4">
                        <p-skeleton width="40%" height="1rem" styleClass="mb-2"></p-skeleton>
                        <p-skeleton width="100%" height="2.5rem" borderRadius="6px"></p-skeleton>
                    </div>
                </div>
            }
            <div class="col-12 flex justify-content-end gap-2 mt-2 pt-3 border-top-1 surface-border">
                <p-skeleton width="6rem" height="2.5rem" borderRadius="6px"></p-skeleton>
                <p-skeleton width="6rem" height="2.5rem" borderRadius="6px"></p-skeleton>
            </div>
        </div>
    </div>
  `
})
export class SkeletonFormComponent {
  items = input<number>(6);
  cols = input<number>(2); // 1, 2, 3, 4

  itemsArray = computed(() => Array(this.items()).fill(0));

  colClass = computed(() => {
     const c = this.cols();
     if (c === 1) return 'col-12';
     if (c === 2) return 'col-12 md:col-6';
     if (c === 3) return 'col-12 md:col-4';
     return 'col-12 md:col-3';
  });
}
