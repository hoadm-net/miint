import Image from "next/image";
import Link from "next/link";

const TOOLS_URL = process.env.NEXT_PUBLIC_TOOLS_URL || (process.env.NODE_ENV === "production" ? "https://tools.miint.dev" : "http://localhost:3002");

export default function DocsHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Miint Logo" width={40} height={40} className="rounded-lg" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Miint Docs</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <a href={TOOLS_URL} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Tools</a>
          <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Docs</Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Miint <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Hướng dẫn chi tiết giúp bạn khai thác tối đa các công cụ trong Miint Toolbox.
          </p>
        </div>

        {/* Docs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/password-generator" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🔑</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Password Generator</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">Tạo mật khẩu mạnh</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Tìm hiểu cách tuỳ chỉnh độ dài, nhóm ký tự và sao chép mật khẩu chỉ với một cú nhấp.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
