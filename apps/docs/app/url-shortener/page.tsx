import Link from "next/link";

export const metadata = {
  title: "URL Shortener | Miint Docs",
  description: "Hướng dẫn sử dụng công cụ URL Shortener trong Miint Launcher",
};

export default function UrlShortenerDocs() {
  return (
    <article className="prose mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">URL Shortener</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Công cụ rút gọn liên kết mạnh mẽ – thuộc bộ công cụ <Link href="/">Miint Toolbox</Link>.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Tính năng chính</h2>
        <ul className="list-disc pl-6">
          <li>Rút gọn bất kỳ URL nào chỉ trong một cú nhấp.</li>
          <li>Hỗ trợ <strong>slug tuỳ chỉnh</strong> (bạn tự đặt đường dẫn ngắn).</li>
          <li>Thiết lập thời gian hết hạn (TTL) hoặc chọn ngày/giờ chính xác.</li>
          <li>Bảo vệ liên kết bằng <em>mật khẩu</em> (tuỳ chọn).</li>
          <li>Xem trước tiêu đề trang và domain đích trước khi chuyển hướng.</li>
          <li>Lịch sử 20 liên kết gần nhất lưu trong Local Storage.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">Cách sử dụng</h2>
        <ol className="list-decimal pl-6">
          <li>Truy cập <code>/url-shortener</code> trong ứng dụng Launcher.</li>
          <li>Nhập URL gốc vào ô <em>https://example.com</em>.</li>
          <li>(Tuỳ chọn) Nhập slug tuỳ chỉnh, chọn thời gian hết hạn hoặc đặt mật khẩu.</li>
          <li>Nhấn <em>Shorten</em> để tạo đường dẫn ngắn. Kết quả sẽ hiển thị và tự động copy vào clipboard.</li>
        </ol>
        <blockquote className="mt-4 border-l-4 border-yellow-400 pl-4 italic text-sm text-gray-600 dark:text-gray-300">
          Nếu liên kết được bảo vệ, biểu tượng 🔒 sẽ xuất hiện bên cạnh link trong lịch sử.
        </blockquote>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">API Endpoint</h2>
        <p>
          Công cụ này giao tiếp với dịch vụ URL Shortener thông qua REST API.
        </p>
        <pre>
          {`POST /api/shorten
{
  "url": "https://example.com",
  "custom": "my-link",         // optional
  "expiresAt": "2025-01-01T00:00:00Z", // optional
  "password": "secret"          // optional
}`}
        </pre>
        <p>Phản hồi thành công:</p>
        <pre>
          {`{
  "slug": "my-link",
  "short": "https://go.miint.dev/my-link"
}`}
        </pre>
        <p>
          Để truy cập, người dùng chỉ cần mở <code>/&lt;slug&gt;</code>. Nếu liên kết có mật khẩu, thêm
          query <code>?pwd=your_password</code>. Trước khi chuyển hướng, màn hình preview sẽ yêu cầu
          xác nhận <em>Continue</em> và hiển thị tiêu đề trang.
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