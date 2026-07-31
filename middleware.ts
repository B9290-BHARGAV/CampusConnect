import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Allow unauthenticated users to /select-role (for email signup flow)
    if (pathname === "/select-role" && !token) {
      return NextResponse.next();
    }

    // User is not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role as string | null;

    // Authenticated user with no role → only allow /select-role and /signup
    if (!role && pathname !== "/select-role" && !pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/select-role", req.url));
    }

    // Student trying to access faculty pages
    if (role === "student" && pathname.startsWith("/faculty")) {
      return NextResponse.redirect(new URL("/student", req.url));
    }

    // Faculty trying to access student pages
    if (role === "faculty" && pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/faculty", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always let the middleware function above decide for /select-role
        if (req.nextUrl.pathname === "/select-role") return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/student/:path*",
    "/faculty/:path*",
    "/select-role",
  ],
};