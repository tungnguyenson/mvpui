import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session");
	const { pathname } = request.nextUrl;

	const isLoginPage = pathname === "/login";
	// Trang giới thiệu CTV là public — không yêu cầu đăng nhập.
	const isPublic = pathname.startsWith("/gioi-thieu");

	// Not authenticated and not on a public/login page → bounce to login.
	if (!session && !isLoginPage && !isPublic) {
		const loginUrl = new URL("/login", request.url);
		if (pathname !== "/") {
			loginUrl.searchParams.set("callbackUrl", pathname);
		}
		return NextResponse.redirect(loginUrl);
	}

	// Already authenticated but sitting on login → send home.
	if (session && isLoginPage) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|gioi-thieu|.*\\.[\\w]+$).*)"],
};
