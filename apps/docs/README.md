# Miint – Docs

> Tài liệu hoá cũng cần **đơn giản và hiệu quả** – Miint.dev open-source site này để bất kỳ ai cũng có thể tra cứu & đóng góp.

Trang **documentation** của Miint, được xây dựng bằng Next.js 14 (App Router). Mục tiêu: cung cấp tài liệu cài đặt dịch vụ, hướng dẫn API, FAQ…

Hiện tại project là khung trống lấy từ `create-next-app`, nội dung sẽ được viết dần.

---

## 1. Tech stack

* Next.js 14.x
* MDX (sẽ cài sau)
* React 18.x
* TypeScript 5
* TailwindCSS 4 (pending)

---

## 2. Local development

```bash
pnpm --filter docs dev
```

Trang chạy tại `http://localhost:3000`.

---

## 3. Đề xuất cấu trúc

```txt
apps/docs/
├─ app/
│  ├─ (docs)/           # Segment chứa nội dung thực tế
│  ├─ layout.tsx        # Khung hiển thị sidebar + content
│  ├─ page.tsx          # Redirect /docs => /docs/introduction
│  └─ globals.css
└─ ...
```

Cuối mỗi file MD(X) nên thêm `export const sidebar = ...` để sinh navigation tự động (sẽ implement).

---

## 4. Triển khai

Tương tự app web: Build command

```bash
pnpm --filter docs --workspace-root run build
```

Vercel output: `apps/docs/.next`.
