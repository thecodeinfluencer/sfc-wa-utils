import { NextAuthOptions, Session, getServerSession } from "next-auth";

type User = { username?: string; sub: string; userRegion: string };

export default async function serverUserFromSession(
  authOptions: NextAuthOptions
): Promise<User> {
  const session: ({ user: User } & Session) | null = await getServerSession(
    authOptions
  );

  const username =
    session?.user?.sub ??
    session?.user?.username ??
    session?.user.email
      ?.slice(0, session?.user.email?.search("@"))
      ?.toLowerCase();

  return { ...session?.user, username };
}
