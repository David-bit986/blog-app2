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
import { useState } from "react"
import { signUp, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
    const router = useRouter()
    const { data: session, isPending } = useSession()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()  
        setError("")
        
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        try {
            const result = await signUp.email({
                email,
                password,
                name,
            })
            if(result.error){
                setError(result.error.message || "Something went wrong")
            }else{
                router.push("/login")
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
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>    
            </div>
          </form>   
        </CardContent>
        <CardFooter>
          <Button type="submit" form="register-form" className="w-full" disabled={isLoading}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
