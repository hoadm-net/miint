// apps/pm2.config.cjs
module.exports = {
  apps: [
    {
      name: 'miint-web',
      cwd: './web',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3030
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'miint-docs',
      cwd: './docs',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3020
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'miint-launcher',
      cwd: './launcher',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3010
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'miint-shortener',
      cwd: './shortener',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3040
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ]
};
