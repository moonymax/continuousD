import { exec } from "child_process";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const repoUrl = "https://github.com/your-username/your-repo.git"; // Replace with your repo URL
const repoName = path.basename(repoUrl, ".git");

function runGitCommand(command: string, cwd: string = ""): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        env: {
          ...process.env,
          GIT_ASKPASS: "echo",
          GIT_USERNAME: "x-access-token",
          GIT_PASSWORD: token!,
        },
        cwd: cwd ? path.resolve(cwd) : undefined,
      },
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

// Clone the repository
(async () => {
  const cloneCommand = `git clone https://${token}:x-oauth-basic@github.com/your-username/your-repo.git`;

  try {
    const cloneResult = await runGitCommand(cloneCommand);
    console.log("Repository cloned successfully:", cloneResult);

    // Run git pull continuously
    setInterval(async () => {
      try {
        const pullResult = await runGitCommand("git pull", repoName);
        console.log("Git pull result:", pullResult);
      } catch (pullError) {
        console.error("Git pull error:", pullError);
      }
    }, 60000); // Pull every 60 seconds
  } catch (cloneError) {
    console.error("Error cloning repository:", cloneError);
  }
})();
