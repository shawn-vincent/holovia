import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [Google],
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    redirect: async ({ url, baseUrl }) => {
      // Redirect to home page after successful sign-in
      if (url === '/auth/signin') {
        return baseUrl
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
} satisfies NextAuthConfig

