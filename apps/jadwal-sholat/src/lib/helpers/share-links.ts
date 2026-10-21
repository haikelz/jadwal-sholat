export type ShareLink = {
  name: string;
  href: string;
  /** Web share pages open in a new tab; mail opens the mail app. */
  newTab: boolean;
};

/** Share intents for the platforms Indonesian readers use most. */
export function getShareLinks({
  url,
  title,
  text,
}: {
  url: string;
  title: string;
  text: string;
}): ShareLink[] {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const textWithUrl = encodeURIComponent(`${text}\n${url}`);

  return [
    { name: "WhatsApp", href: `https://wa.me/?text=${textWithUrl}`, newTab: true },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      newTab: true,
    },
    {
      name: "X",
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      newTab: true,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      newTab: true,
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${textWithUrl}`,
      newTab: true,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      newTab: true,
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${textWithUrl}`,
      newTab: false,
    },
  ];
}
