import Image from 'next/image';
import type { SizePreset, FrameStyle, MatOption } from '@/data/printOptions';

interface PrintPreviewProps {
  imageSrc: string;
  alt: string;
  sizePreset: SizePreset;
  frame: FrameStyle;
  mat: MatOption;
}

// Scales a mat's real inches into a visually proportionate padding amount —
// not a physical measurement, just enough to read as "thicker mat" on screen.
const PREVIEW_PX_PER_INCH = 10;

export default function PrintPreview({ imageSrc, alt, sizePreset, frame, mat }: PrintPreviewProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-neutral-950 shadow-xl"
      style={{
        borderWidth: frame.previewBorderWidthPx,
        borderColor: frame.colorHex,
        borderStyle: 'solid',
      }}
    >
      <div
        className="w-full max-w-full"
        style={{
          padding: mat.widthIn * PREVIEW_PX_PER_INCH,
          backgroundColor: mat.colorHex,
        }}
      >
        <div
          className="relative w-full overflow-hidden bg-neutral-900"
          style={{ aspectRatio: `${sizePreset.widthIn} / ${sizePreset.heightIn}` }}
        >
          <Image src={imageSrc} alt={alt} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
