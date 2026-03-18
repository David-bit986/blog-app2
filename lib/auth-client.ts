import { createAuthClient } from "better-auth/react"

// Determine the base URL based on environment
const getBaseURL = () => {
    if (typeof window === "undefined") {
        // Server-side
        return process.env.BETTER_AUTH_URL || "http://localhost:3000"
    }
    // Client-side: use current origin
    const origin = window.location.origin
    return origin
}

export const authClient = createAuthClient({
    baseURL: getBaseURL()
})

export const {
    signIn,
    signUp, 
    useSession,
    signOut, 
    getSession,
    resetPassword,
} = authClient