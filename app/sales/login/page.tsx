'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Radio, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Radio className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">RiengRadio Artist Portal</h1>
          <p className="text-muted-foreground">Sign in to manage your music and sales</p>
        </div>

        <Card className="bg-card border-border border shadow-xl shadow-black/50">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your username and password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {state?.error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                  <span className="text-sm text-destructive">{state.error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input 
                  name="username" 
                  placeholder="e.g. swat" 
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
