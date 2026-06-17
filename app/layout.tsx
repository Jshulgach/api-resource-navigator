import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prosthetics Resource Navigator",
  description:
    "A nonprofit resource navigator for prosthetics, amputation, limb loss, and care navigation."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
