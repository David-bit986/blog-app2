"use client"

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  if (isPending) {
    return <div>The Page is Loading...</div>
  }

  return(
    <div className="flex flex-col min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-10" >
      <div className="flex flex-col gap-6 w-full max-w-md">
       <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">Welcome to my app!</h1>
      <h2 className="text-base sm:text-lg font-semibold text-center text-gray-600 dark:text-gray-300">This is a web app that uses next.js with better auth and prisma along with neondb
        <br />
        for implementating a blog
      </h2>
      
      <p className="text-xs sm:text-sm text-muted-foreground text-center">please sign in or up to continue</p>
      <div className="flex flex-col gap-3">
        <Button className="w-full cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push("/login")}>login</Button>
        <Button className="w-full cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push("/register")}>register</Button>
      </div>
      </div>
    </div>
  )
}
