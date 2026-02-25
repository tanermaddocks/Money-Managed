"use client";

import { logout } from "@/src/lib/actions/auth";

export const LogoutButton = () => {
  return (
      <button onClick={() => logout()}>Signout</button>
  );
};
