import React, { useState } from 'react';
import { cn } from '../lib/utils';

/**
 * FleetImage: a named image slot for real UGO photography.
 *
 * Looks for /media/fleet/<slot>.jpg first. If that file does not exist yet,
 * it falls back to `fallbackSrc` (current stock image) when provided, and
 * otherwise renders a premium branded placeholder frame, so pages can ship
 * with the gaps ready before the real imagery is generated.
 *
 * To fill a slot: drop a correctly named .jpg into public/media/fleet/ and
 * redeploy. No code changes needed. See the image manifest for names/sizes.
 */
export function FleetImage({
  slot,
  alt,
  className,
  imgClassName,
  fallbackSrc,
  ratio = '16 / 10',
  label,
}: {
  slot: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackSrc?: string;
  ratio?: string;
  label?: string;
}) {
  // 0 = trying real slot image, 1 = trying fallbackSrc, 2 = placeholder
  const [stage, setStage] = useState(0);
  const src = stage === 0 ? `/media/fleet/${slot}.jpg` : stage === 1 && fallbackSrc ? fallbackSrc : null;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn('w-full h-full object-cover', imgClassName, className)}
        style={!imgClassName && !className ? { aspectRatio: ratio } : undefined}
        onError={() => setStage(stage === 0 ? (fallbackSrc ? 1 : 2) : 2)}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-[#0A1428] flex flex-col items-center justify-center text-center select-none',
        className
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(30,58,138,0.35), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <span className="relative font-serif text-2xl md:text-3xl text-amber-500/80 tracking-[0.08em]">UGO</span>
      <span className="relative mt-1.5 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-slate-500">
        {label || 'Fleet photography arriving'}
      </span>
    </div>
  );
}
