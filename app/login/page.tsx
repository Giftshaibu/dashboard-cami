"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.alert("Signed in with mock authentication.")
    window.location.href = "/dashboard"
  }

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden border-r bg-muted/30 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">MW</div>
          <div>
            <p className="text-sm font-semibold">Mwai Pay</p>
            <p className="text-xs text-muted-foreground">Malawi payment operations</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold tracking-tight">Sign in to manage collections, settlements, refunds, and integrations.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">A Stripe-inspired merchant entry point for sandbox testing and future live operations.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="size-4" />
          Sandbox mode enabled
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Use mock credentials for now. Backend authentication will replace this form.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue="finance@mwaiphones.mw" />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" defaultValue="sandbox-password" />
              </div>
              <Button type="submit">
                Sign in <ArrowRight className="size-4" />
              </Button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm">
              <Link className="text-muted-foreground hover:text-foreground" href="/register">Create account</Link>
              <Link className="text-muted-foreground hover:text-foreground" href="/dashboard">Continue to sandbox</Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
