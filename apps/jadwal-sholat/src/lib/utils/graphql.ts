import { env } from "@/env.mjs";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/next";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export function urqlClient() {
  return createClient({
    url: `${NEXT_PUBLIC_ASMAUL_HUSNA_API}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });
}

export const GetAllAsmaulHusnaQuery = gql`
  query($page: Int!, $limit: Int!) {
    allAsmaulHusna(page: $page, limit: $limit) {
      data {
        urutan
        latin
        arti
        arab
      }
    }
  }
`;
