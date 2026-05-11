"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Loader2, Pencil, Save } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chatbot/ChatMessage";
import { ObservationPreview } from "@/components/chatbot/ObservationPreview";
import { clarifyObservation, extractObservation, type ExtractionOutput } from "@/lib/demoAiFallback";
import { useDemo } from "@/components/layout/DemoProvider";

type Message = { role: "teacher" | "homeroom"; text: string };

const greeting =
  "Hi - I'm Homeroom. What did you notice about Maya today? I'll ask a few specifics so we can save the moment as evidence, not a label.";

const mayaContext =
  "Maya Chen is finishing Grade 11 and preparing for Grade 12. Her record suggests reflective visual communication. She often communicates best after preparing, writing, sketching, building, diagramming, or explaining something she helped create.";

export function ChatbotSheet({ children }: { children: React.ReactNode }) {
  const { state, addObservationFromTranscript } = useDemo();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "homeroom", text: greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ExtractionOutput | null>(null);

  const transcript = useMemo(
    () => messages.map((message) => `${message.role === "teacher" ? "Teacher" : "Homeroom"}: ${message.text}`),
    [messages]
  );

  function reset() {
    setMessages([{ role: "homeroom", text: greeting }]);
    setInput("");
    setLoading(false);
    setPreview(null);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setInput("");
    const nextMessages = [...messages, { role: "teacher" as const, text: clean }];
    setMessages(nextMessages);
    setLoading(true);

    const nextTranscript = nextMessages.map((message) => `${message.role === "teacher" ? "Teacher" : "Homeroom"}: ${message.text}`);
    const aiReply = await withTimeout(
      postJson<{ text: string }>("/api/ai/clarify-observation", {
        studentName: state.students[0]?.name ?? "Maya Chen",
        transcript: nextTranscript,
        lastMessage: clean,
        studentContext: mayaContext
      }),
      8000
    ).catch(() => ({ text: clarifyObservation(nextTranscript, clean) }));

    const reply = aiReply.text?.trim();
    if (reply === "READY" || /that's all/i.test(clean)) {
      setMessages((current) => [...current, { role: "homeroom", text: "Homeroom is structuring your observation..." }]);
      const extraction = await withTimeout(
        postJson<{ json: ExtractionOutput }>("/api/ai/extract-observation", {
          fullTranscript: nextTranscript.join("\n"),
          studentContext: mayaContext
        }),
        8000
      ).catch(() => ({
        json: extractObservation(nextTranscript.join("\n"))
      }));
      setPreview(extraction.json);
    } else {
      setMessages((current) => [...current, { role: "homeroom", text: reply || clarifyObservation(nextTranscript, clean) }]);
    }
    setLoading(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) reset();
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetTitle className="font-display text-3xl text-forest">Add observation</SheetTitle>
        <p className="mt-2 text-sm text-ink-soft">Homeroom drafts. You approve. Evidence stays attached.</p>
        <div className="mt-4 rounded-md border border-sage-light bg-paper px-3 py-2 text-sm text-forest">
          Homeroom asks for the setting, moment, and support that helped, so the note is useful for Maya&apos;s next adult.
        </div>
        <div className="mt-6 space-y-3">
          {messages.map((message, index) => (
            <ChatMessage key={`${message.role}-${index}`} role={message.role}>
              {message.text}
            </ChatMessage>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-stone">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking with the evidence...
            </div>
          )}
        </div>
        {preview ? (
          <div className="mt-6 space-y-4">
            {preview.needsMoreInfo ? (
              <div className="rounded-lg border border-terracotta bg-paper p-4 text-terracotta">
                I don&apos;t have enough evidence to save this as a learner observation yet. Add the moment, setting, or what support worked.
              </div>
            ) : (
              <>
                <DraftQuality preview={preview} transcript={transcript} />
                <ObservationPreview preview={preview} />
              </>
            )}
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setPreview(null)}>
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => {
                  addObservationFromTranscript(transcript, preview);
                  setOpen(false);
                }}
                disabled={preview.needsMoreInfo}
              >
                <Save className="h-4 w-4" />
                Approve and save
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="mt-6 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-h-28 w-full rounded-lg border border-stone-light bg-paper px-3 py-3 text-ink outline-none focus:border-terracotta"
              placeholder="Maya was quiet during math discussion."
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={loading}>Send</Button>
              <Button type="button" variant="secondary" onClick={() => send("That's all I have.")} disabled={loading}>
                That&apos;s all I have
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error("Homeroom AI request timed out")), timeoutMs);
    })
  ]);
}

function DraftQuality({ preview, transcript }: { preview: ExtractionOutput; transcript: string[] }) {
  const full = transcript.join(" ");
  const items = [
    { label: "Evidence present", ok: Boolean(preview.evidenceQuote) },
    { label: "Setting identified", ok: preview.setting !== "Other" || /class|group|written|discussion|project/i.test(full) },
    { label: "Support context", ok: /support|help|worked|prepared|wrote|role|checklist|sketch|visual|model|built/i.test(full + " " + preview.context) }
  ];
  return (
    <div className="grid gap-2 rounded-lg border border-stone-light bg-paper p-3 text-sm md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-forest">
          {item.ok ? <CheckCircle2 className="h-4 w-4 text-forest" /> : <Circle className="h-4 w-4 text-stone" />}
          {item.label}
        </div>
      ))}
    </div>
  );
}
