"use client";

import Link from "next/link";
import { FileCheck, BookOpen, LogIn } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const NOTICES = [
  {
    ref: "GCS/ACAD/2026/089",
    date: "28 Sep 2026",
    title: "BSEB 10th Matriculation Board Examination 2026: Form Fill-up",
    title_hi: "बिहार बोर्ड (BSEB) 10वीं मैट्रिक परीक्षा 2026: फॉर्म भरना",
    desc: "Class 10 Sent-Up form submission opens from Oct 5th. Verify registration slips with Class Teacher.",
    desc_hi: "कक्षा 10 सेंट-अप फॉर्म जमा करना 5 अक्टूबर से खुलता है। कक्षा शिक्षक से पंजीकरण पर्ची सत्यापित करें।",
  },
  {
    ref: "GCS/SCH/2026/088",
    date: "25 Sep 2026",
    title: "Free SCERT Bihar & NCERT Textbooks: Classes 1 to 8",
    title_hi: "निःशुल्क SCERT बिहार एवं NCERT पाठ्यपुस्तकें: कक्षा 1 से 8वीं",
    desc: "Fresh textbooks arrived from District Education Office Jamui.",
    desc_hi: "नई पाठ्यपुस्तकें जिला शिक्षा कार्यालय जमुई से आई हैं।",
  },
  {
    ref: "GCS/PTM/2026/087",
    date: "22 Sep 2026",
    title: "Parent-Teacher Meeting and Mid-Term Report Card Release",
    title_hi: "अभिभावक-शिक्षक संगोष्ठी एवं अर्द्धवार्षिक अंकतालिका जारी",
    desc: "Saturday, Oct 10th from 9:00 AM. Review attendance, report cards, and coordinator remarks.",
    desc_hi: "शनिवार, 10 अक्टूबर सुबह 9:00 बजे। उपस्थिति, अंकतालिका और समन्वयक टिप्पणियों की समीक्षा करें।",
  },
];

