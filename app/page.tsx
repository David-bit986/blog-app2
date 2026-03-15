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
    return <div>Loading...</div>
  }

  return(
    <div className="flex  flex-col min-h-screen w-full items-center justify-center p-6 md:p-10" >
      <div className="flex flex-col gap-6">
       <h1 className="text-4xl font-bold">welcome to my app</h1>
      <h2 className="text-lg font-semibold">This is a web app that uses next.js with better auth and prisma along with neondb
        <br />
        for implementating a blog
      </h2>
      
      <p className="text-sm text-muted-foreground">please sign in or up to continue</p>
      <Button className="w-md mt-2" onClick={() => router.push("/login")}>Sign In</Button>
      <Button className="w-md mt-2" onClick={() => router.push("/register")}>Sign Up</Button>
      </div>
    </div>
  )
}
