"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";


const Pricing: React.FC = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-zinc-50">
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
                    className="flex items-center gap-2 rounded-full px-6 py-2.5 bg-black text-white text-sm shadow-lg cursor-pointer"
                  >
                    Go to Home <ArrowUpRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold text-zinc-900"
        >
          Simple, transparent pricing
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600"
        >
          Choose a plan that fits your needs. No hidden fees, no surprises.
        </motion.p>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Starter ===== */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Starter</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Perfect for small websites and personal projects.
            </p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-zinc-900">$9</span>
              <span className="text-sm text-zinc-500"> / month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {[
                "Basic widget integration",
                "Up to 1,000 monthly interactions",
                "Standard performance",
                "Email support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full py-2.5 rounded-xl border border-zinc-300 text-sm font-medium hover:bg-zinc-100 transition">
              Get Started
            </button>
          </div>

          {/* ===== Pro (Recommended) ===== */}
          <div className="relative bg-white border-2 border-black rounded-2xl p-8 shadow-lg">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>

            <h3 className="text-lg font-semibold text-zinc-900">Pro</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Best for growing products and startups.
            </p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-zinc-900">$29</span>
              <span className="text-sm text-zinc-500"> / month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {[
                "Advanced widget customization",
                "Up to 10,000 monthly interactions",
                "High-performance delivery",
                "Priority email support",
                "Analytics & insights",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition">
              Upgrade to Pro
            </button>
          </div>

          {/* ===== Enterprise ===== */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Enterprise</h3>
            <p className="mt-2 text-sm text-zinc-600">
              For large teams and high-traffic applications.
            </p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-zinc-900">Custom</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {[
                "Unlimited interactions",
                "Custom integrations",
                "Dedicated infrastructure",
                "24/7 priority support",
                "SLA & security reviews",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full py-2.5 rounded-xl border border-zinc-300 text-sm font-medium hover:bg-zinc-100 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* ================= FAQ / TRUST ================= */}
      <section className="border-t border-zinc-200 bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">
            No hidden costs. Cancel anytime.
          </h2>

          <p className="mt-4 text-zinc-600">
            All plans include updates, security patches, and ongoing
            improvements. You stay in full control.
          </p>
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

export default Pricing;
