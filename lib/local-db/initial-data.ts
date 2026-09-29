export interface Profile {
  id: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent";
  full_name: string;
  avatar_url?: string;
  is_active: boolean;
  phone?: string;
  password?: string;
  class_name?: string;
}

export interface SchoolSettings {
  id: string;
  school_name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string | null;
  principal_name: string;
  affiliation_code: string;
  board: string;
  attendance_threshold: number;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade_level: number;
  academic_year: string;
  is_active: boolean;
  sections?: { id: string; name: string }[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  hindi_name: string;
  description: string;
  board_coverage: string;
  is_active: boolean;
}

export interface Teacher {
  id: string;
  profile_id?: string;
  full_name: string;
  employee_code: string;
  email: string;
  phone: string;
  designation: string;
  qualification: string;
  specialization: string;
  classes_assigned: string[];
  is_active: boolean;
  hierarchy_level?: number;
  hierarchy_title?: string;
  coordinator_role?: "1st_class_coordinator" | "2nd_class_coordinator" | "primary_coordinator" | "exam_coordinator" | null;
  control_level?: string;
  control_badge?: string;
  subjects?: string[];
  password?: string;
}

export interface Student {
  id: string;
  profile_id?: string;
  full_name: string;
  roll_number: string;
  date_of_birth: string;
  gender: string;
  admission_number: string;
  parent_name: string;
  parent_phone: string;
  mother_name?: string;
  village_or_town: string;
  district: string;
  state: string;
  pincode: string;
  email: string;
  is_active: boolean;
  class_id: string;
  class_name: string;
  section_name?: string;
  blood_group?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  title_hindi?: string;
  subject_id: string;
  class_id: string;
  grade_level: number;
  subject_name: string;
  class_name: string;
  board: "Bihar Board (BSEB)" | "NCERT / CBSE" | "BSEB & NCERT Aligned";
  book_reference: string;
  resource_type: "syllabus" | "chapter_notes" | "formula_sheet" | "model_paper" | "solution_guide" | "pdf" | "notification" | "video_lecture";
  description: string;
  content_markdown: string;
  file_url: string;
  upload_date: string;
  author: string;
  video_url?: string;
  video_title?: string;
  chapter_number?: number;
  chapter_name?: string;
  notification_text?: string;
}

export interface Exam {
  id: string;
  name: string;
  exam_type: string;
  class_id: string;
  academic_year: string;
  start_date: string;
  end_date: string;
  status: "draft" | "published" | "closed";
  classes?: { id: string; name: string };
}

export interface ExamSubject {
  id: string;
  exam_id: string;
  subject_id: string;
  maximum_marks: number;
  passing_marks: number;
  weightage?: number;
  exams?: { id: string; name: string };
  subjects?: { id: string; name: string; code: string };
}

export interface Mark {
  id: string;
  exam_subject_id: string;
  student_id: string;
  marks_obtained: number;
  students?: { id: string; full_name: string; roll_number: string };
}

export interface AttendanceSession {
  id: string;
  class_id: string;
  section_id: string | null;
  subject_id: string | null;
  teacher_id: string | null;
  attendance_date: string;
  attendance?: { id: string; session_id: string; student_id: string; status: "present" | "absent" | "late" }[];
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  status: "present" | "absent" | "late";
  note?: string;
  marked_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject_id: string;
  class_id: string;
  teacher_id: string;
  deadline: string;
  classes?: { id: string; name: string };
  subjects?: { id: string; name: string };
  teachers?: { id: string; full_name: string };
}

export interface Parent {
  id: string;
  profile_id?: string;
  full_name: string;
  phone: string;
  email: string;
  village: string;
  occupation: string;
}

export interface ParentStudent {
  parent_id: string;
  student_id: string;
  relationship: string;
  students?: { id: string; full_name: string; roll_number: string };
}

// ---------------------------------------------------------
// INITIAL DATA CONSTANTS
// ---------------------------------------------------------

export const INITIAL_SCHOOL_SETTINGS: SchoolSettings = {
  id: "sch-01",
  school_name: "Gidhaur Central School (गिद्धौर सेन्ट्रल स्कूल)",
  tagline: "Bihar Board (BSEB) & NCERT Mapped Model Academic Institution",
  address: "Station Road, Near Minto Tower, Gidhaur, District Jamui, Bihar - 811305",
  phone: "+91 94312 34567 / +91 6345 274201",
  email: "contact@gidhaurschool.bihar.gov.in",
  website: "https://gidhaurschool.bihar.gov.in",
  principal_name: "Dr. Arvind Pathak (M.Sc., Ph.D., B.Ed.)",
  affiliation_code: "BSEB-JM-41002 / U-DISE: 10240301502",
  board: "Bihar School Examination Board (BSEB, Patna) & NCERT Framework",
  attendance_threshold: 75
};

export const INITIAL_CLASSES: ClassRoom[] = [
  { id: "c-01", name: "Class 1-A", grade_level: 1, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-01a", name: "Section A" }, { id: "sec-01b", name: "Section B" }] },
  { id: "c-02", name: "Class 2-A", grade_level: 2, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-02a", name: "Section A" }, { id: "sec-02b", name: "Section B" }] },
  { id: "c-03", name: "Class 3-A", grade_level: 3, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-03a", name: "Section A" }, { id: "sec-03b", name: "Section B" }] },
  { id: "c-04", name: "Class 4-A", grade_level: 4, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-04a", name: "Section A" }, { id: "sec-04b", name: "Section B" }] },
  { id: "c-05", name: "Class 5-A", grade_level: 5, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-05a", name: "Section A" }, { id: "sec-05b", name: "Section B" }] },
  { id: "c-06", name: "Class 6-A", grade_level: 6, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-06a", name: "Section A" }, { id: "sec-06b", name: "Section B" }] },
  { id: "c-07", name: "Class 7-A", grade_level: 7, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-07a", name: "Section A" }, { id: "sec-07b", name: "Section B" }] },
  { id: "c-08", name: "Class 8-A", grade_level: 8, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-08a", name: "Section A" }, { id: "sec-08b", name: "Section B" }] },
  { id: "c-09", name: "Class 9-A", grade_level: 9, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-09a", name: "Section A" }, { id: "sec-09b", name: "Section B" }] },
  { id: "c-10", name: "Class 10-A", grade_level: 10, academic_year: "2026-27", is_active: true, sections: [{ id: "sec-10a", name: "Section A (Matric Board)" }, { id: "sec-10b", name: "Section B" }] }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: "sub-hin", name: "Hindi (हिंदी)", code: "HIN", hindi_name: "हिंदी साहित्य एवं व्याकरण", description: "Bihar SCERT Kislay / Godhuli & Varnika & NCERT Vasant / Kshitij", board_coverage: "Classes 1st to 10th (BSEB & NCERT)", is_active: true },
  { id: "sub-eng", name: "English (अंग्रेजी)", code: "ENG", hindi_name: "अंग्रेजी भाषा व साहित्य", description: "Blossom, Radiance, Panorama, First Flight & Footprints without Feet", board_coverage: "Classes 1st to 10th (BSEB & NCERT)", is_active: true },
  { id: "sub-mat", name: "Mathematics (गणित)", code: "MATH", hindi_name: "गणित", description: "Math-Magic (Class 1-5), Ganit NCERT/BSEB (Class 6-10 Matric Board Standard)", board_coverage: "Classes 1st to 10th (BSEB & NCERT)", is_active: true },
  { id: "sub-sci", name: "Science (विज्ञान)", code: "SCI", hindi_name: "विज्ञान (भौतिकी, रसायन, जीवविज्ञान)", description: "General Science, Environmental Science, Physics, Chemistry, Biology & Laboratory Experiments", board_coverage: "Classes 1st to 10th", is_active: true },
  { id: "sub-sst", name: "Social Science (सामाजिक विज्ञान)", code: "SST", hindi_name: "सामाजिक विज्ञान (इतिहास, भूगोल, नागरिक शास्त्र, अर्थशास्त्र, आपदा प्रबंधन)", description: "Hamara Atit, Bharat Sansadhan Evam Upyog, Loktantrik Rajniti, Arthvyavastha & Bihar Aapda Prabandhan", board_coverage: "Classes 1st to 10th (BSEB & NCERT)", is_active: true },
  { id: "sub-san", name: "Sanskrit (संस्कृत)", code: "SAN", hindi_name: "संस्कृत (पीयूषम् व अमृता)", description: "Amrita Bhag 1-3 (Classes 6-8), Piyusham Bhag 1-2 (Classes 9-10 Matric Board) & Shemushi", board_coverage: "Classes 6th to 10th (BSEB & NCERT)", is_active: true },
  { id: "sub-evs", name: "Environmental Studies (पर्यावरण और हम)", code: "EVS", hindi_name: "पर्यावरण अध्ययन (आस-पास)", description: "SCERT Bihar Paryavaran Aur Hum (भाग 1-3) & NCERT Looking Around", board_coverage: "Classes 1st to 5th Primary", is_active: true },
  { id: "sub-cs", name: "Computer Science (सूचना प्रौद्योगिकी)", code: "CS", hindi_name: "कम्प्यूटर शिक्षा व डिजिटल साक्षरता", description: "Fundamentals of ICT, Office Tools, Digital Literacy & Scratch/Python Basics", board_coverage: "Classes 3rd to 10th", is_active: true }
];

import {
  generate50Teachers,
  generate400Students,
  generateSyllabusResources
} from "./data-generator";

const { teachers: GEN_TEACHERS, profiles: TEACHER_PROFILES } = generate50Teachers();
const { students: GEN_STUDENTS, profiles: STUDENT_PROFILES } = generate400Students();
export const GEN_SYLLABUS_RESOURCES = generateSyllabusResources();

export const INITIAL_TEACHERS: Teacher[] = GEN_TEACHERS;

const OLD_TEACHERS: Teacher[] = [
  {
    id: "t-01",
    profile_id: "p-teacher-01",
    full_name: "Rajesh Sharma (राजेश शर्मा)",
    employee_code: "GCS-BSEB-T101",
    email: "rajesh.sharma@edunexus.edu",
    phone: "+91 98351 12340",
    designation: "Senior PGT Mathematics & Science",
    qualification: "M.Sc. (Mathematics), B.Ed. (Patna University)",
    specialization: "Class 9 & 10 Board Exam Preparation & NCERT Problem Solving",
    classes_assigned: ["Class 10-A", "Class 9-A", "Class 8-A"],
    is_active: true
  },
  {
    id: "t-02",
    profile_id: "p-teacher-02",
    full_name: "Sunita Verma (सुनीता वर्मा)",
    employee_code: "GCS-BSEB-T102",
    email: "sunita.verma@edunexus.edu",
    phone: "+91 98351 12341",
    designation: "TGT English & Social Science",
    qualification: "M.A. (English), B.Ed. (Tilka Manjhi Bhagalpur University)",
    specialization: "BSEB Panorama & NCERT English Grammar, History & Civics",
    classes_assigned: ["Class 10-A", "Class 9-A", "Class 7-A"],
    is_active: true
  },
  {
    id: "t-03",
    profile_id: "p-teacher-03",
    full_name: "Manoj Kumar Mishra (मनोज कुमार मिश्रा)",
    employee_code: "GCS-BSEB-T103",
    email: "manoj.mishra@edunexus.edu",
    phone: "+91 98351 12342",
    designation: "Head of Oriental Languages (Hindi & Sanskrit)",
    qualification: "Acharya (Sanskrit), M.A. (Hindi), Kameshwar Singh Darbhanga Sanskrit Univ.",
    specialization: "Piyusham (BSEB 10th Matric Board) & Godhuli / Vasant Literature",
    classes_assigned: ["Class 10-A", "Class 9-A", "Class 8-A", "Class 6-A"],
    is_active: true
  },
  {
    id: "t-04",
    profile_id: "p-teacher-04",
    full_name: "Pooja Banerjee (पूजा बनर्जी)",
    employee_code: "GCS-BSEB-T104",
    email: "pooja.b@edunexus.edu",
    phone: "+91 98351 12343",
    designation: "TGT Science & Computer Science",
    qualification: "B.Tech (CS), B.Ed. (Magadh University)",
    specialization: "Physics, Chemistry & Biology Practical Labs, ICT & Coding",
    classes_assigned: ["Class 8-A", "Class 7-A", "Class 6-A"],
    is_active: true
  },
  {
    id: "t-05",
    profile_id: "p-teacher-05",
    full_name: "Anand Prakash (आनंद प्रकाश)",
    employee_code: "GCS-BSEB-T105",
    email: "anand.p@edunexus.edu",
    phone: "+91 98351 12344",
    designation: "Primary Headmaster (Classes 1st to 5th)",
    qualification: "D.El.Ed., B.A. (Hons), State Teacher Merit Awardee",
    specialization: "Foundational Literacy & Numeracy (FLN - NIPUN Bharat & Bihar SCERT)",
    classes_assigned: ["Class 1-A", "Class 2-A", "Class 3-A", "Class 4-A", "Class 5-A"],
    is_active: true
  }
];

export const INITIAL_STUDENTS: Student[] = GEN_STUDENTS;

const OLD_STUDENTS: Student[] = [
  // Class 10 (Matriculation Board Year)
  {
    id: "s-10-01",
    profile_id: "p-student-01",
    full_name: "Aarav Kumar (आरव कुमार)",
    roll_number: "1001",
    date_of_birth: "2010-04-15",
    gender: "Male",
    admission_number: "GCS-2022-045",
    parent_name: "Sunil Kumar (सुनील कुमार)",
    parent_phone: "+91 91234 56780",
    mother_name: "Geeta Devi (गीता देवी)",
    village_or_town: "Village Gangra, Gidhaur (ग्राम गंगरा, गिद्धौर)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "aarav.kumar@edunexus.edu",
    is_active: true,
    class_id: "c-10",
    class_name: "Class 10-A",
    section_name: "Section A",
    blood_group: "B+"
  },
  {
    id: "s-10-02",
    profile_id: "p-student-02",
    full_name: "Priya Kumari (प्रिया कुमारी)",
    roll_number: "1002",
    date_of_birth: "2010-08-22",
    gender: "Female",
    admission_number: "GCS-2022-046",
    parent_name: "Rameshwar Singh (रामेश्वर सिंह)",
    parent_phone: "+91 91234 56781",
    mother_name: "Kanti Devi (कांति देवी)",
    village_or_town: "Village Seva, Jamui (ग्राम सेवा, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811307",
    email: "priya.singh@edunexus.edu",
    is_active: true,
    class_id: "c-10",
    class_name: "Class 10-A",
    section_name: "Section A",
    blood_group: "O+"
  },
  {
    id: "s-10-03",
    profile_id: "p-student-03",
    full_name: "Rohan Yadav (रोहन यादव)",
    roll_number: "1003",
    date_of_birth: "2010-01-19",
    gender: "Male",
    admission_number: "GCS-2022-047",
    parent_name: "Vikram Yadav (विक्रम यादव)",
    parent_phone: "+91 91234 56782",
    mother_name: "Shanti Devi (शांति देवी)",
    village_or_town: "Village Mallehpur, Near Rly Stn (मल्लेहपुर, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811313",
    email: "rohan.yadav@edunexus.edu",
    is_active: true,
    class_id: "c-10",
    class_name: "Class 10-A",
    section_name: "Section A",
    blood_group: "A+"
  },
  {
    id: "s-10-04",
    profile_id: "p-student-04",
    full_name: "Ananya Roy (अनन्या रॉय)",
    roll_number: "1004",
    date_of_birth: "2010-11-05",
    gender: "Female",
    admission_number: "GCS-2022-048",
    parent_name: "Subir Roy (सुबीर रॉय)",
    parent_phone: "+91 91234 56783",
    mother_name: "Mousumi Roy (मौसुमी रॉय)",
    village_or_town: "Gidhaur Bazar, Ward 4 (गिद्धौर बाजार)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "ananya.roy@edunexus.edu",
    is_active: true,
    class_id: "c-10",
    class_name: "Class 10-A",
    section_name: "Section A",
    blood_group: "B+"
  },
  {
    id: "s-10-05",
    profile_id: "p-student-05",
    full_name: "Shivam Pandey (शिवम पाण्डेय)",
    roll_number: "1005",
    date_of_birth: "2010-06-30",
    gender: "Male",
    admission_number: "GCS-2022-049",
    parent_name: "Kamal Pandey (कमल पाण्डेय)",
    parent_phone: "+91 91234 56784",
    mother_name: "Sarita Pandey (सरिता पाण्डेय)",
    village_or_town: "Purani Bazar, Jhajha (पुरानी बाजार, झाझा)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811308",
    email: "shivam.pandey@edunexus.edu",
    is_active: true,
    class_id: "c-10",
    class_name: "Class 10-A",
    section_name: "Section A",
    blood_group: "AB+"
  },

  // Class 9
  {
    id: "s-09-01",
    profile_id: "p-student-09",
    full_name: "Md. Tariq Anwar (मो. तारिक अनवर)",
    roll_number: "0901",
    date_of_birth: "2011-05-14",
    gender: "Male",
    admission_number: "GCS-2023-010",
    parent_name: "Anwar Ali (अनवर अली)",
    parent_phone: "+91 91234 56785",
    mother_name: "Ruksana Begum (रुखसाना बेगम)",
    village_or_town: "Maharajganj, Jamui Town (महाराजगंज, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811307",
    email: "tariq.anwar@edunexus.edu",
    is_active: true,
    class_id: "c-09",
    class_name: "Class 9-A",
    section_name: "Section A",
    blood_group: "O+"
  },
  {
    id: "s-09-02",
    profile_id: "p-student-09b",
    full_name: "Sneha Kumari (स्नेहा कुमारी)",
    roll_number: "0902",
    date_of_birth: "2011-09-14",
    gender: "Female",
    admission_number: "GCS-2023-011",
    parent_name: "Dinesh Paswan (दिनेश पासवान)",
    parent_phone: "+91 91234 56786",
    mother_name: "Sunita Devi (सुनीता देवी)",
    village_or_town: "Near Simultala Station (सिमुलतला, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811316",
    email: "sneha.kumari@edunexus.edu",
    is_active: true,
    class_id: "c-09",
    class_name: "Class 9-A",
    section_name: "Section A",
    blood_group: "A+"
  },

  // Class 8
  {
    id: "s-08-01",
    profile_id: "p-student-08",
    full_name: "Aditya Prakash (आदित्य प्रकाश)",
    roll_number: "0801",
    date_of_birth: "2012-03-11",
    gender: "Male",
    admission_number: "GCS-2024-001",
    parent_name: "Prakash Narayan (प्रकाश नारायण)",
    parent_phone: "+91 91234 56787",
    mother_name: "Urmila Devi (उर्मिला देवी)",
    village_or_town: "Village Sono, Jamui (ग्राम सोनो, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811314",
    email: "aditya.prakash@edunexus.edu",
    is_active: true,
    class_id: "c-08",
    class_name: "Class 8-A",
    section_name: "Section A",
    blood_group: "B+"
  },

  // Class 7
  {
    id: "s-07-01",
    profile_id: "p-student-07",
    full_name: "Pooja Kumari (पूजा कुमारी)",
    roll_number: "0701",
    date_of_birth: "2013-05-18",
    gender: "Female",
    admission_number: "GCS-2024-032",
    parent_name: "Satish Chandra Mahto (सतीश चन्द्र महतो)",
    parent_phone: "+91 91234 56788",
    mother_name: "Manju Devi (मंजू देवी)",
    village_or_town: "Village Barhat (ग्राम बरहट, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811313",
    email: "pooja.kumari@edunexus.edu",
    is_active: true,
    class_id: "c-07",
    class_name: "Class 7-A",
    section_name: "Section A",
    blood_group: "O+"
  },

  // Class 6
  {
    id: "s-06-01",
    profile_id: "p-student-06",
    full_name: "Alok Ranjan (आलोक रंजन)",
    roll_number: "0601",
    date_of_birth: "2014-07-22",
    gender: "Male",
    admission_number: "GCS-2025-015",
    parent_name: "Brajeshwar Prasad (ब्रजेश्वर प्रसाद)",
    parent_phone: "+91 91234 56789",
    mother_name: "Rekha Sinha (रेखा सिन्हा)",
    village_or_town: "Village Sikandra (सिकंदरा, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811315",
    email: "alok.ranjan@edunexus.edu",
    is_active: true,
    class_id: "c-06",
    class_name: "Class 6-A",
    section_name: "Section A",
    blood_group: "A+"
  },

  // Class 5 (Primary Senior)
  {
    id: "s-05-01",
    profile_id: "p-student-05a",
    full_name: "Suman Kumari (सुमन कुमारी)",
    roll_number: "0501",
    date_of_birth: "2015-09-14",
    gender: "Female",
    admission_number: "GCS-2025-055",
    parent_name: "Shambhu Sharan Singh (शम्भु शरण सिंह)",
    parent_phone: "+91 91234 56790",
    mother_name: "Mina Devi (मीना देवी)",
    village_or_town: "Village Ratanpur, Gidhaur (रतनपुर, गिद्धौर)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "suman.kumari@edunexus.edu",
    is_active: true,
    class_id: "c-05",
    class_name: "Class 5-A",
    section_name: "Section A",
    blood_group: "B+"
  },

  // Class 4
  {
    id: "s-04-01",
    profile_id: "p-student-04a",
    full_name: "Rahul Kumar Verma (राहुल कुमार वर्मा)",
    roll_number: "0401",
    date_of_birth: "2016-02-19",
    gender: "Male",
    admission_number: "GCS-2026-004",
    parent_name: "Ashok Kumar Verma (अशोक कुमार वर्मा)",
    parent_phone: "+91 91234 56791",
    mother_name: "Pushpa Verma (पुष्पा वर्मा)",
    village_or_town: "Station Road Gidhaur (स्टेशन रोड गिद्धौर)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "rahul.verma@edunexus.edu",
    is_active: true,
    class_id: "c-04",
    class_name: "Class 4-A",
    section_name: "Section A",
    blood_group: "O+"
  },

  // Class 3
  {
    id: "s-03-01",
    profile_id: "p-student-03a",
    full_name: "Neha Bharti (नेहा भारती)",
    roll_number: "0301",
    date_of_birth: "2017-08-10",
    gender: "Female",
    admission_number: "GCS-2026-020",
    parent_name: "Ramvilas Paswan (रामविलास पासवान)",
    parent_phone: "+91 91234 56792",
    mother_name: "Sobha Devi (शोभा देवी)",
    village_or_town: "Village Khaira (ग्राम खैरा, जमुई)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811317",
    email: "neha.bharti@edunexus.edu",
    is_active: true,
    class_id: "c-03",
    class_name: "Class 3-A",
    section_name: "Section A",
    blood_group: "A+"
  },

  // Class 2
  {
    id: "s-02-01",
    profile_id: "p-student-02a",
    full_name: "Kavya Kumari (काव्या कुमारी)",
    roll_number: "0201",
    date_of_birth: "2018-11-25",
    gender: "Female",
    admission_number: "GCS-2026-035",
    parent_name: "Manoj Kumar Mandal (मनोज कुमार मंडल)",
    parent_phone: "+91 91234 56793",
    mother_name: "Punam Devi (पूनम देवी)",
    village_or_town: "Village Chour (ग्राम चौर, गिद्धौर)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "kavya.kumari@edunexus.edu",
    is_active: true,
    class_id: "c-02",
    class_name: "Class 2-A",
    section_name: "Section A",
    blood_group: "B+"
  },

  // Class 1
  {
    id: "s-01-01",
    profile_id: "p-student-01a",
    full_name: "Deepali Kumari (दीपाली कुमारी)",
    roll_number: "0101",
    date_of_birth: "2019-04-05",
    gender: "Female",
    admission_number: "GCS-2026-050",
    parent_name: "Rajesh Kumar Mandal (राजेश कुमार मंडल)",
    parent_phone: "+91 91234 56794",
    mother_name: "Rani Devi (रानी देवी)",
    village_or_town: "Kalyanpur, Gidhaur (कल्याणपुर, गिद्धौर)",
    district: "Jamui",
    state: "Bihar",
    pincode: "811305",
    email: "deepali.kumari@edunexus.edu",
    is_active: true,
    class_id: "c-01",
    class_name: "Class 1-A",
    section_name: "Section A",
    blood_group: "O+"
  }
];

export const INITIAL_PROFILES: Profile[] = [
  ...TEACHER_PROFILES,
  ...STUDENT_PROFILES,
  // Admin
  {
    id: "p-admin-01",
    email: "admin@edunexus.edu",
    role: "admin",
    full_name: "Dr. Arvind Pathak (Principal, Gidhaur Central School)",
    password: "Admin@123",
    phone: "+91 94312 34567",
    is_active: true
  },

  // Teachers
  {
    id: "p-teacher-01",
    email: "rajesh.sharma@edunexus.edu",
    role: "teacher",
    full_name: "Rajesh Sharma (Mathematics & Science)",
    password: "Teacher@123",
    phone: "+91 98351 12340",
    is_active: true
  },
  {
    id: "p-teacher-02",
    email: "sunita.verma@edunexus.edu",
    role: "teacher",
    full_name: "Sunita Verma (English & Social Science)",
    password: "Teacher@123",
    phone: "+91 98351 12341",
    is_active: true
  },
  {
    id: "p-teacher-03",
    email: "manoj.mishra@edunexus.edu",
    role: "teacher",
    full_name: "Manoj Kumar Mishra (Hindi & Sanskrit BSEB Specialist)",
    password: "Teacher@123",
    phone: "+91 98351 12342",
    is_active: true
  },
  {
    id: "p-teacher-04",
    email: "pooja.b@edunexus.edu",
    role: "teacher",
    full_name: "Pooja Banerjee (Computer Science & Science)",
    password: "Teacher@123",
    phone: "+91 98351 12343",
    is_active: true
  },
  {
    id: "p-teacher-05",
    email: "anand.p@edunexus.edu",
    role: "teacher",
    full_name: "Anand Prakash (Primary In-charge Classes 1-5)",
    password: "Teacher@123",
    phone: "+91 98351 12344",
    is_active: true
  },

  // Students - Bihar background across classes 1 to 10
  {
    id: "p-student-01",
    email: "aarav.kumar@edunexus.edu",
    role: "student",
    full_name: "Aarav Kumar (Class 10-A, Roll 1001, Gidhaur, Bihar)",
    password: "Student@123",
    class_name: "Class 10-A",
    phone: "+91 91234 56780",
    is_active: true
  },
  {
    id: "p-student-02",
    email: "priya.singh@edunexus.edu",
    role: "student",
    full_name: "Priya Kumari (Class 10-A, Roll 1002, Seva, Jamui)",
    password: "Student@123",
    class_name: "Class 10-A",
    phone: "+91 91234 56781",
    is_active: true
  },
  {
    id: "p-student-09",
    email: "tariq.anwar@edunexus.edu",
    role: "student",
    full_name: "Md. Tariq Anwar (Class 9-A, Roll 0901, Jamui)",
    password: "Student@123",
    class_name: "Class 9-A",
    phone: "+91 91234 56785",
    is_active: true
  },
  {
    id: "p-student-08",
    email: "aditya.prakash@edunexus.edu",
    role: "student",
    full_name: "Aditya Prakash (Class 8-A, Roll 0801, Sono, Jamui)",
    password: "Student@123",
    class_name: "Class 8-A",
    phone: "+91 91234 56787",
    is_active: true
  },
  {
    id: "p-student-07",
    email: "pooja.kumari@edunexus.edu",
    role: "student",
    full_name: "Pooja Kumari (Class 7-A, Roll 0701, Barhat, Jamui)",
    password: "Student@123",
    class_name: "Class 7-A",
    phone: "+91 91234 56788",
    is_active: true
  },
  {
    id: "p-student-06",
    email: "alok.ranjan@edunexus.edu",
    role: "student",
    full_name: "Alok Ranjan (Class 6-A, Roll 0601, Sikandra, Bihar)",
    password: "Student@123",
    class_name: "Class 6-A",
    phone: "+91 91234 56789",
    is_active: true
  },
  {
    id: "p-student-05a",
    email: "suman.kumari@edunexus.edu",
    role: "student",
    full_name: "Suman Kumari (Class 5-A, Roll 0501, Gidhaur, Jamui)",
    password: "Student@123",
    class_name: "Class 5-A",
    phone: "+91 91234 56790",
    is_active: true
  },
  {
    id: "p-student-04a",
    email: "rahul.verma@edunexus.edu",
    role: "student",
    full_name: "Rahul Kumar Verma (Class 4-A, Roll 0401, Gidhaur)",
    password: "Student@123",
    class_name: "Class 4-A",
    phone: "+91 91234 56791",
    is_active: true
  },
  {
    id: "p-student-03a",
    email: "neha.bharti@edunexus.edu",
    role: "student",
    full_name: "Neha Bharti (Class 3-A, Roll 0301, Khaira, Jamui)",
    password: "Student@123",
    class_name: "Class 3-A",
    phone: "+91 91234 56792",
    is_active: true
  },
  {
    id: "p-student-02a",
    email: "kavya.kumari@edunexus.edu",
    role: "student",
    full_name: "Kavya Kumari (Class 2-A, Roll 0201, Gidhaur)",
    password: "Student@123",
    class_name: "Class 2-A",
    phone: "+91 91234 56793",
    is_active: true
  },
  {
    id: "p-student-01a",
    email: "deepali.kumari@edunexus.edu",
    role: "student",
    full_name: "Deepali Kumari (Class 1-A, Roll 0101, Kalyanpur, Gidhaur)",
    password: "Student@123",
    class_name: "Class 1-A",
    phone: "+91 91234 56794",
    is_active: true
  },

  // Parents
  {
    id: "p-parent-01",
    email: "parent@edunexus.edu",
    role: "parent",
    full_name: "Sunil Kumar (Father of Aarav Kumar, Vill Gangra)",
    password: "Parent@123",
    phone: "+91 91234 56780",
    is_active: true
  },
  {
    id: "p-parent-02",
    email: "rameshwar.singh@edunexus.edu",
    role: "parent",
    full_name: "Rameshwar Singh (Father of Priya Kumari, Vill Seva)",
    password: "Parent@123",
    phone: "+91 91234 56781",
    is_active: true
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: "par-01",
    profile_id: "p-parent-01",
    full_name: "Sunil Kumar (सुनील कुमार)",
    phone: "+91 91234 56780",
    email: "parent@edunexus.edu",
    village: "Village Gangra, Gidhaur, Jamui",
    occupation: "Farmer & Panchayat Representative"
  },
  {
    id: "par-02",
    profile_id: "p-parent-02",
    full_name: "Rameshwar Singh (रामेश्वर सिंह)",
    phone: "+91 91234 56781",
    email: "rameshwar.singh@edunexus.edu",
    village: "Village Seva, Jamui",
    occupation: "Shop Owner"
  }
];

export const INITIAL_PARENT_STUDENTS: ParentStudent[] = [
  { parent_id: "par-01", student_id: "st-1001", relationship: "Father", students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { parent_id: "par-01", student_id: "s-10-01", relationship: "Father", students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { parent_id: "par-02", student_id: "st-1002", relationship: "Father", students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { parent_id: "par-02", student_id: "s-10-02", relationship: "Father", students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: "ex-bseb-10",
    name: "BSEB 10th Matric Sent-Up Examination 2026-27 (मैट्रिक सेंट-अप परीक्षा)",
    exam_type: "Sent-Up / Pre-Board",
    class_id: "c-10",
    academic_year: "2026-27",
    start_date: "2026-11-15",
    end_date: "2026-11-25",
    status: "published",
    classes: { id: "c-10", name: "Class 10-A" }
  },
  {
    id: "ex-mid-term-10",
    name: "Mid-Term Examination 2026 (अर्द्धवार्षिक मूल्यांकन)",
    exam_type: "Mid-Term",
    class_id: "c-10",
    academic_year: "2026-27",
    start_date: "2026-09-15",
    end_date: "2026-09-24",
    status: "closed",
    classes: { id: "c-10", name: "Class 10-A" }
  },
  {
    id: "ex-mid-term-09",
    name: "Class 9 Half-Yearly Assessment (कक्षा 9 अर्द्धवार्षिक परीक्षा)",
    exam_type: "Mid-Term",
    class_id: "c-09",
    academic_year: "2026-27",
    start_date: "2026-09-15",
    end_date: "2026-09-24",
    status: "published",
    classes: { id: "c-09", name: "Class 9-A" }
  },
  {
    id: "ex-mid-term-05",
    name: "Primary Wing Terminal Assessment (कक्षा 1 से 5 सावधिक मूल्यांकन)",
    exam_type: "Evaluation",
    class_id: "c-05",
    academic_year: "2026-27",
    start_date: "2026-09-18",
    end_date: "2026-09-23",
    status: "published",
    classes: { id: "c-05", name: "Class 5-A" }
  }
];

export const INITIAL_EXAM_SUBJECTS: ExamSubject[] = [
  {
    id: "es-10-mat",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-mat",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-mat", name: "Mathematics (गणित)", code: "MATH" }
  },
  {
    id: "es-10-sci",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-sci",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-sci", name: "Science (विज्ञान)", code: "SCI" }
  },
  {
    id: "es-10-sst",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-sst",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-sst", name: "Social Science (सामाजिक विज्ञान)", code: "SST" }
  },
  {
    id: "es-10-hin",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-hin",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-hin", name: "Hindi (हिंदी - गोधूलि)", code: "HIN" }
  },
  {
    id: "es-10-san",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-san",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-san", name: "Sanskrit (संस्कृत - पीयूषम्)", code: "SAN" }
  },
  {
    id: "es-10-eng",
    exam_id: "ex-mid-term-10",
    subject_id: "sub-eng",
    maximum_marks: 100,
    passing_marks: 30,
    weightage: 1,
    exams: { id: "ex-mid-term-10", name: "Mid-Term Examination 2026" },
    subjects: { id: "sub-eng", name: "English (अंग्रेजी - Panorama)", code: "ENG" }
  }
];

export const INITIAL_MARKS: Mark[] = [
  // Aarav Kumar marks (Both st-1001 and s-10-01)
  { id: "mk-01", exam_subject_id: "es-10-mat", student_id: "st-1001", marks_obtained: 92, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-02", exam_subject_id: "es-10-sci", student_id: "st-1001", marks_obtained: 88, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-03", exam_subject_id: "es-10-sst", student_id: "st-1001", marks_obtained: 86, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-04", exam_subject_id: "es-10-hin", student_id: "st-1001", marks_obtained: 90, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-05", exam_subject_id: "es-10-san", student_id: "st-1001", marks_obtained: 95, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-06", exam_subject_id: "es-10-eng", student_id: "st-1001", marks_obtained: 84, students: { id: "st-1001", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-01b", exam_subject_id: "es-10-mat", student_id: "s-10-01", marks_obtained: 92, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-02b", exam_subject_id: "es-10-sci", student_id: "s-10-01", marks_obtained: 88, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-03b", exam_subject_id: "es-10-sst", student_id: "s-10-01", marks_obtained: 86, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-04b", exam_subject_id: "es-10-hin", student_id: "s-10-01", marks_obtained: 90, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-05b", exam_subject_id: "es-10-san", student_id: "s-10-01", marks_obtained: 95, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },
  { id: "mk-06b", exam_subject_id: "es-10-eng", student_id: "s-10-01", marks_obtained: 84, students: { id: "s-10-01", full_name: "Aarav Kumar", roll_number: "1001" } },

  // Priya Kumari marks (Both st-1002 and s-10-02)
  { id: "mk-07", exam_subject_id: "es-10-mat", student_id: "st-1002", marks_obtained: 96, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-08", exam_subject_id: "es-10-sci", student_id: "st-1002", marks_obtained: 94, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-09", exam_subject_id: "es-10-sst", student_id: "st-1002", marks_obtained: 91, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-10", exam_subject_id: "es-10-hin", student_id: "st-1002", marks_obtained: 93, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-11", exam_subject_id: "es-10-san", student_id: "st-1002", marks_obtained: 97, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-12", exam_subject_id: "es-10-eng", student_id: "st-1002", marks_obtained: 89, students: { id: "st-1002", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-07b", exam_subject_id: "es-10-mat", student_id: "s-10-02", marks_obtained: 96, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-08b", exam_subject_id: "es-10-sci", student_id: "s-10-02", marks_obtained: 94, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-09b", exam_subject_id: "es-10-sst", student_id: "s-10-02", marks_obtained: 91, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-10b", exam_subject_id: "es-10-hin", student_id: "s-10-02", marks_obtained: 93, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-11b", exam_subject_id: "es-10-san", student_id: "s-10-02", marks_obtained: 97, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },
  { id: "mk-12b", exam_subject_id: "es-10-eng", student_id: "s-10-02", marks_obtained: 89, students: { id: "s-10-02", full_name: "Priya Kumari", roll_number: "1002" } },

  // Rohan Yadav marks
  { id: "mk-13", exam_subject_id: "es-10-mat", student_id: "st-1003", marks_obtained: 78, students: { id: "st-1003", full_name: "Rohan Yadav", roll_number: "1003" } },
  { id: "mk-14", exam_subject_id: "es-10-sci", student_id: "st-1003", marks_obtained: 80, students: { id: "st-1003", full_name: "Rohan Yadav", roll_number: "1003" } },
  { id: "mk-15", exam_subject_id: "es-10-sst", student_id: "st-1003", marks_obtained: 82, students: { id: "st-1003", full_name: "Rohan Yadav", roll_number: "1003" } },

  // Shivam Pandey marks
  { id: "mk-16", exam_subject_id: "es-10-mat", student_id: "st-1005", marks_obtained: 85, students: { id: "st-1005", full_name: "Shivam Pandey", roll_number: "1005" } },
  { id: "mk-17", exam_subject_id: "es-10-sci", student_id: "st-1005", marks_obtained: 87, students: { id: "st-1005", full_name: "Shivam Pandey", roll_number: "1005" } }
];

export const INITIAL_ATTENDANCE_SESSIONS: AttendanceSession[] = [
  {
    id: "att-sess-today",
    class_id: "c-10",
    section_id: null,
    subject_id: "sub-mat",
    teacher_id: "t-01",
    attendance_date: new Date().toISOString().slice(0, 10),
    attendance: [
      { id: "at-01", session_id: "att-sess-today", student_id: "st-1001", status: "present" },
      { id: "at-02", session_id: "att-sess-today", student_id: "st-1002", status: "present" },
      { id: "at-03", session_id: "att-sess-today", student_id: "st-1003", status: "present" },
      { id: "at-04", session_id: "att-sess-today", student_id: "st-1004", status: "present" },
      { id: "at-05", session_id: "att-sess-today", student_id: "st-1005", status: "late" },
      { id: "at-01b", session_id: "att-sess-today", student_id: "s-10-01", status: "present" },
      { id: "at-02b", session_id: "att-sess-today", student_id: "s-10-02", status: "present" },
      { id: "at-03b", session_id: "att-sess-today", student_id: "s-10-03", status: "present" },
      { id: "at-04b", session_id: "att-sess-today", student_id: "s-10-04", status: "present" },
      { id: "at-05b", session_id: "att-sess-today", student_id: "s-10-05", status: "late" }
    ]
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: "ar-01", session_id: "att-sess-today", student_id: "st-1001", status: "present", marked_at: new Date().toISOString() },
  { id: "ar-02", session_id: "att-sess-today", student_id: "st-1002", status: "present", marked_at: new Date().toISOString() },
  { id: "ar-03", session_id: "att-sess-today", student_id: "st-1003", status: "present", marked_at: new Date().toISOString() },
  { id: "ar-04", session_id: "att-sess-today", student_id: "st-1004", status: "present", marked_at: new Date().toISOString() },
  { id: "ar-05", session_id: "att-sess-today", student_id: "st-1005", status: "late", marked_at: new Date().toISOString() },
  { id: "ar-01b", session_id: "att-sess-today", student_id: "s-10-01", status: "present", marked_at: new Date().toISOString() },
  { id: "ar-02b", session_id: "att-sess-today", student_id: "s-10-02", status: "present", marked_at: new Date().toISOString() },

  // Historical records for Aarav Kumar to yield 95% attendance
  { id: "ar-06", session_id: "att-sess-h1", student_id: "st-1001", status: "present", marked_at: "2026-09-20T08:30:00Z" },
  { id: "ar-07", session_id: "att-sess-h2", student_id: "st-1001", status: "present", marked_at: "2026-09-21T08:30:00Z" },
  { id: "ar-08", session_id: "att-sess-h3", student_id: "st-1001", status: "present", marked_at: "2026-09-22T08:30:00Z" },
  { id: "ar-09", session_id: "att-sess-h4", student_id: "st-1001", status: "present", marked_at: "2026-09-23T08:30:00Z" },
  { id: "ar-10", session_id: "att-sess-h5", student_id: "st-1001", status: "present", marked_at: "2026-09-24T08:30:00Z" }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-01",
    title: "Bihar Board Class 10 Trigonometry Height & Distance Problem Set",
    description: "Solve all problems from Exercise 9.1 (Some Applications of Trigonometry / ऊँचाई एवं दूरी) following standard BSEB board steps.",
    subject_id: "sub-mat",
    class_id: "c-10",
    teacher_id: "t-01",
    deadline: "2026-10-05T17:00:00Z",
    classes: { id: "c-10", name: "Class 10-A" },
    subjects: { id: "sub-mat", name: "Mathematics (गणित)" },
    teachers: { id: "t-01", full_name: "Rajesh Sharma" }
  },
  {
    id: "asg-02",
    title: "Light: Reflection & Refraction Ray Diagram Practice (प्रकाश का परावर्तन एवं अपवर्तन)",
    description: "Draw neat ray diagrams for concave and convex spherical mirrors at all principal positions (at C, between F and C, at F).",
    subject_id: "sub-sci",
    class_id: "c-10",
    teacher_id: "t-01",
    deadline: "2026-10-08T17:00:00Z",
    classes: { id: "c-10", name: "Class 10-A" },
    subjects: { id: "sub-sci", name: "Science (विज्ञान)" },
    teachers: { id: "t-01", full_name: "Rajesh Sharma" }
  },
  {
    id: "asg-03",
    title: "Piyusham: 'पाटलिपुत्रवैभवम्' पाठ का हिन्दी भावार्थ एवं प्रश्नोत्तरी",
    description: "Write summary of Chapter 2 (Patliputra Vaibhavam) emphasizing the ancient glory of Patna, Megasthenes and Xuanzang accounts.",
    subject_id: "sub-san",
    class_id: "c-10",
    teacher_id: "t-03",
    deadline: "2026-10-04T17:00:00Z",
    classes: { id: "c-10", name: "Class 10-A" },
    subjects: { id: "sub-san", name: "Sanskrit (संस्कृत)" },
    teachers: { id: "t-03", full_name: "Manoj Kumar Mishra" }
  }
];

// ---------------------------------------------------------------------------------------------------------
// COMPREHENSIVE DOCUMENTATION RESOURCES FOR EVERY SINGLE SUBJECT ACROSS CLASSES 1ST THROUGH 10TH
// (Following Bihar School Examination Board BSEB & NCERT Curricula)
// ---------------------------------------------------------------------------------------------------------

export const INITIAL_RESOURCES: ResourceItem[] = [
  ...GEN_SYLLABUS_RESOURCES,
  // ==========================================
  // CLASS 1 (कक्षा 1)
  // ==========================================
  {
    id: "res-c01-hin",
    title: "Class 1 Hindi - किस्लय भाग-1: वर्णमाला एवं आधारभूत शब्द ज्ञान",
    title_hindi: "किस्लय भाग-1: स्वर, व्यंजन और सरल शब्द पठन",
    subject_id: "sub-hin",
    class_id: "c-01",
    grade_level: 1,
    subject_name: "Hindi",
    class_name: "Class 1-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'किस्लय भाग-1' & NCERT 'सारंगी 1 / रिमझिम 1'",
    resource_type: "chapter_notes",
    description: "बिहार राज्य पाठ्यपुस्तक 'किस्लय' कक्षा 1 के स्वर-व्यंजन, चित्र पहचान, अमात्रिक दो व तीन अक्षर वाले शब्द एवं कविता 'तितली और कली' का अध्ययन सार।",
    content_markdown: `# कक्षा 1 हिंदी: किस्लय भाग-1 (SCERT बिहार एवं NCERT)
## 1. मुख्य उद्देश्य (FLN - निपुण बिहार)
- स्वर वर्ण (अ से अः) एवं व्यंजन वर्ण (क से ज्ञ) की ध्वनि-चित्र पहचान।
- चित्र देखकर पहला अक्षर बोलना और लिखना।
- बिना मात्रा वाले शब्द: घर, जल, फल, कमल, कलश, सड़क।

## 2. लोकप्रिय पाठ एवं कविताएं
1. **झूला**: झूले पर बच्चों का आनंद एवं लयबद्ध गायन।
2. **तितली और कली**: 'हरी डाल पर लगी हुई थी नन्ही सुंदर एक कली...' - तुकबंदी शब्द।
3. **आम की टोकरी**: 6 साल की छोकरी, भरकर लाई टोकरी... फल व रंगों की पहचान।

## 3. शिक्षक एवं अभिभावक अभ्यास निर्देश
- बच्चों को प्रतिदिन 10 मिनट वर्ण कार्ड दिखाकर ध्वनि उच्चारण करवाएं।
- बिहार राज्य के स्थानीय परिवेश (घर, आँगन, बाग-बगीचा) के शब्दों से जोड़ें।`,
    file_url: "https://ncert.nic.in/textbook.php?ahsk1=0-19",
    upload_date: "2026-09-01",
    author: "Anand Prakash (Primary Head)"
  },
  {
    id: "res-c01-eng",
    title: "Class 1 English - Blossom Part 1 / Joyful Phonics & Rhymes",
    title_hindi: "ब्लॉसम पार्ट 1: वर्णमाला ध्वनियाँ व राइम्स",
    subject_id: "sub-eng",
    class_id: "c-01",
    grade_level: 1,
    subject_name: "English",
    class_name: "Class 1-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Blossom Part 1' & NCERT 'Mridang 1'",
    resource_type: "chapter_notes",
    description: "Foundational English letters (A-Z Phonics), visual vocabulary, sight words (cat, dog, sun, tree) and conversational greetings.",
    content_markdown: `# Class 1 English: Blossom Part 1 & Mridang
## 1. Core Competencies
- Recognizing upper-case & lower-case letters (Aa to Zz).
- Phonic sounds (A says /æ/, B says /b/, C says /k/).
- Simple 3-letter CVC words: BAT, CAT, MAT, SUN, PIN, CUP.

## 2. Rhymes & Action Songs
- 'Two Little Hands to Clap Clap Clap'
- 'A Happy Child': My house is red, a little house...
- Classroom English: 'Good Morning Teacher', 'Thank You', 'May I come in'.`,
    file_url: "https://ncert.nic.in/textbook.php?aeen1=0-9",
    upload_date: "2026-09-01",
    author: "Sunita Verma"
  },
  {
    id: "res-c01-mat",
    title: "Class 1 Mathematics - गणित का जादू 1: आकृतियाँ एवं 1 से 100 गिनती",
    title_hindi: "गणित का जादू 1: गिनती, आकृतियाँ और सरल जोड़",
    subject_id: "sub-mat",
    class_id: "c-01",
    grade_level: 1,
    subject_name: "Mathematics",
    class_name: "Class 1-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित का जादू' कक्षा 1 & NCERT 'Math-Magic 1'",
    resource_type: "formula_sheet",
    description: "संख्या पहचान 1 से 100, बड़ा-छोटा, ऊपर-नीचे, गोला-चौकोर आकृतियाँ और वस्तुएं गिनकर एक-अंकीय जोड़ व घटाव।",
    content_markdown: `# कक्षा 1 गणित: आधारभूत संख्या ज्ञान
## 1. पूर्व-संख्या अवधारणाएँ
- बड़ा vs छोटा (हाथी vs चूहा)
- ऊपर vs नीचे (पेड़ के ऊपर चिड़िया, नीचे गेंद)
- दूर vs पास (घर से नजदीक स्कूल)

## 2. संख्याएं 1 से 20
- 1 से 9 तक की गिनती: एक दो तीन चार, पाँच छः सात आठ नौ।
- शून्य (0) की संकल्पना: टोकरी में 3 आम थे, तीनों खा लिए, क्या बचा? शून्य!
- स्थानीय मान की पहली सीढ़ी: 10 का एक बंडल = एक दहाई।

## 3. सरल जोड़ और घटाव
- 3 चिड़ियाँ + 2 चिड़ियाँ = 5 चिड़ियाँ।
- 4 लड्डू - 1 लड्डू = 3 लड्डू।`,
    file_url: "https://ncert.nic.in/textbook.php?ahmh1=0-13",
    upload_date: "2026-09-01",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c01-evs",
    title: "Class 1 EVS - हमारा परिवेश: परिवार, स्वास्थ्य व प्रकृति",
    title_hindi: "हमारा परिवेश: मेरा परिवार, स्वच्छ आदतें और पशु-पक्षी",
    subject_id: "sub-evs",
    class_id: "c-01",
    grade_level: 1,
    subject_name: "Environmental Studies",
    class_name: "Class 1-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'पर्यावरण और हम' प्राथमिक स्तर गतिविधि पुस्तिका",
    resource_type: "syllabus",
    description: "शरीर के अंग, व्यक्तिगत स्वच्छता, माता-पिता का सम्मान, घरेलू पालतू पशु (गाय, बकरी, कुत्ता) और ग्रामीण परिवेश के पेड़ (नीम, पीपल, बरगद)।",
    content_markdown: `# कक्षा 1 पर्यावरण अध्ययन: हमारा परिवेश
1. **मेरा शरीर**: आँख (देखना), कान (सुनना), नाक (सूँघना), जीभ (स्वाद), त्वचा (स्पर्श)।
2. **स्वच्छ आदतें**: प्रतिदिन दाँत साफ़ करना, हाथ धोकर भोजन करना, नाखून काटना।
3. **हमारे मित्र पशु-पक्षी**: गाय, भैंस, तोता, गौरैया, मोर।
4. **प्रकृति की देन**: सूर्य (धूप और ऊर्जा), नदियां (गंगा, किऊल नदी), शुद्ध जल।`,
    file_url: "https://bseb.org.in/primary-evs",
    upload_date: "2026-09-01",
    author: "Anand Prakash"
  },

  // ==========================================
  // CLASS 2 (कक्षा 2)
  // ==========================================
  {
    id: "res-c02-hin",
    title: "Class 2 Hindi - किस्लय भाग-2: संयुक्त वर्ण एवं मनोरंजक कहानियाँ",
    title_hindi: "किस्लय भाग-2: 'ऊँट चला' व 'भालू ने खेली फुटबॉल'",
    subject_id: "sub-hin",
    class_id: "c-02",
    grade_level: 2,
    subject_name: "Hindi",
    class_name: "Class 2-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'किस्लय भाग-2' & NCERT 'सारंगी 2'",
    resource_type: "chapter_notes",
    description: "मात्राओं का सटीक प्रयोग (आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ), कविता 'ऊँट चला भाई ऊँट चला' एवं शिक्षाप्रद लोककथाएँ।",
    content_markdown: `# कक्षा 2 हिंदी: किस्लय भाग-2
## 1. प्रमुख पाठ
- **पाठ 1: ऊँट चला**: रेगिस्तान का जहाज, ऊँट की विशेषताएँ एवं तुकबंदी।
- **पाठ 2: भालू ने खेली फुटबॉल**: शेर के बच्चे को फुटबॉल समझकर उछालना; हास्य कथा।
- **पाठ 3: म्याऊँ म्याऊँ**: बिल्ली की आवाज व चूहे का डर।

## 2. व्याकरण के बुनियादी नियम
- विलोम शब्द: दिन-रात, ऊपर-नीचे, हंसना-रोना।
- लिंग बदलो: लड़का-लड़की, राजा-रानी, मोर-मोरनी।
- वचन: किताब-किताबें, ताला-ताले, आँख-आँखें।`,
    file_url: "https://ncert.nic.in/textbook.php?bhsk1=0-15",
    upload_date: "2026-09-02",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c02-eng",
    title: "Class 2 English - Blossom Part 2: Sentences, Stories & Vocabulary",
    title_hindi: "ब्लॉसम पार्ट 2: वाक्य निर्माण व कहानियाँ",
    subject_id: "sub-eng",
    class_id: "c-02",
    grade_level: 2,
    subject_name: "English",
    class_name: "Class 2-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Blossom Part 2' & NCERT 'Mridang 2'",
    resource_type: "chapter_notes",
    description: "Two-word to five-word sentence reading, 'Haldi's Adventure', picture descriptions, nouns, plurals and naming words.",
    content_markdown: `# Class 2 English: Blossom & Mridang
## 1. Highlights
- **Haldi's Adventure**: Story of a little girl Haldi meeting a giraffe named Smiley who wears spectacles.
- **I am Lucky**: Poem appreciating nature's gifts (butterfly wings, elephant trunk, kangaroo hop).
- **The Wind and the Sun**: Story of who is stronger; power of gentleness.

## 2. Elementary Grammar
- Naming words (Nouns): Boy, School, Gidhaur, Mango.
- Doing words (Verbs): Jump, Run, Sing, Eat.
- Pronouns: He, She, It, They.`,
    file_url: "https://ncert.nic.in/textbook.php?been1=0-10",
    upload_date: "2026-09-02",
    author: "Sunita Verma"
  },
  {
    id: "res-c02-mat",
    title: "Class 2 Mathematics - गणित का जादू 2: दो अंकों की संख्याएं एवं मापन",
    title_hindi: "गणित का जादू 2: समूह में गिनना, दहाई-इकाई एवं माप",
    subject_id: "sub-mat",
    class_id: "c-02",
    grade_level: 2,
    subject_name: "Mathematics",
    class_name: "Class 2-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित का जादू 2' & NCERT 'Math-Magic 2'",
    resource_type: "formula_sheet",
    description: "गिनती 1 से 100 तक बंडल व खुली तीलियों (दहाई-इकाई) द्वारा, 2-अंकीय हासिल वाले जोड़, रेखाएं और आकृतियाँ, जग और मग (आयतन)।",
    content_markdown: `# कक्षा 2 गणित: संख्या एवं मापन की समझ
1. **समूह में गिनना**: 2-2, 5-5 और 10-10 के जोड़े में गिनती।
2. **दहाई और इकाई**:
   - 25 = 2 दहाई + 5 इकाई = 20 + 5
   - 48 = 4 दहाई + 8 इकाई = 40 + 8
3. **जग और मग (तरल मापन)**: कौन सा बर्तन ज्यादा पानी सोखेगा (गिलास vs बाल्टी)।
4. **पहाड़ा (Multiplication Tables)**: 2, 3, 4 और 5 का पहाड़ा।`,
    file_url: "https://ncert.nic.in/textbook.php?bhmh1=0-15",
    upload_date: "2026-09-02",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c02-evs",
    title: "Class 2 EVS - हमारा पर्यावरण 2: ऋतुएँ, पेड़-पौधे व ऋतुचक्र",
    title_hindi: "हमारा पर्यावरण 2: सर्दी, गर्मी, बरसात और पेड़-पौधों की उपयोगिता",
    subject_id: "sub-evs",
    class_id: "c-02",
    grade_level: 2,
    subject_name: "Environmental Studies",
    class_name: "Class 2-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'पर्यावरण और हम 2'",
    resource_type: "chapter_notes",
    description: "ऋतुचक्र (गर्मी, वर्षा, शीत, वसंत), बिहार में धान और गेहूं की खेती, जल स्रोतों की सुरक्षा और सामुदायिक सहायक (डाकिया, डॉक्टर, किसान)।",
    content_markdown: `# कक्षा 2 पर्यावरण अध्ययन
1. **भारत व बिहार की प्रमुख ऋतुएँ**:
   - ग्रीष्म ऋतु: सूती वस्त्र, आम, सत्तू का शर्बत।
   - वर्षा ऋतु: छाता, रेनकोट, धान की रोपनी।
   - शीत ऋतु: ऊनी कपड़े, धूप में बैठना, तिलकुट।
2. **सामुदायिक सहायक**:
   - किसान: हमारे लिए अन्न उपजाते हैं।
   - शिक्षक: हमें ज्ञान और अच्छे संस्कार देते हैं।
   - डॉक्टर: अस्वस्थ होने पर उपचार करते हैं।`,
    file_url: "https://bseb.org.in/primary-evs-2",
    upload_date: "2026-09-02",
    author: "Anand Prakash"
  },

  // ==========================================
  // CLASS 3 (कक्षा 3)
  // ==========================================
  {
    id: "res-c03-hin",
    title: "Class 3 Hindi - किस्लय भाग-3: शेखीबाज़ मक्खी व चाँद का कुर्ता",
    title_hindi: "किस्लय भाग-3: कहानियाँ, मुहावरे और संज्ञा-सर्वनाम",
    subject_id: "sub-hin",
    class_id: "c-03",
    grade_level: 3,
    subject_name: "Hindi",
    class_name: "Class 3-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'किस्लय भाग-3' & NCERT 'वीणा 3 / रिमझिम 3'",
    resource_type: "chapter_notes",
    description: "रामधारी सिंह 'दिनकर' जी की कविता 'चाँद का कुर्ता', 'शेखीबाज़ मक्खी' पाठ, संज्ञा के भेद, विराम चिन्ह एवं रचनात्मक लेखन।",
    content_markdown: `# कक्षा 3 हिंदी: किस्लय भाग-3
## 1. प्रमुख पाठ
- **चाँद का कुर्ता (दिनकर जी)**: 'हट कर बैठा चाँद एक दिन, माता से यह बोला - सिलवा दो माँ मुझे ऊन का मोटा एक झिंगोला...'
- **शेखीबाज़ मक्खी**: घमंडी मक्खी का शेर को तंग करना और अंत में मकड़ी के जाले में फँसना।
- **बहादुर बित्तो**: सूझबूझ से शेर को भगाने वाली बहादुर महिला की लोककथा।

## 2. व्याकरण अभ्यास
- संज्ञा: किसी व्यक्ति, वस्तु, स्थान या भाव के नाम को संज्ञा कहते हैं (जैसे- पटना, आरव, गाय, मिठास)।
- पर्यायवाची शब्द: सूर्य (सूरज, दिनकर), जल (पानी, नीर), हवा (पवन, समीर)।`,
    file_url: "https://ncert.nic.in/textbook.php?chsk1=0-14",
    upload_date: "2026-09-03",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c03-eng",
    title: "Class 3 English - Blossom Part 3: Reading Comprehension & Santoor",
    title_hindi: "ब्लॉसम पार्ट 3: 'The Enormous Turnip' व ग्रामर गाइड",
    subject_id: "sub-eng",
    class_id: "c-03",
    grade_level: 3,
    subject_name: "English",
    class_name: "Class 3-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Blossom Part 3' & NCERT 'Santoor 3'",
    resource_type: "chapter_notes",
    description: "Short story analysis ('The Enormous Turnip', 'Nina and the Baby Sparrows'), adverbs, prepositions (in, on, under, behind) and paragraph writing.",
    content_markdown: `# Class 3 English: Blossom Part 3
## 1. Key Lessons
- **The Enormous Turnip**: Teamwork story showing that combined effort moves huge challenges.
- **Nina and the Baby Sparrows**: Compassion for birds and animals.
- **Good Morning Poem**: Greeting the sky, sun, winds, birds and trees.

## 2. Grammar Pillars
- Prepositions: The cat is **under** the table. The book is **on** the desk.
- Opposites: Hard x Soft, Heavy x Light, Fast x Slow, Rich x Poor.
- Framing Wh- Questions: Who, What, Where, When, Why.`,
    file_url: "https://ncert.nic.in/textbook.php?ceen1=0-10",
    upload_date: "2026-09-03",
    author: "Sunita Verma"
  },
  {
    id: "res-c03-mat",
    title: "Class 3 Mathematics - गणित का जादू 3: तीन अंकों की संख्याएं व कैलेंडर",
    title_hindi: "गणित का जादू 3: जोड़, घटाव, आकृतियाँ एवं समय की समझ",
    subject_id: "sub-mat",
    class_id: "c-03",
    grade_level: 3,
    subject_name: "Mathematics",
    class_name: "Class 3-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित का जादू 3' & NCERT 'Math-Magic 3'",
    resource_type: "formula_sheet",
    description: "संख्याओं की उछलकूद (तीन अंकों की संख्याएं 100 से 999), विस्तारित रूप (Expanded Form), कैलेंडर व घड़ी देखना, गुणा की सारणी (6 से 10 तक पहाड़ा)।",
    content_markdown: `# कक्षा 3 गणित: मुख्य सूत्र एवं अभ्यास
1. **संख्याओं का विस्तार**:
   - 348 = 300 + 40 + 8 = 3 सैकड़ा + 4 दहाई + 8 इकाई
2. **घड़ी देखना**:
   - 1 घंटा = 60 मिनट | 1 मिनट = 60 सेकंड
   - छोटी सुई घंटे की, बड़ी सुई मिनट की।
3. **कैलेंडर एवं वर्ष**:
   - 1 वर्ष = 12 महीने = 365 दिन (लीप वर्ष = 366 दिन)
4. **गुणनफल (गुणा = बार-बार जोड़ना)**:
   - 4 x 6 = 24 | 7 x 8 = 56 | 9 x 9 = 81`,
    file_url: "https://ncert.nic.in/textbook.php?chmh1=0-14",
    upload_date: "2026-09-03",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c03-evs",
    title: "Class 3 EVS - पर्यावरण और हम (भाग-1): पानी रे पानी व हमारा भोजन",
    title_hindi: "पर्यावरण और हम 1: जल, भोजन, पौधे और पशु-पक्षी",
    subject_id: "sub-evs",
    class_id: "c-03",
    grade_level: 3,
    subject_name: "Environmental Studies",
    class_name: "Class 3-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'पर्यावरण और हम (भाग-1)' & NCERT 'आस-पास 3'",
    resource_type: "chapter_notes",
    description: "जल चक्र, पौधों की पत्तियाँ (पीपल, नीम, तुलसी के औषधीय गुण), जंतुओं के आवास एवं बिहार के पारंपरिक खान-पान (लिट्टी-चोखा, दाल-भात, मखाना)।",
    content_markdown: `# कक्षा 3 पर्यावरण: पर्यावरण और हम (भाग-1)
1. **पौधों की परी**: विभिन्न प्रकार के तने, पत्तियाँ और जड़ें; तुलसी व नीम के घरेलू उपयोग।
2. **पानी रे पानी**: कुएँ, चापाकल, नदी, तालाब; पानी की बचत और वर्षा जल संचयन।
3. **हमारा भोजन**: विभिन्न अनाजों की पहचान (गेहूँ, चावल, मक्का, चना); संतुलित आहार की आवश्यकता।
4. **पंख फैलाएं, उड़ते जाएं**: पक्षियों की चोंच, पंख और घोंसले।`,
    file_url: "https://ncert.nic.in/textbook.php?chevs=0-24",
    upload_date: "2026-09-03",
    author: "Anand Prakash"
  },

  // ==========================================
  // CLASS 4 (कक्षा 4)
  // ==========================================
  {
    id: "res-c04-hin",
    title: "Class 4 Hindi - किस्लय भाग-4: मन के भोले-भाले बादल व जैसा सवाल",
    title_hindi: "किस्लय भाग-4: पठन सामग्री, मुहावरे एवं विशेषण",
    subject_id: "sub-hin",
    class_id: "c-04",
    grade_level: 4,
    subject_name: "Hindi",
    class_name: "Class 4-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'किस्लय भाग-4' & NCERT 'रिमझिम 4'",
    resource_type: "chapter_notes",
    description: "पाठ 'मन के भोले-भाले बादल', बीरबल की बुद्धिमानी ('जैसा सवाल वैसा जवाब'), विशेषण, क्रिया एवं औपचारिक पत्र का प्रारूप।",
    content_markdown: `# कक्षा 4 हिंदी: किस्लय भाग-4
## 1. प्रमुख पाठ
- **मन के भोले-भाले बादल**: बादलों के विभिन्न रूप (हाथी जैसे सूंड उठाए, ऊँटों जैसे कूबड़ वाले)।
- **जैसा सवाल वैसा जवाब**: अकबर-बीरबल की कथा; हाजिरजवाबी का महत्व।
- **किरमिच की गेंद**: खेल, मित्रता एवं ईमानदारी का सबक।

## 2. व्यावहारिक व्याकरण
- विशेषण: जो शब्द संज्ञा/सर्वनाम की विशेषता बताएं (मीठा आम, परिश्रमी छात्र, विशाल बरगद)।
- मुहावरे:
  - फूला न समाना = बहुत प्रसन्न होना।
  - नौ दो ग्यारह होना = भाग जाना।
  - कान भरना = चुगली करना।`,
    file_url: "https://ncert.nic.in/textbook.php?dhsk1=0-14",
    upload_date: "2026-09-04",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c04-eng",
    title: "Class 4 English - Blossom Part 4: Alice in Wonderland & Tenses",
    title_hindi: "ब्लॉसम पार्ट 4: टेन्स (काल), 'Wake Up!' पोयम व स्टोरीज",
    subject_id: "sub-eng",
    class_id: "c-04",
    grade_level: 4,
    subject_name: "English",
    class_name: "Class 4-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Blossom Part 4' & NCERT 'Marigold 4'",
    resource_type: "chapter_notes",
    description: "Past, Present & Future Tense rules, reading 'Alice in Wonderland', letter to Headmaster for leave, homophones and prefixes/suffixes.",
    content_markdown: `# Class 4 English: Blossom Part 4
## 1. Core Lessons
- **Wake Up!**: Nature's morning chorus (singing birds, buzzing bees, cow, sheep).
- **Alice in Wonderland**: Imaginative curiosity and descriptive English writing.
- **The Little Fir Tree**: Value of self-contentment and gratitude.

## 2. Basic Tenses
- Present Continuous: Subject + is/am/are + verb-ing (I am studying).
- Simple Past: Regular verbs add -ed (played, walked, helped). Irregular: go -> went, see -> saw.
- Formal Application: 'To The Headmaster, Gidhaur Central School - Subject: Leave for two days'.`,
    file_url: "https://ncert.nic.in/textbook.php?deen1=0-9",
    upload_date: "2026-09-04",
    author: "Sunita Verma"
  },
  {
    id: "res-c04-mat",
    title: "Class 4 Mathematics - गणित का जादू 4: गुणा, भाग एवं ईंटों से बनी इमारत",
    title_hindi: "गणित का जादू 4: गुणा-भाग, क्षेत्रफल-परिमाप की शुरुआत व भिन्न",
    subject_id: "sub-mat",
    class_id: "c-04",
    grade_level: 4,
    subject_name: "Mathematics",
    class_name: "Class 4-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित का जादू 4' & NCERT 'Math-Magic 4'",
    resource_type: "formula_sheet",
    description: "चार अंकों की संख्याओं का जोड़-घटाव, द्वि-अंकीय गुणा व भाग, ईंटों की जालीदार आकृतियाँ, कबाड़ी वाली (रुपये-पैसे का हिसाब), भिन्न का परिचय (1/2, 1/4, 3/4)।",
    content_markdown: `# कक्षा 4 गणित: आधारभूत सूत्र व संक्रियाएँ
1. **भाग संक्रिया (Division)**:
   - भाज्य = (भाजक x भागफल) + शेषफल
2. **भिन्न की समझ (Fractions)**:
   - आधा = 1/2 | चौथाई = 1/4 | तीन चौथाई = 3/4
3. **लंबाई एवं भार की इकाइयाँ**:
   - 1 किलोमीटर (किमी) = 1000 मीटर (मी)
   - 1 मीटर = 100 सेंटीमीटर (सेमी)
   - 1 किलोग्राम (किग्रा) = 1000 ग्राम (ग्रा)
   - 1 लीटर = 1000 मिलीलीटर (मिली)`,
    file_url: "https://ncert.nic.in/textbook.php?dhmh1=0-14",
    upload_date: "2026-09-04",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c04-evs",
    title: "Class 4 EVS - पर्यावरण और हम (भाग-2): अमृता की कहानी व बिहार के पर्व",
    title_hindi: "पर्यावरण और हम 2: वनों की रक्षा, छठ पूजा, नदियां व परिवहन",
    subject_id: "sub-evs",
    class_id: "c-04",
    grade_level: 4,
    subject_name: "Environmental Studies",
    class_name: "Class 4-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'पर्यावरण और हम (भाग-2)' & NCERT 'आस-पास 4'",
    resource_type: "chapter_notes",
    description: "खेजड़ी के पेड़ और अमृता देवी बिश्नोई का बलिदान, बिहार का महापर्व छठ (सूर्य उपासना एवं प्रकृति संरक्षण), मधुमक्खी पालन (मुजफ्फरपुर लीची), रेल यात्रा के अनुभव।",
    content_markdown: `# कक्षा 4 पर्यावरण: पर्यावरण और हम (भाग-2)
1. **अमृता की कहानी**: वृक्षों की रक्षा हेतु बिश्नोई समाज का त्याग; 'अगर पेड़ हैं तो हम हैं'।
2. **बिहार के सांस्कृतिक पर्व एवं पर्यावरण**:
   - छठ पर्व: अस्ताचलगामी एवं उदीयमान सूर्य को अर्घ्य, पवित्र घाटों की सामूहिक स्वच्छता।
   - मकर संक्रांति, सरहुल एवं करमा पर्व में प्रकृति पूजन।
3. **अनीता की मधुमक्खियाँ**: मुजफ्फरपुर की अनीता कुशवाहा की प्रेरक कथा; रानी मक्खी, श्रमिक मक्खी।
4. **जल प्रदूषण के कारण**: प्लास्टिक कचरा, कारखानों का गंदा पानी; गंगा संरक्षण की शपथ।`,
    file_url: "https://ncert.nic.in/textbook.php?dhevs=0-27",
    upload_date: "2026-09-04",
    author: "Anand Prakash"
  },

  // ==========================================
  // CLASS 5 (कक्षा 5)
  // ==========================================
  {
    id: "res-c05-hin",
    title: "Class 5 Hindi - किस्लय भाग-5: राख की रस्सी व फसलों के त्योहार",
    title_hindi: "किस्लय भाग-5: लोककथाएं, कविताएं, समास व मुहावरे",
    subject_id: "sub-hin",
    class_id: "c-05",
    grade_level: 5,
    subject_name: "Hindi",
    class_name: "Class 5-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'किस्लय भाग-5' & NCERT 'रिमझिम 5'",
    resource_type: "chapter_notes",
    description: "तिब्बती लोककथा 'राख की रस्सी', 'फसलों के त्योहार' (खिचड़ी/तिल संक्रांत बिहार), 'एक माँ की बेबसी' कविता, कारक चिन्ह (कर्ता ने, कर्म को) एवं निबंध लेखन।",
    content_markdown: `# कक्षा 5 हिंदी: किस्लय भाग-5
## 1. प्रमुख पाठ
- **राख की रस्सी**: तिब्बत के मंत्री लोनपो गार एवं उनके भोले पुत्र की कथा; लड़की की चतुराई।
- **फसलों के त्योहार**: बिहार में मकर संक्रांति (दही-चूड़ा-गुड़), असम में बिहू, पोंगल, लोहड़ी का सांस्कृतिक विवरण।
- **नन्हा फनकार**: बालक केशव की पत्थर पर नक्काशी कला एवं अकबर से संवाद।

## 2. कारक प्रकरण (Case Endings)
- कर्ता ने (राम ने पढ़ा)
- कर्म को (पुस्तक को देखा)
- करण से/द्वारा (कलम से लिखा)
- संप्रदान को/के लिए (भिखारी को भोजन दिया)
- अपादान से (पेड़ से पत्ता गिरा - अलगाव)
- संबंध का/की/के (आरव का घर)
- अधिकरण में/पर (मेज पर किताब)`,
    file_url: "https://ncert.nic.in/textbook.php?ehsk1=0-18",
    upload_date: "2026-09-05",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c05-eng",
    title: "Class 5 English - Blossom Part 5: Wonderful Waste & Grammar Bank",
    title_hindi: "ब्लॉसम पार्ट 5: 'Wonderful Waste', डिग्रीज ऑफ कम्पैरिजन व एस्से",
    subject_id: "sub-eng",
    class_id: "c-05",
    grade_level: 5,
    subject_name: "English",
    class_name: "Class 5-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Blossom Part 5' & NCERT 'Marigold 5'",
    resource_type: "chapter_notes",
    description: "Story 'Wonderful Waste' (Creation of Avial dish from vegetable scraps), Degrees of Comparison (Good, Better, Best), Conjunctions (and, but, because) and paragraph writing.",
    content_markdown: `# Class 5 English: Blossom Part 5
## 1. Key Lessons
- **Wonderful Waste**: Maharaja of Travancore ordered cook to use vegetable peels, inventing famous dish Avial.
- **Teamwork Poem**: Passing the baton in a relay race; no one can win alone.
- **Robinson Crusoe**: Survival skills and observing footprints on the island.

## 2. Grammar Essentials
- Degrees of Comparison:
  - Positive: Tall, Fast, Bright, Beautiful
  - Comparative: Taller, Faster, Brighter, More beautiful
  - Superlative: Tallest, Fastest, Brightest, Most beautiful
- Conjunctions: Combining sentences using *and*, *but*, *or*, *so*, *because*.`,
    file_url: "https://ncert.nic.in/textbook.php?eeen1=0-10",
    upload_date: "2026-09-05",
    author: "Sunita Verma"
  },
  {
    id: "res-c05-mat",
    title: "Class 5 Mathematics - गणित का जादू 5: कोण, भिन्न, क्षेत्रफल व गुणनखंड",
    title_hindi: "गणित का जादू 5: न्यूनकोण-समकोण, ल.स.-म.स. एवं दशमलव",
    subject_id: "sub-mat",
    class_id: "c-05",
    grade_level: 5,
    subject_name: "Mathematics",
    class_name: "Class 5-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित का जादू 5' & NCERT 'Math-Magic 5'",
    resource_type: "formula_sheet",
    description: "कोणों के प्रकार (समकोण 90°, न्यूनकोण <90°, अधिककोण >90°), भिन्न का जोड़-घटाव, दशमलव संख्याएं, आयत एवं वर्ग का परिमाप व क्षेत्रफल सूत्र, ल.स.प. व म.स.प.।",
    content_markdown: `# कक्षा 5 गणित: महत्वपूर्ण सूत्र एवं नियम
1. **ज्यामिति - कोण एवं आकृतियाँ**:
   - समकोण = 90° | न्यूनकोण = 0° से 90° के बीच | अधिककोण = 90° से 180° के बीच
2. **परिमाप एवं क्षेत्रफल**:
   - आयत का परिमाप = 2 x (लंबाई + चौड़ाई)
   - आयत का क्षेत्रफल = लंबाई x चौड़ाई
   - वर्ग का परिमाप = 4 x भुजा
   - वर्ग का क्षेत्रफल = भुजा x भुजा
3. **लघुत्तम समापवर्त्य (LCM) व महत्तम समापवर्तक (HCF)**:
   - दो संख्याओं का गुणनफल = LCM x HCF
4. **दशमलव एवं प्रतिशत**:
   - 0.5 = 1/2 = 50% | 0.25 = 1/4 = 25% | 0.75 = 3/4 = 75%`,
    file_url: "https://ncert.nic.in/textbook.php?ehmh1=0-14",
    upload_date: "2026-09-05",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c05-evs",
    title: "Class 5 EVS - पर्यावरण और हम (भाग-3): सुपर सेंसेज व ऐतिहासिक नालंदा",
    title_hindi: "पर्यावरण और हम 3: बीजों का सफर, वाल्मीकि टाइगर रिजर्व व नालंदा खंडहर",
    subject_id: "sub-evs",
    class_id: "c-05",
    grade_level: 5,
    subject_name: "Environmental Studies",
    class_name: "Class 5-A",
    board: "Bihar Board (BSEB)",
    book_reference: "SCERT Bihar 'पर्यावरण और हम (भाग-3)' & NCERT 'आस-पास 5'",
    resource_type: "chapter_notes",
    description: "जीव-जंतुओं की ज्ञानेंद्रियाँ (चींटियों की गंध, गिद्ध की तीक्ष्ण दृष्टि), बीजों का प्रकीर्णन, बिहार का ऐतिहासिक नालंदा विश्वविद्यालय, वाल्मीकि राष्ट्रीय उद्यान एवं जल संकट निवारण।",
    content_markdown: `# कक्षा 5 पर्यावरण: पर्यावरण और हम (भाग-3)
1. **सुपर सेंसेज (अद्भुत इंद्रियाँ)**:
   - चींटियाँ जमीन पर गंध छोड़ती हुई पंक्ति बनाती हैं।
   - कुत्ते मूत्र की गंध से क्षेत्र पहचानते हैं।
   - चील, बाज़, गिद्ध हमसे चार गुना दूर तक देख सकते हैं।
2. **बिहार की ऐतिहासिक एवं प्राकृतिक धरोहर**:
   - प्राचीन नालंदा विश्वविद्यालय: विश्व का प्रथम आवासीय विश्वविद्यालय।
   - वाल्मीकि टाइगर रिजर्व (पश्चिम चंपारण): बिहार का एकमात्र बाघ अभयारण्य।
   - कैमूर वन्यजीव अभयारण्य एवं राजगीर गर्म जलकुंड।
3. **बीज, बीज, बीज**: हवा, पानी, पशु-पक्षियों द्वारा बीजों का फैलाव; शिकारी पौधे (नेपेंथीस/घटपर्णी)।
4. **पानी का प्रयोग एवं दांडी यात्रा**: नमक का निर्माण, भारी व हल्की वस्तुएं (तैरना vs डूबना)।`,
    file_url: "https://ncert.nic.in/textbook.php?ehevs=0-22",
    upload_date: "2026-09-05",
    author: "Anand Prakash"
  },

  // ==========================================
  // CLASS 6 (कक्षा 6)
  // ==========================================
  {
    id: "res-c06-hin",
    title: "Class 6 Hindi - किस्लय भाग-1 (BSEB) व वसंत भाग-1 (NCERT)",
    title_hindi: "किस्लय 1 व वसंत 1: वह चिड़िया जो, अक्षरों का महत्व, संधि",
    subject_id: "sub-hin",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "Hindi",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'किस्लय भाग-1' & NCERT 'वसंत भाग-1'",
    resource_type: "chapter_notes",
    description: "केदारनाथ अग्रवाल की कविता 'वह चिड़िया जो', गुणाकर मुले का निबंध 'अक्षरों का महत्व', कृष्णा सोबती का संस्मरण 'बचपन', स्वर संधि एवं प्रत्यय/उपसर्ग।",
    content_markdown: `# कक्षा 6 हिंदी: किस्लय भाग-1 एवं वसंत भाग-1
## 1. प्रमुख पाठ विश्लेषण
- **वह चिड़िया जो (केदारनाथ अग्रवाल)**: नीले पंखों वाली संतोषी चिड़िया जो नदी का दिल टटोलकर जल का मोती ले जाती है।
- **बचपन (कृष्णा सोबती)**: शिमला के बचपन की यादें, उस समय के ग्रामोफोन, चॉकलेट और लेमन-विम्टो।
- **नादान दोस्त (मुंशी प्रेमचंद)**: केशव और श्यामा द्वारा चिड़िया के अंडों की हिफाजत करने में हुई नादानी।
- **अक्षरों का महत्व (गुणाकर मुले)**: मानव इतिहास में लिपि के विकास की गाथा।

## 2. व्याकरण खंड
- स्वर संधि: दीर्घ (हिम + आलय = हिमालय), गुण (देव + इंद्र = देवेंद्र), वृद्धि (एक + एक = एकैक)।
- उपसर्ग एवं प्रत्यय: 'प्र' + हार = प्रहार | सफल + 'ता' = सफलता।`,
    file_url: "https://ncert.nic.in/textbook.php?fhsk1=0-11",
    upload_date: "2026-09-06",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c06-san",
    title: "Class 6 Sanskrit - संस्कृत भारती / रुचिरा भाग-1: शब्दपरिचयः व धातु रूप",
    title_hindi: "रुचिरा भाग-1: अकारान्त पुंल्लिंग, बालक शब्द रूप व लट् लकार",
    subject_id: "sub-san",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "Sanskrit",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'संस्कृत भारती 1' & NCERT 'रुचिरा भाग-1'",
    resource_type: "formula_sheet",
    description: "संस्कृत वर्णमाला, प्रथम-मध्यम-उत्तम पुरुष, लट् लकार (वर्तमान काल: पठति, पठतः, पठन्ति), अकारान्त पुंल्लिंग बालक शब्द रूप एवं सुभाषितानि श्लोक।",
    content_markdown: `# कक्षा 6 संस्कृत: रुचिरा भाग-1
1. **अकारान्त पुंल्लिंग (बालक शब्द रूप)**:
   - प्रथमा: बालकः | बालकौ | बालकाः
   - द्वितीया: बालकम् | बालकौ | बालकान्
   - तृतीया: बालकेन | बालकाभ्याम् | बालकैः
2. **लट् लकार (पठ् धातु - पढ़ना)**:
   - प्रथम पुरुष: पठति | पठतः | पठन्ति
   - मध्यम पुरुष: पठसि | पठथः | पठथ
   - उत्तम पुरुष: पठामि | पठावः | पठामः
3. **नीति श्लोक**:
   'विद्या ददाति विनयं विनयाद् याति पात्रताम्।
   पात्रत्वाद् धनमाप्नोति धनाद् धर्मं ततः सुखम्॥'`,
    file_url: "https://ncert.nic.in/textbook.php?fhsk2=0-12",
    upload_date: "2026-09-06",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c06-eng",
    title: "Class 6 English - Radiance Part 1 (BSEB) & Honeysuckle (NCERT)",
    title_hindi: "रेडिएंस पार्ट 1 व हनीसकल: A Tale of Two Birds, Taro's Reward",
    subject_id: "sub-eng",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "English",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Radiance Part 1' & NCERT 'Honeysuckle'",
    resource_type: "chapter_notes",
    description: "Who Did Patrick's Homework?, A Tale of Two Birds, Taro's Reward (filial devotion), Active vs Passive Voice basics, types of sentences and formal email writing.",
    content_markdown: `# Class 6 English: Radiance & Honeysuckle
## 1. Key Literature Chapters
- **Who Did Patrick's Homework?**: Patrick discovers that by guiding the elf, he actually did all the hard work himself.
- **Taro's Reward**: A young woodcutter's sincere devotion to his elderly parents rewarded by the magic waterfall.
- **The Kite Poem**: How bright on the blue is a kite when it's new!

## 2. Grammar Foundations
- Types of Sentences: Assertive, Interrogative, Imperative, Exclamatory.
- Subject-Verb Agreement: Singular subjects take singular verbs (He writes; They write).
- Unseen Passage Comprehension steps for terminal exams.`,
    file_url: "https://ncert.nic.in/textbook.php?feen1=0-8",
    upload_date: "2026-09-06",
    author: "Sunita Verma"
  },
  {
    id: "res-c06-mat",
    title: "Class 6 Mathematics - गण‍ित कक्षा 6: पूर्णांक, भिन्न एवं आधारभूत ज्यामिति",
    title_hindi: "गणित कक्षा 6: पूर्ण संख्याएं, पूर्णांक, अनुपात-समानुपात व बीजगणित",
    subject_id: "sub-mat",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "Mathematics",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित' कक्षा 6 & NCERT 'Mathematics Class 6'",
    resource_type: "formula_sheet",
    description: "अपनी संख्याओं की जानकारी, पूर्ण संख्याएं (Whole Numbers), पूर्णांक (Integers, संख्या रेखा पर निरूपण), भिन्न एवं दशमलव, आधारभूत ज्यामितीय अवधारणाएं (बिंदु, रेखा, किरण, कोण) और अनुपात-समानुपात।",
    content_markdown: `# कक्षा 6 गणित: महत्वपूर्ण सूत्र
1. **संख्या पद्धति एवं पूर्णांक (Integers)**:
   - प्राकृतिक संख्याएं: N = {1, 2, 3, 4, ...}
   - पूर्ण संख्याएं: W = {0, 1, 2, 3, ...}
   - पूर्णांक: Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}
   - धनात्मक (+) x ऋणात्मक (-) = ऋणात्मक (-)
2. **आधारभूत ज्यामिति**:
   - त्रिभुज के तीनों अंतःकोणों का योग = 180°
   - चतुर्भुज के चारों अंतःकोणों का योग = 360°
3. **अनुपात एवं समानुपात**:
   - यदि a : b :: c : d, तो a x d = b x c (बाह्य पदों का गुणनफल = मध्य पदों का गुणनफल)`,
    file_url: "https://ncert.nic.in/textbook.php?fhmh1=0-12",
    upload_date: "2026-09-06",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c06-sci",
    title: "Class 6 Science - विज्ञान कक्षा 6: भोजन के घटक, तंतु से वस्त्र व सजीव जगत",
    title_hindi: "विज्ञान कक्षा 6: कार्बोहाइड्रेट, प्रोटीन, चुंबक, विद्युत परिपथ व पौधे",
    subject_id: "sub-sci",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "Science",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'विज्ञान' कक्षा 6 & NCERT 'Science Class 6'",
    resource_type: "chapter_notes",
    description: "भोजन के घटक (कार्बोहाइड्रेट, वसा, प्रोटीन, विटामिन, खनिज परीक्षण), पदार्थों का पृथक्करण (थ्रेशिंग, निष्पावन, निथारना), पौधों को जानिए (मूसला जड़ vs रेशेदार जड़), गति एवं दूरियों का मापन, विद्युत तथा परिपथ।",
    content_markdown: `# कक्षा 6 विज्ञान: अध्यायवार नोट्स
1. **भोजन के घटक**:
   - कार्बोहाइड्रेट परीक्षण: आयोडीन विलयन डालने पर नीला-काला रंग।
   - प्रोटीन परीक्षण: कॉपर सल्फेट + कास्टिक सोडा से बैंगनी रंग।
   - अभावजन्य रोग: विटामिन A (रतौंधी), B (बेरीबेरी), C (स्कर्वी), D (रिकेट्स), आयोडीन (घेंघा/ग्वाइटर)।
2. **पौधों के भाग एवं कार्य**:
   - पत्ती: प्रकाश संश्लेषण (Photosynthesis) द्वारा भोजन निर्माण एवं वाष्पोत्सर्जन।
   - मूसला जड़: आम, सरसों, चना (जालिका रूपी शिरा विन्यास)।
   - रेशेदार जड़: गेहूँ, मक्का, घास (समानांतर शिरा विन्यास)।
3. **विद्युत तथा परिपथ**:
   - विद्युत सेल के दो सिरे: धनात्मक (+) और ऋणात्मक (-)।
   - चालक (तांबा, लोहा, जल) vs कुचालक (रबर, प्लास्टिक, लकड़ी)।`,
    file_url: "https://ncert.nic.in/textbook.php?fhsc1=0-11",
    upload_date: "2026-09-06",
    author: "Pooja Banerjee"
  },
  {
    id: "res-c06-sst",
    title: "Class 6 Social Science - हमारा अतीत, पृथ्वी आवास व सामाजिक जीवन",
    title_hindi: "सामाजिक विज्ञान कक्षा 6: सिंधु घाटी सभ्यता, अक्षांश-देशांतर व लोकतंत्र",
    subject_id: "sub-sst",
    class_id: "c-06",
    grade_level: 6,
    subject_name: "Social Science",
    class_name: "Class 6-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'हमारा अतीत 1' (इतिहास), 'पृथ्वी हमारा आवास' (भूगोल), 'सामाजिक एवं राजनीतिक जीवन' (नागरिक शास्त्र)",
    resource_type: "chapter_notes",
    description: "इतिहास (आरंभिक मानव, हड़प्पा सभ्यता, मगध साम्राज्य व पाटलिपुत्र), भूगोल (सौरमंडल, अक्षांश व देशांतर, पृथ्वी की गतियां), नागरिक शास्त्र (विविधता, भेदभाव एवं ग्राम पंचायत)।",
    content_markdown: `# कक्षा 6 सामाजिक विज्ञान (SCERT बिहार & NCERT)
1. **इतिहास - मगध का उत्कर्ष (बिहार का गौरव)**:
   - मगध गंगा और सोन नदियों के उपजाऊ मैदान में बसा प्राचीन भारत का सर्वाधिक शक्तिशाली महाजनपद था।
   - बिम्बिसार, अजातशत्रु एवं महापद्मनंद के बाद मौर्य साम्राज्य (चंद्रगुप्त व सम्राट अशोक) की राजधानी पाटलिपुत्र बनी।
2. **भूगोल - अक्षांश एवं देशांतर**:
   - विषुवत वृत्त (0° अक्षांश) पृथ्वी को दो बराबर गोलार्धों में बांटता है।
   - कर्क रेखा (23.5° N), मकर रेखा (23.5° S)।
   - भारतीय मानक समय (IST): 82.5° E देशांतर (मिर्जापुर)।
3. **नागरिक शास्त्र - पंचायती राज व्यवस्था**:
   - त्रिस्तरीय पंचायती राज: ग्राम पंचायत, पंचायत समिति (प्रखंड स्तर), जिला परिषद।
   - ग्राम सभा: 18 वर्ष से ऊपर के सभी पंजीकृत मतदाताओं की सभा।`,
    file_url: "https://ncert.nic.in/textbook.php?fhss1=0-8",
    upload_date: "2026-09-06",
    author: "Sunita Verma"
  },

  // ==========================================
  // CLASS 7 (कक्षा 7)
  // ==========================================
  {
    id: "res-c07-hin",
    title: "Class 7 Hindi - किस्लय भाग-2 (BSEB) व वसंत भाग-2 (NCERT)",
    title_hindi: "किस्लय 2 व वसंत 2: हम पंछी उन्मुक्त गगन के, दादी माँ, समास",
    subject_id: "sub-hin",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "Hindi",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'किस्लय भाग-2' & NCERT 'वसंत भाग-2'",
    resource_type: "chapter_notes",
    description: "शिवमंगल सिंह 'सुमन' की कविता 'हम पंछी उन्मुक्त गगन के', शिवप्रसाद सिंह की कहानी 'दादी माँ', नागार्जुन का निबंध 'हिमालय की बेटियां', समास के छह भेद व पदबंध।",
    content_markdown: `# कक्षा 7 हिंदी: किस्लय भाग-2 व वसंत भाग-2
## 1. प्रमुख पाठ
- **हम पंछी उन्मुक्त गगन के**: स्वतंत्रता का मूल्य; पिंजरे में बंद सोने की कटोरी की मैदा से नीम की कड़वी निबौरी श्रेष्ठ है।
- **दादी माँ**: भारतीय संयुक्त परिवार में दादी माँ का वात्सल्य, त्याग और लोक-ज्ञान।
- **हिमालय की बेटियां**: नदियों (गंगा, यमुना, सतलुज) का मानवीकरण।

## 2. समास के भेद (Compound Words)
1. **अव्ययीभाव**: पहला पद प्रधान (प्रतिदिन, यथाशक्ति)।
2. **तत्पुरुष**: उत्तर पद प्रधान (राजपुत्र = राजा का पुत्र)।
3. **द्वंद्व**: दोनों पद समान (माता-पिता, सुख-दुःख)।
4. **द्विगु**: पहला पद संख्यावाचक (त्रिभुवन, पंचवटी)।
5. **कर्मधारय**: विशेषण-विशेष्य संबंध (नीलकमल)।
6. **बहुव्रीहि**: अन्य पद प्रधान (दशानन = रावण, लंबोदर = गणेश)।`,
    file_url: "https://ncert.nic.in/textbook.php?ghsk1=0-15",
    upload_date: "2026-09-07",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c07-san",
    title: "Class 7 Sanskrit - अमृता भाग-2 / रुचिरा भाग-2: लृट् लकार व सुभाषितानि",
    title_hindi: "रुचिरा भाग-2: दुर्बुद्धिः विनश्यति, धातु रूप व कारक प्रयोग",
    subject_id: "sub-san",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "Sanskrit",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'अमृता भाग-2' & NCERT 'रुचिरा भाग-2'",
    resource_type: "formula_sheet",
    description: "सुभाषितानि श्लोक, पंचतंत्र कथा 'दुर्बुद्धिः विनश्यति' (कछुए व हंस की कथा), लृट् लकार (भविष्यत् काल: पठिष्यति, पठिष्यतः, पठिष्यन्ति), लता व मुनि शब्द रूप।",
    content_markdown: `# कक्षा 7 संस्कृत: अमृता 2 व रुचिरा 2
1. **लृट् लकार (भविष्यत् काल - पठ् धातु)**:
   - प्रथम पुरुष: पठिष्यति | पठिष्यतः | पठिष्यन्ति
   - मध्यम पुरुष: पठिष्यसि | पठिष्यथः | पठिष्यथ
   - उत्तम पुरुष: पठिष्यामि | पठिष्यावः | पठिष्यामः
2. **दुर्बुद्धिः विनश्यति (शिक्षाप्रद कथा)**:
   'सुहृदां हितकामानां न शृणोतीह यो वचः।
   स कूर्म इव दुर्बुद्धिः काष्ठाद् भ्रष्टो विनश्यति॥'
   अर्थ: जो अपने सच्चे मित्रों की हितकारी बात नहीं सुनता, वह डंडे से गिरे मूर्ख कछुए की तरह नष्ट हो जाता है।`,
    file_url: "https://ncert.nic.in/textbook.php?ghsk2=0-13",
    upload_date: "2026-09-07",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c07-eng",
    title: "Class 7 English - Radiance Part 2 (BSEB) & Honeycomb (NCERT)",
    title_hindi: "हनीकॉम्ब व रेडिएंस 2: Three Questions, The Squirrel, Grammar",
    subject_id: "sub-eng",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "English",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Radiance Part 2' & NCERT 'Honeycomb'",
    resource_type: "chapter_notes",
    description: "Leo Tolstoy's 'Three Questions', 'A Gift of Chappals', 'The Squirrel' poem, Indirect Speech rules, Active/Passive Voice conversions and Notice Writing.",
    content_markdown: `# Class 7 English: Radiance & Honeycomb
## 1. Key Prose & Poetry
- **Three Questions (Leo Tolstoy)**: What is the most important time? Who is the most important person? What is the most important thing to do? (Answer: The present moment, the person you are with, and doing good for them).
- **A Gift of Chappals**: Empathy of children giving away family slippers to a barefoot wandering beggar.

## 2. Advanced Grammar
- Direct to Indirect Speech:
  - He said, "I am reading." -> He said that he was reading.
  - She said to me, "Do you know him?" -> She asked me if I knew him.
- Notice Writing Format: Issuing Authority, Notice Heading, Date, Body, Signature & Designation.`,
    file_url: "https://ncert.nic.in/textbook.php?geen1=0-8",
    upload_date: "2026-09-07",
    author: "Sunita Verma"
  },
  {
    id: "res-c07-mat",
    title: "Class 7 Mathematics - गणित कक्षा 7: पूर्णांक, भिन्न, सरल समीकरण व त्रिभुज",
    title_hindi: "गणित कक्षा 7: भिन्न-दशमलव, सरल समीकरण, घातांक-घात व त्रिभुज गुण",
    subject_id: "sub-mat",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "Mathematics",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित' कक्षा 7 & NCERT 'Mathematics Class 7'",
    resource_type: "formula_sheet",
    description: "पूर्णांकों के गुणन व भाग नियम, भिन्न और दशमलव, सरल समीकरण (Linear Equations), रेखाएं एवं कोण, त्रिभुज और उसके गुण (पाइथागोरस प्रमेय), घातांक और घात।",
    content_markdown: `# कक्षा 7 गणित: मुख्य सूत्र एवं प्रमेय
1. **पूर्णांक नियम (Integers)**:
   - (-a) x (-b) = +(a x b) | (-a) / (-b) = +(a / b)
2. **त्रिभुज और उसके गुण**:
   - बाह्य कोण प्रमेय: त्रिभुज का बाह्य कोण दोनों सम्मुख अंतःकोणों के योग के बराबर होता है।
   - पाइथागोरस प्रमेय (समकोण त्रिभुज): (कर्ण)² = (लंब)² + (आधार)² [h² = p² + b²]
3. **घातांक के नियम (Laws of Exponents)**:
   - aᵐ x aⁿ = aᵐ⁺ⁿ
   - aᵐ / aⁿ = aᵐ⁻ⁿ
   - (aᵐ)ⁿ = aᵐⁿ
   - a⁰ = 1 (जहाँ a ≠ 0)`,
    file_url: "https://ncert.nic.in/textbook.php?ghmh1=0-13",
    upload_date: "2026-09-07",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c07-sci",
    title: "Class 7 Science - विज्ञान कक्षा 7: पोषण, ऊष्मा, अम्ल-क्षार व प्रकाश",
    title_hindi: "विज्ञान कक्षा 7: प्रकाश संश्लेषण, पाचन तंत्र, लिटमस टेस्ट व समतल दर्पण",
    subject_id: "sub-sci",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "Science",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'विज्ञान' कक्षा 7 & NCERT 'Science Class 7'",
    resource_type: "chapter_notes",
    description: "पादपों एवं प्राणियों में पोषण (मानव पाचन तंत्र), ऊष्मा (चालन, संवहन, विकिरण), अम्ल, क्षारक और लवण (उदासीनीकरण, सूचक), भौतिक एवं रासायनिक परिवर्तन, गति एवं समय।",
    content_markdown: `# कक्षा 7 विज्ञान: व्यापक अध्याय सार
1. **पादपों एवं प्राणियों में पोषण**:
   - स्वपोषी (Autotrophs): 6CO₂ + 6H₂O + सूर्य का प्रकाश + क्लोरोफिल -> C₆H₁₂O₆ (ग्लूकोज) + 6O₂
   - मानव पाचन: मुखगुहा (लार/टायलिन) -> आमाशय (HCl, पेप्सिन) -> क्षुद्रांत्र (यकृत पित्तरस, अग्न्याशयी रस)।
2. **अम्ल, क्षारक एवं लवण (Acids, Bases & Salts)**:
   - अम्ल: स्वाद में खट्टे; नीले लिटमस को लाल करते हैं (उदा. हाइड्रोक्लोरिक अम्ल, सिरका/एसिटिक अम्ल)।
   - क्षारक: स्वाद में कड़वे, छूने में साबुन जैसे; लाल लिटमस को नीला करते हैं (उदा. सोडियम हाइड्रॉक्साइड)।
   - उदासीनीकरण: अम्ल + क्षारक -> लवण + जल + ऊष्मा।
3. **भौतिक बनाम रासायनिक परिवर्तन**:
   - भौतिक परिवर्तन: नया पदार्थ नहीं बनता, उत्क्रमणीय (बर्फ का पिघलना)।
   - रासायनिक परिवर्तन: नया पदार्थ बनता है, अनुत्क्रमणीय (लोहे में जंग लगना, मैग्नीशियम फीते का जलना)।`,
    file_url: "https://ncert.nic.in/textbook.php?ghsc1=0-13",
    upload_date: "2026-09-07",
    author: "Pooja Banerjee"
  },
  {
    id: "res-c07-sst",
    title: "Class 7 Social Science - मध्यकालीन भारत, पर्यावरण व राज्य शासन",
    title_hindi: "सामाजिक विज्ञान कक्षा 7: दिल्ली सल्तनत, मुगल साम्राज्य व वायुमंडल",
    subject_id: "sub-sst",
    class_id: "c-07",
    grade_level: 7,
    subject_name: "Social Science",
    class_name: "Class 7-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'हमारा अतीत 2', 'हमारा पर्यावरण' (भूगोल), 'सामाजिक एवं राजनीतिक जीवन 2'",
    resource_type: "chapter_notes",
    description: "दिल्ली सल्तनत व तुर्क शासक, मुगल साम्राज्य (अकबर की सुलह-ए-कुल नीति व बिहार में शेरशाह सूरी), वायुमंडल की परतें (क्षोभमंडल, समतापमंडल), राज्य सरकार की कार्यप्रणाली (विधानसभा, मुख्यमंत्री, राज्यपाल)।",
    content_markdown: `# कक्षा 7 सामाजिक विज्ञान: मुख्य बिंदु
1. **इतिहास - शेरशाह सूरी एवं सासाराम (बिहार का योगदान)**:
   - सासाराम (रोहतास, बिहार) के शेरशाह सूरी ने हुमायूं को हराकर सूर वंश की स्थापना की।
   - ग्रांड ट्रंक रोड (जी.टी. रोड / सड़क-ए-आजम) का निर्माण एवं 'रुपया' मुद्रा का प्रचलन।
   - सासाराम का अष्टकोणीय मकबरा मध्यकालीन वास्तुकला का अनुपम उदाहरण है।
2. **भूगोल - वायुमंडल की संरचना**:
   - क्षोभमंडल (Troposphere): सभी मौसमी घटनाएं (बादल, वर्षा, आँधी)।
   - समतापमंडल (Stratosphere): ओजोन परत स्थित; हवाई जहाज उड़ाने हेतु आदर्श।
   - मध्यमंडल, बाह्य वायुमंडल, बहिर्मंडल।
3. **नागरिक शास्त्र - राज्य शासन कार्यप्रणाली**:
   - विधायक (MLA): जनता द्वारा प्रत्यक्ष रूप से निर्वाचित प्रतिनिधि।
   - बहुमत दल का नेता मुख्यमंत्री बनता है, जिसकी नियुक्ति राज्यपाल करते हैं।`,
    file_url: "https://ncert.nic.in/textbook.php?ghss1=0-8",
    upload_date: "2026-09-07",
    author: "Sunita Verma"
  },

  // ==========================================
  // CLASS 8 (कक्षा 8)
  // ==========================================
  {
    id: "res-c08-hin",
    title: "Class 8 Hindi - किस्लय भाग-3 (BSEB) व वसंत भाग-3 (NCERT)",
    title_hindi: "किस्लय 3 व वसंत 3: ध्वनि, लाख की चूड़ियां, बस की यात्रा, अलंकार",
    subject_id: "sub-hin",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "Hindi",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'किस्लय भाग-3' & NCERT 'वसंत भाग-3'",
    resource_type: "chapter_notes",
    description: "सूर्यकांत त्रिपाठी 'निराला' की कविता 'ध्वनि', कामतानाथ की कहानी 'लाख की चूड़ियां', हरिशंकर परसाई का व्यंग्य 'बस की यात्रा', शब्दालंकार एवं अर्थालंकार (अनुप्रास, यमक, उपमा, रूपक)।",
    content_markdown: `# कक्षा 8 हिंदी: किस्लय 3 एवं वसंत 3
## 1. प्रमुख साहित्यिक रचनाएँ
- **ध्वनि (निराला जी)**: 'अभी न होगा मेरा अंत, अभी-अभी ही तो आया है मेरे वन में मृदुल वसंत...' - युवा पीढ़ी को आलस्य त्यागने का आह्वान।
- **लाख की चूड़ियां (कामतानाथ)**: मशीनी युग के आने से हस्तशिल्पियों (बदलू मनिहार) की बेरोजगारी की मर्मस्पर्शी व्यथा।
- **बस की यात्रा (हरिशंकर परसाई)**: जर्जर बसों और परिवहन तंत्र पर तीखा व्यंग्य ('बस श्रद्धा के योग्य थी... वयोवृद्ध थी')।
- **दीवानों की हस्ती (भगवतीचरण वर्मा)**: देश के दीवाने बलिदानी वीरों का जीवन दर्शन।

## 2. अलंकार परिचय (Figures of Speech)
1. **अनुप्रास**: एक ही वर्ण की आवृत्ति (चारु चंद्र की चंचल किरणें)।
2. **यमक**: एक शब्द का भिन्न अर्थों में दोहराव (कनक कनक ते सौ गुनी - एक कनक = सोना, दूसरा = धतूरा)।
3. **उपमा**: सादृश्य तुलना (पीपर पात सरिस मन डोला)।
4. **रूपक**: उपमेय में उपमान का अभेद आरोप (चरण कमल बंदौ हरिराई)।`,
    file_url: "https://ncert.nic.in/textbook.php?hhsk1=0-14",
    upload_date: "2026-09-08",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c08-san",
    title: "Class 8 Sanskrit - अमृता भाग-3 / रुचिरा भाग-3: सन्धि व प्रत्यय",
    title_hindi: "रुचिरा भाग-3: सुभाषितानि, क्त्वा व ल्यप् प्रत्यय, विदिलिङ् लकार",
    subject_id: "sub-san",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "Sanskrit",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'अमृता भाग-3' & NCERT 'रुचिरा भाग-3'",
    resource_type: "formula_sheet",
    description: "सुभाषितानि, 'बिलस्य वाणी न कदापि मे श्रुता' (पंचतंत्र कथा), प्रत्यय (क्त्वा, ल्यप्, तुमुन्), विधिलिङ् लकार (चाहिए अर्थ में: पठेत्, पठेताम्, पठेयुः) एवं अस्मद्-युष्मद् शब्द रूप।",
    content_markdown: `# कक्षा 8 संस्कृत: अमृता 3 एवं रुचिरा 3
1. **प्रत्यय ज्ञान (Suffixes)**:
   - क्त्वा (करके): पठ् + क्त्वा = पठित्वा (पढ़कर) | गम् + क्त्वा = गत्वा (जाकर)
   - ल्यप् (उपसर्ग युक्त करके): आ + गम् + ल्यप् = आगत्य (आकर) | वि + हस् + ल्यप् = विहस्य (हंसकर)
   - तुमुन् (के लिए): पठ् + तुमुन् = पठितुम् (पढ़ने के लिए) | दा + तुमुन् = दातुम् (देने के लिए)
2. **विधिलिङ् लकार (चाहिए अर्थ - पठ् धातु)**:
   - प्रथम पुरुष: पठेत् | पठेताम् | पठेयुः
   - मध्यम पुरुष: पठेः | पठे तम् | पठे त
   - उत्तम पुरुष: पठेयम् | पठेव | पठेम
3. **अस्मद् (मैं) एवं युष्मद् (तुम) रूप**:
   - अस्मद् प्रथमा: अहम् | आवाम् | वयम्
   - युष्मद् प्रथमा: त्वम् | युवाम् | यूयम्`,
    file_url: "https://ncert.nic.in/textbook.php?hhsk2=0-14",
    upload_date: "2026-09-08",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c08-eng",
    title: "Class 8 English - Radiance Part 3 (BSEB) & Honeydew (NCERT)",
    title_hindi: "हनीड्यू व रेडिएंस 3: The Best Christmas Present, Tsunami, Essay",
    subject_id: "sub-eng",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "English",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'Radiance Part 3' & NCERT 'Honeydew'",
    resource_type: "chapter_notes",
    description: "Michael Morpurgo's 'The Best Christmas Present in the World', 'The Tsunami', 'The Ant and the Cricket', Conditionals (If clauses), Relative Pronouns and Article Writing.",
    content_markdown: `# Class 8 English: Radiance & Honeydew
## 1. Key Prose & Poems
- **The Best Christmas Present in the World**: World War I Christmas truce between British & German soldiers playing football in No Man's Land; Connie's letter.
- **The Tsunami (2004)**: Real heroic accounts of Tilly Smith saving tourists at Phuket beach using geography lessons.
- **The Ant and the Cricket**: Fable on foresight vs lazy procrastination.

## 2. Higher Grammar
- Conditional Sentences:
  - Zero: If water reaches 100°C, it boils.
  - First: If you study hard, you will pass.
  - Second: If I had wings, I would fly to Patna.
- Formal Letter to Editor on Road Safety & Sanitation in Jamui.`,
    file_url: "https://ncert.nic.in/textbook.php?heen1=0-8",
    upload_date: "2026-09-08",
    author: "Sunita Verma"
  },
  {
    id: "res-c08-mat",
    title: "Class 8 Mathematics - गणित कक्षा 8: परिमेय संख्याएँ, क्षेत्रमिति व गुणनखण्ड",
    title_hindi: "गणित कक्षा 8: एक चर वाले समीकरण, चतुर्भुज, क्षेत्रमिति व बीजगणित",
    subject_id: "sub-mat",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "Mathematics",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित' कक्षा 8 & NCERT 'Mathematics Class 8'",
    resource_type: "formula_sheet",
    description: "परिमेय संख्याएँ (Rational Numbers), एक चर वाले रैखिक समीकरण, चतुर्भुजों को समझना, क्षेत्रमिति (समलंब, बेलन, घन व घनाभ का पृष्ठीय क्षेत्रफल व आयतन), बीजीय व्यंजक एवं सर्वसमिकाएं, गुणनखण्डन।",
    content_markdown: `# कक्षा 8 गणित: सर्वसमिकाएं एवं क्षेत्रमिति सूत्र
1. **महत्वपूर्ण बीजीय सर्वसमिकाएं (Identities)**:
   - (a + b)² = a² + 2ab + b²
   - (a - b)² = a² - 2ab + b²
   - (a² - b²) = (a + b)(a - b)
   - (x + a)(x + b) = x² + (a + b)x + ab
2. **क्षेत्रमिति (Mensuration)**:
   - समलंब चतुर्भुज का क्षेत्रफल = 1/2 x (समानांतर भुजाओं का योग) x ऊँचाई = 1/2 x (a + b) x h
   - समचतुर्भुज का क्षेत्रफल = 1/2 x d₁ x d₂
   - बेलन का वक्र पृष्ठीय क्षेत्रफल = 2πrh
   - बेलन का कुल पृष्ठीय क्षेत्रफल = 2πr(r + h)
   - बेलन का आयतन = πr²h
   - घनाभ का कुल पृष्ठीय क्षेत्रफल = 2(lb + bh + hl) | आयतन = l x b x h
3. **चक्रवृद्धि ब्याज (Compound Interest)**:
   - मिश्रधन A = P(1 + r/100)ⁿ | CI = A - P`,
    file_url: "https://ncert.nic.in/textbook.php?hhmh1=0-13",
    upload_date: "2026-09-08",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c08-sci",
    title: "Class 8 Science - विज्ञान कक्षा 8: फसल उत्पादन, सूक्ष्मजीव, धातु-अधातु व बल",
    title_hindi: "विज्ञान कक्षा 8: जीवाणु-विषाणु, दहन-ज्वाला, कोशिका संरचना व दाब",
    subject_id: "sub-sci",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "Science",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'विज्ञान' कक्षा 8 & NCERT 'Science Class 8'",
    resource_type: "chapter_notes",
    description: "फसल उत्पादन एवं प्रबंध (खरीफ व रबी फसलें, सिंचाई विधियां), सूक्ष्मजीव: मित्र एवं शत्रु (टीकाकरण/वैक्सीन, पाश्चुरीकरण), कोयला और पेट्रोलियम, दहन और ज्वाला, कोशिका - संरचना एवं प्रकार्य, बल तथा दाब, घर्षण।",
    content_markdown: `# कक्षा 8 विज्ञान: संपूर्ण अध्याय संक्षेप
1. **फसल उत्पादन एवं प्रबंध**:
   - खरीफ फसल: वर्षा ऋतु में (जून-अक्टूबर) - धान, मक्का, सोयाबीन, मूंगफली।
   - रबी फसल: शीत ऋतु में (अक्टूबर-मार्च) - गेहूँ, चना, मटर, सरसों, आलू।
   - आधुनिक सिंचाई विधियां: ड्रिप तंत्र (बूंद-बूंद सिंचाई) एवं स्प्रिंकलर (छिड़काव तंत्र)।
2. **सूक्ष्मजीव (Microorganisms)**:
   - मित्रवत: राइजोबियम (नाइट्रोजन स्थिरीकरण), लैक्टोबैसिलस (दूध से दही), यीस्ट (किण्वन/बेकिंग)।
   - रोगजनक: जीवाणु (हैजा, टीबी), विषाणु (पोलियो, चिकनपॉक्स, कोविड), प्रोटोजोआ (मलेरिया - मादा एनाफिलीज़ मच्छर)।
3. **कोशिका संरचना (Cell Biology)**:
   - केंद्रक, कोशिकाद्रव्य, कोशिका झिल्ली।
   - पादप कोशिका में अतिरिक्त कोशिका भित्ति (Cell Wall) एवं हरितलवक (Chloroplast) होते हैं।
4. **बल एवं दाब (Force & Pressure)**:
   - दाब P = बल (F) / क्षेत्रफल (A) | SI मात्रक = पास्कल (Pa / N/m²)।`,
    file_url: "https://ncert.nic.in/textbook.php?hhsc1=0-13",
    upload_date: "2026-09-08",
    author: "Pooja Banerjee"
  },
  {
    id: "res-c08-sst",
    title: "Class 8 Social Science - संसाधन, 1857 की क्रांति व भारतीय संविधान",
    title_hindi: "सामाजिक विज्ञान कक्षा 8: कुंवर सिंह का योगदान, संविधान व उद्योग",
    subject_id: "sub-sst",
    class_id: "c-08",
    grade_level: 8,
    subject_name: "Social Science",
    class_name: "Class 8-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'हमारा अतीत 3', 'संसाधन एवं विकास' (भूगोल), 'सामाजिक एवं राजनीतिक जीवन 3'",
    resource_type: "chapter_notes",
    description: "1857 का स्वतंत्रता संग्राम (बिहार के वीर कुंवर सिंह का अमर बलिदान), भारतीय संविधान की मुख्य विशेषताएं (मौलिक अधिकार, पंथनिरपेक्षता), संसाधन (नवीकरणीय व अनवीकरणीय), कृषि व प्रमुख उद्योग।",
    content_markdown: `# कक्षा 8 सामाजिक विज्ञान (SCERT बिहार & NCERT)
1. **1857 की क्रांति में बिहार का अमर योगदान (बाबू वीर कुंवर सिंह)**:
   - जगदीशपुर (भोजपुर, बिहार) के 80 वर्षीय वीर कुंवर सिंह ने अंग्रेजों के विरुद्ध विद्रोह का नेतृत्व किया।
   - दानापुर छावनी के सैनिकों के साथ मिलकर आरा जेल पर कब्जा और ब्रिटिश सेनापति ली ग्रैंड को परास्त किया।
2. **भारतीय संविधान के मुख्य लक्षण (Polity)**:
   - संघवाद (Federalism): केंद्र एवं राज्य स्तर पर दोहरी शासन व्यवस्था।
   - संसदीय शासन प्रणाली: सार्वभौमिक वयस्क मताधिकार।
   - मौलिक अधिकार (अनुच्छेद 12 से 35): समानता, स्वतंत्रता, शोषण के विरुद्ध अधिकार, धार्मिक स्वतंत्रता, संस्कृति व शिक्षा, संवैधानिक उपचार।
3. **भूगोल - संसाधन एवं कृषि**:
   - नवीकरणीय (सौर ऊर्जा, पवन ऊर्जा) vs अनवीकरणीय (कोयला, पेट्रोलियम)।
   - मृदा संरक्षण: समोच्च जुताई, पट्टीदार खेती, रक्षक मेखलाएं।`,
    file_url: "https://ncert.nic.in/textbook.php?hhss1=0-8",
    upload_date: "2026-09-08",
    author: "Sunita Verma"
  },

  // ==========================================
  // CLASS 9 (कक्षा 9)
  // ==========================================
  {
    id: "res-c09-hin",
    title: "Class 9 Hindi - गोधूलि भाग-1 (BSEB) व क्षितिज भाग-1 (NCERT)",
    title_hindi: "गोधूलि 1: कहानी का प्लॉट, नालंदा व कबीर की साखियां",
    subject_id: "sub-hin",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "Hindi",
    class_name: "Class 9-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'गोधूलि भाग-1' & NCERT 'क्षितिज भाग-1'",
    resource_type: "chapter_notes",
    description: "शिवपूजन सहाय की कालजयी कहानी 'कहानी का प्लॉट' (भगजोगनी का चरित्र चित्रण), देशरत्न डॉ. राजेन्द्र प्रसाद का लेख 'भारत का पुरातन विद्यापीठ : नालंदा', कबीर की साखियां एवं सबद, रस एवं छंद।",
    content_markdown: `# कक्षा 9 हिंदी: गोधूलि भाग-1 (बिहार बोर्ड)
## 1. प्रमुख गद्य पाठ
- **कहानी का प्लॉट (शिवपूजन सहाय)**: बिहार के ग्रामीण समाज में बाल विवाह, बेमेल विवाह और नारी की विवशता पर मार्मिक प्रहार। भगजोगनी का पात्र समाज की कुरीतियों का सजीव आईना है।
- **भारत का पुरातन विद्यापीठ : नालंदा (डॉ. राजेन्द्र प्रसाद)**: नालंदा विश्वविद्यालय का ऐतिहासिक महत्व, शीलभद्र, ह्वेनसांग के अध्ययन वृतांत एवं ज्ञान-साधना।
- **ग्राम गीत का मर्म (लक्ष्मीनारायण सुधांशु)**: लोकगीतों की आत्मा एवं पारिवारिक जीवन में उनका योगदान।

## 2. काव्य खंड
- **कबीर की साखियाँ**: 'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥'
- **रैदास के पद**: 'प्रभु जी तुम चंदन हम पानी, जाकी अंग-अंग बास समानी।'
- **रस के चार अवयव**: स्थायी भाव, विभाव, अनुभाव और संचारी भाव।`,
    file_url: "https://ncert.nic.in/textbook.php?ihsk1=0-14",
    upload_date: "2026-09-09",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c09-san",
    title: "Class 9 Sanskrit - पीयूषम् भाग-1 (BSEB) व शेमुषी भाग-1 (NCERT)",
    title_hindi: "पीयूषम् 1: ईश वन्दना, लोभाविष्टः चक्रधरः, कारक व सन्धि सूत्र",
    subject_id: "sub-san",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "Sanskrit",
    class_name: "Class 9-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'पीयूषम् भाग-1' & NCERT 'शेमुषी भाग-1'",
    resource_type: "formula_sheet",
    description: "ईश वन्दना (उपनिषद् मंत्र), पंचतंत्र कथा 'लोभाविष्टः चक्रधरः', कारक सूत्र (साधकतमं करणम्, कर्मणि द्वितीया), विसर्ग सन्धि एवं पत्र लेखन प्रारूप।",
    content_markdown: `# कक्षा 9 संस्कृत: पीयूषम् भाग-1 (बिहार बोर्ड)
1. **ईश वन्दना (उपनिषद् मंत्र)**:
   'यतो वाचो निवर्तन्ते अप्राप्य मनसा सह।
   आनन्दं ब्रह्मणो विद्वान् न बिभेति कदाचनेति॥'
2. **कारक सूत्र (Case Formulation Rules)**:
   - कर्तरि प्रथमा: कर्ता कारक में प्रथमा विभक्ति होती है (रामः पठति)।
   - कर्मणि द्वितीया: कर्म कारक में द्वितीया विभक्ति होती है (सः ग्रामं गच्छति)।
   - साधकतमं करणम्: क्रिया की सिद्धि में जो सबसे सहायक हो, उसमें तृतीया होती है (कलमेन लिखति)।
   - दाणार्थे चतुर्थी: जिसे दान दिया जाए, उसमें चतुर्थी होती है (विप्राय गां ददाति)।
   - ध्रुवमपायेऽपादानम्: अलगाव होने पर अपादान में पंचमी होती है (वृक्षात् पत्रं पतति)।
3. **लोभाविष्टः चक्रधरः**: अतिलोभ विनाश का कारण बनता है; चार मित्रों की कथा।`,
    file_url: "https://biharboardonline.bihar.gov.in/sanskrit-class9",
    upload_date: "2026-09-09",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c09-eng",
    title: "Class 9 English - Panorama Part 1 (BSEB) & Beehive (NCERT)",
    title_hindi: "पैनोरमा 1 व बिहाइव: The Fun They Had, The Road Not Taken",
    subject_id: "sub-eng",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "English",
    class_name: "Class 9-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "BSEB Patna 'Panorama Part 1' & NCERT 'Beehive'",
    resource_type: "chapter_notes",
    description: "Isaac Asimov's 'The Fun They Had', Robert Frost's 'The Road Not Taken', Bismillah Khan's Shehnai biography (Buxar, Bihar), Reported Speech and formal letter templates.",
    content_markdown: `# Class 9 English: Panorama Part 1 & Beehive
## 1. Key Prose & Poetry
- **The Sound of Music - Part II (Ustad Bismillah Khan)**:
  - Born in Dumraon (Bihar), Bismillah Khan elevated the Shehnai from royal naubat khana to classical concert stages.
  - Practiced on the peaceful banks of the River Ganga; awarded the Bharat Ratna in 2001.
- **The Road Not Taken (Robert Frost)**:
  - 'Two roads diverged in a yellow wood...' Metaphor for life-defining individual choices.
- **The Fun They Had**: Futuristic school year 2157 with mechanical telebooks vs human teachers and community classrooms.

## 2. Advanced Grammar & Writing
- Reported Speech with Tense Shifts:
  - Present Simple -> Past Simple | Will -> Would | Can -> Could.
- Formal Letter to District Magistrate regarding flood relief supplies in Jamui district.`,
    file_url: "https://ncert.nic.in/textbook.php?ieen1=0-11",
    upload_date: "2026-09-09",
    author: "Sunita Verma"
  },
  {
    id: "res-c09-mat",
    title: "Class 9 Mathematics - गणित कक्षा 9: बहुपद, निर्देशांक ज्यामिति व हीरोन सूत्र",
    title_hindi: "गणित कक्षा 9: संख्या पद्धति, वृत्त प्रमेय, पृष्ठीय क्षेत्रफल व सांख्यिकी",
    subject_id: "sub-mat",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "Mathematics",
    class_name: "Class 9-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित' कक्षा 9 & NCERT 'Mathematics Class 9'",
    resource_type: "formula_sheet",
    description: "संख्या पद्धति (अपरिमेय संख्याएं, हर का परिमेयकरण), बहुपद (शेषफल प्रमेय, गुणनखण्ड प्रमेय), निर्देशांक ज्यामिति (चतुर्थांश, भुज व कोटि), यूक्लिड की ज्यामिति, त्रिभुज सर्वांगसमता (SAS, ASA, SSS, RHS), हीरोन का सूत्र, शंकु व गोले का पृष्ठीय क्षेत्रफल एवं आयतन।",
    content_markdown: `# कक्षा 9 गणित: मुख्य सूत्र एवं प्रमेय
1. **संख्या पद्धति एवं परिमेयकरण**:
   - 1 / (√a + √b) = (√a - √b) / (a - b)
2. **बहुपद सर्वसमिकाएं (Polynomials)**:
   - (x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx
   - (x + y)³ = x³ + y³ + 3xy(x + y)
   - x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx)
   - यदि x + y + z = 0, तो x³ + y³ + z³ = 3xyz
3. **हीरोन का सूत्र (Heron's Formula)**:
   - त्रिभुज का क्षेत्रफल = √[s(s - a)(s - b)(s - c)], जहाँ s = (a + b + c)/2
4. **ठोसों का आयतन व क्षेत्रफल**:
   - शंकु का वक्र पृष्ठीय क्षेत्रफल = πrl (जहाँ l = √(r² + h²)) | आयतन = 1/3 πr²h
   - गोले का पृष्ठीय क्षेत्रफल = 4πr² | आयतन = 4/3 πr³
   - अर्धगोले का कुल पृष्ठीय क्षेत्रफल = 3πr² | आयतन = 2/3 πr³`,
    file_url: "https://ncert.nic.in/textbook.php?ihmh1=0-15",
    upload_date: "2026-09-09",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c09-sci",
    title: "Class 9 Science - विज्ञान कक्षा 9: गति के नियम, गुरुत्वाकर्षण, परमाणु व कोशिका",
    title_hindi: "विज्ञान कक्षा 9: न्यूटन के गति नियम, मोल संकल्पना, ऊतक व ध्वनि",
    subject_id: "sub-sci",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "Science",
    class_name: "Class 9-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'विज्ञान' कक्षा 9 & NCERT 'Science Class 9'",
    resource_type: "chapter_notes",
    description: "हमारे आस-पास के पदार्थ (गुप्त ऊष्मा, वाष्पीकरण), परमाणु एवं अणु (डाल्टन का सिद्धांत, मोल संकल्पना, रासायनिक सूत्र), कोशिका (माइटोकॉन्ड्रिया, लाइसोसोम), ऊतक (विभज्योतक, जाइलम, फ्लोएम), न्यूटन के गति के तीनों नियम, सार्वत्रिक गुरुत्वाकर्षण नियम, कार्य तथा ऊर्जा, ध्वनि।",
    content_markdown: `# कक्षा 9 विज्ञान: सारगर्भित नोट्स
1. **भौतिकी - गति एवं बल**:
   - गति के समीकरण:
     1. v = u + at
     2. s = ut + 1/2 at²
     3. v² = u² + 2as
   - न्यूटन का द्वितीय नियम: बल F = ma (संवेग परिवर्तन की दर)
   - गुरुत्वाकर्षण का सार्वत्रिक नियम: F = G (m₁ m₂) / r² (जहाँ G = 6.67 x 10⁻¹¹ N m²/kg²)
   - गुरुत्वीय त्वरण g = 9.8 m/s²
   - कार्य W = F x s x cos θ | गतिज ऊर्जा Eₖ = 1/2 mv² | स्थितिज ऊर्जा Eₚ = mgh
2. **रसायन विज्ञान - द्रव्य एवं परमाणु**:
   - मोल संकल्पना: 1 मोल = 6.022 x 10²³ कण (आवोगाद्रो संख्या Nₐ)
   - रदरफोर्ड का अल्फा प्रकीर्णन प्रयोग एवं बोर का परमाणु मॉडल।
3. **जीव विज्ञान - कोशिका व ऊतक**:
   - माइटोकॉन्ड्रिया: कोशिका का बिजलीघर (Powerhouse of the Cell - ATP निर्माण)।
   - लाइसोसोम: आत्मघाती थैली (Suicide Bag)।
   - जाइलम: जल व खनिजों का संवहन | फ्लोएम: भोजन (सुक्रोज) का संवहन।`,
    file_url: "https://ncert.nic.in/textbook.php?ihsc1=0-15",
    upload_date: "2026-09-09",
    author: "Pooja Banerjee"
  },
  {
    id: "res-c09-sst",
    title: "Class 9 Social Science - इतिहास, भूगोल, राजनीति, अर्थशास्त्र व आपदा प्रबंधन",
    title_hindi: "सामाजिक विज्ञान 9: फ्रांसीसी क्रांति, भारत स्थिति, लोकतंत्र व बिहार बाढ़ प्रबंधन",
    subject_id: "sub-sst",
    class_id: "c-09",
    grade_level: 9,
    subject_name: "Social Science",
    class_name: "Class 9-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'इतिहास की दुनिया 1', 'भारत : भूमि एवं लोग', 'लोकतांत्रिक राजनीति 1', 'हमारी अर्थव्यवस्था 1', 'आपदा प्रबंधन'",
    resource_type: "chapter_notes",
    description: "फ्रांसीसी व रूसी क्रांति, भारत का आकार एवं स्थिति, अपवाह तंत्र (गंगा व बिहार की नदियां - कोसी, गंडक, सोन), लोकतंत्र क्या और क्यों?, पालमपुर की कहानी व बिहार में गरीबी, आपदा प्रबंधन (बिहार की बाढ़ एवं सूखा)।",
    content_markdown: `# कक्षा 9 सामाजिक विज्ञान: बिहार बोर्ड संपूर्ण सार
1. **आपदा प्रबंधन - बिहार संदर्भ (विशेष अध्ययन)**:
   - उत्तर बिहार की बाढ़: कोसी नदी को 'बिहार का शोक' (Sorrow of Bihar) कहा जाता है।
   - दक्षिण बिहार (गया, नवादा, जमुई) में सूखे की स्थिति एवं आहर-पाइन पारंपरिक जल प्रबंधन प्रणाली।
   - भूकंप सुरक्षा: बिहार जोन IV और V (उच्च भूकंपीय संवेदनशीलता) में आता है।
2. **भूगोल - भारत एवं बिहार अपवाह तंत्र**:
   - गंगा नदी बिहार के मध्य से होकर पश्चिम से पूर्व की ओर बहती है और राज्य को दो भागों (उत्तरी बिहार व दक्षिणी बिहार) में बांटती है।
   - उत्तरी सहायक नदियां: घाघरा, गंडक, बूढ़ी गंडक, बागमती, कमला, कोसी, महानंदा।
   - दक्षिणी सहायक नदियां: कर्मनाशा, सोन, पुनपुन, फल्गु, किऊल।
3. **अर्थशास्त्र - उत्पादन के चार कारक**:
   - भूमि (लगान), श्रम (मजदूरी), भौतिक पूँजी (ब्याज), मानव पूँजी/उद्यम (लाभ)।`,
    file_url: "https://biharboardonline.bihar.gov.in/sst-class9",
    upload_date: "2026-09-09",
    author: "Sunita Verma"
  },

  // ==========================================
  // CLASS 10 (कक्षा 10 - MATRICULATION BOARD)
  // ==========================================
  {
    id: "res-c10-hin",
    title: "Class 10 Hindi - गोधूलि भाग-2 व वर्णिका भाग-2 (BSEB Matric Board Standard)",
    title_hindi: "गोधूलि 2 व वर्णिका 2: श्रम विभाजन और जाति प्रथा, विष के दांत, मंगम्मा",
    subject_id: "sub-hin",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "Hindi",
    class_name: "Class 10-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'गोधूलि भाग-2' (गद्य व पद्य) एवं 'वर्णिका भाग-2' (पूरक पाठ्यपुस्तक)",
    resource_type: "chapter_notes",
    description: "डॉ. भीमराव आंबेडकर का भाषण 'श्रम विभाजन और जाति प्रथा', नलिन विलोचन शर्मा की कहानी 'विष के दांत', मैक्समूलर का 'भारत से हम क्या सीखें', अमरकांत की 'बहादुर', रामविलास शर्मा की 'परंपरा का मूल्यांकन', बिरजू महाराज का 'जीत-जीत मैं निरखत हूँ', वर्णिका के पाठ (दही वाली मंगम्मा, ढहते विश्वास, माँ, नगर, धरती कब तक घूमेगी)।",
    content_markdown: `# कक्षा 10 हिंदी: गोधूलि भाग-2 एवं वर्णिका भाग-2 (बिहार बोर्ड मैट्रिक)
## 1. गद्य खंड के सर्वाधिक महत्वपूर्ण अध्याय
- **पाठ 1: श्रम विभाजन और जाति प्रथा (बाबा साहेब डॉ. भीमराव आंबेडकर)**:
  - मूल भाषण: 'Annihilation of Caste' (ललई सिंह यादव द्वारा अनूदित 'जातिभेद का उच्छेद')।
  - मुख्य विचार: जाति प्रथा केवल श्रम का नहीं, बल्कि श्रमिकों का अस्वाभाविक विभाजन करती है। आदर्श समाज स्वतंत्रता, समता और भ्रातृत्व पर आधारित होना चाहिए।
- **पाठ 2: विष के दांत (नलिन विलोचन शर्मा)**:
  - सेन साहब के अमीर अहंकार और खोखा (कासू) की उद्दंडता बनाम गिरधरलाल के स्वाभिमानी पुत्र मदन का संघर्ष। मदन द्वारा कासू के दो दांत तोड़ना वर्ग-संघर्ष का प्रतीक है।
- **पाठ 6: बहादुर (अमरकांत)**:
  - नेपाली पहाड़ी किशोर दिलबहादुर की ईमानदारी, सेवाभाव और मध्यवर्गीय परिवार (निर्मला व किशोर) द्वारा शोषक व्यवहार के कारण घर छोड़कर भागने की मार्मिक व्यथा।

## 2. वर्णिका भाग-2 (कहानियाँ)
1. **दही वाली मंगम्मा (श्रीनिवास)**: सास-बहू के अधिकार-द्वंद्व और पारंपरिक मातृत्व।
2. **ढहते विश्वास (सातकोड़ी होता)**: ओडिशा के महानदी तट पर भयंकर बाढ़ की त्रासदी और लक्ष्मी का अदम्य संघर्ष।
3. **माँ (ईश्वर पेटलीकर)**: मानसिक रूप से अस्वस्थ मंगू के प्रति माँ की ममता।
4. **नगर (सुजाता)**: मदुरै के बड़े अस्पताल में वल्ली अम्माल व पाप्पाति की प्रशासनिक उपेक्षा।
5. **धरती कब तक घूमेगी (सांवर दइया)**: तीन बेटों द्वारा वृद्ध माँ सीता को रोटी के लिए महीने-महीने बांटने का हृदयविदारक यथार्थ।`,
    file_url: "https://biharboardonline.bihar.gov.in/matric-hindi",
    upload_date: "2026-09-10",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c10-san",
    title: "Class 10 Sanskrit - पीयूषम् भाग-2 (BSEB Matric Board Exam Master Guide)",
    title_hindi: "पीयूषम् 2: मंगलम् उपनिषद्, पाटलिपुत्रवैभवम्, आलसकथा, नीतिश्लोकाः",
    subject_id: "sub-san",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "Sanskrit",
    class_name: "Class 10-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'पीयूषम् भाग-2' (दशम वर्ग)",
    resource_type: "chapter_notes",
    description: "मंगलम् (ईशावास्य, कठ, मुण्डक, श्वेताश्वतर उपनिषद्), पाटलिपुत्रवैभवम् (पटना का इतिहास, गोलघर, महावीर मंदिर, गुरु गोबिंद सिंह जन्मस्थान), आलसकथा (विद्यापति रचित पुरुषपरीक्षा), भारतमहिमा, नीतिश्लोकाः (विदुर नीति), कर्मवीर कथा (रामप्रवेश राम), स्वामी दयानंद, कर्णस्य दानवीरता।",
    content_markdown: `# कक्षा 10 संस्कृत: पीयूषम् भाग-2 (बिहार बोर्ड मैट्रिक 100 अंक संपूर्ण तैयारी)
## 1. पाठ 1: मङ्गलम् (उपनिषद् श्लोक)
- **सत्यमेव जयते नानृतं** सत्येन पन्था विततो देवयानः। येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम्॥ (मुण्डकोपनिषद्)
  - *भावार्थ*: सत्य की ही विजय होती है, असत्य की नहीं। सत्य से ही देवलोक का मार्ग प्रशस्त होता है।
- **यथा नद्यः स्यन्दमानाः समुद्रेऽस्तं गच्छन्ति नामरूपे विहाय**। तथा विद्वान् नामरूपाद् विमुक्तः परात्परं पुरुषमुपैति दिव्यम्॥
  - *भावार्थ*: जिस प्रकार बहती हुई नदियां अपने नाम और रूप को त्यागकर समुद्र में विलीन हो जाती हैं, उसी प्रकार ज्ञानी पुरुष अपने नाम-रूप से मुक्त होकर परम दिव्य पुरुष को प्राप्त होता है।

## 2. पाठ 2: पाटलिपुत्रवैभवम् (बिहार का सांस्कृतिक गौरव)
- बिहार राज्य की राजधानी पटना प्राचीन काल से ज्ञान, राजनीति और धर्म का केंद्र रही है।
- बुद्ध काल में इसे 'पाटलिग्राम' कहा जाता था। भगवान बुद्ध ने भविष्यवाणी की थी कि यह नगर भविष्य में महानगर होगा, किंतु अग्नि, जल और कलह से सदा भयभीत रहेगा।
- चंद्रगुप्त मौर्य के समय सुदृढ़ रक्षा व्यवस्था (मेगास्थनीज वृत्तांत), सम्राट अशोक के समय प्रियदर्शिनी समृद्धि। सिख धर्म के 10वें गुरु, गुरु गोबिंद सिंह का जन्मस्थान 'तख्त श्री हरमंदिर जी पटना साहिब'।

## 3. पाठ 3: आलसकथा (मिथिला कोकिल विद्यापति)
- मिथिला के मंत्री वीरेश्वर स्वभाव से दानशील और दयावान थे।
- वास्तविक आलसियों की पहचान हेतु आलसशाला में आग लगाई गई। धूर्त लोग भाग गए, किंतु 4 वास्तविक आलसी वस्त्र से मुंह ढके बातचीत करते रहे।

## 4. पाठ 7: नीतिश्लोकाः (महात्मा विदुर रचित)
- 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः। कामः क्रोधस्तथा लोभस्तस्मादेतत् त्रयं त्यजेत्॥'
  - काम, क्रोध और लोभ - ये आत्मा का नाश करने वाले नरक के तीन द्वार हैं, अतः इनका त्याग करना चाहिए।`,
    file_url: "https://biharboardonline.bihar.gov.in/matric-sanskrit",
    upload_date: "2026-09-10",
    author: "Manoj Kumar Mishra"
  },
  {
    id: "res-c10-eng",
    title: "Class 10 English - Panorama Part 2 (BSEB) & First Flight (NCERT)",
    title_hindi: "पैनोरमा 2 व फर्स्ट फ्लाइट: The Pace for Living, Gillu, A Letter to God",
    subject_id: "sub-eng",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "English",
    class_name: "Class 10-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "BSEB Patna 'Panorama Part 2' & NCERT 'First Flight'",
    resource_type: "chapter_notes",
    description: "R.C. Hutchinson's 'The Pace for Living', Joan Lexau's 'Me and the Ecology Bit', Mahadevi Varma's 'Gillu', Satyajit Ray's 'What is Wrong with Indian Films', Toni Morrison's Nobel Acceptance Speech, 'A Letter to God' (Lencho's unshakeable faith in God), Nelson Mandela: Long Walk to Freedom, Grammar & Official Essay Writing.",
    content_markdown: `# Class 10 English: Panorama Part 2 (BSEB Matric) & First Flight
## 1. Key Bihar Board Panorama Lessons
- **The Pace for Living (R.C. Hutchinson)**:
  - Contrast between slow thinkers and the frantic tempo of modern technological life.
  - The Irish corn merchant in Dublin who felt the world was moving too fast with 90-mile-an-hour airplanes.
- **Me and the Ecology Bit (Joan Lexau)**:
  - Young narrator Jim tries to preach ecology to his neighbors (Mr. Williams, Ms. Greene, Mr. Johnson) but realizes nobody wants to change personal habits.
- **Gillu (Mahadevi Varma)**:
  - Emotional bond between the Hindi literary icon and a wounded baby squirrel (Gillu) nourished with milk from cotton wicks. Yellow Sonjuhi flower remembrance.
- **What is Wrong with Indian Films (Satyajit Ray)**:
  - Critique of stereotypical visual language, excessive songs and lack of raw realism in early Indian cinema.

## 2. Essential First Flight Literature
- **A Letter to God (G.L. Fuentes)**:
  - Lencho's faith after hailstorm destroys his cornfields; calling post office workers 'a bunch of crooks' despite their anonymous charity.
- **Nelson Mandela: Long Walk to Freedom**:
  - Inauguration at Union Buildings amphitheatre, Pretoria (10 May 1994); courage is not absence of fear, but triumph over it.

## 3. High-Scoring Grammar Tools
- Subject-Verb Concord, Modals (must, ought to, should), Determiners, Prepositions and Passive Voice conversions.`,
    file_url: "https://ncert.nic.in/textbook.php?jeen1=0-9",
    upload_date: "2026-09-10",
    author: "Sunita Verma"
  },
  {
    id: "res-c10-mat",
    title: "Class 10 Mathematics - गणित कक्षा 10 (BSEB 100-Marks Matric Board Blueprint)",
    title_hindi: "मैट्रिक गणित: वास्तविक संख्याएं, द्विघात समीकरण, त्रिकोणमिति, पृष्ठीय क्षेत्रफल",
    subject_id: "sub-mat",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "Mathematics",
    class_name: "Class 10-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'गणित' कक्षा 10 & NCERT 'Mathematics Class 10'",
    resource_type: "formula_sheet",
    description: "वास्तविक संख्याएं (यूक्लिड विभाजन प्रमेयिका, √2 व √5 अपरिमेयता सिद्धि), बहुपद, दो चर वाले रैखिक समीकरण, द्विघात समीकरण (विविक्तकर D = b² - 4ac), समानांतर श्रेढ़ी (AP), त्रिकोणमिति के अनुप्रयोग (sin, cos, tan मान सारणी व सर्वसमिकाएं), निर्देशांक ज्यामिति (दूरी सूत्र, विभाजन सूत्र), वृत्त की स्पर्श रेखाएं, पृष्ठीय क्षेत्रफल और आयतन, सांख्यिकी (माध्य, माध्यक, बहुलक)।",
    content_markdown: `# कक्षा 10 गणित: बिहार बोर्ड मैट्रिक परीक्षा संपूर्ण सूत्र संग्रह
## 1. वास्तविक संख्याएं (Real Numbers)
- यूक्लिड विभाजन प्रमेयिका: a = bq + r (जहाँ 0 ≤ r < b)
- दो संख्याओं a और b का म.स.प. (HCF) x ल.स.प. (LCM) = a x b
- सिद्ध करना कि √2, √3, √5 अपरिमेय संख्याएं हैं (विरोधाभास विधि)।

## 2. द्विघात समीकरण (Quadratic Equations)
- मानक रूप: ax² + bx + c = 0 (a ≠ 0)
- विविक्तकर (Discriminant): D = b² - 4ac
  - यदि D > 0: दो भिन्न वास्तविक मूल [x = (-b ± √D) / 2a]
  - यदि D = 0: दो बराबर वास्तविक मूल [x = -b / 2a]
  - यदि D < 0: कोई वास्तविक मूल नहीं (काल्पनिक)

## 3. समानांतर श्रेढ़ी (Arithmetic Progression - AP)
- n-वाँ पद: aₙ = a + (n - 1)d
- प्रथम n पदों का योग: Sₙ = n/2 [2a + (n - 1)d] = n/2 [a + l]

## 4. त्रिकोणमिति के सूत्र एवं मान सारणी (Trigonometry)
- sin² θ + cos² θ = 1 => sin² θ = 1 - cos² θ => cos² θ = 1 - sin² θ
- 1 + tan² θ = sec² θ => sec² θ - tan² θ = 1
- 1 + cot² θ = cosec² θ => cosec² θ - cot² θ = 1
- **मान सारणी**:
  - sin: 0° = 0, 30° = 1/2, 45° = 1/√2, 60° = √3/2, 90° = 1
  - cos: 0° = 1, 30° = √3/2, 45° = 1/√2, 60° = 1/2, 90° = 0
  - tan: 0° = 0, 30° = 1/√3, 45° = 1, 60° = √3, 90° = अपरिभाषित (∞)

## 5. निर्देशांक ज्यामिति (Coordinate Geometry)
- दूरी सूत्र: AB = √[(x₂ - x₁)² + (y₂ - y₁)²]
- विभाजन सूत्र: P(x, y) = [(m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)]
- मध्य-बिंदु सूत्र: M(x, y) = [(x₁ + x₂)/2, (y₁ + y₂)/2]

## 6. सांख्यिकी (Statistics)
- प्रत्यक्ष विधि माध्य: x̄ = Σfᵢxᵢ / Σfᵢ
- बहुलक (Mode): l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] x h
- माध्यक (Median): l + [(N/2 - cf) / f] x h
- आनुभविक संबंध: 3 x माध्यक = बहुलक + 2 x माध्य`,
    file_url: "https://ncert.nic.in/textbook.php?jhmh1=0-14",
    upload_date: "2026-09-10",
    author: "Rajesh Sharma"
  },
  {
    id: "res-c10-sci",
    title: "Class 10 Science - विज्ञान कक्षा 10 (भौतिकी, रसायनशास्त्र, जीवविज्ञान बोर्ड कैप्सूल)",
    title_hindi: "मैट्रिक विज्ञान: रासायनिक अभिक्रियाएं, जैव प्रक्रम, प्रकाश, विद्युत व आनुवंशिकी",
    subject_id: "sub-sci",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "Science",
    class_name: "Class 10-A",
    board: "BSEB & NCERT Aligned",
    book_reference: "SCERT Bihar 'विज्ञान' कक्षा 10 & NCERT 'Science Class 10'",
    resource_type: "chapter_notes",
    description: "रासायनिक अभिक्रियाएं (संतुलन, संयोजन, वियोजन, विस्थापन, उपचयन/अपचयन), अम्ल, क्षारक एवं लवण (ब्लीचिंग पाउडर, बेकिंग सोडा, प्लास्टर ऑफ पेरिस), धातु एवं अधातु, कार्बन एवं उसके यौगिक (साबुनीकरण, हाइड्रोकार्बन), जैव प्रक्रम (श्वसन, परिसंचरण, वृक्क नेफ्रॉन), नियंत्रण एवं समन्वय (मस्तिष्क, पादप हार्मोन), जनन, आनुवंशिकता, प्रकाश परावर्तन एवं अपवर्तन (दर्पण व लेंस सूत्र), मानव नेत्र, विद्युत (ओम का नियम), विद्युत धारा के चुंबकीय प्रभाव।",
    content_markdown: `# कक्षा 10 विज्ञान: बिहार बोर्ड मैट्रिक परीक्षा सर्वोच्च अंक मार्गदर्शिका
## भाग क: रसायन शास्त्र (Chemistry)
1. **प्रमुख रासायनिक यौगिकों के सूत्र एवं उपयोग**:
   - विरंजक चूर्ण (Bleaching Powder): Ca(OCl)Cl या CaOCl₂ | कीटाणुनाशक व वस्त्र विरंजन।
   - बेकिंग सोडा (मीठा सोडा): NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)।
   - धावन सोडा: Na₂CO₃·10H₂O (सोडियम कार्बोनेट डेकाहाइड्रेट)।
   - प्लास्टर ऑफ पेरिस (POP): CaSO₄·1/2H₂O | टूटी हड्डियों को जोड़ने व मूर्तियां बनाने में।
   - जिप्सम: CaSO₄·2H₂O
2. **धातु एवं अधातु**:
   - संक्षारण (जंग) से बचाव: यशदलेपन (Galvanization - जस्ते की परत चढ़ाना)।
   - एक्वारेजिया (अम्लराज): 3 भाग सांद्र HCl + 1 भाग सांद्र HNO₃।

## भाग ख: जीव विज्ञान (Biology)
1. **जैव प्रक्रम (Life Processes)**:
   - नेफ्रॉन (वृक्काणु): वृक्क की संरचनात्मक एवं कार्यात्मक इकाई; यूरिया का निष्पादन।
   - रुधिर परिसंचरण: दोहरा परिसंचरण; दायां आलिंद/निलय (अशुद्ध रक्त CO₂ युक्त), बायां आलिंद/निलय (शुद्ध रक्त O₂ युक्त)।
   - जाइलम (जल संवहन) vs फ्लोएम (भोजन स्थानांतरण)।
2. **पादप हार्मोन**:
   - ऑक्सिन (वृद्धि प्रेरक), जिबरेलिन (तने की वृद्धि), साइटोकाइनिन (कोशिका विभाजन), एब्सिसिक एसिड (वृद्धि रोधक, पत्तियों का मुरझाना)।

## भाग ग: भौतिकी (Physics)
1. **प्रकाश का परावर्तन व अपवर्तन**:
   - दर्पण सूत्र: 1/f = 1/v + 1/u
   - लेंस सूत्र: 1/f = 1/v - 1/u
   - लेंस की क्षमता: P = 1/f (मीटर में) | SI मात्रक = डायऑप्टर (D)।
2. **विद्युत (Electricity)**:
   - ओम का नियम: V = IR (अचर ताप पर चालक के सिरों का विभवांतर प्रवाहित धारा के समानुपाती होता है)।
   - प्रतिरोधों का श्रेणीक्रम: Rₛ = R₁ + R₂ + R₃
   - प्रतिरोधों का समानांतर क्रम: 1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃
   - जूल का तापन नियम: H = I²Rt | विद्युत शक्ति P = VI = I²R = V²/R।`,
    file_url: "https://ncert.nic.in/textbook.php?jhsc1=0-13",
    upload_date: "2026-09-10",
    author: "Pooja Banerjee"
  },
  {
    id: "res-c10-sst",
    title: "Class 10 Social Science - सामाजिक विज्ञान (इतिहास, भूगोल, राजनीति, अर्थशास्त्र व आपदा प्रबंधन)",
    title_hindi: "मैट्रिक सामाजिक विज्ञान: राष्ट्रवाद, संसाधन, लोकतंत्र में द्वंद्व, बिहार अर्थव्यवस्था",
    subject_id: "sub-sst",
    class_id: "c-10",
    grade_level: 10,
    subject_name: "Social Science",
    class_name: "Class 10-A",
    board: "Bihar Board (BSEB)",
    book_reference: "BSEB Patna 'इतिहास की दुनिया 2', 'भारत : संसाधन एवं उपयोग', 'लोकतांत्रिक राजनीति 2', 'हमारी अर्थव्यवस्था 2', 'आपदा प्रबंधन'",
    resource_type: "chapter_notes",
    description: "इतिहास (यूरोप में राष्ट्रवाद, भारत में राष्ट्रवाद - चंपारण सत्याग्रह 1917, असहयोग आंदोलन, सविनय अवज्ञा आंदोलन, भारत छोड़ो), भूगोल (संसाधन एवं विकास, जल संसाधन, खनिज, ऊर्जा, कृषि), राजनीति विज्ञान (लोकतंत्र में सत्ता की साझेदारी, राजनीतिक दल), अर्थशास्त्र (राष्ट्रीय आय, साख एवं बैंकिंग, वैश्वीकरण), आपदा प्रबंधन (भूकंप, सुनामी, बाढ़, अगलगी एवं बचाव)।",
    content_markdown: `# कक्षा 10 सामाजिक विज्ञान: बिहार बोर्ड मैट्रिक परीक्षा 100% कवरेज
## 1. इतिहास - भारत में राष्ट्रवाद और बिहार
- **चंपारण सत्याग्रह (1917)**:
  - बिहार के चंपारण में यूरोपीय नीलहों द्वारा किसानों पर लागू 'तीनकठिया प्रणाली' (प्रति बीघे 3 कट्ठा में नील की खेती) के विरुद्ध।
  - राजकुमार शुक्ल के आमंत्रण पर महात्मा गांधी का चंपारण आगमन; गांधी जी का भारत में प्रथम सफल सत्याग्रह प्रयोग।
- **खिलाफत व असहयोग आंदोलन (1920-22)**: डॉ. राजेन्द्र प्रसाद, मौलाना मजहरुल हक का योगदान; 'सदाकत आश्रम' की स्थापना।
- **भारत छोड़ो आंदोलन (1942)**: 11 अगस्त 1942 को पटना सचिवालय पर तिरंगा फहराते हुए 7 अमर छात्रों की शहादत। जयप्रकाश नारायण द्वारा 'आजाद दस्ता' का गठन।

## 2. भूगोल - भारत : संसाधन एवं उपयोग
- संसाधन होते नहीं, बनते हैं (जिम्मरमैन का कथन)।
- जल संसाधन: भाखड़ा नांगल, दामोदर घाटी, हीराकुंड, कोसी बहुउद्देशीय परियोजना (बिहार)।
- परंपरागत ऊर्जा (कोयला, पेट्रोलियम) vs गैर-परंपरागत (सौर, पवन, बायोगैस, परमाणु ऊर्जा)।

## 3. लोकतांत्रिक राजनीति - सत्ता की साझेदारी
- लोकतंत्र जनता का, जनता के द्वारा और जनता के लिए शासन है (अब्राहम लिंकन)।
- संघ सूची (97 विषय), राज्य सूची (66 विषय), समवर्ती सूची (47 विषय)।
- राजनीतिक दल लोकतंत्र का प्राण कहलाते हैं।

## 4. हमारी अर्थव्यवस्था - बिहार का विकास
- 'बिहार के विकास के बिना भारत का विकास संभव नहीं है' - डॉ. एपीजे अब्दुल कलाम।
- प्राथमिक क्षेत्र (कृषि, पशुपालन), द्वितीयक क्षेत्र (उद्योग, निर्माण), तृतीयक क्षेत्र (सेवा क्षेत्र - बैंकिंग, बीमा, शिक्षा)।
- प्रति व्यक्ति आय = राष्ट्रीय आय / कुल जनसंख्या।`,
    file_url: "https://biharboardonline.bihar.gov.in/matric-sst",
    upload_date: "2026-09-10",
    author: "Sunita Verma"
  }
];

export function getInitialLocalDatabaseState() {
  return {
    school_settings: INITIAL_SCHOOL_SETTINGS,
    classes: INITIAL_CLASSES,
    subjects: INITIAL_SUBJECTS,
    teachers: INITIAL_TEACHERS,
    students: INITIAL_STUDENTS,
    profiles: INITIAL_PROFILES,
    parents: INITIAL_PARENTS,
    parent_students: INITIAL_PARENT_STUDENTS,
    exams: INITIAL_EXAMS,
    exam_subjects: INITIAL_EXAM_SUBJECTS,
    marks: INITIAL_MARKS,
    attendance_sessions: INITIAL_ATTENDANCE_SESSIONS,
    attendance: INITIAL_ATTENDANCE_RECORDS,
    assignments: INITIAL_ASSIGNMENTS,
    resources: INITIAL_RESOURCES,
    grade_scales: [
      { id: "gs-01", name: "Bihar Board Matric Grade Scale", is_default: true }
    ],
    grade_scale_ranges: [
      { grade: "A+", min_percentage: 90, max_percentage: 100 },
      { grade: "A", min_percentage: 80, max_percentage: 89.99 },
      { grade: "B+", min_percentage: 70, max_percentage: 79.99 },
      { grade: "B", min_percentage: 60, max_percentage: 69.99 },
      { grade: "C", min_percentage: 50, max_percentage: 59.99 },
      { grade: "D", min_percentage: 30, max_percentage: 49.99 },
      { grade: "F", min_percentage: 0, max_percentage: 29.99 }
    ]
  };
}
