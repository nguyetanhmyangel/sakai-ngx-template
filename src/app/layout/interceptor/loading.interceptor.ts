import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // (Optional) Bỏ qua loading nếu request có header 'X-Skip-Loading'
  if (req.headers.has('X-Skip-Loading')) {
    return next(req);
  }

  // 1. show loading bar
  loadingService.apiStart();

  return next(req).pipe(
    // 2.  hide loading bar
    finalize(() => {
      loadingService.apiEnd();
    })
  );
};
