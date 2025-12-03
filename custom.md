### . In_topbar.scss modify .layout-topbar selector to add shadow effect 

```css
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

 ### . In _menu.scss, modify heigh, top, lef, padding of layout-sidebar selector to add shadow effect.

```css
.layout-sidebar {
    position: fixed;
    width: 20rem;
    //height: calc(100vh - 8rem); // original
    height: 100vh; // modified to fix height issue
    //z-index: 999; // original
    overflow-y: auto;
    overflow-x: hidden; /* Quan trọng để ẩn nội dung thừa khi co */
    user-select: none;
    //top: 6rem; // original
    top: 3.5rem !important; // modified to align with topbar
    //left: 2rem; // original
     left: 0; // modified to add gap from left edge
    //transition: transform var(--layout-section-transition-duration), left var(--layout-section-transition-duration);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Animation mượt */

    background-color: var(--surface-overlay);
    //border-radius: var(--content-border-radius); // original
    //padding: 0.5rem 1.5rem; // original
    padding: 0.5rem 0 60px 0.5rem; // modified to add bottom padding
    box-shadow: 0.5rem 8px 1rem #2c33491a; // add new - custom shadow
}

.layout-menu {
    margin: 0;
    padding: 1.2rem 0 0 0;
    list-style-type: none;
}
```

### In _main.scss, modify layout-main-container selector to change padding.

```css
.layout-main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
    //padding: 6rem 2rem 0 2rem; // original
    padding: 5.8rem 1.4rem 0 0;
    transition: margin-left var(--layout-section-transition-duration);
}
```

### In Utils.scss, add following css selector to modify scroll of sidebar and layout-main-container, and add feature compact menu:

```css
p-toast.p-toast-top-right,
.p-toast.p-toast-top-left,
.p-toast.p-toast-top-center {
    top: 100px;
    z-index: 3000 !important; /* Đảm bảo Toast luôn cao nhất */
}

html, body {
    overflow: hidden !important;
    height: 100vh;
    margin: 0;
}

/* ==========================================================================
   2. TOPBAR & SIDEBAR Z-INDEX FIX (CHUẨN PRIMENG)
   ========================================================================== */

/* TOPBAR: Cao hơn Sidebar Desktop (998) nhưng thấp hơn Dialog (1100) */
.layout-topbar {
    position: fixed;
    height: 5rem;
    z-index: 999 !important; /* <--- CHỈNH LẠI CHỖ NÀY: 999 là đủ */
    top: 0;
    left: 0;
    width: 100%;
    /* Đảm bảo Topbar có nền để che nội dung khi cuộn qua */
    background-color: var(--surface-card);
    //box-shadow: 0px 3px 5px rgba(0,0,0,0.02);
}

/* SIDEBAR: Nằm dưới Topbar */
.layout-sidebar {
    z-index: 998 !important; /* <--- Thấp hơn Topbar 1 đơn vị */
    top: 4.4rem !important;
    height: 100vh !important;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-main-container,
.layout-sidebar {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
}

/* Main Container padding để né Topbar */
.layout-main-container {
    padding-top: 7rem;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    /* Z-index thấp để scrollbar nằm dưới Topbar */
    position: relative;
    z-index: 1;
}

/* Hover hiện màu (Firefox) */
.layout-main-container:hover,
.layout-sidebar:hover {
    scrollbar-color: rgba(160, 160, 160, 0.4) transparent;
}

/* Webkit (Chrome/Edge) */
.layout-main-container::-webkit-scrollbar,
.layout-sidebar::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
}

.layout-main-container::-webkit-scrollbar-track,
.layout-sidebar::-webkit-scrollbar-track {
    background: transparent;
}

.layout-main-container::-webkit-scrollbar-thumb,
.layout-sidebar::-webkit-scrollbar-thumb {
    background-color: transparent; /* Tàng hình */
    border-radius: 10px;
}

/* Hover Container -> Hiện Thumb mờ */
.layout-main-container:hover::-webkit-scrollbar-thumb,
.layout-sidebar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(160, 160, 160, 0.2);
}

/* Hover Scrollbar -> Hiện Thumb đậm */
.layout-main-container::-webkit-scrollbar-thumb:hover,
.layout-sidebar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(160, 160, 160, 0.6);
}

