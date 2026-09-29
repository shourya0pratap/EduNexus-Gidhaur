"use client";

import Link from "next/link";
import {
  BookOpen, Users, CalendarCheck, FileCheck, Shield,
  ArrowRight, School, Sparkles, GraduationCap, Award, BookCheck, PlayCircle, Bell
} from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Navigation Top Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-extrabold shadow-sm">
              EN
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-slate-900">EduNexus</span>
                <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Gidhaur
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {lang === "hi" ? "बिहार बोर्ड (BSEB) एवं NCERT पाठ्यक्रम" : "Bihar Board (BSEB) & NCERT Academic Engine"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href="/report"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              {t("public_lookup")}
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition active:scale-95"
            >
              {t("portal_login")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 pt-12 pb-16 sm:px-6 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-800 backdrop-blur-xs">
            <School size={14} className="text-blue-600" />
            <span>
              {lang === "hi"
                ? "गिद्धौर सेन्ट्रल स्कूल, जमुई (बिहार) · BSEB एवं CBSE/NCERT मान्यता प्राप्त"
                : "Gidhaur Central School, Jamui (Bihar) · BSEB & CBSE/NCERT Mapped"}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
            {lang === "hi" ? "बिहार बोर्ड एवं NCERT के लिए" : "Academic Foundation for"}{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {lang === "hi" ? "कक्षा 1 से 10वीं सम्पूर्ण शैक्षिक मंच" : "Bihar Board & NCERT Excellence"}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base text-slate-600 sm:text-lg">
            {lang === "hi"
              ? "स्थानीय डेटाबेस इंजन पर संचालित पूर्ण विद्यालय प्रबंधन प्रणाली: 400 प्रामाणिक छात्र (जमुई/गिद्धौर), 50 शिक्षक एवं 5-स्तरीय पदानुक्रम (1st व 2nd क्लास कोऑर्डिनेटर के विशेष उच्च नियंत्रण सहित), सभी विषयों के वीडियो लेक्चर्स, पुस्तकें एवं अध्याय सूचनाएं।"
              : "Complete academic workspace powered by a persistent local database engine: 400 authentic Bihar students (Jamui/Gidhaur), 50 faculty with a 5-level hierarchy (featuring 1st & 2nd Class Coordinators with high administrative control), and full curriculum video lectures, textbooks & chapter notifications for Classes 1 to 10."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-95 transition"
              href="/login"
            >
              {lang === "hi" ? "पोर्टल में लॉगिन करें" : "Enter Academic Portal"} <ArrowRight size={16} />
            </Link>
            <Link
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition active:scale-95"
              href="/report"
            >
              {lang === "hi" ? "सार्वजनिक अंकतालिका खोज (रोल नं व जन्मतिथि)" : "Public Report Lookup (Roll & DOB)"}
            </Link>
          </div>

          {/* Quick Stats Pill Bar */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900">400</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs font-bold text-slate-700 mt-1">
                {lang === "hi" ? "नामांकित छात्र (1ली-10वीं)" : "Students Database"}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === "hi" ? "40 छात्र प्रति वर्ग · वर्ग A व B" : "Classes 1st–10th (Sec A & B)"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-blue-600">50</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">L1-L5</span>
              </div>
              <p className="text-xs font-bold text-slate-700 mt-1">
                {lang === "hi" ? "शिक्षक व समन्वयक" : "Faculty Hierarchy"}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === "hi" ? "1st व 2nd कोऑर्डिनेटर उच्च नियंत्रण" : "1st & 2nd Coordinators"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-600">1st – 10th</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">BSEB/CBSE</span>
              </div>
              <p className="text-xs font-bold text-slate-700 mt-1">
                {lang === "hi" ? "सम्पूर्ण पाठ्यक्रम संसाधन" : "Curriculum Engine"}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === "hi" ? "वीडियो, पुस्तकें एवं अध्याय सूचनाएं" : "Videos, Books & Alerts"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-left">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-purple-600">Local DB</span>
                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              </div>
              <p className="text-xs font-bold text-slate-700 mt-1">
                {lang === "hi" ? "स्वदेशी स्थानीय इंजन" : "Persistent Engine"}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === "hi" ? "तेज़, सुरक्षित व स्वायत्त डेटाबेस" : "data/local_db.json"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Hierarchy & Coordinator Spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {lang === "hi" ? "50 शिक्षक एवं 5-स्तरीय पदानुक्रम" : "50 Faculty Members & 5-Level Hierarchy"}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {lang === "hi" ? "प्रथम एवं द्वितीय वर्ग समन्वयकों का विशेष प्रशासनिक नियंत्रण" : "Special Administrative Control for 1st & 2nd Coordinators"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {lang === "hi"
              ? "विद्यालय में 50 प्रामाणिक शिक्षकों का 5 स्तरों पर संगठन किया गया है, जिसमें वर्ग समन्वयकों को उच्चतर प्रशासनिक अधिकार प्राप्त हैं।"
              : "Structured faculty hierarchy ranging from Executive Leadership to Primary Educators, with specialized moderation powers for designated Wing Coordinators."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 1st Class Coordinator Card */}
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between pb-3 border-b border-amber-200">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-3 py-1 text-xs font-black text-amber-900">
                <Award size={14} />
                {lang === "hi" ? "प्रथम वर्ग समन्वयक (1st Class Coordinator)" : "1st Class Coordinator (Senior Secondary)"}
              </span>
              <span className="text-xs font-mono font-bold text-amber-800">Level 2 · High Control</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-black text-slate-900">Dr. Rameshwar Prasad Singh (डॉ. रामेश्वर प्रसाद सिंह)</h3>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">M.Sc. Physics, Ph.D., B.Ed. · Code: EMP002</p>
              <p className="text-xs font-bold text-amber-900 mt-2">
                {lang === "hi" ? "प्रभार: कक्षा 9वीं एवं 10वीं (मैट्रिक बोर्ड विंग)" : "Scope: Classes 9th & 10th (Senior Secondary Matric Wing)"}
              </p>
              <div className="mt-3 rounded-2xl bg-amber-100/70 p-3.5 text-xs text-amber-950 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <Shield size={14} className="text-amber-800" />
                  {lang === "hi" ? "प्रदत्त उच्चतर प्रशासनिक अधिकार:" : "Designated Higher Administrative Controls:"}
                </p>
                <p>• {lang === "hi" ? "मैट्रिक परीक्षा प्रश्नपत्र मॉडरेशन और अंतिम अंक सत्यापन" : "Senior Matric exam moderation, result verification, and question bank approval."}</p>
                <p>• {lang === "hi" ? "कक्षा 9-10 के शिक्षकों का दैनिक समीक्षा एवं शिक्षण गुणवत्ता नियंत्रण" : "Senior wing faculty observation, lesson audit, and remedial class scheduling."}</p>
                <p>• {lang === "hi" ? "बोर्ड पंजीकरण एवं गंभीर अनुशासन मामलों का न्यायिक निस्तारण" : "BSEB board registration validation and disciplinary suspension approvals."}</p>
              </div>
              <p className="mt-3 text-[11px] font-mono text-slate-600">
                Email: <span className="font-bold text-slate-900">rameshwar.singh@edunexus.edu</span> · Pass: <span className="font-bold text-amber-700">Teacher@123</span>
              </p>
            </div>
          </div>

          {/* 2nd Class Coordinator Card */}
          <div className="rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-200">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-200/80 px-3 py-1 text-xs font-black text-indigo-900">
                <Award size={14} />
                {lang === "hi" ? "द्वितीय वर्ग समन्वयक (2nd Class Coordinator)" : "2nd Class Coordinator (Middle Wing)"}
              </span>
              <span className="text-xs font-mono font-bold text-indigo-800">Level 2 · High Control</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-black text-slate-900">Smt. Sunita Verma (श्रीमती सुनीता वर्मा)</h3>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">M.A. Hindi & Sanskrit, B.Ed. · Code: EMP003</p>
              <p className="text-xs font-bold text-indigo-900 mt-2">
                {lang === "hi" ? "प्रभार: कक्षा 6ठी से 8वीं (मिडिल स्कूल विंग)" : "Scope: Classes 6th through 8th (Middle School Wing)"}
              </p>
              <div className="mt-3 rounded-2xl bg-indigo-100/70 p-3.5 text-xs text-indigo-950 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <Shield size={14} className="text-indigo-800" />
                  {lang === "hi" ? "प्रदत्त उच्चतर प्रशासनिक अधिकार:" : "Designated Higher Administrative Controls:"}
                </p>
                <p>• {lang === "hi" ? "मिडिल विंग (कक्षा 6-8) पाठ्यक्रम प्रगति मॉनिटरिंग एवं मासिक समीक्षा" : "Middle wing curriculum pacing audit, syllabus completion checks, and parent meets."}</p>
                <p>• {lang === "hi" ? "छात्र उपस्थिति कम होने पर अभिभावक समन एवं परामर्श अधिकार" : "Low attendance intervention, student guardian summons, and mentorship oversight."}</p>
                <p>• {lang === "hi" ? "सह-पाठ्यचर्या, विज्ञान प्रदर्शनी एवं खेल प्रतियोगिता आयोजन नियंत्रण" : "Co-curricular events, science exhibitions, and inter-section competition approval."}</p>
              </div>
              <p className="mt-3 text-[11px] font-mono text-slate-600">
                Email: <span className="font-bold text-slate-900">sunita.verma@edunexus.edu</span> · Pass: <span className="font-bold text-indigo-700">Teacher@123</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/admin/teachers"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition"
          >
            <Users size={16} />
            {lang === "hi" ? "सभी 50 शिक्षकों की पूर्ण पदानुक्रम निर्देशिका देखें" : "View Complete Directory of All 50 Teachers"} <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Curriculum Coverage for Classes 1st - 10th */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {lang === "hi" ? "कक्षा 1ली से 10वीं सम्पूर्ण पाठ्यक्रम" : "All Grades 1st Through 10th Complete Syllabus"}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {lang === "hi" ? "अध्याय सूचनाएं, आधिकारिक पुस्तकें एवं वीडियो लेक्चर्स" : "Chapter Notifications, Textbooks & Video Roadmaps"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {lang === "hi"
              ? "बिहार राज्य बोर्ड (BSEB पटना) एवं NCERT पाठ्यक्रम का हर विषय: किस्लय, गोधूलि, वर्णिका, पीयूषम्, गणित, विज्ञान एवं सामाजिक अध्ययन।"
              : "Aligned with Bihar State Board (BSEB Patna) & NCERT/CBSE: Kislay, Godhuli, Varnika, Piyusham, Ganit, Vigyan and Social Studies with full video syllabus roadmap."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: lang === "hi" ? "हिंदी (साहित्य, गोधूलि, किस्लय व व्याकरण)" : "Hindi (Literature & Grammar)",
              grades: "Classes 1st – 10th",
              books: "किस्लय (SCERT Bihar 1-8), गोधूलि व वर्णिका भाग-2 (BSEB 10th Matric)",
              desc: "Dr. B.R. Ambedkar's 'Shram Vibhajan', 'Bis ke Dant', Magamma, Varnamala to Matric standards.",
              icon: "📖",
              badge: "BSEB & NCERT",
              features: lang === "hi" ? "अध्याय सूचनाएं + NCERT/SCERT पुस्तकें + वीडियो व्याख्यान" : "Chapter Alerts + Official Books + Full Video Lectures"
            },
            {
              title: lang === "hi" ? "गणित (Mathematics: रेखागणित, बीजगणित, त्रिकोणमिति)" : "Mathematics (Ganit)",
              grades: "Classes 1st – 10th",
              books: "Math-Magic (1-5), Ganit NCERT/BSEB (6-10 Matric Board Standard)",
              desc: "Real Numbers, Polynomials, Trigonometry (Heights & Distances), Quadratic Equations, Surface Areas.",
              icon: "📐",
              badge: "Complete Syllabus",
              features: lang === "hi" ? "फॉर्मूला शीट्स + एनसीईआरटी समाधान + सम्पूर्ण वीडियो हल" : "Formula Sheets + NCERT Solutions + Step-by-Step Video Solvers"
            },
            {
              title: lang === "hi" ? "विज्ञान (Science: भौतिकी, रसायन, जीव विज्ञान)" : "Science (Physics, Chemistry, Biology)",
              grades: "Classes 1st – 10th",
              books: "General Science, Physics, Chemistry, Biology & Laboratory Manuals",
              desc: "Chemical Reactions, Life Processes (Nephron, Circulation), Light Optics, Electricity, Cell Biology.",
              icon: "🔬",
              badge: "Labs & Concepts",
              features: lang === "hi" ? "प्रयोगशाला मैन्युअल + बोर्ड प्रश्न बैंक + वीडियो प्रयोग" : "Lab Manuals + Board Question Banks + Video Demonstrations"
            },
            {
              title: lang === "hi" ? "संस्कृत (पीयूषम् एवं अमृता)" : "Sanskrit (Piyusham & Amrita)",
              grades: "Classes 6th – 10th",
              books: "अमृता (Classes 6-8), पीयूषम् भाग 1-2 (BSEB 9th-10th Matric)",
              desc: "Mangalam Upanishad, Patliputra Vaibhavam, Alaskatha, Niti Shlokas, Karak & Sandhi rules.",
              icon: "🪶",
              badge: "BSEB Special",
              features: lang === "hi" ? "श्लोक सस्वर पाठ + व्याकरण सूत्र + बोर्ड परीक्षा उत्तर" : "Sloka Recitations + Grammar Formulas + Board Model Answers"
            },
            {
              title: lang === "hi" ? "सामाजिक विज्ञान (इतिहास, भूगोल, नागरिक, आपदा प्रबंधन)" : "Social Science (SST & Bihar)",
              grades: "Classes 6th – 10th",
              books: "इतिहास (Europe/Bharat Rashtravad), भूगोल (Sansadhan), राजनीति, अर्थशास्त्र व आपदा प्रबंधन",
              desc: "Champaran Satyagraha 1917, Quit India Patna Martyrs, Kosi Floods & Bihar Disaster Management.",
              icon: "🌍",
              badge: "Bihar Focus",
              features: lang === "hi" ? "बिहार का मानचित्र + चम्पारण सत्याग्रह नोट्स + वीडियो वृत्तचित्र" : "Bihar Maps + Champaran Satyagraha Notes + Video Documentaries"
            },
            {
              title: lang === "hi" ? "अंग्रेजी (English: Panorama, Blossom, Radiance)" : "English (Language & Literature)",
              grades: "Classes 1st – 10th",
              books: "Blossom (1-5), Radiance (6-8), Panorama Part 1-2 & First Flight (9-10)",
              desc: "The Pace for Living, Gillu, A Letter to God, Tenses, Grammar concord, Formal Letter writing.",
              icon: "✍️",
              badge: "NCERT & BSEB",
              features: lang === "hi" ? "ग्रामर प्रैक्टिस + अध्याय सारांश + धाराप्रवाह वाचन वीडियो" : "Grammar Practice + Chapter Summaries + Pronunciation Videos"
            }
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                    {card.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-0.5 text-xs font-semibold text-purple-700">{card.grades}</p>
                <div className="mt-2.5 rounded-lg bg-slate-50 p-2.5 text-xs font-medium text-slate-600">
                  📚 {card.books}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">{card.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <PlayCircle size={13} className="shrink-0" />
                  <span>{card.features}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/admin/resources"
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                >
                  {lang === "hi" ? "संसाधन व वीडियो देखें" : "View Documentation & Videos"} <ArrowRight size={14} />
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">BSEB/CBSE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Workspaces Section */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">
              {lang === "hi" ? "प्रत्येक भूमिका के लिए समर्पित कार्यक्षेत्र" : "Tailored Workspaces for Every Role"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {lang === "hi"
                ? "प्राचार्य, वर्ग समन्वयक, संकाय शिक्षक, 400 छात्र एवं अभिभावकों के लिए सुरक्षित भूमिका-आधारित पहुंच।"
                : "Role-based security ensuring administrators, educators, 400 students and guardians have personalized access."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Shield className="text-purple-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                {lang === "hi" ? "विद्यालय प्रशासन" : "School Admin"}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {lang === "hi"
                  ? "400 छात्रों का रोस्टर, 50 शिक्षकों की पदानुक्रम सूची, परीक्षा निर्माण एवं रिपोर्ट कार्ड जेनरेशन।"
                  : "Full 400 student roster management, 50-teacher hierarchy, examinations, and institution settings."}
              </p>
              <Link href="/login" className="mt-4 inline-block text-xs font-bold text-purple-700 hover:underline">
                {lang === "hi" ? "प्रशासक के रूप में लॉगिन करें →" : "Sign in as Admin →"}
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Award className="text-amber-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                {lang === "hi" ? "शिक्षक व समन्वयक" : "Teacher & Coordinators"}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {lang === "hi"
                  ? "दैनिक उपस्थिति, विषय अंक प्रविष्टि, और 1st/2nd कोऑर्डिनेटर का विशेष मॉडरेशन और ऑडिट नियंत्रण।"
                  : "Fast attendance marking, marks entry, and designated 1st/2nd coordinator moderation authority."}
              </p>
              <Link href="/login" className="mt-4 inline-block text-xs font-bold text-blue-700 hover:underline">
                {lang === "hi" ? "शिक्षक पोर्टल में लॉगिन करें →" : "Sign in as Teacher →"}
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <BookOpen className="text-emerald-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                {lang === "hi" ? "छात्र पोर्टल" : "Student Dashboard"}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {lang === "hi"
                  ? "कक्षा 1 से 10वीं तक के वीडियो लेक्चर्स, NCERT/BSEB किताबें, उपस्थिति प्रतिशत और परीक्षा समय-सारणी।"
                  : "Access Bihar Board study materials, video lectures, attendance track record, and exam schedule."}
              </p>
              <Link href="/login" className="mt-4 inline-block text-xs font-bold text-emerald-700 hover:underline">
                {lang === "hi" ? "छात्र के रूप में लॉगिन करें →" : "Sign in as Student →"}
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <FileCheck className="text-amber-600" size={24} />
              <h3 className="mt-3 font-bold text-slate-900">
                {lang === "hi" ? "सार्वजनिक अंकतालिका" : "Public Report Cards"}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {lang === "hi"
                  ? "रोल नंबर एवं जन्मतिथि की सहायता से किसी भी छात्र का तत्काल अंकतालिका व उपस्थिति सत्यापन।"
                  : "Instant student verification and report card lookup using Roll Number and Date of Birth."}
              </p>
              <Link href="/report" className="mt-4 inline-block text-xs font-bold text-amber-700 hover:underline">
                {lang === "hi" ? "अंकतालिका खोजें →" : "Lookup Report Card →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 py-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-bold text-white text-sm">Gidhaur Central School (गिद्धौर सेन्ट्रल स्कूल)</p>
            <p className="mt-0.5">Station Road, Near Minto Tower, Gidhaur, District Jamui, Bihar - 811305</p>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white">{t("portal_login")}</Link>
            <Link href="/report" className="hover:text-white">{t("public_lookup")}</Link>
            <Link href="/admin/resources" className="hover:text-white">{t("study_resources")}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
