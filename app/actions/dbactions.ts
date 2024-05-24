"use server";
import { exec } from "child_process";
import { revalidatePath } from "next/cache";
import { isValidReponame, isValidUsername } from "./validation";
import { command } from "./command";

const USERNAME = "moonymax";
const REPONAME = "helloworld";

const token = process.env.GITHUB_TOKEN;

export async function gitclone() {
  return await _gitclone(USERNAME, REPONAME, token!);
}

async function _gitclone(username: string, reponame: string, token: string) {
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
  const env = {
    ...process.env,
    GIT_ASKPASS: "echo",
    GIT_USERNAME: "x-access-token",
    GIT_PASSWORD: token!,
  };

  const cloneCommand = `git clone https://${token}:x-oauth-basic@github.com/${username}/${reponame}.git`;
  try {
    await command(`mkdir ${username}`, env, `${process.cwd()}/repos`);
  } catch (error) {
    console.error(error);
  }
  const reposDir = `${process.cwd()}/repos/${username}`;

  try {
    const cloneResult = await command(cloneCommand, env, reposDir);
    console.log("Repository cloned successfully:", cloneResult);
  } catch (cloneError) {
    console.error("Error cloning repository:", cloneError);
  }
}

export async function gitpull() {
  return await _gitpull(USERNAME, REPONAME, token!);
}

async function _gitpull(username: string, reponame: string, token: string) {
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
  const env = {
    ...process.env,
    GIT_ASKPASS: "echo",
    GIT_USERNAME: "x-access-token",
    GIT_PASSWORD: token!,
  };

  const reposDir = `${process.cwd()}/repos/${username}/${reponame}`;

  const pullCommand = `git pull`;
  try {
    const pullResult = await command(pullCommand, env, reposDir);
    console.log("Repository pulled successfully:", pullResult);
  } catch (pullError) {
    console.error("Error pulling repository:", pullError);
  }
  revalidatePath("/");
}

export async function getLatestCommitHash(): Promise<string> {
  return await _getLatestCommitHash(USERNAME, REPONAME, token!);
}

async function _getLatestCommitHash(
  username: string,
  reponame: string,
  token: string
): Promise<string> {
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

  const env = {
    ...process.env,
    GIT_ASKPASS: "echo",
    GIT_USERNAME: "x-access-token",
    GIT_PASSWORD: token,
  };

  const reposDir = `${process.cwd()}/repos/${username}/${reponame}`;
  const branch = "main"; // Change this to "master" if your repo uses master as the default branch
  const revParseCommand = `git rev-parse HEAD`;

  try {
    const commitHash = await command(revParseCommand, env, reposDir);
    console.log("Latest commit hash:", commitHash);
    return commitHash.trim(); // Ensure to trim any extra whitespace or newline characters
  } catch (error) {
    console.error("Error getting latest commit hash:", error);
    return "";
    //throw error;
  }
}
