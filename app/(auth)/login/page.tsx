'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {data: session, isPending} = useSession()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const result = await signIn.email({
        email,
        password,
      })
      if(result.error){
        setError(result.error.message || "Something went wrong")
      }else{
        router.push("/dashboard")
      }
    } catch (error) {
      console.log(error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }
  if(!isPending && session){    
    router.push("/")
    return
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="login-form" className="w-full" disabled={isLoading}>
            Log in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
