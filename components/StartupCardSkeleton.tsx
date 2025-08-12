import React from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

const StartupCardSkeleton = () => {
    return (
        <>
            {[0, 1, 2, 3, 4, 5].map((index: number) => {
                <li key={cn('skeleton', index)}>
                    <Skeleton className='w-full h-96 rounded-[22px] bg-zinc-400' />
                </li>
            })}
        </>
    )
}

export default StartupCardSkeleton