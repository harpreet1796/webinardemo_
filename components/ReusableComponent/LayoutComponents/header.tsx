'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { ArrowLeft, Zap } from 'lucide-react'
import { usePathname, useRouter} from 'next/navigation'
import React from 'react'
import PurpleIcon from '../PupleIcon'
import CreateWebinarButton from '../CreateWebinarButton'


type Props = { user:User }

const Header = (props: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="px-10 pt-5 pb-5 sticky top-0 z-10 flex justify-between items-center bg-background/80 backdrop-blur-sm">
            {pathname.includes("pipeline")? (
                <Button className='bg-primary/10 border border-border rounded-xl' variant={'outline'} onClick={() => router.push('/webinar')}>
                    <ArrowLeft />Back to Webinars
                </Button>
            ):(
                <div className='px-4 py-2 flex justify-center text-bold items-center rounded-xl bg-background border border-border text-primary capitalize'>
                    {pathname.split('/')[1]}
                </div>
            )}
            <div className='flex gap-6 items-center flex-wrap'>
                <PurpleIcon className='hidden md:block'>
                    <Zap />
                </PurpleIcon>
                <CreateWebinarButton />
            </div>
        </div>
    )
}

export default Header