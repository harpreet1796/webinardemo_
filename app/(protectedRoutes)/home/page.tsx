import React from 'react'
import OnBoarding from './_components/Onboarding'
import { Upload, Webcam } from 'lucide-react'
import FeatureCard from './_components/FeatureCard'
import FeatureSectionLayout from './_components/FeatureSectionLayout'
import Image from 'next/image'
import { potentialCustomer } from '@/lib/data'
import UserInfoCard from '@/components/ReusableComponent/UserInfoCard'

type Props = {}

const Pages = (props: Props) => {
  return (
    <div className='mx-10 h-full'>
      <div className='w-full flex flex-col sm:flex-row justify-between items-start gap-14'>
        <div className='space-y-6'>
          <h2 className='text-primary-foreground font-semibold text-4xl'>
            Get Maximum Conversions from your Webinars
          </h2>
          <OnBoarding />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center'>
          <FeatureCard Icon={ <Upload className='w-10 h-10' />} heading="Browse or drag a pre-recorded webinar file" link="#" />
          <FeatureCard Icon={ <Webcam className='w-10 h-10' />} heading="Start a live webinar" link="/webinars" />
        </div>
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-background-10'>
        <FeatureSectionLayout heading="See how far along are your potential customers" link="/lead">
          <div className="p-5 flex flex-col gap-4 items-start border rounded-xl border-border backdrop-blur-3xl">
            <div className="w-full flex justify-between items-center gap-3 ">
              <p className="text-primary-foreground font-semibold text-sm">Conversions</p>
              <p className="text-muted-foreground font-normal">50</p>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
              {Array.from({length:3}).map((_, index) => (
                <Image
                  src='/featurecard.png'
                  alt='InfoCard'
                  width={250}
                  height={250}
                  className='w-100 h-full object-cover rounded-xl '
                  key={index}
                  unoptimized
                />
              ))}
            </div>
          </div>
        </FeatureSectionLayout>
        <FeatureSectionLayout heading="See the list of your current customers" link="/pipeline">
          <div className='flex gap-4 items-center  h-full w-full justify-center relative flex-wrap'>
            {potentialCustomer.slice(0,2).map((customer, index) => (
              <UserInfoCard
                customer={customer}
                tags={customer.tags}
                key={index}
              />
            ))}
            <Image 
              src={"/glowCard.png"}
              alt={"InfoCard"}
              width={350}
              height={350}
              className='object-cover rounded-xl absolute px-5 mb-28 hidden sm:flex'
              unoptimized
            />
          </div>
        </FeatureSectionLayout>
      </div>
    </div>
  )
}

export default Pages