'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useWebinarStore } from '@/store/useWebinarStore'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import MultiStepForm from './MultiStepForm'
import BasicInfoStep from './BasicInfoStep'

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
        <Dialog open={isModelOpen} onOpenChange={setModelOpen}>
            <DialogTrigger asChild>
                <button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20" onClick={() => setModelOpen(true)}>
                    <PlusIcon />
                    Create Webinar
                </button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-225 p-0 bg-transparent border-none' aria-describedby={undefined}>
                {isComplete? (<div className='bg-muted text-primary rounded-lg overflow-hidden'>
                    <DialogTitle className='sr-only'>Webinar Created</DialogTitle>
                </div>) : (<>
                    <DialogTitle className='sr-only'>Create Webinar</DialogTitle>
                    <MultiStepForm
                        steps={steps}
                        onComplete={handleComplete}
                    />
                </>)}
            </DialogContent>
        </Dialog>
    )
}

export default CreateWebinarButton