const SUBJECTS = [
  { date: "Classes 1st to 5th", title: "Hindi: Kislay, Godhuli, Varnika", title_hi: "हिंदी: किस्लय, गोधूलि, वर्णिका", desc: "Literature, grammar and chapter alerts with NCERT/SCERT books.", desc_hi: "साहित्य, व्याकरण और अध्याय सूचनाएं, NCERT/SCERT पुस्तकों के साथ।" },
  { date: "Classes 6th to 10th", title: "Mathematics: Real Numbers, Trigonometry", title_hi: "गणित: वास्तविक संख्याएँ, त्रिकोणमिति", desc: "Polynomials, quadratic equations, surface areas, formula sheets.", desc_hi: "बहुपद, द्विघात समीकरण, पृष्ठीय क्षेत्रफल, फॉर्मूला शीट।" },
  { date: "Classes 6th to 10th", title: "Science: Physics, Chemistry, Biology", title_hi: "विज्ञान: भौतिकी, रसायन, जीव विज्ञान", desc: "Life processes, light optics, electricity, lab manuals.", desc_hi: "जीवन प्रक्रियाएं, प्रकाश प्रकाशिकी, विद्युत, प्रयोगशाला मैन्युअल।" },
  { date: "Classes 6th to 10th", title: "Social Science: History, Geography, Civics", title_hi: "सामाजिक विज्ञान: इतिहास, भूगोल, नागरिक शास्त्र", desc: "Champaran Satyagraha, Bihar maps, disaster management.", desc_hi: "चम्पारण सत्याग्रह, बिहार के मानचित्र, आपदा प्रबंधन।" },
  { date: "Classes 6th to 10th", title: "Sanskrit: Piyusham, Amrita", title_hi: "संस्कृत: पीयूषम्, अमृता", desc: "Sloka recitations, grammar formulas, board model answers.", desc_hi: "श्लोक सस्वर पाठ, व्याकरण सूत्र, बोर्ड परीक्षा उत्तर।" },
  { date: "Classes 1st to 10th", title: "English: Blossom, Radiance, Panorama", title_hi: "अंग्रेजी: ब्लॉसम, रेडियंस, पैनोरमा", desc: "Grammar practice, chapter summaries, pronunciation videos.", desc_hi: "व्याकरण अभ्यास, अध्याय सारांश, उच्चारण वीडियो।" },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const L = (hi: string, en: string) => (lang === "hi" ? hi : en);

  return (
    <main className="min-h-screen antialiased">
      <nav className="nav-pill">
        <div className="flex items-center gap-4">
          <Link href="/" className="wordmark" aria-label="Home">
            EN
          </Link>
          <span className="text-[var(--text-xs)] text-[var(--color-muted)] font-medium">गिद्धौर, जमुई (बिहार)</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/report" className="btn btn--primary" aria-label="Open report card by roll number">
            <FileCheck size={14} />
            {L("अंकतालिका खोलें", "Open Report Card")}
          </Link>
          <Link href="/login" className="btn btn--outline" aria-label="Portal login">
            <LogIn size={14} />
            {L("पोर्टल लॉगिन", "Portal Login")}
          </Link>
        </div>
      </nav>

      <section className="hero-settled" aria-labelledby="hero-head">
        <div className="hero-inner">
          <div>
            <h1 id="hero-head" className="mb-4">
              {lang === "hi" ? "गिद्धौर सेन्ट्रल स्कूल" : "Gidhaur Central School"}
            </h1>
            <p className="hero-lead">
              {lang === "hi"
                ? "बिहार बोर्ड एवं NCERT। रोल नंबर से अंकतालिका। कक्षा 1 से 10वीं तक अध्ययन सामग्री।"
                : "Bihar Board & NCERT. Report cards by roll number. Study resources, Classes 1–10."}
            </p>
            <div className="hero-actions">
              <Link href="/report" className="btn btn--primary" aria-label="Open report card by roll number" style={{ whiteSpace: "nowrap" }}>
                <FileCheck size={14} />
                {lang === "hi" ? "अंकतालिका खोलें (रोल नंबर)" : "Report Card by Roll No"}
              </Link>
              <Link href="/resources" className="btn btn--outline" aria-label="Study resources">
                <BookOpen size={14} />
                {lang === "hi" ? "अध्ययन सामग्री (कक्षा 1-10)" : "Study Resources"}
              </Link>
            </div>
          </div>
          <div className="slot slot--portrait" aria-label="Reading room" data-credit="Villy Fink Isaksen (CC BY-SA 4.0, Wikimedia Commons)">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1280px-Statsbiblioteket_l%C3%A6sesalen-2.jpg"
              srcSet="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/960px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 960w, https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1280px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 1280w, https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Statsbiblioteket_l%C3%A6sesalen-2.jpg/1920px-Statsbiblioteket_l%C3%A6sesalen-2.jpg 1920w"
              sizes="100vw" width={1280} height={947} alt="" loading="eager" fetchPriority="high" data-keep
            />
            <figcaption className="text-[var(--text-xs)] text-[var(--color-muted)] mt-2">
              Photograph: Villy Fink Isaksen (CC BY-SA 4.0, Wikimedia Commons), stand-in; replace with the school’s own.
            </figcaption>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="notices-head">
        <div className="container">
          <div className="head-block">
            <h2 id="notices-head">{L("सूचना पट: अब क्या चल रहा है", "Notice Board: What's On Now")}</h2>
            <p className="lead">{lang === "hi" ? "बिना लॉगिन के सार्वजनिक सूचनाएं: बोर्ड परीक्षा, पाठ्यपुस्तक वितरण, अभिभावक संगोष्ठी।" : "Public notices without login: board exams, textbook distribution, parent-teacher meetings."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NOTICES.map((n) => (
              <article key={n.ref} className="card">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[var(--text-xs)] font-medium text-[var(--color-muted)]">{lang === "hi" ? "सूचना" : "Notice"}</span>
                  <span className="text-[var(--text-xs)] font-[var(--font-outlier)] text-[var(--color-muted)]">{n.date}</span>
                </div>
                <h3 className="text-[var(--text-title)] font-bold text-[var(--color-ink)] mb-1 leading-snug">{lang === "hi" ? n.title_hi : n.title}</h3>
                <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] leading-relaxed mb-4">{lang === "hi" ? n.desc_hi : n.desc}</p>
                <div className="flex items-center justify-between text-[var(--text-xs)] text-[var(--color-muted)] font-[var(--font-outlier)]">
                  <span>{n.ref}</span>
                  <Link href="/announcements" className="text-[var(--color-accent)] font-bold hover:underline" style={{ whiteSpace: "nowrap" }}>
                    {lang === "hi" ? "विस्तार से पढ़ें" : "Read the notice"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="curriculum-head">
        <div className="container">
          <div className="head-block">
            <h2 id="curriculum-head">{L("पाठ्यक्रम: आ रहा है क्या", "Curriculum: What's Coming")}</h2>
            <p className="lead">{lang === "hi" ? "बिहार राज्य बोर्ड (BSEB पटना) एवं NCERT/CBSE संबद्ध विषय, अध्याय सूचनाएं, पुस्तकें और वीडियो रोडमैप।" : "Bihar State Board (BSEB Patna) & NCERT/CBSE aligned subjects with chapter alerts, books and video roadmaps."}</p>
          </div>
          <div className="space-y-1">
            {SUBJECTS.map((s) => (
              <div key={s.title} className="dated-row">
                <span className="date">{s.date}</span>
                <span className="title">{lang === "hi" ? s.title_hi : s.title}</span>
                <span className="desc">{lang === "hi" ? s.desc_hi : s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="access-head">
        <div className="container">
          <div className="head-block" style={{ maxWidth: "40ch" }}>
            <h2 id="access-head">{L("प्रवेश: अंदर कैसे आएं", "Access: Get In")}</h2>
            <p className="lead">{lang === "hi" ? "छात्र, अभिभावक, शिक्षक और प्राचार्य के लिए भूमिका-आधारित पोर्टल।" : "Role-based portals for students, guardians, teachers and the principal."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Link href="/login" className="btn btn--primary" aria-label="Sign in to portal">
              {lang === "hi" ? "पोर्टल में लॉगिन करें" : "Sign In to Portal"}
            </Link>
            <Link href="/report" className="btn btn--outline" aria-label="Lookup report card">
              {lang === "hi" ? "अंकतालिका खोजें (रोल नंबर व जन्मतिथि)" : "Lookup Report Card"}
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer-close" data-credits="Villy Fink Isaksen (CC BY-SA 4.0, Wikimedia Commons)">
        <div className="container">
          <div className="address">
            {lang === "hi" ? "गिद्धौर सेन्ट्रल स्कूल" : "Gidhaur Central School"}<br />
            Station Road, Near Minto Tower, Gidhaur, District Jamui, Bihar: 811305
          </div>
          <p className="mt-3 text-[var(--text-xs)] text-[var(--color-muted)]">
            Photographs: <a href="https://commons.wikimedia.org/wiki/File:Statsbiblioteket_l%C3%A6sesalen-2.jpg" className="text-[var(--color-accent)] hover:underline">Villy Fink Isaksen (CC BY-SA 4.0, Wikimedia Commons)</a>, stand-in; replace with the school’s own.
          </p>
        </div>
      </footer>
    </main>
  );
}
