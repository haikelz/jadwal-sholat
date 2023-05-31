import { Head, Html, Main, NextScript } from "next/document";

const og = {
  url: "https://info-jadwal-sholat.vercel.app/",
  type: "website",
  title: "Jadwal Sholat",
  description: "Aplikasi Web untuk menampilkan jadwal sholat, Asma'ul Husna, dan baca Al-Qur'an",
  image: "/icon-512x512.png",
};

export default function Document() {
  const { url, type, title, description, image } = og;

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta content="ie=edge" httpEquiv="X-UA-Compatible" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/img/icon-192x192.png" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
