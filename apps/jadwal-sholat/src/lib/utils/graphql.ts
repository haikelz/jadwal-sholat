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
  query {
    allAsmaulHusna {
      data {
        urutan
        latin
        arti
        arab
      }
    }
  }
`;
