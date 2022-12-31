import { useQuery } from "@tanstack/react-query";

const getData = async (link: string) => {
  const response: Response = await fetch(link);
  const data = await response.json();

  return data;
};

export const useFetch = (link: string) => {
  return useQuery(["get data", link], () => getData(link), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * {
  "name": "jadwal-sholat",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prepare": "husky install"
  },
  "dependencies": {
    "@tanstack/react-query": "^4.20.4",
    "date-fns": "^2.29.3",
    "framer-motion": "^7.6.5",
    "jotai": "^1.9.2",
    "nanoid": "^4.0.0",
    "next": "12.1.6",
    "next-pwa": "5.5.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.6.0",
    "react-string-replace": "^1.1.0",
    "sass": "^1.56.1"
  },
  "devDependencies": {
    "@types/node": "18.11.9",
    "@types/react": "18.0.25",
    "@types/react-dom": "18.0.8",
    "autoprefixer": "^10.4.13",
    "eslint": "8.27.0",
    "eslint-config-next": "13.0.2",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-jsx-a11y": "^6.6.1",
    "eslint-plugin-react": "7.31.10",
    "husky": "^8.0.2",
    "postcss": "^8.4.19",
    "prettier": "2.7.1",
    "prettier-plugin-tailwindcss": "^0.2.1",
    "tailwindcss": "^3.2.3",
    "typescript": "4.8.4"
  }
}
 */
