import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata = {
  title: "EduNexus-Gidhaur — Bihar Board & NCERT Platform",
  description: "Academic repository, examinations, attendance and curriculum system for Classes 1st-10th"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

