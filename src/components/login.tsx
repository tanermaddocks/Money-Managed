"use client"

import { loginWithGithub, loginWithGoogle } from "@/src/lib/actions/auth";

export const LoginButton = () => {
  return (
    <div>
      <p>You are not signed in</p>
      <button onClick={() => loginWithGithub()}>Sign in with Github</button>
      <button onClick={() => loginWithGoogle()}>Sign in with Google</button>

    </div>
  );
};
