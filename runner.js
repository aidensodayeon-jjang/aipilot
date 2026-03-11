const { spawn } = require('child_process');
const path = require('path');

const BACKEND_DIR = path.resolve(__dirname, 'edupilot-backend');
const FRONTEND_DIR = path.resolve(__dirname, 'edupilot-frontend');
const KIOSK_DIR = '/Users/aiden/Desktop/프로젝트/timetable/dlab-attendance';

function startProcess(name, cmd, cwd, color) {
    const proc = spawn(cmd, [], { cwd: cwd, shell: true });

    proc.stdout.on('data', (data) => {
        const lines = data.toString().split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (i === lines.length - 1 && lines[i] === '') continue;
            process.stdout.write(`\x1b[${color}m[${name}]\x1b[0m ${lines[i]}\n`);
        }
    });

    proc.stderr.on('data', (data) => {
        const lines = data.toString().split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (i === lines.length - 1 && lines[i] === '') continue;
            process.stderr.write(`\x1b[${color}m[${name}]\x1b[0m ${lines[i]}\n`);
        }
    });

    proc.on('close', (code, signal) => {
        const exitMsg = code !== null ? `code ${code}` : `signal ${signal}`;
        console.log(`\x1b[${color}m[${name}]\x1b[0m exited with ${exitMsg}`);
    });

    return proc;
}

console.log("\x1b[36mStarting servers via Node Orchestrator...\x1b[0m");

// Use absolute path to the known working arm64 node executable
const SYSTEM_NODE = '/usr/local/bin/node';

const backendProc = startProcess("DJANGO", "source .venv/bin/activate && python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local", BACKEND_DIR, "34"); // Blue
const frontendProc = startProcess("REACT", `${SYSTEM_NODE} ./node_modules/.bin/vite --port 3030 --host 0.0.0.0`, FRONTEND_DIR, "32"); // Green

const fs = require('fs');
let kioskProc = null;
if (fs.existsSync(KIOSK_DIR)) {
    kioskProc = startProcess("NEXTJS", `PORT=3015 ${SYSTEM_NODE} ./node_modules/.bin/next dev`, KIOSK_DIR, "35"); // Magenta
}

process.on('SIGINT', () => {
    console.log("\n\x1b[33mShutting down all servers...\x1b[0m");
    backendProc.kill('SIGINT');
    frontendProc.kill('SIGINT');
    if (kioskProc) kioskProc.kill('SIGINT');
    setTimeout(() => process.exit(0), 1000);
});
