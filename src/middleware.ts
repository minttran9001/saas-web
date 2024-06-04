import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  isAuthenticationRoutes,
  isRequiredAuthByPath,
  routeConfiguration,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const nextUrl = req.nextUrl;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = !isRequiredAuthByPath(nextUrl.pathname);
  const isRequiredAuthRoute = isAuthenticationRoutes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isRequiredAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(
        new URL(routeConfiguration.SettingsPage.path, nextUrl)
      );
    }
    return;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
  return;
});

// Optionally, don't invoke the middleware for certain routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
