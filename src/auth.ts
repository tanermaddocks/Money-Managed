import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // @ts-expect-error: type error.
  providers: [GitHub],
});
