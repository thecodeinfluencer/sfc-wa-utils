import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverUserFromSession } from "../index";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { id, username }: any = credentials;
        return { id, username };
      },
      credentials: {},
    }),
  ],
};

(async () => {
  const { username } = await serverUserFromSession(authOptions);
  console.log(username);
})();

//  npx ts-node __tests__/serverUserFromSession.test.ts
