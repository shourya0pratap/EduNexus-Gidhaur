"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & Header
  schoolName: {
    en: "Gidhaur Central School",
    hi: "गिद्धौर सेन्ट्रल स्कूल"
  },
  schoolTagline: {
    en: "Bihar Board (BSEB) & NCERT Excellence",
    hi: "बिहार बोर्ड (BSEB) एवं NCERT उत्कृष्टता संस्थान"
  },
  districtState: {
    en: "Jamui, Bihar",
    hi: "जमुई, बिहार"
  },
  portalTitle: {
    en: "Academic Portal",
    hi: "शैक्षणिक पोर्टल"
  },
  switchLanguage: {
    en: "Language",
    hi: "भाषा"
  },
  english: {
    en: "English",
    hi: "अंग्रेज़ी"
  },
  hindi: {
    en: "हिन्दी",
    hi: "हिन्दी"
  },

  // Navigation
  navDashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड"
  },
  navStudents: {
    en: "Students Roster (400)",
    hi: "छात्र नामावली (400 छात्र)"
  },
  navTeachers: {
    en: "Faculty & Hierarchy (50)",
    hi: "शिक्षक एवं पदानुक्रम (50)"
  },
  navClasses: {
    en: "Classes (1st - 10th)",
    hi: "कक्षा 1 से 10वीं"
  },
  navExams: {
    en: "Examinations",
    hi: "परीक्षा प्रबंधन"
  },
  navAttendance: {
    en: "Daily Attendance",
    hi: "दैनिक उपस्थिति"
  },
  navResources: {
    en: "Curriculum Resources",
    hi: "पाठ्यक्रम एवं अध्ययन सामग्री"
  },
  navAssignments: {
    en: "Homework & Assignments",
    hi: "गृहकार्य एवं असाइनमेंट"
  },
  navAnalytics: {
    en: "School Analytics",
    hi: "संस्थान विश्लेषण"
  },
  navSettings: {
    en: "School Settings",
    hi: "विद्यालय सेटिंग्स"
  },
  navReportLookup: {
    en: "Public Report Lookup",
    hi: "सार्वजनिक अंकपत्र खोजें"
  },
  navSignOut: {
    en: "Sign Out",
    hi: "लॉग आउट"
  },
  navSignIn: {
    en: "Portal Login",
    hi: "पोर्टल लॉगिन"
  },

  // Roles & Badges
  roleAdmin: {
    en: "Principal / Admin",
    hi: "प्रधानाचार्य / प्रशासक"
  },
  role1stCoordinator: {
    en: "1st Class Coordinator",
    hi: "प्रथम कक्षा समन्वयक (उच्च नियंत्रण)"
  },
  role2ndCoordinator: {
    en: "2nd Class Coordinator",
    hi: "द्वितीय कक्षा समन्वयक"
  },
  rolePrimaryCoordinator: {
    en: "Primary Wing Coordinator",
    hi: "प्राथमिक प्रभाग समन्वयक"
  },
  roleHod: {
    en: "Department Head (HOD)",
    hi: "विभागाध्यक्ष (HOD)"
  },
  roleTeacher: {
    en: "Teacher / Faculty",
    hi: "शिक्षक / प्राध्यापक"
  },
  roleStudent: {
    en: "Student",
    hi: "छात्र / छात्रा"
  },
  roleParent: {
    en: "Parent / Guardian",
    hi: "अभिभावक"
  },

  // Common UI Actions
  search: {
    en: "Search...",
    hi: "खोजें..."
  },
  searchPlaceholder: {
    en: "Search by student name, roll, village, or subject...",
    hi: "नाम, रोल नंबर, गाँव या विषय द्वारा खोजें..."
  },
  filterByClass: {
    en: "Filter by Class",
    hi: "कक्षा अनुसार चुनें"
  },
  filterByBoard: {
    en: "Educational Board",
    hi: "शिक्षा बोर्ड"
  },
  allClasses: {
    en: "All Classes (1st to 10th)",
    hi: "सभी कक्षाएँ (1 से 10वीं)"
  },
  allBoards: {
    en: "All Boards (BSEB & CBSE)",
    hi: "सभी बोर्ड (BSEB व CBSE)"
  },
  bsebBoard: {
    en: "Bihar Board (BSEB)",
    hi: "बिहार बोर्ड (BSEB)"
  },
  cbseBoard: {
    en: "NCERT / CBSE",
    hi: "NCERT / CBSE बोर्ड"
  },
  alignedBoard: {
    en: "BSEB & NCERT Aligned",
    hi: "BSEB एवं NCERT समन्वित"
  },
  addStudent: {
    en: "Add Student",
    hi: "नया छात्र जोड़ें"
  },
  addTeacher: {
    en: "Add Teacher",
    hi: "नया शिक्षक जोड़ें"
  },
  addResource: {
    en: "Add New Resource",
    hi: "अध्ययन सामग्री जोड़ें"
  },
  readNotes: {
    en: "Read Chapter Notes",
    hi: "अध्याय नोट्स पढ़ें"
  },
  watchVideo: {
    en: "Watch Video Lecture",
    hi: "वीडियो व्याख्यान देखें"
  },
  openBook: {
    en: "Official Book PDF",
    hi: "आधिकारिक पाठ्यपुस्तक"
  },
  viewDetails: {
    en: "View Details",
    hi: "विवरण देखें"
  },
  close: {
    en: "Close",
    hi: "बंद करें"
  },
  save: {
    en: "Save Changes",
    hi: "परिवर्तन सहेजें"
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें"
  },
  statusActive: {
    en: "Active",
    hi: "सक्रिय"
  },
  statusInactive: {
    en: "Inactive",
    hi: "निष्क्रिय"
  },
  present: {
    en: "Present",
    hi: "उपस्थित"
  },
  absent: {
    en: "Absent",
    hi: "अनुपस्थित"
  },

  // Resource Categories & Syllabus
  resourceAll: {
    en: "All Resources",
    hi: "सभी संसाधन"
  },
  resourceNotes: {
    en: "Chapter Notes & Formulas",
    hi: "अध्याय नोट्स व सूत्र"
  },
  resourceBooks: {
    en: "Official Books (SCERT / NCERT)",
    hi: "आधिकारिक पुस्तकें"
  },
  resourceVideos: {
    en: "Video Lectures (Complete Syllabus)",
    hi: "वीडियो व्याख्यान (पूरा पाठ्यक्रम)"
  },
  resourceNotifications: {
    en: "Chapter Notifications & Alerts",
    hi: "अध्याय सूचनाएँ एवं सूचना पत्र"
  },
  completeSyllabusRoadmap: {
    en: "Complete Syllabus Roadmap",
    hi: "संपूर्ण पाठ्यक्रम रोडमैप"
  },

  // Database Engine
  localDbActive: {
    en: "Local Database Engine Active (data/local_db.json)",
    hi: "स्थानीय डेटाबेस इंजन सक्रिय (data/local_db.json)"
  },
  studentsCountLabel: {
    en: "400 Total Enrolled Students (Classes 1st-10th)",
    hi: "400 कुल नामांकित छात्र (कक्षा 1 से 10वीं)"
  },
  teachersCountLabel: {
    en: "50 Faculty Members & Academic Coordinators",
    hi: "50 शिक्षक एवं शैक्षणिक समन्वयक"
  },
  hierarchyHeading: {
    en: "Academic Hierarchy & Leadership Framework",
    hi: "शैक्षणिक पदानुक्रम एवं नियंत्रण व्यवस्था"
  },
  firstCoordinatorControlDesc: {
    en: "1st Class Coordinator holds direct academic moderation, class supervision & disciplinary authority across senior sections.",
    hi: "प्रथम कक्षा समन्वयक के पास वरिष्ठ प्रभाग में सीधी शैक्षणिक निगरानी, कक्षा नियंत्रण व परीक्षा समीक्षा के सर्वाधिकार हैं।"
  },
  secondCoordinatorControlDesc: {
    en: "2nd Class Coordinator manages middle wing syllabus compliance, attendance audits & teacher evaluations.",
    hi: "द्वितीय कक्षा समन्वयक माध्यमिक प्रभाग में पाठ्यक्रम अनुपालन, उपस्थिति समीक्षा व शिक्षक मूल्यांकन का संचालन करते हैं।"
  }
};

interface LanguageContextType {
  language: Language;
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  lang: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key, fallback) => fallback || key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("edunexus_lang") as Language;
      if (stored === "en" || stored === "hi") {
        setLanguageState(stored);
      }
    } catch {
      // ignore localStorage error
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("edunexus_lang", lang);
      document.cookie = `edunexus_lang=${lang}; path=/; max-age=31536000`;
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const t = (key: string, fallback?: string): string => {
    const item = TRANSLATIONS[key];
    if (item && item[language]) {
      return item[language];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, lang: language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
