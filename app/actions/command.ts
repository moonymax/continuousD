import { exec } from "child_process";

export function command(
  command: string,
  env?: {
    [key: string]: string;
  },
  cwd?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      { env: { ...process.env, ...env }, cwd },
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        resolve(stdout);
      }
    );
  });
}
