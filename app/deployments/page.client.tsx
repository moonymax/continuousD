"use client";
import { ReactNode } from "react";
import { gitclone, gitpull } from "../actions/dbactions";
//import { deploy } from "../actions/dockeractions";
export default function Home({ children }: { children: ReactNode }) {
  return (
    <div className="p-12 flex flex-col gap-6">
      <button
        className="bg-blue-500 rounded-lg p-3 text-white hover:bg-blue-400 active:bg-white active:text-black"
        onClick={() => gitclone()}
      >
        Git Clone
      </button>
      <button
        className="bg-blue-500 rounded-lg p-3 text-white hover:bg-blue-400 active:bg-white active:text-black"
        onClick={() => gitpull()}
      >
        Git Pull
      </button>
      {children}
      <button
        className="bg-blue-500 rounded-lg p-3 text-white hover:bg-blue-400 active:bg-white active:text-black"
        //onClick={() => deploy()}
      >
        Deploy
      </button>
    </div>
  );
}
