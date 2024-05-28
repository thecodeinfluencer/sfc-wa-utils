import { NextAuthOptions, Session, getServerSession } from "next-auth";

export default async function serverUserFromSession(
  authOptions: NextAuthOptions
) {
  const session:
    | ({
        user: { username?: string; sub: string; userRegion: string };
      } & Session)
    | null = await getServerSession(authOptions);

  const username =
    session?.user?.sub ??
    session?.user?.username ??
    session?.user.email
      ?.slice(0, session?.user.email?.search("@"))
      ?.toLowerCase();

  return { ...session?.user, username };
}
