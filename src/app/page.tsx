import { auth } from "@/src/auth";
import { LoginButton } from "@/src/components/login";
import Link from "next/link";
import { LogoutButton } from "@/src/components/logout";

export default async function Home() {
  const session = await auth();

  console.log(session);

  if (session?.user)
    return (
      <div>
        <Link href="/user-info"> User Info</Link>
        <LogoutButton />
      </div>
    );

  return (
    <div>
      <p>You are no signed in</p>
      <LoginButton />
    </div>
  );
}
