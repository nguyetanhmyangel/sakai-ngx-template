import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Bỏ qua các request ngầm không cần loading (nếu cần)
  // if (req.headers.has('X-Skip-Loading')) return next(req);

  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Chạy khi API xong (thành công hoặc lỗi đều tắt)
      loadingService.hide();
    })
  );
};
