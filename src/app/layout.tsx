import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "คำนวณวันไข่ตก | OvuCalc — คำนวณวันไข่ตกและวันตั้งครรภ์",
  description:
    "คำนวณวันไข่ตก ช่วงมีบุตรง่าย และวันคลอดโดยอิงทฤษฎีจากงานวิจัย (Evidence-Based) รองรับประวัติรอบเดือนหลายรอบ",
  keywords: [
    "วันไข่ตก","คำนวณไข่ตก","วันตั้งครรภ์","วันคลอด","ช่วงมีบุตรง่าย",
    "ovulation calculator","fertile window","due date calculator","pregnancy",
  ],
  openGraph: {
    title: "คำนวณวันไข่ตก | OvuCalc",
    description: "คำนวณวันไข่ตกและวันตั้งครรภ์จากหลักฐานทางวิทยาศาสตร์",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