/* ==========================================================================
   4. RESET SCROLLBAR CHO COMPONENT CON (GIỮ NGUYÊN)
   ========================================================================== */

.layout-main-container *,
.layout-sidebar * {
    scrollbar-width: auto !important;
    scrollbar-color: auto !important;
}

.layout-main-container *::-webkit-scrollbar,
.layout-sidebar *::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
    background-color: transparent;
}

.layout-main-container *::-webkit-scrollbar-track,
.layout-sidebar *::-webkit-scrollbar-track {
    background-color: #f8f9fa;
}

.layout-main-container *::-webkit-scrollbar-thumb,
.layout-sidebar *::-webkit-scrollbar-thumb {
    background-color: #bdc3c7;
    border-radius: 6px;
    border: 2px solid #f8f9fa;
}

.layout-main-container *::-webkit-scrollbar-thumb:hover,
.layout-sidebar *::-webkit-scrollbar-thumb:hover {
    background-color: #95a5a6;
}

/* ==========================================================================
   5. LOGIC LAYOUT COMPACT & MOBILE
   ========================================================================== */

/* DESKTOP COMPACT (>= 992px) */
@media screen and (min-width: 992px) {
    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        width: 60px !important;
        padding: 0;
        overflow: hidden;
        border-right: 1px solid var(--surface-border);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 998 !important; /* Vẫn giữ 998 */
        top: 4.4rem !important;
        height: calc(100vh - 5rem) !important;
    }

    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        margin-left: 60px !important;
        padding: 7rem 1.4rem 0 2rem !important;
    }

    /* Ẩn hiện Text Menu  */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .sidebar-logo span {
        display: none; /* Ẩn hoàn toàn để không chiếm chỗ */
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a {
        padding-left: 0; padding-right: 0; justify-content: center; height: 45px;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0 !important; font-size: 1.4rem;
    }

    /* HOVER OPEN SIDEBAR */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover {
        width: 20rem !important;
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
        overflow-y: auto !important;
        //z-index: 1001 !important; /* Khi hover mở rộng thì cho đè lên layout */
    }

    /* 2. TRẠNG THÁI HIỆN (Khi hover vào sidebar) */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .sidebar-logo span {
        /* Hiện lại */
        display: inline-block !important;

        /* Animation mờ dần */
        opacity: 0;
        animation: fadeIn 0.2s forwards;
        transition-delay: 0.1s;

        /* --- QUAN TRỌNG NHẤT: CHỐNG XUỐNG DÒNG --- */
        white-space: nowrap !important;

        /* Đảm bảo text không bị tính width sai */
        width: auto !important;
        pointer-events: auto;
    }

    /* Riêng Root Text (Tiêu đề nhóm) cần display block */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-root-text {
        display: block !important;
        white-space: nowrap !important; /* Chống xuống dòng cho tiêu đề */
        opacity: 0;
        padding-left: 1rem;
        margin-top: 1rem;
        animation: fadeIn 0.2s forwards;
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-root-text {
        display: block !important; opacity: 1; padding-left: 1rem; margin-top: 1rem; animation: fadeIn 0.2s forwards;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a {
        justify-content: flex-start; padding: 0.75rem 1rem; height: auto;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0.5rem !important;
    }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(-5px); }
    to { opacity: 1; transform: translateX(0); }
}

/* MOBILE (<= 991px) */
@media screen and (max-width: 991px) {
    .layout-sidebar {
        top: 0 !important;
        height: 100vh !important;
        /* Mobile Sidebar phải cao hơn Topbar (999) và Mask (1100) */
        z-index: 1101 !important;
        transform: translateX(-100%);
        left: 0 !important;
        width: 18rem !important;
        border-right: none; box-shadow: none;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .layout-wrapper.layout-mobile-active .layout-sidebar {
        transform: translateX(0) !important;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
    }

    /* Lớp phủ đen */
    .layout-mask {
        z-index: 1100 !important; /* Cao hơn Topbar (999) nhưng thấp hơn Sidebar (1101) */
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    }

    /* Reset Compact Logic */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        width: 18rem !important; background-color: var(--surface-overlay); overflow-y: auto !important;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .sidebar-logo span {
        display: inline-block !important; opacity: 1 !important; width: auto !important; pointer-events: auto !important;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a {
        justify-content: flex-start !important; padding: 0.75rem 1rem !important;
    }
    .layout-main-container,
    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        margin-left: 0 !important; padding-left: 1.4rem !important;
    }
}

```

### Add mooth 360° rotation effect when clicking on the menu button, and feature Compact menu

- In _topbar.scss , add flowwing css to spin Animation effect to toggle button menu:

```css
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

// Bonus: làm icon bars đẹp hơn khi hover
.layout-menu-button:hover .pi-bars {
    color: var(--primary-color) !important;
    transform: scale(1.1);
    transition: all 0.2s ease;
}
```

- In layout.service.ts ,change method onMenuToggle

```ts
sidebarCompact = signal<boolean>(false);

isSidebarCompact = computed(() => this.sidebarCompact());

onMenuToggle() {
        if (this.isOverlay()) {
            // Nếu dùng menuMode = overlay
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

- In app.topbar.ts, add onMenuClick() method and change behavior of toggle menu button: 

```ts
onMenuClick() {
        this.isSpinning = true;

        this.layoutService.onMenuToggle();

        // Tắt class spin sau 0.6s (thời gian animation)
        setTimeout(() => {
            this.isSpinning = false;
        }, 600);
    }
```

```html
<button
    class="layout-menu-button layout-topbar-action"
    (click)="onMenuClick()"
    [class.spin]="isSpinning">
    <i class="pi pi-bars"></i>
</button>
```

- In app.layout.ts, modify containerClass function:

```ts
get containerClass() {
    return {
        'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
        'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
        'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
        'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
        'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive,
        // giúp CSS nhận diện chế độ Compact
        'layout-sidebar-compact': this.layoutService.isSidebarCompact()
    };
}
```

- In _menu.scss , modify selector .layout-menu: 

```css
.layout-menu {
    margin: 0;
    padding: 1.2rem 0 0 0;
    list-style-type: none;

    .layout-root-menuitem {
        > .layout-menuitem-root-text {
            font-size: 0.857rem;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--text-color);
            margin: 0.75rem 0;
        }

        > a {
            display: none;
        }
    }

    a {
        user-select: none;

        &.active-menuitem {
            > .layout-submenu-toggler {
                transform: rotate(-180deg);
            }
        }
    }

    li.active-menuitem {
        > a {
            .layout-submenu-toggler {
                transform: rotate(-180deg);
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;

        a {
            display: flex;
            align-items: center;
            position: relative;
            outline: 0 none;
            color: var(--text-color);
            cursor: pointer;
            padding: 0.75rem 1rem;
            border-radius: var(--content-border-radius);
            // transition:
            //     background-color var(--element-transition-duration),
            //     box-shadow var(--element-transition-duration);

            /* Khóa cứng chiều cao và không cho text xuống dòng */
            white-space: nowrap; /* Cấm xuống dòng tuyệt đối */
            overflow: hidden;    /* Ẩn phần thừa */

            /* Thêm transition cho padding nếu có thay đổi padding khi co */
            transition:
                background-color var(--element-transition-duration),
                box-shadow var(--element-transition-duration),
                padding 0.3s;

            .layout-menuitem-icon {
                margin-right: 0.5rem;
            }

            .layout-submenu-toggler {
                font-size: 75%;
                margin-left: auto;
                transition: transform var(--element-transition-duration);
            }

            &.active-route {
                font-weight: 700;
                color: var(--primary-color);
            }

            &:hover {
                background-color: var(--surface-hover);
            }

            &:focus {
                @include focused-inset();
            }
        }

        ul {
            overflow: hidden;
            border-radius: var(--content-border-radius);

            li {
                a {
                    margin-left: 1rem;
                }

                li {
                    a {
                        margin-left: 2rem;
                    }

                    li {
                        a {
                            margin-left: 2.5rem;
                        }

                        li {
                            a {
                                margin-left: 3rem;
                            }

                            li {
                                a {
                                    margin-left: 3.5rem;
                                }

                                li {
                                    a {
                                        margin-left: 4rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

- In _utils.scss, add following css:

```css
@media screen and (min-width: 992px) {

    /* 1. CẤU HÌNH SIDEBAR KHI THU GỌN */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        width: 60px !important; /* Sidebar nhỏ 60px */
        padding: 0;
        overflow: hidden;
        border-right: 1px solid var(--surface-border);
        /* Giữ nguyên transition để lúc co vào mượt */
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        /* Đảm bảo sidebar nằm dưới Topbar */
        z-index: 998 !important;
        top: 5rem !important;
        height: calc(100vh - 5rem) !important;
    }

    /* Đẩy nội dung chính sang phải đúng 60px */
    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        /* Cách lề trái 60px (để né sidebar) */
        margin-left: 60px !important;

        /* Padding bên trong: Số cuối cùng '2rem' tạo khoảng trắng giữa nội dung và mép container */
        padding: 7rem 1.4rem 0 2rem !important;

        /* Transition lúc co vào */
        transition:
            margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Ẩn các thành phần Text/Arrow */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menuitem-root-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .sidebar-logo span {
        opacity: 0;
        pointer-events: none; /* Không cho click khi đã ẩn */
        width: 0; /* Thu nhỏ width về 0 để tránh chiếm chỗ */
        display: none; /* Vẫn cần display none để chắc chắn mất hẳn sau khi co xong */
    }

    /* Căn giữa Icon trong ô 60px */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a {
        padding-left: 0;
        padding-right: 0;
        justify-content: center;
        height: 45px; /* Chiều cao ô menu để icon cân đối */
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0 !important;
        font-size: 1.4rem; /* Icon to hơn chút cho đẹp */
    }

    /* --- SIDEBAR HOVER (MỞ RỘNG TẠM THỜI) --- */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover {
        width: 18rem !important; /* Mở rộng ra */
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
        overflow-y: auto !important;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Transition khi hover */
    }

    /* Hiện lại Text khi Hover */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-text,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-submenu-toggler,
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .sidebar-logo span {
        display: inline-block !important;
        opacity: 1;
        width: auto;
        pointer-events: auto;
        animation: fadeIn 0.2s forwards;
        transition-delay: 0.1s;
    }

    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menuitem-root-text {
        display: block !important; opacity: 1; padding-left: 1rem; margin-top: 1rem; animation: fadeIn 0.2s forwards;
    }

    /* Trả lại style thẻ a */
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a {
        justify-content: flex-start; padding: 0.75rem 1rem; height: auto;
    }
    .layout-wrapper.layout-sidebar-compact .layout-sidebar:hover .layout-menu ul li a .layout-menuitem-icon {
        margin-right: 0.5rem !important;
    }
}

/* Animation */
@keyframes fadeIn {
    from { opacity: 0; transform: translateX(-5px); }
    to { opacity: 1; transform: translateX(0); }
}

/* ============================================================
   3. MOBILE FIX (DƯỚI 992px)
   ============================================================ */

@media screen and (max-width: 991px) {

    /* 1. CẤU HÌNH SIDEBAR MOBILE (MẶC ĐỊNH) */
    .layout-sidebar {
        /* Vị trí: Đè lên Topbar và sát mép trên */
        top: 0 !important;           /* Quan trọng: Reset lại 5rem của desktop */
        height: 100vh !important;    /* Full chiều cao màn hình */
        z-index: 1101 !important;    /* Cao hơn Mask (1100) và Topbar (999) */

        /* Trạng thái ẩn: Trượt sang trái */
        transform: translateX(-100%);
        left: 0 !important;
        width: 18rem !important;     /* Độ rộng chuẩn mobile */

        /* Reset border/shadow của desktop compact */
        border-right: none;
        box-shadow: none;

        /* Transition mượt khi trượt ra/vào */
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* 2. KHI MENU ĐƯỢC KÍCH HOẠT (ACTIVE) */
    /* Angular Sakai sẽ thêm class .layout-mobile-active vào wrapper khi bấm nút */
    .layout-wrapper.layout-mobile-active .layout-sidebar {
        transform: translateX(0) !important; /* Trượt vào màn hình */
        box-shadow: 0 0 50px rgba(0,0,0,0.5); /* Tạo bóng đổ đè lên nội dung cho đẹp */
    }

    /* 3. LỚP MASK (MÀN ĐEN MỜ CHE NỘI DUNG) */
    .layout-mask {
        z-index: 1100 !important; /* Thấp hơn Sidebar (1101) nhưng cao hơn Topbar (999) */
        background-color: rgba(0, 0, 0, 0.4); /* Màu đen mờ */

        /* Đảm bảo phủ kín màn hình */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* 4. RESET CÁC LOGIC COMPACT CỦA DESKTOP (AN TOÀN) */
    /* Đề phòng trường hợp đang ở compact desktop rồi resize trình duyệt nhỏ lại */

    .layout-wrapper.layout-sidebar-compact .layout-sidebar {
        /* Trả lại thuộc tính mobile, không cho logic compact can thiệp */
        width: 18rem !important;
        background-color: var(--surface-overlay);
        overflow-y: auto !important;

        /* Ép hiển thị lại text/icon bị ẩn bởi compact */
        .layout-menuitem-text,
        .layout-submenu-toggler,
        .layout-menuitem-root-text,
        .sidebar-logo span {
            display: inline-block !important;
            opacity: 1 !important;
            width: auto !important;
            pointer-events: auto !important;
        }

        /* Trả lại padding link */
        .layout-menu ul li a {
            justify-content: flex-start !important;
            padding: 0.75rem 1rem !important;
        }
    }

    /* Reset Margin của nội dung chính (không bị thụt vào) */
    .layout-main-container,
    .layout-wrapper.layout-sidebar-compact .layout-main-container {
        margin-left: 0 !important;
        padding-left: 1.4rem !important; /* Padding chuẩn mobile */
    }
}


```

### Add Loading Bar and Skeleton

1. create loading service:

```ts
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
```

2. Create loading interceptor to automatically trigger Loading Service when calling API and register this interceptor in app.config.ts

```ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../service/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
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
```

3. Register the Interceptor in app.config.ts

```ts
 
import { LoadingInterceptor } from '@/layout/interceptor/loading.interceptor';
export const appConfig: ApplicationConfig = {
    providers: [
        // ...

        provideHttpClient(
            withInterceptors([LoadingInterceptor]), // Cấu hình Interceptor
            withFetch()                             // Sử dụng Fetch API chuẩn
        ),

        // ..
};

```

4. in app.layout.ts add a loading bar and style to it :

```ts
@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter],
    styles: [`
        /* CSS cho thanh Loading Bar mượt mà */
        .loading-bar {
            height: 3px;
            width: 100%;
            /* Gradient màu xanh hiện đại */
            background: linear-gradient(90deg, #3B82F6, #06B6D4);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99999; /* Luôn nổi trên cùng */

            /* Hiệu ứng mờ dần và co dãn */
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left center;
            transition: opacity 0.3s ease, transform 0.3s ease;

            /* Cho phép click xuyên qua khi đang fade-out */
            pointer-events: none;
        }
        /* Class kích hoạt hiển thị */
        .loading-bar.show {
            opacity: 1;
            transform: scaleX(1);
        }
    `],
    template: `
    <div class="loading-bar" [class.show]="loadingService.isVisible()"></div>
    <div class="layout-wrapper" [ngClass]="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div> `
})
```

```ts
    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        public loadingService: LoadingService
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        // ẩn Menu khi chuyển trang
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }
```
5. Local Skeleton & State Manager (Xử lý từng Form):

- create skeleton-state.ts in src/app/core/utils:

```ts
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
```


### . Remove message, inbox icon, add flag icon

- remove flag folder in assets/demo
- remove line @use './demo/demo.scss'; in src/assets/styles.scss
- add 1 file _flag.scss in src/assets/layout: 

```ts
@import 'https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css';
```

- Edit angular.json → add this lines to styles array:

```ts
"styles": [
    "src/assets/styles.scss",
    "src/assets/layout/_flag.scss"
]
```
- install flag-icons: 

```bash
npm install flag-icons 
// or 
yarn add flag-icons
```

- add flag button

```html
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



