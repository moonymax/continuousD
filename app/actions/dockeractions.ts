import { command } from "./command";
import { isValidReponame, isValidUsername } from "./validation";
import { v4 as uuid } from "uuid";

export async function dockerBuild(username: string, reponame: string) {
  if (!isValidUsername(username)) {
    throw new Error(
      `Invalid username: ${username} is too long or contains illegal characters`
    );
  }
  if (!isValidReponame(reponame)) {
    throw new Error(
      `Invalid repo name: ${reponame} is too long or contains illegal characters`
    );
  }

  const buildCommand = `docker build -t ${username}/${reponame} .`;
  const env = {
    ...process.env,
  };

  try {
    const buildResult = await command(buildCommand, env, process.cwd());
    console.log("Image built successfully:", buildResult);
  } catch (buildError) {
    console.error("Error building image:", buildError);
  }
}
