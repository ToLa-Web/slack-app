import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Define public routes that don't require authentication
const isPublicPage = createRouteMatcher(["/Auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // If the requested page is not public and the user is not authenticated,
  // redirect them to the sign-in page.
  if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/Auth");
  }

  if(isPublicPage(request) && (await convexAuth.isAuthenticated())){
    return nextjsMiddlewareRedirect(request, "/")
  }
});

// Middleware configuration for Next.js
export const config = {
  // Apply the middleware to all routes except static assets and Next.js internals.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
