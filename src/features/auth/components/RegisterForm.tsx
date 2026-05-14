"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { registerSchema, type RegisterInput } from "@/schemas/auth.schema";
import { ROUTES } from "@/constants/routes";
import { wait } from "@/lib/utils";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", agreeToTerms: undefined as unknown as true },
  });

  const onSubmit = async (values: RegisterInput) => {
    setIsLoading(true);
    await wait(800);
    setIsLoading(false);
    toast({ title: "Account created!", description: "Please sign in to continue." });
    router.push(ROUTES.login);
    console.log("Register:", values);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Create an account</h1><p className="text-sm text-muted-foreground mt-1">Join us and start shopping today</p></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full name</FormLabel><FormControl><Input placeholder="John Doe" disabled={isLoading} {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" disabled={isLoading} {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Password</FormLabel>
              <FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} disabled={isLoading} {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</Button></div></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="confirmPassword" render={({ field }) => (<FormItem><FormLabel>Confirm password</FormLabel><FormControl><Input type="password" disabled={isLoading} {...field} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
            <FormItem className="flex items-start gap-2 space-y-0">
              <FormControl><Checkbox checked={field.value === true} onCheckedChange={(v) => field.onChange(v === true ? true : undefined)} /></FormControl>
              <div><FormLabel className="font-normal text-sm cursor-pointer leading-snug">I agree to the <Link href="/terms" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link></FormLabel><FormMessage /></div>
            </FormItem>
          )} />
          <Button type="submit" className="w-full" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create account</Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">Already have an account?{" "}<Link href={ROUTES.login} className="text-primary hover:underline font-medium">Sign in</Link></p>
    </div>
  );
}
