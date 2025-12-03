// src/app/shared/skeletons/skeleton-table.component.ts
import { Component, input, computed } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [SkeletonModule, TableModule],
  template: `
    <div class="card p-0">
      <p-table [value]="rowsArray()">
        <ng-template pTemplate="header">
          <tr>
            @for (col of colsArray(); track $index) {
              <th><p-skeleton width="100%" height="1.5rem"></p-skeleton></th>
            }
          </tr>
        </ng-template>
        <ng-template pTemplate="body">
          <tr>
            @for (col of colsArray(); track $index) {
              <td><p-skeleton width="100%" height="1rem"></p-skeleton></td>
            }
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class SkeletonTableComponent {
  rows = input<number>(5);
  cols = input<number>(4);

  rowsArray = computed(() => Array(this.rows()).fill(0));
  colsArray = computed(() => Array(this.cols()).fill(0));
}
