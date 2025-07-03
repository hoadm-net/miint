# Miint – Launcher (Toolbox)

> Bộ sưu tập **ứng dụng nhỏ nhưng mạnh mẽ** do Miint.dev phát triển và mở nguồn, giúp tăng tốc các tác vụ hằng ngày của chúng tôi – và của bạn!

Ứng dụng Next.js (App Router) đóng vai trò **trang tổng hợp công cụ nội bộ** của Miint. Mỗi công cụ chạy client-side và được hiển thị dưới dạng "thẻ" trên trang chủ.

Hiện tại đã có:

| Đường dẫn | Mô tả |
|-----------|-------|
| `/` | Danh sách tools kèm biểu tượng |
| `/password-gen` | Trình tạo mật khẩu ngẫu nhiên, copy clipboard tự động |

---

## 1. Công nghệ sử dụng

* **Next.js 15.3** + Turbopack (dev)
* **React 19.1 (beta)**
* **TailwindCSS 4.x** (import qua `@tailwindcss/postcss`)
* **next-themes** – dark / light mode
* **TypeScript 5**

> Mọi thành phần UI tạm thời cục bộ; tương lai sẽ tách sang `packages/ui`.

---

## 2. Cấu trúc thư mục chính

```txt
apps/launcher/
├─ src/
│  ├─ app/           # App Router
│  │  ├─ layout.tsx  # Layout gốc + ThemeProvider
│  │  ├─ globals.css # Import Tailwind + CSS Variable theme
│  │  ├─ page.tsx    # Trang Toolbox
│  │  └─ password-gen/
│  │     └─ page.tsx # Tool tạo mật khẩu
│  └─ components/
│     ├─ ThemeProviderWrapper.tsx
│     └─ ThemeToggle.tsx
└─ postcss.config.mjs
```

---

## 3. Chạy cục bộ

```bash
# Từ thư mục gốc monorepo
pnpm --filter launcher dev    # Hoặc: turbo run dev --filter=launcher
```

Mặc định mở trên `http://localhost:3000`.

### Scripts khác

```bash
pnpm --filter launcher lint   # ESLint
pnpm --filter launcher build  # next build (production)
```

---

## 4. Đóng góp thêm "Tool"

1. Tạo thư mục `src/app/<tool-route>/`
2. Thêm `page.tsx` (client component nếu có hook).
3. Bổ sung vào mảng `internalApps` trong `src/app/page.tsx` (name, href, emoji).
4. Tạo PR -> review.

---

## 5. Ghi chú

* Tailwind đang sử dụng chế độ **Just-in-Time** (mặc định v4). Nếu cần custom theme => thêm file `tailwind.config.ts`.
* Logo mặc định nằm trong `public/` (`logo.png`, `logo-white.png`).
