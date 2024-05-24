import Home from "./page.client";
import { Hash } from "../components";
import { redirect } from "next/navigation";
function isAuthed() {
  return true;
}

export default async function Page() {
  if (!isAuthed()) {
    redirect("/login");
  }
  return (
    <Home>
      <Hash />
    </Home>
  );
}
