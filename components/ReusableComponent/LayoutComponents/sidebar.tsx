"use client"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import LogoIcon from '@/components/Icons/LogoIcon'
import { sidebarData } from '@/lib/data'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const Sidebar = (props: Props) => {
    const pathname = usePathname()
    return (
        <div className="w-18 sm:w-20 h-screen sticky top-0 py-10 pt-5 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-start gap-10">
        <div><LogoIcon width={40} height={40}/></div>
        <div className='h-full w-full justify-between items-center flex flex-col'>
            <div className='flex flex-col gap-5 items-center justify-center '>
                {sidebarData.map((item) => (
                <TooltipProvider key={item.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={item.link} className={`flex items-center gap-2 cursor-pointer rounded-lg p-2 ${pathname.includes(item.link) ? 'iconBackground': ''}`}>
                                <item.icon className={`w-5 h-5 ${pathname.includes(item.link) ? '' : 'opacity-80'}`}/>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side='right'>
                            <span className='text-sm'>{item.title}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
            </div>
            <UserButton />
        </div>
        </div>
    )
}

export default Sidebar