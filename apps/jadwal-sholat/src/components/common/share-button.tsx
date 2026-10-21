"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getShareLinks } from "@/lib/helpers/share-links";
import { SITE_URL } from "@/lib/utils/metadata";
import { ArrowUpRight, Check, Copy, Share2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { toast } from "sonner";

// Long excerpts get cut in chat previews anyway; keep messages readable.
const EXCERPT_LIMIT = 200;

function shorten(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > EXCERPT_LIMIT
    ? `${clean.slice(0, EXCERPT_LIMIT).trimEnd()}…`
    : clean;
}

type ShareButtonProps = {
  /** Path on this site, e.g. "/quran/2#ayat-255". */
  path: string;
  /** What is shared, e.g. "QS. Al-Baqarah: 255". */
  title: string;
  /** Optional excerpt (a translation) added under the title. */
  excerpt?: string;
  /** Icon-only trigger for dense rows such as ayah actions. */
  iconOnly?: boolean;
};

/**
 * Shares a page. On touch devices it opens the system share sheet, which
 * lists every installed app; elsewhere (or if the sheet is unavailable) it
 * opens a dialog with the link, a copy button and common platforms.
 */
export function ShareButton({
  path,
  title,
  excerpt,
  iconOnly = false,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputId = useId();

  const url = `${SITE_URL}${path}`;
  const text = excerpt ? `${title}\n${shorten(excerpt)}` : title;
  const links = getShareLinks({ url, title, text });

  async function share() {
    const prefersNativeSheet =
      "share" in navigator &&
      window.matchMedia("(pointer: coarse)").matches;
    if (prefersNativeSheet) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        // The reader closed the sheet: nothing else to do.
        if ((error as DOMException).name === "AbortError") return;
        // Otherwise fall through to the dialog.
      }
    }
    setOpen(true);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Tautan disalin");
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: select the link so it can be copied by hand.
      const input = document.getElementById(inputId);
      if (input instanceof HTMLInputElement) input.select();
      toast.error("Tautan belum tersalin. Salin secara manual.");
    }
  }

  return (
    <>
      {iconOnly ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Bagikan ${title}`}
              onClick={share}
            >
              <Share2 aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bagikan</TooltipContent>
        </Tooltip>
      ) : (
        <Button type="button" variant="outline" onClick={share}>
          <Share2 aria-hidden="true" data-icon="inline-start" />
          Bagikan
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bagikan</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={inputId}
              className="text-xs font-medium text-muted-foreground"
            >
              Tautan
            </label>
            <InputGroup>
              <InputGroupInput
                id={inputId}
                readOnly
                value={url}
                onFocus={(event) => event.currentTarget.select()}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={copyLink}>
                  {copied ? (
                    <Check aria-hidden="true" />
                  ) : (
                    <Copy aria-hidden="true" />
                  )}
                  {copied ? "Tersalin" : "Salin"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <ul
            aria-label="Bagikan ke"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {links.map((link) => (
              <li key={link.name}>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                    {link.newTab ? (
                      <>
                        <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                        <span className="sr-only"> (tab baru)</span>
                      </>
                    ) : null}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
