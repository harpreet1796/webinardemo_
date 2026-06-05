import { validateAdditionalInfo, validateBasicInfo, validateCTA, ValidationErrors } from '@/lib/type'
import { CtaTypeEnum } from '@prisma/client'
import {create} from 'zustand'

export type WebinarFormState = {
  basicData: {
    webinarName?: string
    description?: string
    date?: Date
    time?: string
    timeFormat?: 'AM' | 'PM'
  }
  cta: {
    ctaLabel?: string
    tags?: string[]
    ctaType: CtaTypeEnum
    aiAgent?: string
    priceId?: string
  }
  additionalInfo: {
    iokChat?: boolean
    couponCode?: string
    couponEnabled?: boolean
  }
}

type ValidationState = {
  basicData: {
    valid: boolean
    errors: ValidationErrors
  }
  cta: {
    valid: boolean
    errors: ValidationErrors
  }
  additionalInfo: {
    valid: boolean
    errors: ValidationErrors
  }
}

type WebinarStore = {
    isModelOpen: boolean,
    isComplete: boolean,
    isSubmitting: boolean,
    formData: WebinarFormState,
    validation: ValidationState

    setModelOpen: (open: boolean) => void,
    setComplete: (complete: boolean) => void,
    setSubmitting: (submitting: boolean) => void

    updateBasicInfoField: <K extends keyof WebinarFormState['basicData']>(
        field: K,
        value: WebinarFormState['basicData'][K]
    ) => void

    updateCtaField: <K extends keyof WebinarFormState['cta']>(
        field: K,
        value: WebinarFormState['cta'][K]
    ) => void

    updateAdditionalInfoField: <K extends keyof WebinarFormState['additionalInfo']>(
        field: K,
        value: WebinarFormState['additionalInfo'][K]
    ) => void

    validateStep: (stepId: keyof WebinarFormState) => boolean

    getStepValidationErrors: (stepId: keyof WebinarFormState) => ValidationErrors

    resetForm: () => void
}

const initialState: WebinarFormState = {
  basicData: {
    webinarName: "",
    description: "",
    date: undefined,
    time: "",
    timeFormat: "AM",
  },
  cta: {
    ctaLabel: "",
    tags: [],
    ctaType: "BOOK_A_CALL",
    aiAgent: "",
    priceId: "",
  },
  additionalInfo: {
    iokChat: false,
    couponCode: "",
    couponEnabled: false,
  },
};

const initialValidation: ValidationState = {
  basicData: { valid: false, errors: {} },
  cta: { valid: false, errors: {} },
  additionalInfo: { valid: true, errors: {} }, 
}

export const useWebinarStore = create<WebinarStore>((set, get) => ({
    isModelOpen: false,
    isComplete: false,
    isSubmitting: false,
    formData: initialState,
    validation: initialValidation,

    setModelOpen: (open: boolean) => set({isModelOpen: open}),
    setComplete: (complete: boolean) => set({isComplete: complete}),
    setSubmitting: (submitting: boolean) => set({isSubmitting: submitting}),

    updateBasicInfoField: (field, value) => {
        set((state) => {
            const newBasicInfo = { ...state.formData.basicData, [field]: value }
            const validationResult = validateBasicInfo(newBasicInfo)

            return{
                formData: { ...state.formData, basicData: newBasicInfo},
                validation: { ...state.validation, basicData: validationResult}
            }
            })
    },
    
    updateCtaField: (field, value) => {
        set((state) => {
            const newCTA = {...state.formData.cta, [field]:value }
            const validationResult = validateCTA(newCTA)
            return{
                formData: { ...state.formData, cta: newCTA},
                validation: { ...state.validation, cta: validationResult}
            }
        })
    },

    updateAdditionalInfoField: (field, value) => {
    set((state) => {
        const newAdditionalInfo = {
        ...state.formData.additionalInfo,
        [field]: value,
        }

        const validationResult = validateAdditionalInfo(newAdditionalInfo)

        return {
        formData: {
            ...state.formData,
            additionalInfo: newAdditionalInfo,
        },
        validation: {
            ...state.validation,
            additionalInfo: validationResult,
        },
        }
    })
    },

    validateStep: (stepId: keyof WebinarFormState) => {
    const { formData } = get()
    let validationResult
    switch (stepId) {
        case 'basicData':
            validationResult = validateBasicInfo(formData.basicData)
            break
        case 'cta':
            validationResult = validateCTA(formData.cta)
            break
        case 'additionalInfo':
            validationResult = validateAdditionalInfo(formData.additionalInfo)
            break
    }

    set((state) => {
        return {
            validation: { ...state.validation, [stepId]: validationResult },
        }
    })

    return validationResult.valid
    },

    getStepValidationErrors: (stepId: keyof WebinarFormState) => {
    return get().validation[stepId].errors
    },

    resetForm: () =>
    set({
        isComplete: false,
        isSubmitting: false,
        formData: initialState,
        validation: initialValidation,
    }),

 }))