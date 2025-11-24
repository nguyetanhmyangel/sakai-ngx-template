import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // (Optional) Bỏ qua loading nếu request có header 'X-Skip-Loading'
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  // 1. Bật Loading
  loadingService.show();

  return next(req).pipe(
    // 2. Tắt Loading khi xong (dù thành công hay lỗi)
    finalize(() => {
      loadingService.hide();
    })
  );
};
