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
                router.push("/")
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
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Login</Button>
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
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>    
            </div>
          </form>   
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="register-form" className="w-full" disabled={isLoading}>
            Register
          </Button>
          <Button variant="outline" className="w-full">
            Register with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}