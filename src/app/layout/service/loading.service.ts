

import { Injectable, signal, computed, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private router = inject(Router);

  // --- CONFIG (Chỉnh ở đây dùng cho toàn App) ---
  private readonly ROUTER_DEBOUNCE = 120; // Chuyển trang nhanh < 120ms thì ko hiện
  private readonly MIN_DISPLAY_TIME = 300; // Đã hiện là hiện ít nhất 300ms
  private readonly MAX_DISPLAY_TIME = 10000; // Tự tắt sau 10s (Safety)

  // --- STATE ---
  // Signal này dành cho UI binding (đã qua xử lý timer)
  readonly isVisible = signal<boolean>(false);

  // Logic nội bộ
  private apiRequestCount = 0;
  private isRouterLoading = false;

  // Timers
  private routerDebounceTimer: any = null;
  private minDisplayTimer: any = null;
  private maxDisplayTimer: any = null;

  constructor() {
    // Tự động lắng nghe Router ngay khi App khởi động
    this.listenToRouter();
  }

  // --- API METHODS (Gọi từ Interceptor) ---
  apiStart() {
    this.apiRequestCount++;
    this.updateState();
  }

  apiEnd() {
    this.apiRequestCount--;
    if (this.apiRequestCount < 0) this.apiRequestCount = 0;
    this.updateState();
  }

  // --- PRIVATE LOGIC ---

  private listenToRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        clearTimeout(this.routerDebounceTimer);
        // Debounce: Chờ một chút mới tính là đang load
        this.routerDebounceTimer = setTimeout(() => {
          this.isRouterLoading = true;
          this.updateState();
        }, this.ROUTER_DEBOUNCE);
      }

      if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        clearTimeout(this.routerDebounceTimer);
        this.isRouterLoading = false;
        this.updateState();
      }
    });
  }

  // Hàm quyết định có hiện Bar hay không
  private updateState() {
    const shouldBeLoading = this.apiRequestCount > 0 || this.isRouterLoading;

    if (shouldBeLoading) {
      this.forceShow();
    } else {
      this.gracefulHide();
    }
  }

  private forceShow() {
    // Nếu đã hiện rồi thì thôi, không reset timer (trừ max timer)
    if (this.isVisible()) {
        // Chỉ reset lệnh tắt (nếu đang chờ tắt)
        clearTimeout(this.minDisplayTimer);
        return;
    }

    clearTimeout(this.minDisplayTimer);
    clearTimeout(this.maxDisplayTimer);

    this.isVisible.set(true);

    // Safety Net: Tự tắt sau 10s
    this.maxDisplayTimer = setTimeout(() => {
      this.resetAll();
    }, this.MAX_DISPLAY_TIME);
  }

  private gracefulHide() {
    // Nếu đang không hiện thì thôi
    if (!this.isVisible()) return;

    // Nếu đang chờ tắt rồi thì thôi
    if (this.minDisplayTimer) return;

    // Hẹn giờ tắt (để đảm bảo hiệu ứng mượt)
    this.minDisplayTimer = setTimeout(() => {
      this.resetAll();
    }, this.MIN_DISPLAY_TIME);
  }

  private resetAll() {
    clearTimeout(this.routerDebounceTimer);
    clearTimeout(this.minDisplayTimer);
    clearTimeout(this.maxDisplayTimer);
    this.minDisplayTimer = null; // Reset biến check

    this.isVisible.set(false);

    // Reset luôn state nội bộ để tránh lệch pha
    this.apiRequestCount = 0;
    this.isRouterLoading = false;
  }
}
