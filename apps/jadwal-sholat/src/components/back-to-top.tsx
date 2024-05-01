"use client";

import { ArrowUp } from "lucide-react";
import { memo } from "react";
import { P, match } from "ts-pattern";
import { Button } from "~components/ui/button";
import { useScroll } from "~hooks";
import { cn } from "~lib/utils/cn";

export default function BackToTop() {
  const scroll = useScroll();
  const height = 150;

  return (
    <>
      {match({ scroll: scroll })
        .with({ scroll: P.when((scroll) => scroll >= height) }, () => (
          <div
            className={cn(
              "fixed bottom-[75px] right-2.5",
              "md:right-4 md:bottom-4"
            )}
          >
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label="back to top"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <ArrowUp />
            </Button>
          </div>
        ))
        .otherwise(() => null)}
    </>
  );
}

memo(BackToTop);
