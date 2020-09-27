import type { NextPageContext } from "next";
import NextApp, { AppContext, AppInitialProps, AppProps } from "next/app";
import Router from "next/router";

import api from "@/services/api";
import { getCurrentUser, getServerSideAuthCookie } from "@/services/auth";
import type { User } from "@/types/core";

type InitialProps = AppInitialProps & {
  appProps: {
    token: string | null;
    user: User | null;
  };
};

function redirectTo(ctx: NextPageContext, status: 301 | 302 | 404, location: string): void {
  if (ctx.res) {
    ctx.res.writeHead(status, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

function App({ Component, pageProps, ...props }: InitialProps & AppProps) {
  return <Component {...props} {...pageProps} />;
}

App.getInitialProps = async (ctx: AppContext): Promise<InitialProps> => {
  const token: string | null = getServerSideAuthCookie(ctx.ctx);

  // This single line is responsible for API request authentication.
  // IMPORTANT: Make sure it's before NextApp.getInitialProps call,
  // so auth token is already set in all Component.getInitialProps.
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    // Make sure we won't use revoked token after log out.
    delete api.defaults.headers.Authorization;
  }

  let user: User | null = null;

  if (token) {
    try {
      user = await getCurrentUser();
    } catch (err) {
      // Make sure we clear invalid token.
      delete api.defaults.headers.Authorization;

      // If we have invalid token, let's redirect to login page.
      redirectTo(ctx.ctx, 302, "/login");
    }
  }

  // Make sure we call "getInitialProps" after we check authorization status.
  // We can't fetch data before we know if user has permission to do so.
  // Also, it doesn't make sens to fetch data if we redirect to another page.
  const initialProps = await NextApp.getInitialProps(ctx);

  return {
    ...initialProps,
    appProps: {
      token,
      user,
    },
  };
};

export default App;
