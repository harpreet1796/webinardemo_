import { useWebinarStore } from '@/store/useWebinarStore'
import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { Check } from 'lucide-react'

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

    return (
    <div className="flex flex-col justify-center items-center gap-4 bg-[#27272A] border border-border rounded-3xl overflow-hidden max-w-6xl mx-auto backdrop-blur-[106px]">
        <div className='flex items-center justify-start'>
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
                                
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
    )
}

export default MultiStepForm