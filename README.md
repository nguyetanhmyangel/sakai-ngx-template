# Sakai19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Customize:

### . Add shadow for topbar, modifty _topbar.scss 

```bash
.layout-topbar {
    position: fixed;
    height: 4rem;
    z-index: 997;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 2rem;
    background-color: var(--surface-card);
    transition: left var(--layout-section-transition-duration);
    display: flex;
    align-items: center;
    box-shadow: 0 .5rem 1rem #2c33491a; // add new - custom shadow
 ```   
    
### . fix top, left sidebar, fix scroll of sidebar and body: modify _menu.scss

```bash
.layout-sidebar {
    position: fixed;
    width: 20rem;
    //height: calc(100vh - 8rem); // original
    height: 100vh; // modified to fix height issue
    //z-index: 999; // original
    overflow-y: auto;
    user-select: none;
    //top: 6rem; // original
    top: 4rem !important; // modified to align with topbar
    //left: 2rem; // original
    left: 0; // modified to add gap from left edge
    transition:
        transform var(--layout-section-transition-duration),
        left var(--layout-section-transition-duration);
    background-color: var(--surface-overlay);
    //border-radius: var(--content-border-radius); // original
    //padding: 0.5rem 1.5rem; // original
    padding: 0.5rem 1.5rem 100px 1.5rem; // modified to add bottom padding
    box-shadow: 0.5rem 8px 1rem #2c33491a; // add new - custom shadow
}
```

### . fix padding layout main container: modify _main.scss

```bash
.layout-main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    //padding: 6rem 2rem 0 2rem; // original
    padding: 5.8rem 1.8rem 0 0;
    transition: margin-left var(--layout-section-transition-duration);
}
```

### . Super smooth 360° rotation effect when clicking on the menu button (hamburger) of Sakai template

- in app.topbar.ts, modify follow:

```bash
export class AppTopbarComponent {
    isSpinning = false;

    constructor(public layoutService: LayoutService) {}

    // Gọi hàm này thay vì gọi trực tiếp onMenuToggle() 
    onMenuClick() {
        this.isSpinning = true;
        
        this.layoutService.onMenuToggle();

        // Tắt class spin sau 0.6s (thời gian animation)
        setTimeout(() => {
            this.isSpinning = false;
        }, 600);
    }
}

// html button
<button 
    class="layout-menu-button layout-topbar-action" 
    (click)="onMenuClick()"
    [class.spin]="isSpinning">
    <i class="pi pi-bars"></i>
</button>

// add CSS animation to _tobbar.scss
.spin {
    animation: spin 0.6s ease-in-out;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

// hover button
.layout-menu-button:hover .pi-bars {
    color: var(--primary-color) !important;
    transform: scale(1.1);
    transition: all 0.2s ease;
}
```
### Add feature Compact menu:

- In Layout.service.ts add(or modify) the following code:

```bash
sidebarCompact = signal<boolean>(false);

    onMenuToggle() {
        if (this.isOverlay()) {
            // Nếu dùng menuMode = overlay → giữ nguyên logic cũ
            this.layoutState.update((prev) => ({
                ...prev,
                overlayMenuActive: !this.layoutState().overlayMenuActive
            }));
            if (this.layoutState().overlayMenuActive) {
                this.overlayOpen.next(null);
            }
            return;
        }

        // === CHỈ ÁP DỤNG CHO menuMode = 'static' (mặc định của Sakai) ===
        if (this.isDesktop()) {
            // DESKTOP: Chỉ toggle compact mode (ẩn text, giữ icon)
            this.sidebarCompact.update(value => !value);

            // Reset trạng thái cũ để tránh xung đột
            this.layoutState.update(prev => ({
                ...prev,
                staticMenuDesktopInactive: false,
                staticMenuMobileActive: false,
                overlayMenuActive: false
            }));
        } else {
            // MOBILE/TABLET: Hành vi cũ → ẩn/hiện hoàn toàn
            this.layoutState.update((prev) => ({
                ...prev,
                staticMenuMobileActive: !this.layoutState().staticMenuMobileActive
            }));

            if (this.layoutState().staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }
```
- In app.layout.ts, modify containerClass function:

