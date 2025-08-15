'use client'

import dynamic from 'next/dynamic'

const LanyardClient = dynamic(() => import('./Lanyard-client').then((mod) => mod.LanyardComponent), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] aspect-square" />
})

export function Lanyard() {
  return <LanyardClient />
}
