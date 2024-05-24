import { getLatestCommitHash } from "./actions/dbactions";

export function Hash() {
  return <>{getLatestCommitHash()}</>;
}
