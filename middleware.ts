
import { auth } from '@/auth'

const SIGN_IN_URL = '/sign-in'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.includes('/system')) {
    const newUrl = new URL(SIGN_IN_URL, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}