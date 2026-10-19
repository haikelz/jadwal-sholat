"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, WifiOff } from "lucide-react";

export function ErrorWhileFetch() {
  return (
    <div className="mx-auto flex w-full max-w-xl py-12">
      <Alert variant="destructive">
        <WifiOff aria-hidden="true" />
        <AlertTitle>Data belum dapat dimuat</AlertTitle>
        <AlertDescription>
          Periksa koneksi internet, lalu coba lagi.
        </AlertDescription>
        <AlertAction>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            <RefreshCw aria-hidden="true" data-icon="inline-start" />
            Coba lagi
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
