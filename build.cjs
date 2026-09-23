const fs = require('node:fs');
const cp = require('node:child_process');

console.log('[Build] Starting universal build runner...');

if (fs.existsSync('react-app')) {
  console.log('[Build] Building from root directory...');
  cp.execSync('npm --prefix react-app run build', { stdio: 'inherit', shell: true });
  if (fs.existsSync('react-app/dist')) {
    console.log('[Build] Mirroring react-app/dist to ./dist...');
    fs.cpSync('react-app/dist', 'dist', { recursive: true });
  }
} else {
  console.log('[Build] Building inside react-app directory...');
  cp.execSync('npx vite build', { stdio: 'inherit', shell: true });
}

console.log('[Build] Build completed successfully.');
