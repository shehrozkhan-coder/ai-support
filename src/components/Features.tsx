"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone,
  Globe,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import {ArrowUpRight} from 'lucide-react'

const FEATURES = [
  {
    title: "Instant Setup",
    description:
      "Plug-and-play integration. No complex configuration or setup required.",
    icon: Zap,
  },
  {
    title: "Secure by Default",
    description:
      "Sandboxed, isolated, and secure. Your users and data stay protected.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile Ready",
    description:
      "Fully responsive and optimized for all devices out of the box.",
    icon: Smartphone,
  },
  {
    title: "Global Performance",
    description:
      "Fast load times worldwide with optimized delivery and caching.",
    icon: Globe,
  },
  {
    title: "Smart Conversations",
    description:
      "Context-aware messaging designed to increase engagement and conversion.",
    icon: MessageCircle,
  },
  {
    title: "Polished UI",
    description:
      "Modern, clean interface that blends perfectly with your website.",
    icon: Sparkles,
  },
];


const Features: React.FC = () => {
const router = useRouter()
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* ===== NAVBAR ===== */}
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
                  <span className="font-semibold text-black">Support</span>
                  <span className="text-zinc-500">AI</span>
                </div>
      
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2 rounded-full px-6 py-2.5 bg-black text-white text-sm shadow-lg cursor-pointer"
                >
                  Go to Home <ArrowUpRight size={16} />
                </motion.button>
              </div>
            </motion.div>
            
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900"
        >
          Everything you need to convert users
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 max-w-2xl mx-auto text-zinc-600 text-lg"
        >
          A powerful, lightweight widget designed to look great, load fast, and
          work everywhere.
        </motion.p>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="px-6 pb-24 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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

export default Features;
