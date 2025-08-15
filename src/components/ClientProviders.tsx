'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicSmoothCursor = dynamic(
  () => import('@/components/SmoothCursor').then(mod => mod.SmoothCursor),
  { ssr: false }
);

export function ClientProviders() {
  return (
    <>
      <DynamicSmoothCursor />
    </>
  );
}
