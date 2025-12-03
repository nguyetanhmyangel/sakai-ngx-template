// src/app/shared/skeletons/skeleton-list.component.ts
import { Component, input, computed } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-list',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="card">
      <ul class="list-none p-0 m-0">
        @for (item of itemsArray(); track $index) {
          <li class="flex align-items-center py-3 border-bottom-1 surface-border">
            <p-skeleton shape="circle" size="3rem" styleClass="mr-3 flex-shrink-0"></p-skeleton>

            <div class="flex-grow-1">
               <p-skeleton width="60%" styleClass="mb-2"></p-skeleton>
               <p-skeleton width="40%" height="0.8rem"></p-skeleton>
            </div>

            <p-skeleton width="2rem" height="2rem" styleClass="ml-2"></p-skeleton>
          </li>
        }
      </ul>
    </div>
  `
})
export class SkeletonListComponent {
  items = input<number>(5);
  itemsArray = computed(() => Array(this.items()).fill(0));
}
