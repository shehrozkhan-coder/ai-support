"use client";

import { Menu, ArrowUpRight, Check, MessageCircle, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [darkPreview, setDarkPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [widgetWidth, setWidgetWidth] = useState(280);
  const [embedVersion, setEmbedVersion] = useState<"v1" | "v2">("v1");
  const [previewUrl, setPreviewUrl] = useState("https://example.com");
  const [browser, setBrowser] = useState<"Chrome" | "Safari" | "Firefox">(
    "Chrome",
  );

  const embedCode = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js"
  data-owner-id="${ownerId}">
</script>`;

  const copyCode = () => {
    if (embedVersion === "v2") return;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900">
      {/* NAVBAR (NO GLASS) */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="AI" width={36} height={36} />
            <span className="font-semibold">Support</span>
            <span className="text-zinc-500">AI</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-full px-6 py-2.5 bg-black text-white text-sm shadow-lg"
          >
            Go to Home <ArrowUpRight size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border shadow-2xl p-10"
        >
          <h1 className="text-3xl font-semibold mb-2">Embed Chatbot</h1>
          <p className="text-sm text-zinc-500 mb-10">
            Paste before the closing <code>&lt;/body&gt;</code> tag
          </p>

          {/* EMBED VERSION */}
          <div className="flex gap-3 mb-6">
            {(["v1", "v2"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setEmbedVersion(v)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  embedVersion === v
                    ? "bg-black text-white"
                    : "hover:bg-zinc-100"
                }`}
              >
                Embed {v.toUpperCase()}
                {v === "v2" && (
                  <span className="ml-2 text-xs bg-zinc-200 px-2 py-0.5 rounded-full text-black">
                    Upcoming
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* CODE BLOCK */}
          <div className="relative mb-12">
            <div
              className={`bg-zinc-900 rounded-2xl p-6 text-sm font-mono text-zinc-100 relative ${
                embedVersion === "v2" ? "blur-sm pointer-events-none" : ""
              }`}
            >
              <pre className="overflow-x-auto">{embedCode}</pre>
            </div>

            {/* LOCK OVERLAY */}
            {embedVersion === "v2" && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur">
                <div className="flex flex-col items-center gap-3 text-zinc-800">
                  <Lock />
                  <p className="text-sm font-medium">Embed V2 is coming soon</p>
                </div>
              </div>
            )}

            <button
              onClick={copyCode}
              className="absolute top-4 right-4 flex items-center gap-1.5 bg-white text-black text-xs px-3 py-1.5 rounded-lg shadow"
            >
              {copied ? <Check size={14} /> : "Copy"}
            </button>
          </div>

          {/* COPY TOAST */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-xl shadow-xl text-sm"
              >
                Embed code copied
              </motion.div>
            )}
          </AnimatePresence>

          {/* PREVIEW CONTROLS */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setDarkPreview(!darkPreview)}
              className="px-4 py-2 border rounded-full text-sm"
            >
              {darkPreview ? "Light Preview" : "Dark Preview"}
            </button>

            <button
              onClick={() => setIsMobile(!isMobile)}
              className="px-4 py-2 border rounded-full text-sm"
            >
              {isMobile ? "Desktop" : "Mobile"}
            </button>

            <div className="flex items-center gap-3 text-sm">
              Width
              <input
                type="range"
                min={220}
                max={360}
                value={widgetWidth}
                onChange={(e) => setWidgetWidth(Number(e.target.value))}
              />
            </div>
          </div>

          {/* LIVE PREVIEW */}
          <div
            className={`relative h-[380px] sm:h-[440px] rounded-[28px] border overflow-hidden shadow-2xl w-full ${
              darkPreview ? "bg-zinc-900" : "bg-zinc-100"
            } ${isMobile ? "max-w-[390px] mx-auto" : "max-w-full"}`}
          >
            {/* ===== BROWSER CHROME ===== */}
            <div className="absolute inset-x-0 top-0 h-14 z-30 bg-white/70 backdrop-blur-xl border-b border-zinc-200 flex items-center px-4 gap-4">
              {/* Mac buttons */}
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Tabs */}
              <div className="flex gap-2 ml-3">
                {["Home", "Pricing", "Contact"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setPreviewUrl(
                        i === 0
                          ? "https://example.com"
                          : i === 1
                            ? "https://example.com/pricing"
                            : "https://example.com/contact",
                      )
                    }
                    className={`px-4 py-1.5 text-xs rounded-lg transition ${
                      i === 0
                        ? "bg-white shadow text-zinc-900"
                        : "bg-zinc-200/70 text-zinc-500 hover:bg-zinc-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Browser Switch */}
              <div className="ml-auto flex gap-2 text-[11px]">
                {[
                  { name: "Chrome", icon: "🌐" },
                  { name: "Safari", icon: "🧭" },
                  { name: "Firefox", icon: "🦊" },
                ].map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      setBrowser(b.name as any);
                      setIsMobile(b.name === "Safari");
                    }}
                    className={`px-3 py-1 rounded-full border flex items-center gap-1 transition ${
                      browser === b.name
                        ? "bg-black text-white border-black"
                        : "bg-white text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {b.icon} {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ===== URL BAR ===== */}
            <div className="absolute top-14 inset-x-0 z-30 px-6 py-2 bg-white/60 backdrop-blur-xl border-b border-zinc-200">
              <input
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                className="w-full text-xs px-4 py-1.5 rounded-full bg-zinc-100 border focus:outline-none"
              />
            </div>

            {/* ===== USER AGENT LABEL ===== */}
            <div className="absolute top-24 right-6 z-30 text-[10px] px-3 py-1 rounded-full bg-black text-white shadow">
              UA: {browser} {isMobile ? "Mobile" : "Desktop"}
            </div>

            {/* ===== FAKE SCROLLBAR ===== */}
            <div className="absolute right-1 top-28 bottom-16 w-1.5 bg-zinc-200 rounded-full z-20">
              <motion.div
                animate={{ y: [0, 120, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="h-20 bg-zinc-400 rounded-full"
              />
            </div>

            {/* ===== REAL WEBSITE (SCROLLABLE + LINKS) ===== */}
            <div className="absolute inset-0 pt-28 pb-16">
              <iframe
                key={`${previewUrl}-${browser}-${isMobile}`}
                src={previewUrl}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>

            {/* ===== CHAT WIDGET ===== */}
            <motion.div
              style={{ width: widgetWidth }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`absolute bottom-28 right-6 z-40 rounded-2xl shadow-2xl overflow-hidden border ${
                darkPreview
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-white border-zinc-200"
              }`}
            >
              <div className="bg-black text-white text-xs px-3 py-2 flex justify-between">
                Support AI<span className="opacity-60">✕</span>
              </div>
              <div className="p-3 text-xs space-y-2">
                <div className="bg-zinc-200 text-black px-3 py-2 rounded-lg w-fit">
                  Hello 👋,How can I assist you?
                </div>
                <br />
                <div className="bg-black text-white px-3 py-2 rounded-lg w-fit ml-auto">
                  Can you guide me about Return policy?
                </div>
              </div>
            </motion.div>

            {/* ===== FLOATING ICON ===== */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              className="absolute bottom-6 right-6 z-40 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl"
            >
              <MessageCircle />
            </motion.div>

            {/* ===== MOBILE SAFARI BAR ===== */}
            {isMobile && (
              <div className="absolute bottom-0 inset-x-0 h-10 bg-white/80 backdrop-blur-xl border-t border-zinc-300 flex items-center justify-center text-[11px] text-zinc-500 z-30">
                Safari — Secure Connection
              </div>
            )}
          </div>

          {/* ANALYTICS */}
          <div className="mt-24">
            <h2 className="text-xl font-semibold mb-6">Embed Analytics</h2>

            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                ["Homepage", "1,204"],
                ["Pricing", "612"],
                ["Contact", "389"],
                ["Blog", "226"],
              ].map(([page, hits]) => (
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border rounded-2xl p-6 shadow-sm"
                >
                  <p className="text-sm text-zinc-500">{page}</p>
                  <p className="text-2xl font-semibold mt-2">{hits}</p>
                </motion.div>
              ))}
            </div>

            {/* HEATMAP */}
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-sm text-zinc-500 mb-4">Interaction Heatmap</p>
              <div className="grid grid-cols-12 gap-2">
                {[...Array(48)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`h-4 rounded ${
                      i % 5 === 0
                        ? "bg-black"
                        : i % 3 === 0
                          ? "bg-zinc-400"
                          : "bg-zinc-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, transform: "translateY(24px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="border-t border-zinc-200 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Left */}
            <p className="text-sm text-zinc-500 leading-relaxed">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-zinc-800">SupportAI</span>. All
              rights reserved ·{" "}
              <span className="font-medium text-black">
                Built by Shehroz Khan
              </span>
            </p>

            {/* Right */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-900 transition-all duration-200 hover:underline underline-offset-4"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-zinc-900 transition-all duration-200 hover:underline underline-offset-4"
              >
                Terms
              </a>
              <a
                href="tel:+923274476830"
                className="text-zinc-500 hover:text-zinc-900 transition-all duration-200 hover:underline underline-offset-4"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default EmbedClient;
