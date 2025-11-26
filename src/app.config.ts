import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import các thành phần của PrimeNG (đảm bảo bạn đang dùng v18+)
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Import file route và interceptor của bạn
import { appRoutes } from './app.routes';
import { LoadingInterceptor } from '@/layout/interceptor/loading.interceptor';
// import { LoadingInterceptor } ... (Import interceptor của bạn ở đây)

export const appConfig: ApplicationConfig = {
    providers: [
        // 1. Router chuẩn Angular Standalone
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()
        ),

        // 2. HTTP Client
        provideHttpClient(
            withInterceptors([LoadingInterceptor]), // Cấu hình Interceptor
            withFetch()                             // Sử dụng Fetch API chuẩn
        ),

        // Dùng Async thay vì provideAnimations() thường
        provideAnimations(),


        // 4. Cấu hình PrimeNG (Dành cho v18+)
        providePrimeNG({
            theme: {
                preset: Aura,
                options: { darkModeSelector: '.app-dark' }
            }
        }),
    ]
};
