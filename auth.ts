import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signIn } from '@/lib/auth'
 
export const { handlers, auth } = NextAuth({
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/authentication',
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          // signIn()
          return  await {
            id: '123456',
            token: '123456789xxxxABCDEFGH',
            role: 'admin',
            username: 'admin'
          }
        } catch (e: any) {
          throw new Error(e)
        }
      }
    })
  ],
  callbacks: {
    async jwt(params: any) {
      let { token, user } = params
      if (user) {
        token = {
          ...token,
          user: {
            id: user.id,
            role: user.role,
            token: user.token,
            username: user.username
          }
        }
      }
      return token
    },
    async session(params: any) {
      // console.log('params2', params)
        let { session, token } = params
        return {
          ...session,
          user: token.user
        }
    },
    // authorized: async (params: any) => {
    //   console.log(params)
    //   const { auth } = params
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth
    // },
  },
})