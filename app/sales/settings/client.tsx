'use client'

import { useState, useActionState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User as UserIcon, Bell, Check, AlertCircle, Loader2 } from 'lucide-react'
import { updateEmailAction, updatePasswordAction } from '../actions'
import type { SessionPayload } from '@/lib/auth'

export function SettingsClient({ session }: { session: SessionPayload }) {
  const [emailState, emailAction, isEmailPending] = useActionState(updateEmailAction, null)
  const [passwordState, passwordAction, isPasswordPending] = useActionState(updatePasswordAction, null)

  const [emailSuccess, setEmailSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  useEffect(() => {
    if (emailState?.success) {
      setEmailSuccess(true)
      const t = setTimeout(() => setEmailSuccess(false), 3000)
      return () => clearTimeout(t)
    }
  }, [emailState])

  useEffect(() => {
    if (passwordState?.success) {
      setPasswordSuccess(true)
      const t = setTimeout(() => setPasswordSuccess(false), 3000)
      return () => clearTimeout(t)
    }
  }, [passwordState])

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Information (Read Only for now) */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            Account Information
          </CardTitle>
          <CardDescription>Your public profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <Input
              readOnly
              value={session.username}
              className="bg-input border-border text-foreground opacity-70"
            />
          </div>

        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Email Address
          </CardTitle>
          <CardDescription>Update your email for notifications and account recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={emailAction} className="space-y-4">
            {emailState?.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm text-destructive">{emailState.error}</span>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input
                name="email"
                type="email"
                defaultValue={session.email}
                required
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                type="submit"
                disabled={isEmailPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isEmailPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Email
              </Button>
              {emailSuccess && (
                <div className="flex items-center gap-1 text-primary text-sm">
                  <Check className="w-4 h-4" />
                  Saved
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-destructive" />
            Password & Security
          </CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={passwordAction} className="space-y-4">
            {passwordState?.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm text-destructive">{passwordState.error}</span>
              </div>
            )}
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <p className="text-sm text-foreground font-medium mb-3">Change Your Password</p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <Input
                    name="currentPassword"
                    type="password"
                    required
                    placeholder="Enter your current password"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <Input
                    name="newPassword"
                    type="password"
                    required
                    placeholder="Enter your new password"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm your new password"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                type="submit"
                disabled={isPasswordPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPasswordPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Password
              </Button>
              {passwordSuccess && (
                <div className="flex items-center gap-1 text-primary text-sm">
                  <Check className="w-4 h-4" />
                  Saved
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
