import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "SupportAI — Smart Chatbots for Modern Websites",
    template: "%s | SupportAI",
  },
  description:
    "SupportAI helps you embed intelligent AI chatbots into your website to automate support, boost engagement, and convert users faster.",
  applicationName: "SupportAI",
  keywords: [
    "AI chatbot",
    "customer support AI",
    "website chatbot",
    "SaaS support tool",
    "AI customer service",
  ],
  authors: [{ name: "SupportAI Team" }],
  creator: "SupportAI",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
  {children}
</body>

    </html>
  );
}
