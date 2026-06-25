'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import MultiStepForm from './MultiStepForm'
import BasicInfoStep from './BasicInfoStep'
import Link from 'next/link'

type Props = {}

const CreateWebinarButton = (props: Props) => {
    const {isModelOpen, setModelOpen, isComplete, setComplete} = useWebinarStore()
    
    const [webinarLink, setWebinarLink] = useState("");

    
    const steps = [
        {
            id: 'basicInfo',
            title: 'Basic Information',
            descreption: 'Please fillout the standard info needed for your webianar',
            component: <BasicInfoStep />
        }
    ]

    const handleComplete = (webinarId: string) => {
        setComplete(true)
        setWebinarLink(`${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${webinarId}`)
    }

    return (
        <Link href={"/webinars"}>

        
                <button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20" >
                    <PlusIcon />
                    Create Webinar
                    
                </button></Link>
    )
}

export default CreateWebinarButton