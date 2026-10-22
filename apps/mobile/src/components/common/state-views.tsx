import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { CircleAlert, RefreshCw, type LucideIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import { View } from "react-native";

/** Inline error for a data region, with a retry. */
export function ErrorState({
  title,
  description = "Periksa koneksi, lalu coba lagi.",
  onRetry,
}: {
  title: string;
  description?: string;
  onRetry: () => void;
}) {
  return (
    <Alert variant="destructive" icon={CircleAlert}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <Button
        variant="outline"
        className="mb-1.5 ml-6 self-start"
        onPress={onRetry}
      >
        <Icon as={RefreshCw} />
        <Text>Coba lagi</Text>
      </Button>
    </Alert>
  );
}

/** Nothing to show yet, with one action that fixes it. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <View className="items-center gap-3 rounded-lg border border-dashed border-border px-6 py-10">
      <View className="size-10 items-center justify-center rounded-md bg-muted">
        <Icon as={icon} size={20} />
      </View>
      <View className="items-center gap-1">
        <Text className="text-center font-medium">{title}</Text>
        {description ? (
          <Text variant="muted" className="text-center">
            {description}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

/** Placeholder rows while a list loads. */
export function ListSkeleton({
  rows = 6,
  label = "Memuat…",
  rowClassName = "h-14",
}: {
  rows?: number;
  label?: string;
  rowClassName?: string;
}) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      className="gap-3"
    >
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className={`w-full ${rowClassName}`} />
      ))}
    </View>
  );
}
