import Link from "next/link";

const internalApps = [
  {
    name: "Password Generator",
    href: "/password-gen",
    emoji: "🔑",
  },
  // You can easily add more internal tools here
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 gap-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Toolbox</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {internalApps.map((app) => (
            <Link
              key={app.href}
              href={app.href}
              className="flex flex-col items-center gap-2 group hover:scale-105 transition-transform bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <span className="text-5xl">{app.emoji}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:underline">
                {app.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
