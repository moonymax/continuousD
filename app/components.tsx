import { getLatestCommitHash } from "./actions";

export function Hash() {
  return <>{getLatestCommitHash()}</>;
}
