// apps/pm2.config.cjs
module.exports = {
  apps: [
    {
      name: "launcher",
      cwd: "apps/launcher",
      script: "pnpm",
      args: "start",
      env: { PORT: 3002, NODE_ENV: "production" },
    },
    {
      name: "docs",
      cwd: "apps/docs",
      script: "pnpm",
      args: "start",
      env: { PORT: 3001, NODE_ENV: "production" },
    },
    {
      name: "web",
      cwd: "apps/web",
      script: "pnpm",
      args: "start",
      env: { PORT: 3030, NODE_ENV: "production" },
    },
  ],
};
