"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { env } from "~env.mjs";
import { ChildrenProps } from "~interfaces";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export default function ApolloProvider({ children }: ChildrenProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

function makeClient() {
  /**
   * Handle CORS issue when fetching GraphQL API using custom fetch
   * @see https://stackoverflow.com/a/77418037
   */
  async function customFetch(
    uri: URL | RequestInfo,
    options: any
  ): Promise<Response> {
    const response = await fetch(NEXT_PUBLIC_ASMAUL_HUSNA_API, {
      method: "POST",
      body: JSON.stringify({ query: JSON.parse(options.body)["query"] }),
    });

    return response;
  }

  const httpLink = new HttpLink({
    uri: NEXT_PUBLIC_ASMAUL_HUSNA_API,
    fetch: customFetch,
    fetchOptions: { cache: "no-store", mode: "cors" },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}
