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
    user-select: none;
    //top: 6rem; // original
    top: 3.5rem !important; // modified to align with topbar
    //left: 2rem; // original
     left: 0; // modified to add gap from left edge
    transition:
        transform var(--layout-section-transition-duration),
    left var(--layout-section-transition-duration);
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

### In Utils.scss, add following css selector to modify scroll of slidebar and layout-main-container:

```css
/* 1. Cấu hình cơ bản cho Container */
.layout-main-container,
.layout-sidebar {
    /* Firefox: Chế độ mỏng nhất và tàng hình */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent; /* Mặc định ẩn trên FF */

    /* Cuộn mượt nội dung */
    scroll-behavior: smooth;
}

/* 2. Webkit (Chrome, Edge, Safari) */

/* Thiết lập kích thước cố định - KHÔNG ĐỔI width khi hover để tránh layout shift (giật) */
.layout-main-container::-webkit-scrollbar,
.layout-sidebar::-webkit-scrollbar {
    width: 3px !important;    /* 3px là cân bằng nhất: đủ mỏng nhưng vẫn kéo được */
    height: 3px !important;   /* Cho thanh ngang */
    background-color: transparent; /* Track luôn trong suốt */
}

/* Track (nền) tuyệt đối trong suốt */
.layout-main-container::-webkit-scrollbar-track,
.layout-sidebar::-webkit-scrollbar-track {
    background: transparent;
}

/* --- TRẠNG THÁI 1: MẶC ĐỊNH (Gần như vô hình) --- */
/* Sử dụng rgba thay vì opacity để kiểm soát tốt hơn */
.layout-main-container::-webkit-scrollbar-thumb,
.layout-sidebar::-webkit-scrollbar-thumb {
    /* Màu xám trung tính, độ trong suốt cực thấp (0.05) */
    background-color: rgba(160, 160, 160, 0.05);
    border-radius: 10px;

    /* QUAN TRỌNG: Bỏ transition đi vì Webkit không hỗ trợ, để tránh browser tính toán sai gây lag */
}

/* --- TRẠNG THÁI 2: HOVER VÀO CONTAINER (Hiện mờ mờ) --- */
/* Chỉ tăng độ đậm lên rất nhẹ (từ 0.05 lên 0.15) -> Mắt sẽ thấy nó "hiện" ra rất êm */
.layout-main-container:hover::-webkit-scrollbar-thumb,
.layout-sidebar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(160, 160, 160, 0.15);
}

/* --- TRẠNG THÁI 3: HOVER VÀO THANH CUỘN (Muốn kéo) --- */
/* Tăng thêm chút xíu nữa để người dùng biết đã trúng đích (từ 0.15 lên 0.25) */
/* Tuyệt đối không để quá đậm (ví dụ 0.8) để tránh hiệu ứng "nhảy màu" */
.layout-main-container::-webkit-scrollbar-thumb:hover,
.layout-sidebar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(160, 160, 160, 0.35) !important;
}
```


