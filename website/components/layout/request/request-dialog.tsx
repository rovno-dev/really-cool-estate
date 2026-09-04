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
import { useLanguage } from "@/providers/language-provider";
import { $fetch } from "@/utils/fetch";

const requestSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().min(1, "Phone is required"),
  telegram: z.string().max(100).optional().or(z.literal("")),
});

interface RequestDialogProps {
  children: React.ReactNode;
  propertyId?: string;
  propertyTitle?: string;
}

export function RequestDialog({ children, propertyId, propertyTitle }: RequestDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = requestSchema.safeParse({ name, phone, telegram });
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
          telegram: result.data.telegram || null,
          property_id: propertyId || null,
        }),
        headers: { "Content-Type": "application/json" },
        isToast: false,
      });

      if (res.response?.ok) {
        toast.success(t("request.success"));
        setOpen(false);
        setName("");
        setPhone("");
        setTelegram("");
      } else {
        const messageText = res.json?.message || t("request.error");
        toast.error(messageText);
      }
    } catch {
      toast.error(t("request.networkError"));
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
            {propertyTitle ? `${t("request.title")} — ${propertyTitle}` : t("request.title")}
          </DialogTitle>
          <DialogDescription>{t("request.subtitle")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>{t("request.name")} *</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("request.namePlaceholder")}
              aria-invalid={!!errors.name}
            />
            <FieldError errors={errors.name ? [{ message: errors.name }] : []} />
          </Field>
          <Field>
            <FieldLabel>{t("request.phone")} *</FieldLabel>
            <PhoneInputField
              value={phone}
              onChange={setPhone}
              error={errors.phone}
            />
          </Field>
          <Field>
            <FieldLabel>Telegram</FieldLabel>
            <Input
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
              aria-invalid={!!errors.telegram}
            />
            <FieldError errors={errors.telegram ? [{ message: errors.telegram }] : []} />
          </Field>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("request.submitting") : t("request.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