```bash
containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive,

            'layout-sidebar-compact': this.layoutService.isSidebarCompact()
        };
    }
```bash

- add this fllowing css line in utils.scss:

```bash
/* ==========================================================================
   1. GLOBAL Z-INDEX FIX (QUAN TRỌNG NHẤT)
   Đảm bảo Topbar (chứa nút Toggle) luôn nằm trên cùng
   ========================================================================== */
.layout-topbar {
    z-index: 11000 !important; /* Cao hơn Sidebar hover (10000) */
    position: fixed;
}


/* Chrome, Edge, Safari */
.layout-sidebar::-webkit-scrollbar,
.layout-wrapper::-webkit-scrollbar,
.layout-static::-webkit-scrollbar,
.layout-main-container::-webkit-scrollbar,
.layout-main::-webkit-scrollbar {
    width: 4px; /* Tăng nhẹ lên 4px để dễ hover hơn 2px */
}

.layout-sidebar::-webkit-scrollbar-track,
.layout-wrapper::-webkit-scrollbar-track,
.layout-static::-webkit-scrollbar-track,
.layout-main-container::-webkit-scrollbar-track,
.layout-main::-webkit-scrollbar-track {
    background: transparent;
}

.layout-sidebar::-webkit-scrollbar-thumb,
.layout-wrapper::-webkit-scrollbar-thumb,
.layout-static::-webkit-scrollbar-thumb,
.layout-main-container::-webkit-scrollbar-thumb,
.layout-main::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
}

/* Khi hover vào container thì hiện scrollbar mờ */
.layout-sidebar:hover::-webkit-scrollbar-thumb,
.layout-wrapper:hover::-webkit-scrollbar-thumb,
.layout-static:hover::-webkit-scrollbar-thumb,
.layout-main-container:hover::-webkit-scrollbar-thumb,
.layout-main:hover::-webkit-scrollbar-thumb {
    background-color: rgba(150, 150, 150, 0.4); /* Màu xám nhẹ dễ nhìn hơn màu trắng */
}

/* Khi hover trực tiếp vào thanh cuộn thì đậm lên */
.layout-sidebar:hover::-webkit-scrollbar-thumb:hover,
.layout-main:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgba(150, 150, 150, 0.8);
}

/* Firefox */
@-moz-document url-prefix() {
    .layout-sidebar, .layout-wrapper, .layout-static, .layout-main-container, .layout-main {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
    }
    .layout-sidebar:hover, .layout-wrapper:hover, .layout-static:hover, .layout-main-container:hover, .layout-main:hover {
        scrollbar-color: rgba(150, 150, 150, 0.6) transparent;
    }
}

/* ==========================================================================
   3. LOGIC COMPACT MODE CHO DESKTOP (> 991px)
   ========================================================================== */
@media screen and (min-width: 992px) {

    /* --- TRẠNG THÁI THU GỌN (BÌNH THƯỜNG) --- */

    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        width: 6.5rem !important;
        overflow: hidden; /* Ẩn thanh cuộn khi đang nhỏ */
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Animation mượt */
        z-index: 999;
    }

    /* Đẩy nội dung chính sang phải 6.5rem */
    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        margin-left: 6.5rem !important;
        transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Ẩn hết Text, Mũi tên, Title khi nhỏ */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .sidebar-logo span {
        display: none !important;
        opacity: 0;
    }

    /* Căn giữa Icon */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a {
        padding-left: 0;
        padding-right: 0;
        justify-content: center;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0 !important;
        font-size: 1.2rem;
    }

    /* --- TRẠNG THÁI HOVER (TỰ ĐỘNG MỞ RỘNG) --- */

    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover {
        width: 20rem !important; /* Độ rộng chuẩn */

        /* Z-Index 10000: Cao hơn nội dung nhưng THẤP HƠN Topbar (11000) */
        z-index: 10000 !important;

        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1); /* Bóng đổ đẹp */

        /* Bật scroll khi hover */
        overflow-y: auto !important;
        overflow-x: hidden;
        height: 100vh !important; /* Full chiều cao để scroll được */
    }

    /* Hiện lại Text và Mũi tên */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .sidebar-logo span {
        display: inline-block !important;
        opacity: 1;
        white-space: nowrap; /* Chống vỡ dòng */
        animation: fadeIn 0.3s forwards; /* Fade in nhẹ nhàng */
        transition-delay: 0.1s; /* Đợi sidebar mở ra chút rồi mới hiện chữ */
    }

    /* Hiện lại Title nhóm */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-root-text {
        display: block !important;
        opacity: 1;
        white-space: nowrap;
        padding-left: 1rem;
        animation: fadeIn 0.3s forwards;
    }

    /* Trả lại padding và căn lề cho thẻ A */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a {
        justify-content: flex-start;
        padding: 0.75rem 1rem;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0.5rem !important;
    }
}

/* Animation hỗ trợ hiện text mượt hơn */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ==========================================================================
   4. MOBILE FIX (CỨU HỘ CHO MÀN HÌNH < 992px)
   Ngăn chặn logic compact làm hỏng giao diện mobile
   ========================================================================== */

@media screen and (max-width: 991px) {

    /* 1. Trả lại độ rộng chuẩn cho sidebar nếu đang dính class compact */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        width: 20rem !important;
        background-color: var(--surface-overlay);

        /* QUAN TRỌNG: Bật lại thanh cuộn nhưng KHÔNG được set transform hay left ở đây
           để Sakai tự xử lý việc ẩn/hiện */
        overflow-y: auto !important;
    }

    /* 2. Chỉ khi menu Mobile được KÍCH HOẠT (Active) thì mới nâng Z-Index lên */
    /* Class .layout-mobile-active được Angular thêm vào khi bạn bấm nút */
    .layout-wrapper.layout-mobile-active .layout-sidebar {
        z-index: 1101 !important; /* Cao hơn Mask (thường là 1100) */
    }

    /* 3. Ép hiển thị lại toàn bộ Text/Icon/Arrow bị ẩn bởi chế độ Compact */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .sidebar-logo span {
        display: inline-block !important;
        opacity: 1 !important;
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text {
        display: block !important;
    }

    /* 4. Trả lại padding và căn lề cho các link trong menu */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a {
        justify-content: flex-start !important;
        padding: 0.75rem 1rem !important;
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0.5rem !important;
    }

    /* 5. Đảm bảo layout chính không bị margin trái như desktop */
    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        margin-left: 0 !important;
    }
}
```
### Add Loading bar in top layout:

