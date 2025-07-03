import Link from "next/link";

export const metadata = {
  title: "Password Generator | Miint Docs",
  description: "Hướng dẫn sử dụng công cụ Password Generator trong Miint Launcher",
};

export default function PasswordGeneratorDocs() {
  return (
    <article className="prose mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Password Generator</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Trình tạo mật khẩu ngẫu nhiên – thuộc bộ công cụ <Link href="/">Miint Toolbox</Link>.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Tính năng chính</h2>
        <ul className="list-disc pl-6">
          <li>Tuỳ chỉnh độ dài mật khẩu từ <strong>8–64 ký tự</strong> (slider).</li>
          <li>Lựa chọn nhóm ký tự: chữ hoa, chữ thường, chữ số, ký tự đặc biệt.</li>
          <li>Đảm bảo <em>mỗi nhóm được chọn</em> xuất hiện tối thiểu 1 lần.</li>
          <li>Mật khẩu sinh ra tự động sao chép vào clipboard.</li>
          <li>Nút <em>Copy</em> hiển thị trạng thái <em>Copied!</em>.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Cách sử dụng</h2>
        <ol className="list-decimal pl-6">
          <li>Truy cập <code>/password-gen</code> trong ứng dụng Launcher.</li>
          <li>Kéo thanh <em>Password length</em> để chọn độ dài.</li>
          <li>Tick/Bỏ tick các tuỳ chọn ký tự mong muốn.</li>
          <li>Mật khẩu sẽ được sinh và copy vào clipboard; nhấn <em>Copy</em> nếu muốn sao chép thủ công.</li>
        </ol>
        <blockquote className="mt-4 border-l-4 border-yellow-400 pl-4 italic text-sm text-gray-600 dark:text-gray-300">
          Thay đổi tuỳ chọn sẽ tự động sinh mật khẩu mới – bạn không cần bấm nút.
        </blockquote>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Thuật toán nhanh</h2>
        <p>
          Công cụ kết hợp ngẫu nhiên các ký tự dựa trên các nhóm được bật, sau đó xáo trộn để tránh
          vị trí dự đoán. Logic được triển khai hoàn toàn <strong>client-side</strong> bằng React
          Hooks, đảm bảo dữ liệu không rời khỏi trình duyệt.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Đóng góp</h2>
        <p>
          Phát hiện bug hoặc muốn cải tiến? Hãy mở issue hoặc PR trên repo GitHub. Mọi ý kiến đều được
          trân trọng! 🧡
        </p>
      </section>
    </article>
  );
} 