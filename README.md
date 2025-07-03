# Miint Toolbox — Monorepo

> **Miint.dev chia sẻ những ứng dụng _nhỏ gọn nhưng hữu ích_ giúp tối ưu công việc hằng ngày.**
>
> Kho mã này tập hợp các app Next.js đơn giản để phục vụ công việc cá nhân.

> **Mục tiêu**: Tập trung các ứng dụng hữu ích vào _một_ kho mã, giúp chia sẻ code, tái sử dụng cấu hình và tối ưu CI/CD.

---

## 1. Công nghệ chính

| Thành phần | Phiên bản | Ghi chú |
|------------|-----------|---------|
| Node.js    | ≥ 18      | Phát triển với `v18.x` – không cam kết hoạt động trên bản thấp hơn |
| pnpm       | 9.x       | Quản lý gói & workspace |
| Turborepo  | 2.x       | Orchestrate tasks, remote-cache |
| Next.js    | 15 (App Router) | Tất cả ứng dụng trong thư mục `apps/*` đều dùng Next.js |
| React      | 19 beta   | Theo yêu cầu của Next 15 |
| TailwindCSS| 4.x       | Thêm PostCSS plugin `@tailwindcss/postcss` |
| TypeScript | 5.x       | Kiểm tra kiểu tĩnh |
| ESLint     | 9.x       | Sử dụng `eslint-config-next` kèm Prettier 3 |
| Prettier   | 3.x       | Format mã nguồn |

> Các package chung (eslint-config, ts-config, UI library…) _tạm thời đã xoá_ để tái kiến trúc; sẽ được bổ sung lại ở thư mục `packages/` khi cần.

---

## 2. Cấu trúc thư mục

```txt
miint_app/
├─ apps/          # Các ứng dụng Next.js
│  ├─ launcher/   # Nội bộ – Toolbox (mật khẩu, v.v.)
│  ├─ web/        # Landing/marketing site (đang phát triển)
│  └─ docs/       # Trang tài liệu (đang phát triển)
├─ packages/      # Thư viện dùng chung (đang trống)
├─ turbo.json     # Cấu hình Turborepo
├─ pnpm-workspace.yaml
└─ ...            # README, licence, CI, v.v.
```

### apps/*
Mỗi app là một workspace con, có `package.json` riêng nhưng phụ thuộc **symbolic** vào root thông qua pnpm.

### packages/* (sẽ có)
Nơi đặt UI kit, hooks, cấu hình ESLint/TS chung.

---

## 3. Thiết lập môi trường

```bash
# Clone repo
$ git clone https://github.com/hoadm-net/miint.git
$ cd miint

# Cài dependencies một lần cho toàn bộ monorepo
$ pnpm install
```

### Phát triển cục bộ

Chạy tất cả app song song, có hotswap:

```bash
pnpm dev        # hoặc: turbo run dev
```

Chạy 1 app cụ thể (ví dụ launcher):

```bash
pnpm --filter launcher dev
```

### Build production

```bash
# Build toàn bộ
pnpm build      # turbo run build

# Hoặc build riêng từng app
pnpm --filter web build
```

Artifact của Next.js nằm trong `apps/*/.next`.

---

## 4. Quy trình phát triển

1. Tạo nhánh mới từ `main`, đặt tên theo `feat/<scope>` hoặc `fix/<scope>`.
2. Code & commit theo chuẩn Conventional Commits.
3. Chạy `pnpm lint && pnpm check-types` trước khi push.
4. Mở Pull Request, ghi rõ mục tiêu & ảnh chụp kết quả.
5. Được review, squash & merge.

> Turborepo có **Remote Cache** miễn phí. Đăng nhập `turbo login` và `turbo link` để rút ngắn thời gian build/test.

---

## 5. Liên hệ / hỗ trợ

Cần trợ giúp? Hãy ping nhóm `#dev-internal` trên Slack hoặc tạo issue mới.