import { ProgressBar } from "primeng/progressbar";


### . Remove message, inbox icon, add flag icon

- remove flag folder in assets/demo
- remove line @use './demo/demo.scss'; in src/assets/styles.scss
- add 1 file _flag.scss in src/assets/layout: 

```bash
@import 'https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css';
```

- Edit angular.json → add this lines to styles array:

```bash
"styles": [
    "src/assets/styles.scss",
    "src/assets/layout/_flag.scss"
]
```

- install flag-icons: 

```bash
npm install flag-icons or yarn add flag-icons
```

- remove message, inbox button and add some button in app.topbar.ts
```bash
<!-- Việt Nam -->
<button
    type="button"
    class="layout-topbar-action flex align-items-center gap-2"
    (click)="changeLang('vi')"
    [class.highlighted]="activeLang === 'vi'"
    pTooltip="Tiếng Việt"
    tooltipPosition="bottom">
    <span class="fi fi-vn fis"></span>
    <span class="hidden xl:inline">Vietnamese</span>
</button>

<!-- English -->
<button
    type="button"
    class="layout-topbar-action layout-topbar-action-highlight"
    pTooltip="Русский"
    tooltipPosition="bottom">
    <span class="fi fi-us fis"></span>
    <span class="hidden xl:inline">English</span>
</button>
```

