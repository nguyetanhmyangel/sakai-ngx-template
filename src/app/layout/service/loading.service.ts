import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private router = inject(Router);

  // --- CONFIG ---
  // Đặt về 0 để hiện NGAY LẬP TỨC khi bấm chuyển trang
  private readonly ROUTER_DEBOUNCE = 80;

  // Thời gian hiển thị tối thiểu (ms).
  // Dù trang load xong trong 1ms, thanh bar vẫn sẽ hiện trong 500ms rồi mới tắt.
  private readonly MIN_DISPLAY_TIME = 500;

  private readonly MAX_DISPLAY_TIME = 10000; // Tự tắt sau 10s

  // --- STATE ---
  readonly isVisible = signal<boolean>(false);

  // Logic nội bộ
  private apiRequestCount = 0;
  private isRouterLoading = false;

  // Timers
  private routerDebounceTimer: any = null;
  private minDisplayTimer: any = null;
  private maxDisplayTimer: any = null;

  constructor() {
    this.listenToRouter();
  }

  // --- API METHODS ---
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
        // Khi bắt đầu chuyển trang -> Bật Loading NGAY (vì debounce = 0)
        this.isRouterLoading = true;
        this.updateState();
      }

      if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {

        this.isRouterLoading = false;
        this.updateState();
      }
    });
  }

  private updateState() {
    // Chỉ cần 1 trong 2 đang chạy là hiện
    const shouldBeLoading = this.apiRequestCount > 0 || this.isRouterLoading;

    if (shouldBeLoading) {
      this.forceShow();
    } else {
      this.gracefulHide();
    }
  }

  private forceShow() {
    // Nếu đang hiện rồi thì thôi, chỉ hủy lệnh tắt nếu có
    if (this.isVisible()) {
        if (this.minDisplayTimer) {
            clearTimeout(this.minDisplayTimer);
            this.minDisplayTimer = null;
        }
        return;
    }

    // Clear hết timer cũ
    clearTimeout(this.minDisplayTimer);
    clearTimeout(this.maxDisplayTimer);

    // HIỆN NGAY LẬP TỨC
    this.isVisible.set(true);

    // Safety: Tự tắt sau 10s
    this.maxDisplayTimer = setTimeout(() => {
      this.resetAll();
    }, this.MAX_DISPLAY_TIME);
  }

  private gracefulHide() {
    if (!this.isVisible()) return;

    // Nếu đã có lệnh chờ tắt rồi thì không đặt lại nữa (tránh bị delay thêm)
    if (this.minDisplayTimer) return;

    // QUAN TRỌNG: Dù trang đã load xong, vẫn chờ hết MIN_DISPLAY_TIME mới tắt
    // Giúp mắt người dùng kịp nhìn thấy thanh bar chạy
    this.minDisplayTimer = setTimeout(() => {
      this.resetAll();
    }, this.MIN_DISPLAY_TIME);
  }

  private resetAll() {
    clearTimeout(this.minDisplayTimer);
    clearTimeout(this.maxDisplayTimer);
    this.minDisplayTimer = null;

    this.isVisible.set(false);
    this.apiRequestCount = 0;
    this.isRouterLoading = false;
  }
}
