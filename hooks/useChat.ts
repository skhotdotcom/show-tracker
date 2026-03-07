"use client";

// useChat — manages the AI chat panel.
// On each message the API runs extraction in parallel, which may create or
// update shows; onShowsChanged() is called when that happens so the parent
// can refresh its show list.

import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export function useChat(onShowsChanged: () => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/chat");
    if (res.ok) setMessages(await res.json());
  }, []);

  const sendMessage = async (message: string) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) {
      toast.error("Failed to send message");
      return;
    }
    const data = await res.json();
    setMessages((prev) => [...prev, data.userMessage, data.assistantMessage]);
    if (data.extractions?.length > 0) {
      for (const extraction of data.extractions) {
        if (extraction.status === "created") {
          toast.success(`Added "${extraction.title}" to your list`);
        } else if (extraction.status === "found") {
          toast.success(`Updated "${extraction.title}"`);
        } else if (extraction.status === "not_found") {
          toast.info(`Couldn't find "${extraction.title}" in TMDB`);
        }
      }
      onShowsChanged();
    }
  };

  return { messages, loadMessages, sendMessage };
}
