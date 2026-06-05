import { useWebinarStore } from '@/store/useWebinarStore'
import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Step = {
    id: string,
    title: string,
    descreption: string,
    component: React.ReactNode
}

type Props = {
    steps: Step[]
    onComplete: (id: string) => void 
}

const MultiStepForm = ({ steps, onComplete }: Props) => {
    const { formData, validateStep, isSubmitting, setSubmitting, setModelOpen} = useWebinarStore()
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<string[]>([])
    const [validationError, setValidationError] = useState<string | null>(null)
    
    const currentStep = steps[currentStepIndex]
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === steps.length - 1

    const handleBack = () => {
    if (isFirstStep) {
        setModelOpen(false)
    } else {
        setCurrentStepIndex(currentStepIndex - 1)
        setValidationError(null)
    }
    }

    const handleNext = async () => {
    setValidationError(null)
    const isValid = validateStep(currentStep.id as keyof typeof formData)

    if (!isValid) {
        setValidationError('Please fill in all required fields')
        return
    }

    if (!completedSteps.includes(currentStep.id)) {
        setCompletedSteps([...completedSteps, currentStep.id])
    }

    if (isLastStep) {
        try {
            setSubmitting(true)
        } catch (error) {
        }
    } else {
        setCurrentStepIndex(currentStepIndex + 1)
    }
    }

    return (
    <div className="flex flex-col justify-center items-center gap-4 bg-[#27272A] border border-border rounded-lg overflow-hidden w-full mx-auto backdrop-blur-[106px]">
        <div className='sm:flex flex-row items-center justify-start'>
            <div className='w-full md:w-1/3 p-6'>
                <div className='space-y-6'>
                    {steps.map((step: Step, index: number) => {
                        const isCompleted = completedSteps.includes(step.id)
                        const isCurrent = index === currentStepIndex
                        const isPast = index < currentStepIndex

                        return <div key={step.id} className='relative'>
                            <div className='flex items-start gap-4'>
                                <div className='relative'>
                                    <motion.div initial={false} animate={{
                                    backgroundColor:
                                        isCurrent || isCompleted
                                        ? 'rgb(0, 188, 125)'
                                        : 'rgb(31, 41, 55)',
                                    scale:
                                        isCurrent || isCompleted ? 0.8 : 1,
                                    transition: { duration: 0.3 }
                                    }} className='flex items-center justify-center w-8 h-8 rounded-full z-10'>
                                        <AnimatePresence mode='wait'>
                                            {isCompleted ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Check className="w-5 h-5 text-white" />
                                                </motion.div>
                                                ) : (
                                                <motion.div
                                                    key="number"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-white/60"
                                                >
                                                    {index + 1}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-8 left-4 w-0.5 h-16 bg-gray-700 overflow-hidden">
                                            <motion.div
                                            initial={{
                                                height: isPast || isCurrent ? '100%' : '0%'
                                            }}
                                            animate={{
                                                height: isPast || isCurrent ? '100%' : '0%', backgroundColor:'rgb(0, 188, 125)'
                                            }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                            className="w-full h-full"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="pt-1"> <motion.h3 animate={{ color: isCurrent || isCompleted ? "rgb(255, 255, 255)" : "rgb(156, 163, 175)", }} transition={{ duration: 0.3 }} className="font-medium" > {step.title} </motion.h3> <p className="text-sm text-gray-500"> {step.descreption} </p> </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Separator
                orientation='vertical'
                className='mt-5 mb-5 data-[orientation=vertical]'
            />
            <div className='w-full md:w-2/3'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentStep.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-6"
                        >
                            <div className="mb-6">
                                <h2 className='text-xl font-semibold'>
                                    {currentStep.title}
                                </h2>
                                <p className="text-gray-400">{currentStep.descreption}</p>
                            </div>
                            {currentStep.component}

                            <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md flex items-start gap-2 text-red-300">
                                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                                <p>{validationError}</p>
                            </div>

                        </motion.div>
                    </AnimatePresence>
            </div>
        </div>
        <div className='w-full p-6 flex justify-between'>
            <Button
                variant={'outline'}
                onClick={handleBack}
                disabled={isSubmitting}
                className={cn('border-gray-700 text-white hover:bg-gray-800', isFirstStep && 'opacity-50 cursor-not-allowed')}
            >
                {isFirstStep ? 'Cancel' : 'Back'}
            </Button>
            <Button
                onClick={handleNext}
                disabled={isSubmitting}
            >

            </Button>
        </div>
        

    </div>
    )
}

export default MultiStepForm