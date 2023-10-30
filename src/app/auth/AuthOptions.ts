import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";
import { NextAuthOptions } from "next-auth";


export const AuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
        
      ],
      callbacks: {
        async jwt({token, user, }) {
          if (user) {
            return {
              ...token,
              id: user.id,
            }
          }
          return token
      },
      async session({session, token, user}) {
        const newSession = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
        }
      }
        return newSession
        }
    },

      session: {
        strategy: "jwt",
      },     
}

