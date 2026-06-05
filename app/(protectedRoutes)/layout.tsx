import { onAuthenticateUser } from '@/actions/auth'
import Header from '@/components/ReusableComponent/LayoutComponents/header'
import Sidebar from '@/components/ReusableComponent/LayoutComponents/sidebar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
    const userExists = await onAuthenticateUser()

    if (!userExists) {
        redirect('/sign-in') 
    }

    return (
        <div className='flex w-full min-h-screen'>
            {/*SIDEBAR*/}
            <Sidebar />

            {/*MAIN-CONTENT*/}
            <div className='flex flex-col w-full h-screen overflow-auto scrollbar-hide container'>
                <Header user={userExists} />
                {children}
            </div>
        </div>
    )
}

export default Layout