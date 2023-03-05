import Image from "next/image";
import { memo } from "react";

type PriorityImageProps = {
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const PriorityImage = ({ className, src, alt, width, height }: PriorityImageProps) => {
  return <Image className={className} src={src} alt={alt} width={width} height={height} priority />;
};

export default memo(PriorityImage);
