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

### 1. Add shadow for topbar, modifty _topbar.scss 

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
    
### 2. fix top, left sidebar, fix scroll of sidebar and body: modify _menu.scss

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
    top: 4rem; // modified to align with topbar
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

### 3. fix padding layout main container: modify _main.scss

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
### 4. Remove message, inbox icon, add flag icon

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
    <span class="hidden xl:inline">Việt Nam</span>
</button>

<!-- Nga -->
<button
    type="button"
    class="layout-topbar-action flex align-items-center gap-2"
    (click)="changeLang('ru')"
    [class.highlighted]="activeLang === 'ru'"
    pTooltip="Русский"
    tooltipPosition="bottom">
    <span class="fi fi-ru fis"></span>
    <span class="hidden xl:inline">Русский</span>
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

### 5. Super smooth 360° rotation effect when clicking on the menu button (hamburger) of Sakai template

- in app.topbar.ts, modify follow:

```bash
export class AppTopbarComponent {
    isSpinning = false;

    constructor(public layoutService: LayoutService) {}

    // Gọi hàm này thay vì gọi trực tiếp onMenuToggle() nếu bạn muốn hiệu ứng mượt hơn
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



