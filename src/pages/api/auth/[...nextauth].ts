import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../lib/prisma'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
  session: {
    jwt: true
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    }
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
}
