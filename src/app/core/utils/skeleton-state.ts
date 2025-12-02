import { signal, computed } from '@angular/core';
import { Observable, finalize } from 'rxjs';

export class SkeletonState<T> {
  // Data gốc
  private _data = signal<T[] | undefined>(undefined);
  private _loading = signal<boolean>(false);
  private _skeletonVisible = signal<boolean>(false);
  private timerId: any;

  // PUBLIC READONLY
  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();

  // Logic: Chỉ hiện Skeleton nếu _skeletonVisible = true VÀ chưa có data
  readonly showSkeleton = computed(() => this._skeletonVisible() && this._data() === undefined);

  // Logic: Hiện Spinner trong bảng nếu đang load VÀ đã có data
  readonly showSpinner = computed(() => this._loading() && this._data() !== undefined);

  /**
   * Load dữ liệu với Skeleton tự động
   * @param apiCall$ Observable API
   * @param gracePeriod Thời gian chờ (ms) trước khi bật skeleton (mặc định 300ms)
   */
  load(apiCall$: Observable<T[]>, gracePeriod: number = 300) {
    this._loading.set(true);

    // Grace Period: Nếu API nhanh hơn 300ms thì KHÔNG hiện skeleton
    this.timerId = setTimeout(() => {
      if (this._data() === undefined) {
          this._skeletonVisible.set(true);
      }
    }, gracePeriod);

    apiCall$.pipe(
      finalize(() => {
        this._loading.set(false);
        this.clearSkeletonTimer();
      })
    ).subscribe({
      next: (res) => this._data.set(res),
      error: (err) => {
        console.error(err);
        if (this._data() === undefined) this._data.set([]); // Set rỗng để tắt skeleton
      }
    });
  }

  reset() {
      this._data.set(undefined);
      this.clearSkeletonTimer();
  }

  private clearSkeletonTimer() {
      if (this.timerId) clearTimeout(this.timerId);
      this._skeletonVisible.set(false);
  }
}
