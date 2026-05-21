"use client"

import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export default function RegisterPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.alert("Mock merchant account created. Continue to compliance to upload KYC documents.")
    window.location.href = "/dashboard/compliance"
  }

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden border-r bg-muted/30 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">MW</div>
          <div>
            <p className="text-sm font-semibold">Mwai Pay</p>
            <p className="text-xs text-muted-foreground">Merchant onboarding</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold tracking-tight">Create a merchant workspace for Airtel Money and TNM Mpamba payments.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">After account creation, merchants upload KYC documents and verify settlement details before going live.</p>
        </div>
        <Building2 className="size-10 text-muted-foreground" />
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>Start a sandbox merchant profile. No real provider credentials are created.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label>Business name</Label>
                <Input placeholder="Mwai Retail Technologies Ltd" />
              </div>
              <div className="grid gap-2">
                <Label>Work email</Label>
                <Input type="email" placeholder="owner@business.mw" />
              </div>
              <div className="grid gap-2">
                <Label>Business type</Label>
                <Select defaultValue="limited">
                  <option value="limited">Limited company</option>
                  <option value="sole">Sole proprietor</option>
                  <option value="school">School or institution</option>
                  <option value="ngo">NGO or church</option>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Create a password" />
              </div>
              <Button type="submit">
                Create account <ArrowRight className="size-4" />
              </Button>
            </form>
            <p className="mt-6 text-sm text-muted-foreground">
              Already have an account? <Link className="font-medium text-foreground" href="/login">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
