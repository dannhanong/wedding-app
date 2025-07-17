import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lê Thành & Minh Khuê",
  description: "A beautiful wedding website built with Next.js",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}