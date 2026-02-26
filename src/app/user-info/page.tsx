import { auth } from "@/src/auth";
import Image from "next/image";

export default async function UserInfo() {
  const session = await auth();

  console.log(session);

  return (
    <div>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt={session?.user?.name || "Avatar"}
          width={48}
          height={48}
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
