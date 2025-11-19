import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';


export const appConfig: ApplicationConfig = {
    providers: [
        // Tối ưu hóa change detection
        provideZoneChangeDetection({ eventCoalescing: true }),

        // Router chuẩn Angular Standalone
        provideRouter(
            appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),

        // HTTP Client chuẩn Angular
        provideHttpClient(withFetch()),

        // Animation chính thức – thay cho provideAnimationsAsync() đã deprecated
        provideAnimations(),

        // Cấu hình PrimeNG với theme Aura và hỗ trợ dark mode
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),

        // Cấu hình Transloco
        provideTransloco({
            config: {
                availableLangs: ['en', 'vi', 'ru'],
                // Lấy ngôn ngữ từ localStorage, mặc định là 'vi'
                defaultLang: localStorage.getItem('lang') || 'vi',
                // Render lại khi đổi ngôn ngữ
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader
        })
    ]
};
