"use server";

import { signIn, signOut } from "@/src/auth";

export const loginWithGithub = async () => await signIn("github", {redirectTo: "/"});

export const loginWithGoogle = async () => await signIn("google", {redirectTo: "/"});

export const logout = async () => await signOut({redirectTo: "/"});
