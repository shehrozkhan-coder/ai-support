"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, LogOut, Menu, User, X, Palette } from "lucide-react";
import Link from "next/link";

type HomeClientProps = {
  email?: string;
};

const HomeClient = ({ email }: HomeClientProps) => {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const initial = email?.[0]?.toUpperCase();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileColor, setProfileColor] = useState("#18181b");
  const [activeIndex, setActiveIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Chat preview rotation */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((p) => (p + 1) % chatPreviews.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chatPreviews = [
    {
      user: "Do you offer cash on delivery?",
      bot: "Yes, cash on delivery is available nationwide.",
      userTime: "2:41 PM",
      botTime: "2:42 PM",
    },
    {
      user: "Can I integrate this with Shopify?",
      bot: "Absolutely. SupportAI works seamlessly with Shopify.",
      userTime: "4:10 PM",
      botTime: "4:11 PM",
    },
    {
      user: "Is customer support available 24/7?",
      bot: "Yes, our AI assistant works 24/7 without breaks.",
      userTime: "9:02 AM",
      botTime: "9:03 AM",
    },
  ];

  const features = [
    { title: "Plug & Play", desc: "Add the chatbot with one script tag." },
    { title: "Admin Controlled", desc: "You control what the AI knows." },
    { title: "Always available", desc: "Instant replies 24/7." },
  ];

  const logos = [
    {
      name: "Slack",
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Notion",
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
    },
    {
      name: "Amazon",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 text-zinc-900 overflow-x-hidden">
      {/* NAVBAR */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </button>

            <Image src="/icon.png" alt="AI" width={36} height={36} />
            <span className="font-semibold">Support</span>
            <span className="text-zinc-500">AI</span>
          </div>

          {/* Desktop Nav */}
<nav className="hidden md:flex gap-10 text-sm font-medium">
  {[
    { label: "Contact Us", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Features", href: "/features" },
  ].map((l) => (
    <Link
      key={l.label}
      href={l.href}
      className="relative text-zinc-600 transition-colors duration-300
                 hover:text-black
                 after:absolute after:-bottom-1 after:left-0
                 after:h-[1.5px] after:w-0 after:bg-black
                 after:transition-all after:duration-300
                 hover:after:w-full"
    >
      {l.label}
    </Link>
  ))}
</nav>


          {/* Profile / Login */}
          {initial ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                style={{ backgroundColor: profileColor }}
                className="w-10 h-10 rounded-full text-white font-semibold"
              >
                {initial}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 8 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg r"
                  >
                    <div className="p-3 border-b">
                      <div className="text-xs mb-2 flex items-center gap-1">
                        <Palette size={12} /> Profile Color
                      </div>
                      <div className="flex gap-2">
                        {[
                          "#18181b",
                          "#2563eb",
                          "#16a34a",
                          "#dc2626",
                          "#9333ea",
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() => setProfileColor(c)}
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm flex gap-2 hover:bg-zinc-100"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 h-10 rounded-full bg-black text-white text-sm cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
  {menuOpen && (
    <>
      <motion.div
        onClick={() => setMenuOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white z-50 p-6 flex flex-col"
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="mb-10 self-start"
        >
          <X />
        </button>

        <nav className="flex flex-col gap-6 text-lg font-medium">
          {[
            { label: "Contact Us", href: "/contact" },
            { label: "Pricing", href: "/pricing" },
            { label: "Features", href: "/features" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="hover:translate-x-1 transition-transform"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Email Section */}
        <div className="mt-auto pt-8 border-t">
          <p className="text-sm text-gray-500">Email</p>
          <a
            href="mailto:support@yourdomain.com"
            className="text-base font-medium hover:underline"
          >
            support@yourdomain.com
          </a>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>


<section className="pt-25 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
          >
            {/* H1 */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
            >
              AI Customer Support <br />
              <span className="bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
                Built for Modern
              </span>{" "}
              <span className="relative">
                Websites
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-black/10 rounded-full" />
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 45 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 text-lg text-zinc-600 max-w-xl"
            >
              Add a powerful AI chatbot to your website in minutes. Let your
              customers get instant answers using your own business knowledge.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex gap-5"
            >
              <button
                onClick={() => {
                  if (email) {
                    window.location.href = "/dashboard";
                  } else {
                    window.location.href = "/api/auth/login";
                  }
                }}
                className="cursor-pointer px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition"
              >
                {email ? "Go to Dashboard" : "Login"}
              </button>

              <motion.a
                href="#feature"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:border-zinc-500 transition"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative max-w-sm"
          >
            {/* floating circle */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
      absolute
      -bottom-6
      -right-6
      w-24
      h-24
      rounded-full
      bg-gradient-to-br from-zinc-200 to-zinc-300
      opacity-70
      blur-2xl
      pointer-events-none
      z-0
    "
            />

            <div className="relative z-10 rounded-xl bg-white shadow-xl border border-zinc-200 p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-zinc-700">
                    Live Chat preview
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">Online</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* User message */}
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center">
                      <User size={14} className="text-zinc-600" />
                    </div>

                    <div className="max-w-[75%] bg-zinc-100 rounded-xl rounded-tl-sm px-3 py-2 text-xs text-zinc-800">
                      {chatPreviews[activeIndex].user}
                      <div className="mt-1 text-[10px] text-zinc-400">
                        {chatPreviews[activeIndex].userTime}
                      </div>
                    </div>
                  </div>

                  {/* Bot message */}
                  <div className="flex items-end gap-2 justify-end">
                    <div className="max-w-[75%] bg-black text-white rounded-xl rounded-tr-sm px-3 py-2 text-xs">
                      {chatPreviews[activeIndex].bot}
                      <div className="mt-1 text-[10px] text-zinc-400 text-right">
                        AI • {chatPreviews[activeIndex].botTime}
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-300">
                      <Image
                        src="/icon.png"
                        alt="AI Bot"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Input */}
              <div className="mt-4 flex items-center gap-2 border-t border-zinc-200 pt-3">
                <div className="flex-1 text-xs text-zinc-400">
                  Type your message…
                </div>
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs">
                  →
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*Companies*/}

      <section className="py-24 px-6 bg-white border-t border-zinc-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-x1 font-medium text-zinc-500 mb-10 uppercase tracking-wider">
            Trusted by modern teams
          </p>

          <div className="flex flex-wrap justify-center gap-14 cursor-pointer">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                whileHover={{ scale: 1.12, y: -6 }}
                className="group"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={70}
                  className="
                  h-14 w-auto object-contain
                  grayscale opacity-70
                  transition-all duration-300 ease-out
                  group-hover:grayscale-0
                  group-hover:opacity-100
                "
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="feature"
        className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-semibold text-center tracking-tight"
          >
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
              SupportAI
            </span>
          </motion.h2>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-center text-zinc-600"
          >
            Powerful features designed to automate conversations, reduce support
            load, and delight your customers.
          </motion.p>

          {/* Features grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="
            group
            bg-white
            rounded-2xl
            p-8
            border border-zinc-200
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
              >
                <h3 className="text-lg font-medium tracking-tight">
                  {f.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {f.desc}
                </p>

                {/* Subtle hover accent */}
                <div className="mt-6 h-1 w-12 rounded-full bg-zinc-200 group-hover:bg-black transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

export default HomeClient;
