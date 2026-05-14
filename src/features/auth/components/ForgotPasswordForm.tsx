"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/schemas/auth.schema";
import { ROUTES } from "@/constants/routes";
import { wait } from "@/lib/utils";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: "" } });
  const onSubmit = async (_values: ForgotPasswordInput) => { setIsLoading(true); await wait(1000); setIsLoading(false); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center"><div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center"><Mail className="h-7 w-7 text-primary" /></div></div>
        <h1 className="text-2xl font-bold">Check your inbox</h1>
        <p className="text-muted-foreground text-sm">If an account exists for <strong>{form.getValues("email")}</strong>, you&apos;ll receive a password reset link shortly.</p>
        <Button asChild variant="outline" className="gap-2"><Link href={ROUTES.login}><ArrowLeft className="h-4 w-4" />Back to sign in</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Reset your password</h1><p className="text-sm text-muted-foreground mt-1">Enter your email and we&apos;ll send you a reset link.</p></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" disabled={isLoading} {...field} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="submit" className="w-full" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send reset link</Button>
        </form>
      </Form>
      <div className="text-center"><Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground"><Link href={ROUTES.login}><ArrowLeft className="h-3.5 w-3.5" />Back to sign in</Link></Button></div>
    </div>
  );
}
