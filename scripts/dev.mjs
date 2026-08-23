import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  {
    name: "api",
    command: npmCommand,
    args: ["--prefix", "server", "run", "dev"],
  },
  {
    name: "web",
    command: npmCommand,
    args: ["--prefix", "client", "run", "dev"],
  },
];

for (const item of processes) {
  const child = spawn(item.command, item.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`${item.name} stopped with signal ${signal}`);
      return;
    }

    if (code && code !== 0) {
      console.error(`${item.name} exited with code ${code}`);
      process.exitCode = code;
    }
  });
}
