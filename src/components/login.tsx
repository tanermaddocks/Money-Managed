"use client"

import { login } from "@/src/lib/actions/auth";

export const LoginButton = () => {
  return (
    <div>
      <p>You are not signed in</p>
      <button onClick={() => login()}>Sign in with Github</button>
    </div>
  );
};
