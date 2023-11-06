import { ChildrenProps } from "~interfaces";

import ApolloProvider from "./apollo-provider";

export default function Layout({ children }: ChildrenProps) {
  return <ApolloProvider>{children}</ApolloProvider>;
}
