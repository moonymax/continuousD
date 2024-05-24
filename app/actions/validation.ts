export function isValidUsername(s: string) {
  const pattern = /^[a-zA-Z0-9-]{1,39}$/;
  return pattern.test(s);
}

export function isValidReponame(s: string) {
  const pattern = /^[a-zA-Z0-9-_]{1,64}$/;
  return pattern.test(s);
}
