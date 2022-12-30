import { LazyLoadImageProps } from "@/interfaces";
import Image from "next/image";
import { memo } from "react";

const LazyLoadImage = ({ className, src, alt, width, height, ...props }: LazyLoadImageProps) => {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      blurDataURL={src}
      placeholder="blur"
      {...props}
    />
  );
};

export default memo(LazyLoadImage);
