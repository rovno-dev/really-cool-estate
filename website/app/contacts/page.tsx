"use client";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useLanguage } from "@/providers/language-provider";
import { toast } from "sonner";
import { $fetch } from "@/utils/fetch";

export default function ContactsPage() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!name || !email || !message) {
      toast.error(lang === "ru" ? "Заполните все поля" : "Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await $fetch("/api/v1/contacts", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
        isToast: false,
      });

      if (res.response?.ok) {
        toast.success(lang === "ru" ? "Сообщение отправлено" : "Message sent");
        setName(""); setEmail(""); setMessage("");
      } else {
        toast.error(lang === "ru" ? "Ошибка отправки" : "Failed to send");
      }
    } catch {
      toast.error(lang === "ru" ? "Ошибка сети" : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="py-20 bg-gradient-to-br from-primary/20 via-bg to-bg">
        <Container className="max-w-xl">
          <h1 className="text-display-2 font-semibold text-center mb-8">
            {lang === "ru" ? "Свяжитесь с нами" : "Contact Us"}
          </h1>
          <div className="bg-(--card) border border-(--outline) rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field>
                <FieldLabel>{lang === "ru" ? "Имя" : "Name"}</FieldLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "ru" ? "Ваше имя" : "Your name"}
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </Field>
              <Field>
                <FieldLabel>{lang === "ru" ? "Сообщение" : "Message"}</FieldLabel>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === "ru" ? "Ваш вопрос..." : "Your question..."}
                  rows={5}
                />
              </Field>
              <Button type="submit" disabled={loading} className="w-full" size="large" shape="round">
                {loading ? (lang === "ru" ? "Отправка..." : "Sending...") : (lang === "ru" ? "Отправить" : "Send")}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </main>
  );
}
