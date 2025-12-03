### 1. Add index.ts in src/app/shared/components/skeletons

```ts
export * from './skeleton-table.component';
export * from './skeleton-form.component';
export * from './skeleton-toolbar.component';
export * from './skeleton-list.component';
export * from './skeleton-tree.component';
export * from './skeleton-dialog.component';
export * from './skeleton-stats.component';
```

### 2. Example

#### List Page:

- user-list.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

// 1. Import tất cả Skeleton từ file index.ts
import { 
  SkeletonTableComponent, 
  SkeletonToolbarComponent 
} from 'src/app/shared/components/skeletons'; 

import { TableState } from 'src/app/core/utils/table-state';

@Component({
  selector: 'app-user-list',
  standalone: true,
  // 2. Khai báo trong imports
  imports: [
    CommonModule, 
    TableModule, 
    ToolbarModule,
    SkeletonTableComponent, 
    SkeletonToolbarComponent
  ],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  state = new TableState<User>();

  ngOnInit() {
    this.state.load(this.userService.getAll());
  }
}
```

- user-list.component.html:

```html
<div class="card">
    @if (state.showSkeleton()) {
        <app-skeleton-toolbar></app-skeleton-toolbar>
        
        <app-skeleton-table [rows]="10" [cols]="5"></app-skeleton-table>
    } 
    
    @else {
        <p-toolbar styleClass="mb-4">
            <ng-template pTemplate="left">
                <button pButton label="Thêm mới" icon="pi pi-plus"></button>
            </ng-template>
             <ng-template pTemplate="right">
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input pInputText placeholder="Search..." />
                </span>
            </ng-template>
        </p-toolbar>

        <p-table [value]="state.data() || []" [loading]="state.showSpinner()">
            </p-table>
    }
</div>
```

#### Form in Dialog (Modal)

When user click "Edit", open Dialog and call detail API

- user-list.component.html - in Dialog:

```html
<p-dialog 
    [(visible)]="showEditModal" 
    [style]="{width: '50vw'}" 
    header="Chi tiết Người dùng" 
    [modal]="true">

    @if (detailState.showSkeleton()) {
        <app-skeleton-dialog></app-skeleton-dialog>
    } 
    @else {
        <div class="p-fluid grid mt-2">
            <div class="field col-12 md:col-6">
                <label>Họ tên</label>
                <input pInputText [(ngModel)]="user.name">
            </div>
            <div class="field col-12 md:col-6">
                <label>Email</label>
                <input pInputText [(ngModel)]="user.email">
            </div>
            
            <div class="col-12 flex justify-content-end gap-2 mt-4">
                <button pButton label="Hủy" class="p-button-outlined"></button>
                <button pButton label="Lưu"></button>
            </div>
        </div>
    }

</p-dialog>
```

#### Dashboard (Statistical + List + Chart)

- dashboard.component.html: 

```html
<div class="grid">
    
    @if (statsState.showSkeleton()) {
        <app-skeleton-stats></app-skeleton-stats>
    } 
    @else {
        <div class="col-12 md:col-6 lg:col-3" *ngFor="let item of stats">
            <div class="card mb-0">...</div>
        </div>
    }

    <div class="col-12 xl:col-6">
        <div class="card">
            <h5>Tin tức mới</h5>
            
            @if (newsState.showSkeleton()) {
                <app-skeleton-list [items]="5"></app-skeleton-list>
            } 
            @else {
                <p-dataView [value]="news">...</p-dataView>
            }
        </div>
    </div>

    <div class="col-12 xl:col-6">
        <div class="card">
            <h5>Biểu đồ doanh thu</h5>
            
            @if (chartState.showSkeleton()) {
                <p-skeleton width="100%" height="300px"></p-skeleton>
            } 
            @else {
                <p-chart type="line" [data]="chartData"></p-chart>
            }
        </div>
    </div>

</div>
```

### Customization

All components provide @Input properties (Signal Input) for customizing them to match the real UI:

-column form (Login/Mobile):

```html
<app-skeleton-form [cols]="1" [items]="3"></app-skeleton-form>
```

-column form (Default):

```html
<app-skeleton-form [cols]="2" [items]="6"></app-skeleton-form>
```

- Multi-row table:

```html
<app-skeleton-table [rows]="20" [cols]="6"></app-skeleton-table>
```
