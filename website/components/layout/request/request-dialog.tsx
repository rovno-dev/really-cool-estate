"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PhoneInputField } from "@/components/ui/phone-input";
import { $fetch } from "@/utils/fetch";

const requestSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required"),
  propertyId: z.string().optional(),
  message: z.string().optional(),
});

interface RequestDialogProps {
  children: React.ReactNode;
  propertyId?: string;
  propertyTitle?: string;
}

export function RequestDialog({ children, propertyId, propertyTitle }: RequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = requestSchema.safeParse({ name, phone, propertyId });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await $fetch("/api/v1/requests", {
        method: "POST",
        body: JSON.stringify({
          name: result.data.name,
          phone: result.data.phone,
          property_id: result.data.propertyId || null,
          message: message || null,
        }),
        headers: { "Content-Type": "application/json" },
        isToast: false,
      });

      if (res.response?.ok) {
        toast.success("Request submitted successfully");
        setOpen(false);
        setName("");
        setPhone("");
        setMessage("");
      } else {
        const messageText = res.json?.message || "Something went wrong";
        toast.error(messageText);
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {propertyTitle ? `Request ${propertyTitle}` : "Make a Request"}
          </DialogTitle>
          <DialogDescription>
            {propertyTitle
              ? "We'll arrange a viewing and share all details."
              : "We will contact you within 1 business day."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-invalid={!!errors.name}
            />
            <FieldError errors={errors.name ? [{ message: errors.name }] : []} />
          </Field>
          <Field>
            <FieldLabel>Phone</FieldLabel>
            <PhoneInputField
              value={phone}
              onChange={setPhone}
              error={errors.phone}
            />
          </Field>
          <Field>
            <FieldLabel>Message (optional)</FieldLabel>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any questions?"
            />
          </Field>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
