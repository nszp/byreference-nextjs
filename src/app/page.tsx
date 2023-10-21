'use client'

import dynamic from 'next/dynamic'

const Home = dynamic(() => import('@/app/Home'))

export default function Page() {
    return <Home />
}
