// src/app/shared/skeletons/skeleton-tree.component.ts
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-tree',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  template: `
    <div class="card">
        <div class="flex align-items-center mb-3">
             <p-skeleton size="1.5rem" styleClass="mr-2"></p-skeleton>
             <p-skeleton width="10rem"></p-skeleton>
        </div>

        @for (i of [1,2,3]; track i) {
            <div class="flex align-items-center mb-3 ml-4">
                <p-skeleton size="1.5rem" styleClass="mr-2"></p-skeleton>
                <p-skeleton width="80%"></p-skeleton>
            </div>

            @if (i === 2) {
                <div class="flex align-items-center mb-3 ml-6">
                    <p-skeleton size="1.2rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton width="60%"></p-skeleton>
                </div>
                <div class="flex align-items-center mb-3 ml-6">
                    <p-skeleton size="1.2rem" styleClass="mr-2"></p-skeleton>
                    <p-skeleton width="50%"></p-skeleton>
                </div>
            }
        }
    </div>
  `
})
export class SkeletonTreeComponent {}
