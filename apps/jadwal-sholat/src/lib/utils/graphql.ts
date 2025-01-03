import { cacheExchange, createClient, fetchExchange, gql } from "@urql/next";
import { env } from "~env.mjs";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export const urqlClient = () =>
  createClient({
    url: `${NEXT_PUBLIC_ASMAUL_HUSNA_API}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });

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
