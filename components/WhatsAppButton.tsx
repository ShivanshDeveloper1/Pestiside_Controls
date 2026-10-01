"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "447798796286";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi, I would like to know more about your services."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  );
}