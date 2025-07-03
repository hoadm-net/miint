# Miint – Website (Landing)

> Một phần trong chuỗi **ứng dụng đơn giản, hiệu quả** từ Miint.dev – chúng tôi chia sẻ để mọi người triển khai landing nhanh chóng.

Đây là trang landing chính của Miint, được phát triển bằng **Next.js 14** (App Router).
Hiện tại repo chỉ gồm trang `pages.tsx` mẫu; nội dung marketing sẽ được bổ sung sau.

---

## 1. Tech stack

* Next.js 14.x
* React 18.x (stable)
* TypeScript 5
* TailwindCSS 4 (sẽ được thiết lập trong các sprint tới)

> App này chưa bật React 19 beta để đảm bảo ổn định production.

---

## 2. Chạy cục bộ

```bash
# Từ thư mục gốc monorepo
pnpm --filter web dev
```

Ứng dụng chạy trên `http://localhost:3000` hoặc cổng kế tiếp nếu bị trùng.

### Build production

```bash
pnpm --filter web build && pnpm --filter web start
```

---

## 3. Cấu trúc tối thiểu hiện tại

```txt
apps/web/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
└─ public/      # Tài sản tĩnh (icons, svg, v.v.)
```

Khi bổ sung tính năng mới, hãy tuân thủ chuẩn folder mặc định của App Router: `app/(marketing)/...` hoặc `app/blog/...` tùy use-case.

---

## 4. Triển khai (gợi ý)

Trang landing thường được deploy lên **Vercel**.

1. Tạo project mới, trỏ tới repo.
2. Chọn root là `apps/web`.
3. Build command: `pnpm --filter web --workspace-root run build`.
4. Output: `apps/web/.next`.
