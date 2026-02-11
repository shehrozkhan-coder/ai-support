"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Award } from "lucide-react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ContactUs: React.FC = () => {
  const router = useRouter();
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
      {/* ================= WEBSITE CONTACT CONTENT ================= */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-zinc-900"
          >
            Get in touch
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-lg text-zinc-600"
          >
            Have a question, need support, or want to work together? We’d love
            to hear from you.
          </motion.p>

          {/* Contact Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-left shadow-sm">
              <Mail className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-zinc-900">Email</h3>
              <p className="text-sm text-zinc-600 mt-1">
                shehrozkhan.devv@gmail.com
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-left shadow-sm">
              <Phone className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-zinc-900">Phone</h3>
              <p className="text-sm text-zinc-600 mt-1">
                Available on request: +92 327-4476830
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEVELOPER SECTION ================= */}
      <section className="border-t border-zinc-200 bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-zinc-900 text-center"
          >
            About the Developer
          </motion.h2>

          <p className="mt-8 text-zinc-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            I am a highly skilled Full-Stack Engineer specializing in the MERN
            Stack and Next.js, with strong expertise in designing and building
            scalable, high-performance, production-grade applications. I operate
            at an engineer level, focusing on clean architecture, maintainable
            codebases, system scalability, and performance optimization. My
            approach combines strong problem-solving ability with deep technical
            understanding to deliver robust, secure, and business-driven
            solutions.
          </p>

          {/* Credentials */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
              <Award className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-zinc-900">
                Professional Experience
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 list-disc list-inside">
                <li>Completed internship at Arfa Software Technology Park</li>
                <li>Engineer-level MERN & Next.js developer</li>
              </ul>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
              <Award className="w-6 h-6 text-black mb-3" />
              <h3 className="font-semibold text-zinc-900">
                Certifications & Assessments
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 list-disc list-inside">
                <li>Passed Microsoft online technical assessment</li>
                <li>Passed online technical tests for two other companies</li>
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-14 text-center">
            <h3 className="font-semibold text-zinc-900 text-lg">
              Core Expertise
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              MERN Stack · Next.js · TypeScript · Scalable Frontend Architecture
              · Backend APIs
            </p>
          </div>

          {/* Social */}
          <div className="mt-10 flex justify-center gap-6 text-zinc-600">
            <a
              href="https://https://github.com/shehrozkhan-coder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 hover:text-black transition cursor-pointer" />
            </a>

            <a
              href="https://www.linkedin.com/in/shehroz-khan-1b2a3b4c5/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 hover:text-black transition cursor-pointer" />
            </a>
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

export default ContactUs;
