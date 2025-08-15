'use client'

import dynamic from 'next/dynamic'

const LanyardComponent = dynamic(() => import('./Lanyard-client'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] aspect-square" />
})

export function Lanyard() {
  return <LanyardComponent />
}