- fix flag-icons not appearing → add css line follow in _topbar.scs:

```bash
.fi {
    display: inline-block !important;
    width: 1.33333333em;           // tỉ lệ chuẩn 3:4
    height: 1em;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    line-height: 1em !important;
    vertical-align: -0.1em !important;   // chỉnh nhỏ cho đẹp với text
    margin: 0 0.3em;                       // khoảng cách với chữ
}

// Dùng fis để cờ vuông
.fis {
    width: 1.2em !important;
    height: 1.2em !important;
    vertical-align: -0.2em !important;
    border-radius: 4px;          
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
```

### Config Transloco: load file json, auto save/read from localStorage

- Install Transloco: 

yarn add @jsverse/transloco

- Create i18n folder in src/assets, have some json file 

    ```bash
    - en.json:

    {
        "app": {
            "name": "Sakai",
            "welcome": "Welcome to Sakai"
        },
        "menu": {
            "home": "Home",
            "dashboard": "Dashboard",
            "uikit": "UI Components",
            "formLayout": "Form Layout",
            "input": "Input",
            "button": "Button",
            "table": "Table",
            "list": "List",
            "tree": "Tree",
            "panel": "Panel",
            "overlay": "Overlay",
            "media": "Media",
            "menu": "Menu",
            "message": "Message",
            "file": "File",
            "chart": "Chart",
            "timeline": "Timeline",
            "misc": "Misc",
            "pages": "Pages",
            "landing": "Landing",
            "auth": "Auth",
            "login": "Login",
            "error": "Error",
            "accessDenied": "Access Denied",
            "crud": "Crud",
            "notFound": "Not Found",
            "empty": "Empty",
            "hierarchy": "Hierarchy",
            "getStarted": "Get Started",
            "documentation": "Documentation",
            "viewSource": "View Source"
        },
        "topbar": {
            "profile": "Profile",
            "settings": "Settings",
            "search": "Search..."
        }
    }
    ```
    
    - vi.json:
    ```bash
    {
        "app": {
            "name": "Sakai",
            "welcome": "Chào mừng đến với Sakai"
        },
        "menu": {
            "home": "Trang chủ",
            "dashboard": "Bảng điều khiển",
            "uikit": "Giao diện UI",
            "formLayout": "Bố cục Form",
            "input": "Nhập liệu",
            "button": "Nút bấm",
            "table": "Bảng dữ liệu",
            "list": "Danh sách",
            "tree": "Cây thư mục",
            "panel": "Bảng điều khiển",
            "overlay": "Lớp phủ",
            "media": "Đa phương tiện",
            "menu": "Thanh menu",
            "message": "Tin nhắn",
            "file": "Tệp tin",
            "chart": "Biểu đồ",
            "timeline": "Dòng thời gian",
            "misc": "Khác",
            "pages": "Trang mẫu",
            "landing": "Trang giới thiệu",
            "auth": "Xác thực",
            "login": "Đăng nhập",
            "error": "Lỗi",
            "accessDenied": "Từ chối truy cập",
            "crud": "CRUD",
            "notFound": "Không tìm thấy",
            "empty": "Trang trống",
            "hierarchy": "Phân cấp",
            "getStarted": "Bắt đầu",
            "documentation": "Tài liệu",
            "viewSource": "Xem mã nguồn"
        },
        "topbar": {
            "profile": "Hồ sơ",
            "settings": "Cài đặt",
            "search": "Tìm kiếm..."
        }
    }
    ```bash

- Create file transloco-loader.ts in src/app/layout/component



