import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Bỏ qua nếu có header đặc biệt
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  // 1. Báo Service bắt đầu
  loadingService.apiStart();

  return next(req).pipe(
    // 2. Báo Service kết thúc (thành công hay lỗi đều chạy)
    finalize(() => {
      loadingService.apiEnd();
    })
  );
};
