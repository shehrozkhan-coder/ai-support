/* eslint-disable react-hooks/purity */
"use client";

import axios from "axios";
import { VerifiedIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState, useEffect } from "react";
import type { Variants } from "motion/react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { day: "Mon", messages: 120 },
  { day: "Tue", messages: 210 },
  { day: "Wed", messages: 160 },
  { day: "Thu", messages: 280 },
  { day: "Fri", messages: 320 },
  { day: "Sat", messages: 260 },
  { day: "Sun", messages: 190 },
];

const pageData = [
  { page: "/pricing", hits: 420 },
  { page: "/contact", hits: 310 },
  { page: "/home", hits: 520 },
  { page: "/docs", hits: 180 },
];

const intentData = [
  { name: "Sales", value: 45 },
  { name: "Support", value: 35 },
  { name: "Other", value: 20 },
];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: "easeOut", // ✅ TS-safe easing
    },
  }),
};

const COLORS = ["#000000", "#52525b", "#a1a1aa"];

/* ================= THEMES ================= */
const CARD_THEMES = {
  blackGold: {
    text: "text-[#F5D48E]",
    accent: "text-[#E6C97A]",
    confetti: ["#F5D48E", "#E6C97A", "#FFD66B"],
  },
  blackWhite: {
    text: "text-white",
    accent: "text-zinc-300",
    confetti: ["#ffffff", "#d4d4d8", "#a1a1aa"],
  },
  royalPurple: {
    text: "text-violet-300",
    accent: "text-violet-400",
    confetti: ["#c4b5fd", "#a78bfa", "#8b5cf6"],
  },
};

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const embed = useRouter();

  const [theme, setTheme] = useState<keyof typeof CARD_THEMES>("blackGold");

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const t = CARD_THEMES[theme];

  /* ================= VALIDATION ================= */
  const isValid = useMemo(() => {
    return businessName.trim() && supportEmail.trim() && knowledge.trim();
  }, [businessName, supportEmail, knowledge]);

  /* ================= API SAVE ================= */
  const handleSettings = async () => {
    if (!isValid || isSaving) return;

    setIsSaving(true);
    setIsSaved(false);

    try {
      await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });

      setIsSaved(true);
      setBusinessName("");
      setSupportEmail("");
      setKnowledge("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
      {/* ================= NAVBAR ================= */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          sticky top-0 z-50
          max-w-7xl mx-auto px-6 h-16
          flex items-center justify-between
          bg-white/80 backdrop-blur-xl
          border-b border-zinc-200/60
        "
      >
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="AI" width={36} height={36} />
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer flex gap-1"
          >
            <span className="font-semibold text-black">Support</span>
            <span className="text-zinc-500">AI</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/embed")}
          className="
        relative
        px-5 py-2.5
        rounded-xl
        text-sm font-medium
        bg-white
        text-gray-900
        border border-gray-200
        shadow-sm
        transition-all duration-200 ease-out
        hover:shadow-lg
        hover:-translate-y-[1px]
        hover:border-gray-300
        hover:bg-zinc-200
        active:translate-y-0
        active:shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-black/20
        cursor-pointer
      "
        >
          Embed ChatBot
        </button>
      </motion.div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-xl border border-zinc-100">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 text-black">
              Chatbot Configuration
            </h1>
            <p className="text-zinc-600 text-base">
              Configure how your AI represents your business
            </p>
          </div>

          {/* Business Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-zinc-700 mb-2.5">
              Business Name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Acme Corporation"
              className="
        w-full rounded-xl border-2 border-zinc-200
        px-5 py-3.5 text-base text-black
        transition-all duration-200
        focus:border-black focus:ring-4 focus:ring-black/5
        hover:border-zinc-300
        placeholder:text-zinc-400
        outline-none
      "
            />
          </div>

          {/* Support Email Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-zinc-700 mb-2.5">
              Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="support@yourbusiness.com"
              className="
        w-full rounded-xl border-2 border-zinc-200
        px-5 py-3.5 text-base text-black
        transition-all duration-200
        focus:border-black focus:ring-4 focus:ring-black/5
        hover:border-zinc-300
        placeholder:text-zinc-400
        outline-none
      "
            />
          </div>

          {/* Knowledge Base Textarea */}
          <div className="mb-10">
            <label className="block text-sm font-semibold text-zinc-700 mb-2.5">
              Knowledge Base
            </label>
            <div className="relative">
              <textarea
                value={knowledge}
                onChange={(e) => {
                  setKnowledge(e.target.value);
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                rows={8}
                placeholder={`Describe your business clearly so the AI can help customers.

Include:
- Services / products you offer
- Pricing or subscription plans
- Delivery & refund policies
- Working hours & contact info

Example:
"We run an online clothing store delivering across Pakistan. We offer free delivery on orders above Rs. 2000. Refunds accepted within 7 days."`}
                className="
          w-full rounded-2xl border-2 border-zinc-200
          px-5 py-4 text-base text-black leading-relaxed
          resize-none overflow-hidden
          transition-all duration-200
          focus:border-black focus:ring-4 focus:ring-black/5
          hover:border-zinc-300
          placeholder:text-zinc-400
          outline-none
        "
              />
              <div
                className="
        absolute bottom-4 right-4 
        text-xs text-zinc-500 
        bg-zinc-50 px-2.5 py-1 rounded-lg
        border border-zinc-200
      "
              >
                {knowledge.length} characters
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-3 flex items-start gap-2">
              <span className="text-base">💡</span>
              <span>
                The more detailed, the better your AI assistant will perform
              </span>
            </p>
          </div>

          {/* Save Button + Success Message */}
          <div className="flex items-center gap-4 flex-wrap">
            <motion.button
              onClick={handleSettings}
              disabled={!isValid || isSaving}
              whileHover={{ scale: isValid && !isSaving ? 1.02 : 1 }}
              whileTap={{ scale: isValid && !isSaving ? 0.98 : 1 }}
              className="
        px-10 py-4 rounded-xl
        text-white text-base font-semibold
        bg-gradient-to-r from-black to-zinc-800
        disabled:from-zinc-300 disabled:to-zinc-400
        disabled:cursor-not-allowed
        cursor-pointer
        shadow-lg shadow-black/20
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/30
        disabled:shadow-none
        relative overflow-hidden
      "
            >
              {isSaving ? (
                <span className="flex items-center gap-2.5">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Configuration"
              )}
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
              {isSaved && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="
            flex items-center gap-2 
            text-emerald-600 font-semibold
            bg-emerald-50 px-4 py-2 rounded-lg
            border border-emerald-200
          "
                >
                  <VerifiedIcon size={20} />
                  <span>Saved successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Validation Warning */}
          <AnimatePresence>
            {!isValid && (businessName || supportEmail || knowledge) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="
          mt-4 flex items-start gap-2
          text-amber-700 text-sm
          bg-amber-50 px-4 py-3 rounded-lg
          border border-amber-200
        "
              >
                <span className="text-lg">⚠️</span>
                <span>Please fill all fields to save your configuration</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative">
          <div className="sticky top-28">
            <motion.div
              ref={cardRef}
              className="
                relative rounded-[28px] p-6
                bg-black border border-white/10
                shadow-[0_8px_22px_rgba(0,0,0,0.45)]
                overflow-hidden
              "
            >
              {/* CONFETTI (CARD ONLY) */}
              {isSaved && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {[...Array(60)].map((_, i) => {
                    const color = t.confetti[i % t.confetti.length];
                    return (
                      <motion.span
                        key={i}
                        initial={{ x: Math.random() * 260, y: -30 }}
                        animate={{ y: 360, rotate: 720, opacity: 0 }}
                        transition={{
                          duration: 2.8 + Math.random(),
                          delay: Math.random() * 0.4,
                          ease: "easeIn",
                        }}
                        className="absolute w-1.5 h-3 rounded"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              )}

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <Image src="/icon.png" alt="AI" width={28} height={28} />
                  <p className={`text-[11px] tracking-[0.35em] ${t.accent}`}>
                    AI LICENSE
                  </p>

                  {isSaved ? (
                    <span className="ml-auto text-emerald-400">
                      <VerifiedIcon size={18} />
                    </span>
                  ) : (
                    <span className="ml-auto text-xs text-zinc-400">
                      {isSaving ? "🔒" : "🔓"}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] text-zinc-500">Business</p>
                  <p className={`text-lg font-semibold ${t.text}`}>
                    {businessName || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-zinc-500">Support Email</p>
                  <p className="text-sm text-zinc-300">{supportEmail || "—"}</p>
                </div>

                <div>
                  <p className="text-[11px] text-zinc-500">License Hash</p>
                  <p className="text-xs font-mono text-zinc-400">
                    #{ownerId.slice(0, 6)}••••{ownerId.slice(-4)}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between">
                  <span className="text-xs text-zinc-500">Status</span>
                  <span className="text-xs text-emerald-400">
                    {isSaved ? "Verified" : "Active"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* COLOR OPTIONS */}
            <div className="flex gap-8 justify-center mt-6">
              {Object.keys(CARD_THEMES).map((key) => {
                const map: Record<string, string> = {
                  blackGold: "bg-[#B8962E]",
                  blackWhite: "bg-white",
                  royalPurple: "bg-violet-600",
                };

                return (
                  <button
                    key={key}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setTheme(key as any)}
                    className={`w-9 h-9 rounded-full ${map[key]} ${
                      theme === key ? "ring-2 ring-black scale-110" : ""
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/**================ANALYTICS=============== */}

      <AnimatePresence>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="space-y-16"
        >
          {/* ================= KPIs ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "Conversations",
                value: "1,284",
                color: "from-indigo-500",
              },
              { label: "Users", value: "892", color: "from-emerald-500" },
              {
                label: "Leads Captured",
                value: "146",
                color: "from-amber-500",
              },
              { label: "Resolved", value: "91%", color: "from-sky-500" },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={reveal}
                className="
            relative overflow-hidden
            rounded-3xl bg-white p-6
            border shadow-sm
          "
              >
                {/* gradient accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${kpi.color} to-transparent`}
                />

                <p className="text-sm text-zinc-500">{kpi.label}</p>
                <p className="text-3xl font-semibold mt-2 tracking-tight">
                  {kpi.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ================= LINE CHART ================= */}
          <motion.div
            variants={reveal}
            custom={4}
            className="
        rounded-[36px] bg-white p-10
        border shadow-sm
      "
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-black">Messages</h3>
              <span className="text-xs text-zinc-500">Last 7 days</span>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="day" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#111"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#111" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ================= BOTTOM GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Pages */}
            <motion.div
              variants={reveal}
              custom={5}
              className="rounded-[36px] bg-white p-8 border shadow-sm"
            >
              <h3 className="font-semibold mb-6 text-black">Top Pages</h3>

              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pageData}>
                    <XAxis dataKey="page" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip />
                    <Bar dataKey="hits" fill="#111" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Intent Distribution */}
            <motion.div
              variants={reveal}
              custom={6}
              className="
          rounded-[36px] bg-white p-8
          border shadow-sm lg:col-span-2
        "
            >
              <h3 className="font-semibold mb-6 text-black">User Intent</h3>

              <div className="h-[280px] flex items-center gap-12">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={intentData}
                      dataKey="value"
                      innerRadius={80}
                      outerRadius={115}
                      paddingAngle={6}
                    >
                      {intentData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {intentData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: COLORS[i] }}
                      />
                      <span className="text-zinc-600">{item.name}</span>
                      <span className="ml-auto font-semibold text-zinc-900">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="border-t border-zinc-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-zinc-800">SupportAI</span>. All
              rights reserved ·{" "}
              <span className="font-medium text-black">
                Built by Shehroz Khan
              </span>
            </p>

            <div className="flex items-center gap-6 text-sm">
              <a className="text-zinc-500 hover:text-zinc-900">Privacy</a>
              <a className="text-zinc-500 hover:text-zinc-900">Terms</a>
              <a
                href="tel:+923274476830"
                className="text-zinc-500 hover:text-zinc-900"
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

export default DashboardClient;
