import { NextAuthOptions, Session, getServerSession } from "next-auth";

export default async function serverUserFromSession(
  authOptions: NextAuthOptions
): Promise<Session["user"]> {
  return (await getServerSession(authOptions))?.user;
}
