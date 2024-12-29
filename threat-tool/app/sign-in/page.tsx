"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase"
import GoogleSignInButton from "../../components/GoogleSignInButton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AlertCircle, Loader2, Lock, Shield } from 'lucide-react'

export default function SignInPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
      if (firebaseUser) {
        router.push('/threat-assessment')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setError("")
    setIsSigningIn(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setError(
        err.code === 'auth/wrong-password' ? 'Invalid password' :
        err.code === 'auth/user-not-found' ? 'User not found' :
        err.code === 'auth/invalid-email' ? 'Invalid email format' :
        'An error occurred during sign in'
      )
    } finally {
      setIsSigningIn(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your secure session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <Card className="w-full max-w-md shadow-lg border-2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome to CyberGuard</CardTitle>
            <p className="text-center text-muted-foreground">Your security assessment companion</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="text-center space-y-4">
                <div className="p-3 rounded-full bg-green-100 w-fit mx-auto">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <p className="mb-4">Welcome back, {user.displayName || user.email}!</p>
                <Button 
                  onClick={() => router.push('/threat-assessment')} 
                  className="w-full"
                  size="lg"
                >
                  Continue to Threat Assessment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSigningIn}
                  size="lg"
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <GoogleSignInButton />
                <div className="text-center text-sm">
                  <a href="/forgot-password" className="text-primary hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <a onClick={() => router.push('/signup')} className="text-primary hover:underline cursor-pointer font-medium">
                Sign up
              </a>
            </p>
            <p className="text-xs">
              By signing in, you agree to our{" "}
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
