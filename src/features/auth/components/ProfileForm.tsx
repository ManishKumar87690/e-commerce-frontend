"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getInitials, wait } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type ProfileInput = z.infer<typeof profileSchema>;
type PasswordInput = z.infer<typeof passwordSchema>;

interface ProfileFormProps { defaultValues: ProfileInput; }

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { toast } = useToast();

  const profileForm = useForm<ProfileInput>({ resolver: zodResolver(profileSchema), defaultValues });
  const passwordForm = useForm<PasswordInput>({ resolver: zodResolver(passwordSchema), defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" } });

  const onProfileSubmit = async (_values: ProfileInput) => { setProfileLoading(true); await wait(800); setProfileLoading(false); toast({ description: "Profile updated successfully." }); };
  const onPasswordSubmit = async (_values: PasswordInput) => { setPasswordLoading(true); await wait(800); setPasswordLoading(false); toast({ description: "Password changed successfully." }); passwordForm.reset(); };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16"><AvatarFallback className="text-lg bg-primary text-primary-foreground">{getInitials(defaultValues.name)}</AvatarFallback></Avatar>
        <div><p className="font-semibold">{defaultValues.name}</p><p className="text-sm text-muted-foreground">{defaultValues.email}</p></div>
      </div>
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <FormField control={profileForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full name</FormLabel><FormControl><Input {...field} disabled={profileLoading} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={profileForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email address</FormLabel><FormControl><Input type="email" {...field} disabled={profileLoading} /></FormControl><FormMessage /></FormItem>)} />
          <FormField control={profileForm.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone number <span className="text-muted-foreground text-xs">(optional)</span></FormLabel><FormControl><Input type="tel" placeholder="+1 555 000 0000" {...field} disabled={profileLoading} /></FormControl><FormMessage /></FormItem>)} />
          <Button type="submit" disabled={profileLoading}>{profileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save changes</Button>
        </form>
      </Form>
      <Separator />
      <div className="space-y-4">
        <div><h2 className="font-semibold">Change Password</h2><p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p></div>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (<FormItem><FormLabel>Current password</FormLabel><FormControl><Input type="password" {...field} disabled={passwordLoading} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (<FormItem><FormLabel>New password</FormLabel><FormControl><Input type="password" {...field} disabled={passwordLoading} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (<FormItem><FormLabel>Confirm new password</FormLabel><FormControl><Input type="password" {...field} disabled={passwordLoading} /></FormControl><FormMessage /></FormItem>)} />
            <Button type="submit" variant="outline" disabled={passwordLoading}>{passwordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Change password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
