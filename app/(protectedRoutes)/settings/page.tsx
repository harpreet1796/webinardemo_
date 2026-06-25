'use client'

import { useState } from 'react'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Settings = () => {
  const { setTheme } = useTheme()

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage your preferences.</p>
        </div>

        {/* Theme Section */}
        <section className="rounded-3xl border border-border flex flex-row justify-between bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Theme</h2>
            <p className="mt-1 text-sm text-muted-foreground">Switch between light and dark mode.</p>
          </div>

          <div className=''>
            
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-lg">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Settings
