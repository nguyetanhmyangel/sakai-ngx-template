// src/app/shared/skeletons/skeleton-stats.component.ts
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

// Dùng cho các ô thống kê trên Dashboard (Số liệu + Icon).
@Component({
  selector: 'app-skeleton-stats',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div class="grid">
        @for (item of [1,2,3,4]; track $index) {
             <div class="col-12 md:col-6 lg:col-3">
                 <div class="card mb-0">
                     <div class="flex justify-content-between mb-3">
                         <div>
                             <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                             <p-skeleton width="8rem" height="2rem"></p-skeleton>
                         </div>
                         <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                             <p-skeleton shape="circle" size="1.5rem"></p-skeleton>
                         </div>
                     </div>
                     <p-skeleton width="100%" height="1rem"></p-skeleton>
                 </div>
             </div>
        }
    </div>
  `
})
export class SkeletonStatsComponent {}
