import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // User is not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role as string | null;

    // User has not selected a role yet
    if (!role && pathname !== "/select-role") {
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
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/student/:path*",
    "/faculty/:path*",
    "/select-role/:path*",
  ],
};