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
}




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
      setBusinessName("")
    setSupportEmail("")
    setKnowledge("")

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
            <span className="font-semibold">Support</span>
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
        <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-xl">
          <h1 className="text-2xl font-semibold mb-1">Chatbot Configuration</h1>
          <p className="text-zinc-500 mb-10">
            Configure how your AI represents your business
          </p>

          <div className="mb-8 space-y-4">
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business Name"
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="Support Email"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {/* KNOWLEDGE BASE */}
          <div className="relative mb-10">
            <textarea
              value={knowledge}
              onChange={(e) => {
                setKnowledge(e.target.value);
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              rows={6}
              placeholder={`Describe your business clearly so the AI can help customers.

Include:
• Services / products
• Pricing or plans
• Delivery & refunds
• Working hours

Example:
"We run an online clothing store delivering across Pakistan."`}
              className="
                w-full rounded-2xl border px-5 py-4 text-sm
                resize-none overflow-hidden
                focus:ring-2 focus:ring-black/10
              "
            />
            <div className="absolute bottom-3 right-4 text-[11px] text-zinc-400">
              {knowledge.length} chars
            </div>
          </div>

          <motion.button
            onClick={handleSettings}
            disabled={!isValid || isSaving}
            className="
              px-8 py-3 rounded-xl text-white text-sm
              bg-black disabled:bg-zinc-400 cursor-pointer
            "
          >
            {isSaving ? "Saving…" : "Save"}
          </motion.button>
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
        { label: "Conversations", value: "1,284", color: "from-indigo-500" },
        { label: "Users", value: "892", color: "from-emerald-500" },
        { label: "Leads Captured", value: "146", color: "from-amber-500" },
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
        <h3 className="font-semibold text-lg">Messages</h3>
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
        <h3 className="font-semibold mb-6">Top Pages</h3>

        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pageData}>
              <XAxis dataKey="page" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Bar
                dataKey="hits"
                fill="#111"
                radius={[10, 10, 0, 0]}
              />
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
        <h3 className="font-semibold mb-6">User Intent</h3>

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
              <div
                key={i}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                <span className="text-zinc-600">
                  {item.name}
                </span>
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
