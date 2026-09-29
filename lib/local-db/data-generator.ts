import {
  Profile,
  SchoolSettings,
  ClassRoom,
  Subject,
  Teacher,
  Student,
  ResourceItem,
  INITIAL_SCHOOL_SETTINGS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS
} from "./initial-data";

// -------------------------------------------------------------
// 1. GENERATE 50 TEACHERS WITH HIERARCHY & CLASS COORDINATORS
// -------------------------------------------------------------

export function generate50Teachers(): { teachers: Teacher[]; profiles: Profile[] } {
  const teacherDefs: Array<{
    id: string;
    full_name: string;
    employee_code: string;
    email: string;
    phone: string;
    designation: string;
    qualification: string;
    specialization: string;
    hierarchy_level: number;
    hierarchy_title: string;
    coordinator_role?: "1st_class_coordinator" | "2nd_class_coordinator" | "primary_coordinator" | "exam_coordinator" | null;
    control_level: string;
    control_badge: string;
    classes_assigned: string[];
    subjects: string[];
  }> = [
    // LEVEL 1: Executive Leadership
    {
      id: "t-01",
      full_name: "Dr. Arvind Pathak (डॉ. अरविंद पाठक)",
      employee_code: "GCS-EXEC-001",
      email: "admin@edunexus.edu",
      phone: "+91 94312 34567",
      designation: "Principal & Institutional Patron",
      qualification: "M.Sc. (Physics), Ph.D., B.Ed. (Patna University)",
      specialization: "Institutional Leadership & Senior Secondary Academic Governance",
      hierarchy_level: 1,
      hierarchy_title: "Level 1: Executive Leadership",
      coordinator_role: null,
      control_level: "Super Institutional Control",
      control_badge: "Principal / Super Admin",
      classes_assigned: ["Class 10-A", "Class 10-B"],
      subjects: ["Academic Governance", "Physics"]
    },
    {
      id: "t-02",
      full_name: "Prof. Shashi Bhushan Sharma (प्रो. शशि भूषण शर्मा)",
      employee_code: "GCS-EXEC-002",
      email: "shashi.sharma@edunexus.edu",
      phone: "+91 94312 34568",
      designation: "Vice-Principal & Academic Director",
      qualification: "M.Sc. (Math), M.Ed. (Magadh University)",
      specialization: "Curriculum Implementation & Faculty Development",
      hierarchy_level: 1,
      hierarchy_title: "Level 1: Executive Leadership",
      coordinator_role: null,
      control_level: "Institutional Operations Control",
      control_badge: "Vice Principal",
      classes_assigned: ["Class 9-A", "Class 10-A"],
      subjects: ["Advanced Mathematics"]
    },

    // LEVEL 2: Chief Class Coordinators (Higher Control & Oversight)
    {
      id: "t-03",
      full_name: "Dr. Rameshwar Prasad Singh (डॉ. रामेश्वर प्रसाद सिंह)",
      employee_code: "GCS-COORD-001",
      email: "rameshwar.singh@edunexus.edu",
      phone: "+91 98351 12345",
      designation: "1st Class Coordinator & Senior Secondary Head",
      qualification: "M.Sc. (Chemistry), Ph.D., B.Ed. (Tilka Manjhi Bhagalpur Univ)",
      specialization: "Senior Wing Administration, BSEB Matric Moderation & Discipline",
      hierarchy_level: 2,
      hierarchy_title: "Level 2: Chief Class Coordinator",
      coordinator_role: "1st_class_coordinator",
      control_level: "Senior Wing & Moderation Authority (High Control)",
      control_badge: "1st Class Coordinator (Higher Control)",
      classes_assigned: ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"],
      subjects: ["Chemistry", "Senior Administration"]
    },
    {
      id: "t-04",
      full_name: "Smt. Sunita Verma (श्रीमती सुनीता वर्मा)",
      employee_code: "GCS-COORD-002",
      email: "sunita.verma@edunexus.edu",
      phone: "+91 98351 12341",
      designation: "2nd Class Coordinator & Middle Wing Head",
      qualification: "M.A. (English & History), B.Ed. (Patna University)",
      specialization: "Middle Wing Syllabus Tracking, Attendance Audits & Teacher Evaluation",
      hierarchy_level: 2,
      hierarchy_title: "Level 2: Chief Class Coordinator",
      coordinator_role: "2nd_class_coordinator",
      control_level: "Middle Wing & Attendance Audit Control (High Control)",
      control_badge: "2nd Class Coordinator (Higher Control)",
      classes_assigned: ["Class 8-A", "Class 8-B", "Class 7-A", "Class 6-A"],
      subjects: ["English", "Social Science"]
    },
    {
      id: "t-05",
      full_name: "Shri Anand Prakash (श्री आनंद प्रकाश)",
      employee_code: "GCS-COORD-003",
      email: "anand.p@edunexus.edu",
      phone: "+91 98351 12344",
      designation: "Primary Wing Chief Coordinator",
      qualification: "B.A. (Hons), D.El.Ed., State Merit Awardee",
      specialization: "Foundational Literacy & Numeracy (FLN - NIPUN Bharat & SCERT)",
      hierarchy_level: 2,
      hierarchy_title: "Level 2: Wing Coordinator",
      coordinator_role: "primary_coordinator",
      control_level: "Primary Wing Foundation Control",
      control_badge: "Primary Wing Coordinator",
      classes_assigned: ["Class 1-A", "Class 2-A", "Class 3-A", "Class 4-A", "Class 5-A"],
      subjects: ["Primary Foundation", "Environmental Studies"]
    },
    {
      id: "t-06",
      full_name: "Dr. Chandrashekhar Azad (डॉ. चंद्रशेखर आजाद)",
      employee_code: "GCS-COORD-004",
      email: "cs.azad@edunexus.edu",
      phone: "+91 98351 12346",
      designation: "Chief Controller of Examinations",
      qualification: "M.Sc. (Statistics), M.Ed. (Aryabhatta Knowledge Univ)",
      specialization: "Formative & Summative Assessments, Board Marksheet Validation",
      hierarchy_level: 2,
      hierarchy_title: "Level 2: Examination Controller",
      coordinator_role: "exam_coordinator",
      control_level: "Examination & Marks Audit Authority",
      control_badge: "Chief Exam Controller",
      classes_assigned: ["Class 10-A", "Class 10-B", "Class 9-A"],
      subjects: ["Mathematics", "Examination Audit"]
    },

    // LEVEL 3: Department Heads (HODs)
    {
      id: "t-07",
      full_name: "Rajesh Sharma (राजेश शर्मा)",
      employee_code: "GCS-HOD-001",
      email: "rajesh.sharma@edunexus.edu",
      phone: "+91 98351 12340",
      designation: "HOD Mathematics & Matric Specialist",
      qualification: "M.Sc. (Mathematics), B.Ed. (Patna University)",
      specialization: "Matric Board Mathematics & CBSE Higher Problem Solving",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Departmental Curriculum Control",
      control_badge: "HOD Mathematics",
      classes_assigned: ["Class 10-A", "Class 10-B", "Class 9-A"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-08",
      full_name: "Manoj Kumar Mishra (मनोज कुमार मिश्रा)",
      employee_code: "GCS-HOD-002",
      email: "manoj.mishra@edunexus.edu",
      phone: "+91 98351 12342",
      designation: "HOD Languages (Hindi & Sanskrit)",
      qualification: "Acharya (Sanskrit), M.A. (Hindi), KSD Sanskrit University",
      specialization: "BSEB 'गोधूलि' & 'पीयूषम्' Matric Classical Literature",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Departmental Curriculum Control",
      control_badge: "HOD Languages",
      classes_assigned: ["Class 10-A", "Class 10-B", "Class 9-A", "Class 8-A"],
      subjects: ["Hindi", "Sanskrit"]
    },
    {
      id: "t-09",
      full_name: "Dr. Priyaranjan Jha (डॉ. प्रियरंजन झा)",
      employee_code: "GCS-HOD-003",
      email: "priyaranjan.jha@edunexus.edu",
      phone: "+91 98351 12347",
      designation: "HOD Science & Physics Laboratory Lead",
      qualification: "M.Sc. (Physics), Ph.D., B.Ed. (LN Mithila University)",
      specialization: "Experimental Physics, Optics, Electricity & Board Practicals",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Departmental Science Labs Control",
      control_badge: "HOD Science",
      classes_assigned: ["Class 10-A", "Class 9-A"],
      subjects: ["Physics", "Science Lab"]
    },
    {
      id: "t-10",
      full_name: "Smt. Anita Sinha (श्रीमती अनिता सिन्हा)",
      employee_code: "GCS-HOD-004",
      email: "anita.sinha@edunexus.edu",
      phone: "+91 98351 12348",
      designation: "HOD Social Sciences & Heritage Studies",
      qualification: "M.A. (History & Pol. Science), B.Ed. (Patna Women's College)",
      specialization: "National Movement in Bihar, Resources & Democratic Politics",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Departmental Curriculum Control",
      control_badge: "HOD Social Science",
      classes_assigned: ["Class 10-A", "Class 9-A", "Class 8-A"],
      subjects: ["History", "Civics", "Social Science"]
    },
    {
      id: "t-11",
      full_name: "Shri Arvind Kumar Roy (श्री अरविंद कुमार रॉय)",
      employee_code: "GCS-HOD-005",
      email: "arvind.roy@edunexus.edu",
      phone: "+91 98351 12349",
      designation: "HOD English Literature & Language",
      qualification: "M.A. (English Literature), B.Ed. (TMBU Bhagalpur)",
      specialization: "Panorama, First Flight, Footprints & English Communication",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Departmental Curriculum Control",
      control_badge: "HOD English",
      classes_assigned: ["Class 10-A", "Class 9-A"],
      subjects: ["English"]
    },
    {
      id: "t-12",
      full_name: "Pooja Banerjee (पूजा बनर्जी)",
      employee_code: "GCS-HOD-006",
      email: "pooja.b@edunexus.edu",
      phone: "+91 98351 12343",
      designation: "HOD Computer Science & ICT Labs",
      qualification: "B.Tech (CS), B.Ed. (Magadh University)",
      specialization: "Digital Literacy, Computer Science, Cyber Safety & Coding",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "ICT Infrastructure Control",
      control_badge: "HOD Computer Science",
      classes_assigned: ["Class 8-A", "Class 7-A", "Class 6-A", "Class 9-A"],
      subjects: ["Computer Science", "ICT"]
    },
    {
      id: "t-13",
      full_name: "Vikramaditya Singh (विक्रमादित्य सिंह)",
      employee_code: "GCS-HOD-007",
      email: "vikram.singh@edunexus.edu",
      phone: "+91 98351 12350",
      designation: "HOD Physical Education, Yoga & Sports",
      qualification: "M.P.Ed., Certified NIS Athletics Coach",
      specialization: "Physical Fitness, Yoga, District Athletics & Student Health",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Sports & Physical Safety Control",
      control_badge: "HOD Sports",
      classes_assigned: ["Class 10-A", "Class 9-A", "Class 8-A", "Class 7-A"],
      subjects: ["Physical Education", "Yoga"]
    },
    {
      id: "t-14",
      full_name: "Madhuri Devi (माधुरी देवी)",
      employee_code: "GCS-HOD-008",
      email: "madhuri.devi@edunexus.edu",
      phone: "+91 98351 12351",
      designation: "HOD Fine Arts, Mithila Painting & Music",
      qualification: "M.F.A. (Fine Arts), National Cultural Awardee",
      specialization: "Madhubani Art, Traditional Bihar Crafts & Music Education",
      hierarchy_level: 3,
      hierarchy_title: "Level 3: Department Head (HOD)",
      coordinator_role: null,
      control_level: "Cultural Activities Control",
      control_badge: "HOD Fine Arts",
      classes_assigned: ["Class 8-A", "Class 7-A", "Class 6-A", "Class 5-A"],
      subjects: ["Fine Arts", "Mithila Painting"]
    },

    // LEVEL 4: Senior Subject Faculty (Classes 8th to 10th) - 18 Teachers
    {
      id: "t-15",
      full_name: "Alok Kumar Jha (आलोक कुमार झा)",
      employee_code: "GCS-FAC-015",
      email: "alok.jha@edunexus.edu",
      phone: "+91 98351 12352",
      designation: "Senior Teacher - Physics (Classes 9th & 10th)",
      qualification: "M.Sc. (Physics), B.Ed. (Patna Univ)",
      specialization: "Optics, Electricity, Magnetic Effects & Practical Demonstrations",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 9-A"],
      subjects: ["Physics"]
    },
    {
      id: "t-16",
      full_name: "Dr. Sanjay Kumar Yadav (डॉ. संजय कुमार यादव)",
      employee_code: "GCS-FAC-016",
      email: "sanjay.yadav@edunexus.edu",
      phone: "+91 98351 12353",
      designation: "Senior Teacher - Chemistry (Classes 9th & 10th)",
      qualification: "M.Sc. (Chemistry), Ph.D., B.Ed.",
      specialization: "Chemical Reactions, Carbon Compounds, Metals & Periodic Table",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-B", "Class 9-B"],
      subjects: ["Chemistry"]
    },
    {
      id: "t-17",
      full_name: "Smt. Vandana Kumari (श्रीमती वंदना कुमारी)",
      employee_code: "GCS-FAC-017",
      email: "vandana.kumari@edunexus.edu",
      phone: "+91 98351 12354",
      designation: "Senior Teacher - Biology & Life Sciences",
      qualification: "M.Sc. (Botany), B.Ed. (Tilka Manjhi Bhagalpur Univ)",
      specialization: "Life Processes, Heredity, Reproduction & Human Physiology",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 10-B", "Class 9-A"],
      subjects: ["Biology"]
    },
    {
      id: "t-18",
      full_name: "Dharmendra Kumar Paswan (धर्मेन्द्र कुमार पासवान)",
      employee_code: "GCS-FAC-018",
      email: "dharmendra.paswan@edunexus.edu",
      phone: "+91 98351 12355",
      designation: "Senior Teacher - Mathematics (Class 10 Matric)",
      qualification: "M.Sc. (Math), B.Ed. (Patna Univ)",
      specialization: "Trigonometry, Coordinate Geometry & Quadratic Equations",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-B", "Class 9-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-19",
      full_name: "Rakesh Ranjan Mishra (राकेश रंजन मिश्रा)",
      employee_code: "GCS-FAC-019",
      email: "rakesh.mishra@edunexus.edu",
      phone: "+91 98351 12356",
      designation: "Senior Teacher - Sanskrit 'पीयूषम्' (Matric Board)",
      qualification: "Acharya, M.A. (Sanskrit), B.Ed. (Darbhanga Sanskrit Univ)",
      specialization: "Vedic Chanting, Sanskrit Grammar, Karak & Samas",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 10-B"],
      subjects: ["Sanskrit"]
    },
    {
      id: "t-20",
      full_name: "Poonam Kumari (पूनम कुमारी)",
      employee_code: "GCS-FAC-020",
      email: "poonam.kumari@edunexus.edu",
      phone: "+91 98351 12357",
      designation: "Senior Teacher - Hindi 'गोधूलि' व 'वर्णिका'",
      qualification: "M.A. (Hindi), B.Ed. (Magadh Univ)",
      specialization: "Hindi Prose, Poetry & Essay Writing for BSEB Matric",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-B", "Class 9-A"],
      subjects: ["Hindi"]
    },
    {
      id: "t-21",
      full_name: "Md. Aslam Ansari (मो. असलम अंसारी)",
      employee_code: "GCS-FAC-021",
      email: "aslam.ansari@edunexus.edu",
      phone: "+91 98351 12358",
      designation: "Senior Teacher - Urdu & Second Indian Language",
      qualification: "M.A. (Urdu & Persian), B.Ed. (Maulana Mazharul Haque Univ)",
      specialization: "Darakhshan Urdu, Grammar & Bihar Urdu Heritage",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 9-A", "Class 8-A"],
      subjects: ["Urdu"]
    },
    {
      id: "t-22",
      full_name: "Binod Kumar Singh (विनोद कुमार सिंह)",
      employee_code: "GCS-FAC-022",
      email: "binod.singh@edunexus.edu",
      phone: "+91 98351 12359",
      designation: "Senior Teacher - Geography & Disaster Management",
      qualification: "M.A. (Geography), B.Ed. (Patna Univ)",
      specialization: "Indian Natural Resources, Mineral Belts of Bihar & Mapping",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 10-B"],
      subjects: ["Geography", "Disaster Management"]
    },
    {
      id: "t-23",
      full_name: "Shashi Shekhar Prasad (शशि शेखर प्रसाद)",
      employee_code: "GCS-FAC-023",
      email: "shashi.prasad@edunexus.edu",
      phone: "+91 98351 12360",
      designation: "Senior Teacher - Economics & Civics",
      qualification: "M.A. (Economics), B.Ed. (Tilka Manjhi Univ)",
      specialization: "Bihar Economy, Money & Credit, Indian Constitution",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-A", "Class 9-A"],
      subjects: ["Economics", "Civics"]
    },
    {
      id: "t-24",
      full_name: "Meenakshi Tiwari (मीनाक्षी तिवारी)",
      employee_code: "GCS-FAC-024",
      email: "meenakshi.tiwari@edunexus.edu",
      phone: "+91 98351 12361",
      designation: "Senior Teacher - English Grammar & Comprehension",
      qualification: "M.A. (English), B.Ed. (Patna Univ)",
      specialization: "Active/Passive, Direct/Indirect, Reading Passages & Essays",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 10-B", "Class 9-B"],
      subjects: ["English"]
    },
    {
      id: "t-25",
      full_name: "Jitendra Kumar Mandal (जितेंद्र कुमार मंडल)",
      employee_code: "GCS-FAC-025",
      email: "jitendra.mandal@edunexus.edu",
      phone: "+91 98351 12362",
      designation: "Senior Teacher - Class 9 Mathematics",
      qualification: "M.Sc. (Mathematics), B.Ed. (Munger Univ)",
      specialization: "Number Systems, Polynomials, Lines & Angles",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 9-A", "Class 9-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-26",
      full_name: "Sangeeta Kumari (संगीता कुमारी)",
      employee_code: "GCS-FAC-026",
      email: "sangeeta.kumari@edunexus.edu",
      phone: "+91 98351 12363",
      designation: "Senior Teacher - Class 9 Science",
      qualification: "M.Sc. (Chemistry), B.Ed. (Patna Univ)",
      specialization: "Atoms & Molecules, Structure of the Atom, Gravitation",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 9-A", "Class 9-B"],
      subjects: ["Science"]
    },
    {
      id: "t-27",
      full_name: "Manoj Kumar Gupta (मनोज कुमार गुप्ता)",
      employee_code: "GCS-FAC-027",
      email: "manoj.gupta@edunexus.edu",
      phone: "+91 98351 12364",
      designation: "Senior Teacher - Class 9 Social Science",
      qualification: "M.A. (History), B.Ed. (Tilka Manjhi Univ)",
      specialization: "French Revolution, Nazism, Drainage & Indian Climate",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 9-A", "Class 9-B"],
      subjects: ["Social Science"]
    },
    {
      id: "t-28",
      full_name: "Archana Singh (अर्चना सिंह)",
      employee_code: "GCS-FAC-028",
      email: "archana.singh@edunexus.edu",
      phone: "+91 98351 12365",
      designation: "Senior Teacher - Class 9 English (Beehive & Panorama)",
      qualification: "M.A. (English), B.Ed. (LNMU Darbhanga)",
      specialization: "Poetry Analysis, The Fun They Had, Sound of Music",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 9-A", "Class 9-B"],
      subjects: ["English"]
    },
    {
      id: "t-29",
      full_name: "Umesh Prasad Mahto (उमेश प्रसाद महतो)",
      employee_code: "GCS-FAC-029",
      email: "umesh.mahto@edunexus.edu",
      phone: "+91 98351 12366",
      designation: "Senior Teacher - Class 8 Sanskrit 'अमृता'",
      qualification: "M.A. (Sanskrit), B.Ed. (KSD Sanskrit Univ)",
      specialization: "Subhashitani, Dhatu Roop, Sandhi & Translation",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 8-A", "Class 8-B"],
      subjects: ["Sanskrit"]
    },
    {
      id: "t-30",
      full_name: "Prabhat Kumar Verma (प्रभात कुमार वर्मा)",
      employee_code: "GCS-FAC-030",
      email: "prabhat.verma@edunexus.edu",
      phone: "+91 98351 12367",
      designation: "Senior Teacher - Class 8 Mathematics",
      qualification: "M.Sc. (Math), B.Ed. (Patna Univ)",
      specialization: "Rational Numbers, Linear Equations & Mensuration",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 8-A", "Class 8-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-31",
      full_name: "Nutan Kumari (नूतन कुमारी)",
      employee_code: "GCS-FAC-031",
      email: "nutan.kumari@edunexus.edu",
      phone: "+91 98351 12368",
      designation: "Senior Teacher - Class 8 Science",
      qualification: "M.Sc. (Zoology), B.Ed. (Munger Univ)",
      specialization: "Crop Production, Microorganisms, Combustion & Cell Structure",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 8-A", "Class 8-B"],
      subjects: ["Science"]
    },
    {
      id: "t-32",
      full_name: "Santosh Kumar Pandey (संतोष कुमार पाण्डेय)",
      employee_code: "GCS-FAC-032",
      email: "santosh.pandey@edunexus.edu",
      phone: "+91 98351 12369",
      designation: "Senior Teacher - Class 8 Social Science & History",
      qualification: "M.A. (History), B.Ed. (Patna Univ)",
      specialization: "From Trade to Territory, Tribals, Dikus & Golden Age",
      hierarchy_level: 4,
      hierarchy_title: "Level 4: Senior Subject Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Senior Faculty",
      classes_assigned: ["Class 8-A", "Class 8-B"],
      subjects: ["Social Science"]
    },

    // LEVEL 5: Middle & Primary Wing Faculty (Classes 1st to 7th) - 18 Teachers
    {
      id: "t-33",
      full_name: "Rekha Devi (रेखा देवी)",
      employee_code: "GCS-FAC-033",
      email: "rekha.devi@edunexus.edu",
      phone: "+91 98351 12370",
      designation: "Class 7 Teacher - Mathematics",
      qualification: "B.Sc. (Math), B.Ed. (Magadh Univ)",
      specialization: "Integers, Fractions, Decimals & Simple Equations",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 7-A", "Class 7-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-34",
      full_name: "Sudhir Kumar Roy (सुधीर कुमार रॉय)",
      employee_code: "GCS-FAC-034",
      email: "sudhir.roy@edunexus.edu",
      phone: "+91 98351 12371",
      designation: "Class 7 Teacher - Science",
      qualification: "B.Sc. (Chemistry), B.Ed. (TMBU Bhagalpur)",
      specialization: "Nutrition in Plants & Animals, Heat, Acids, Bases & Salts",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 7-A", "Class 7-B"],
      subjects: ["Science"]
    },
    {
      id: "t-35",
      full_name: "Pushpa Kumari (पुष्पा कुमारी)",
      employee_code: "GCS-FAC-035",
      email: "pushpa.kumari@edunexus.edu",
      phone: "+91 98351 12372",
      designation: "Class 7 Teacher - Social Science & Hindi",
      qualification: "B.A. (History), B.Ed. (Patna Univ)",
      specialization: "Medieval Indian History, Our Environment, Kislay Stories",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 7-A", "Class 7-B"],
      subjects: ["Social Science", "Hindi"]
    },
    {
      id: "t-36",
      full_name: "Deepak Kumar Jha (दीपक कुमार झा)",
      employee_code: "GCS-FAC-036",
      email: "deepak.jha@edunexus.edu",
      phone: "+91 98351 12373",
      designation: "Class 7 Teacher - English & Sanskrit",
      qualification: "M.A. (English), B.Ed. (LNMU Darbhanga)",
      specialization: "Radiance Part 2, Amrita Part 2, Honeycomb Stories",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 7-A", "Class 7-B"],
      subjects: ["English", "Sanskrit"]
    },
    {
      id: "t-37",
      full_name: "Mamta Sinha (ममता सिन्हा)",
      employee_code: "GCS-FAC-037",
      email: "mamta.sinha@edunexus.edu",
      phone: "+91 98351 12374",
      designation: "Class 6 Teacher - Mathematics",
      qualification: "B.Sc. (Math), B.Ed. (Patna Univ)",
      specialization: "Whole Numbers, Integers, Fractions, Playing with Numbers",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 6-A", "Class 6-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-38",
      full_name: "Krishna Mohan Yadav (कृष्ण मोहन यादव)",
      employee_code: "GCS-FAC-038",
      email: "km.yadav@edunexus.edu",
      phone: "+91 98351 12375",
      designation: "Class 6 Teacher - Science",
      qualification: "B.Sc. (Physics), B.Ed. (Tilka Manjhi Univ)",
      specialization: "Components of Food, Sorting Materials, Separation of Substances",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 6-A", "Class 6-B"],
      subjects: ["Science"]
    },
    {
      id: "t-39",
      full_name: "Renu Kumari (रेणु कुमारी)",
      employee_code: "GCS-FAC-039",
      email: "renu.kumari@edunexus.edu",
      phone: "+91 98351 12376",
      designation: "Class 6 Teacher - Hindi 'किस्लय' व 'अमृता'",
      qualification: "M.A. (Hindi), B.Ed. (Patna Univ)",
      specialization: "Foundational Hindi Poetry, Kislay Bhag 1, Sanskrit Varnamala",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 6-A", "Class 6-B"],
      subjects: ["Hindi", "Sanskrit"]
    },
    {
      id: "t-40",
      full_name: "Sunil Kumar Barnwal (सुनील कुमार वर्णवाल)",
      employee_code: "GCS-FAC-040",
      email: "sunil.barnwal@edunexus.edu",
      phone: "+91 98351 12377",
      designation: "Class 6 Teacher - English & Social Science",
      qualification: "B.A. (English), B.Ed. (Munger Univ)",
      specialization: "Radiance English Part 1, Earth Our Habitat, Early Societies",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 6-A", "Class 6-B"],
      subjects: ["English", "Social Science"]
    },
    {
      id: "t-41",
      full_name: "Anjali Kumari (अंजलि कुमारी)",
      employee_code: "GCS-FAC-041",
      email: "anjali.kumari@edunexus.edu",
      phone: "+91 98351 12378",
      designation: "Class 5 Incharge - Math-Magic (गणित का जादू)",
      qualification: "B.Sc., D.El.Ed. (SCERT Bihar Certified)",
      specialization: "Primary Numeracy, Geometry Shapes, Fractions & Measurement",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 5-A", "Class 5-B"],
      subjects: ["Mathematics"]
    },
    {
      id: "t-42",
      full_name: "Amit Kumar Paswan (अमित कुमार पासवान)",
      employee_code: "GCS-FAC-042",
      email: "amit.paswan@edunexus.edu",
      phone: "+91 98351 12379",
      designation: "Class 5 Teacher - EVS 'पर्यावरण और हम' व हिंदी",
      qualification: "B.A., D.El.Ed. (DIET Lakhisarai)",
      specialization: "Environmental Studies of Bihar, Agriculture, Seeds & Nature Walks",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 5-A", "Class 5-B"],
      subjects: ["Environmental Studies", "Hindi"]
    },
    {
      id: "t-43",
      full_name: "Sarita Devi (सरिता देवी)",
      employee_code: "GCS-FAC-043",
      email: "sarita.devi@edunexus.edu",
      phone: "+91 98351 12380",
      designation: "Class 4 Incharge - Foundational English & EVS",
      qualification: "M.A., D.El.Ed. (Patna Training College)",
      specialization: "Blossom English, Looking Around, Environmental Awareness",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 4-A", "Class 4-B"],
      subjects: ["English", "Environmental Studies"]
    },
    {
      id: "t-44",
      full_name: "Mukesh Kumar Sharma (मुकेश कुमार शर्मा)",
      employee_code: "GCS-FAC-044",
      email: "mukesh.sharma@edunexus.edu",
      phone: "+91 98351 12381",
      designation: "Class 4 Teacher - Mathematics & Hindi",
      qualification: "B.Sc., D.El.Ed. (SCERT Bihar)",
      specialization: "Building with Bricks, Long and Short, Kaunpal Hindi Stories",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 4-A", "Class 4-B"],
      subjects: ["Mathematics", "Hindi"]
    },
    {
      id: "t-45",
      full_name: "Pratibha Kumari (प्रतिभा कुमारी)",
      employee_code: "GCS-FAC-045",
      email: "pratibha.kumari@edunexus.edu",
      phone: "+91 98351 12382",
      designation: "Class 3 Incharge - FLN Hindi & Storytelling",
      qualification: "M.A. (Hindi), D.El.Ed.",
      specialization: "Early Literacy, Kakku, Chandwali Amma, Moral Tales of Bihar",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 3-A", "Class 3-B"],
      subjects: ["Hindi", "Storytelling"]
    },
    {
      id: "t-46",
      full_name: "Sanjay Kumar Pandit (संजय कुमार पंडित)",
      employee_code: "GCS-FAC-046",
      email: "sanjay.pandit@edunexus.edu",
      phone: "+91 98351 12383",
      designation: "Class 3 Teacher - Math-Magic & EVS",
      qualification: "B.Sc., D.El.Ed.",
      specialization: "Fun with Numbers, Give and Take, Shapes & Bihar Flora",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 3-A", "Class 3-B"],
      subjects: ["Mathematics", "Environmental Studies"]
    },
    {
      id: "t-47",
      full_name: "Kavita Kumari (कविता कुमारी)",
      employee_code: "GCS-FAC-047",
      email: "kavita.kumari@edunexus.edu",
      phone: "+91 98351 12384",
      designation: "Class 2 Incharge - Foundational Numeracy & Joyful Math",
      qualification: "B.A., D.El.Ed. (DIET Jamui)",
      specialization: "Early Child Counting, Shapes, Patterns & Learning through Play",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 2-A", "Class 2-B"],
      subjects: ["Mathematics", "Activity Based Learning"]
    },
    {
      id: "t-48",
      full_name: "Bipin Bihari Singh (बिपिन बिहारी सिंह)",
      employee_code: "GCS-FAC-048",
      email: "bipin.singh@edunexus.edu",
      phone: "+91 98351 12385",
      designation: "Class 2 Teacher - Language & Sarangi Hindi",
      qualification: "B.A. (Hons), D.El.Ed.",
      specialization: "Sarangi Hindi, Mridang English, Pronunciation & Phonetics",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 2-A", "Class 2-B"],
      subjects: ["Hindi", "English"]
    },
    {
      id: "t-49",
      full_name: "Priyanka Kumari (प्रियंका कुमारी)",
      employee_code: "GCS-FAC-049",
      email: "priyanka.kumari@edunexus.edu",
      phone: "+91 98351 12386",
      designation: "Class 1 Incharge - Early Childhood Education & Joyful Learning",
      qualification: "M.A., D.El.Ed., Montessori Trained",
      specialization: "Pre-primary Transition, Phonics, Number Recognition & Rhymes",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 1-A", "Class 1-B"],
      subjects: ["Early Literacy", "Joyful Math"]
    },
    {
      id: "t-50",
      full_name: "Shambhu Sharan Manjhi (शंभू शरण मांझी)",
      employee_code: "GCS-FAC-050",
      email: "shambhu.manjhi@edunexus.edu",
      phone: "+91 98351 12387",
      designation: "Class 1 Teacher - Sarangi & Rhymes / Physical Play",
      qualification: "B.A., D.El.Ed. (NIPUN Bharat State Master Trainer)",
      specialization: "Balvatika to Class 1 Integration, Folk Songs, Motor Skills",
      hierarchy_level: 5,
      hierarchy_title: "Level 5: Middle & Primary Faculty",
      coordinator_role: null,
      control_level: "Classroom & Grading Control",
      control_badge: "Faculty",
      classes_assigned: ["Class 1-A", "Class 1-B"],
      subjects: ["Hindi Rhymes", "Foundational Motor Skills"]
    }
  ];

  const teachers: Teacher[] = teacherDefs.map((t) => ({
    id: t.id,
    profile_id: `p-${t.id}`,
    full_name: t.full_name,
    employee_code: t.employee_code,
    email: t.email,
    phone: t.phone,
    designation: t.designation,
    qualification: t.qualification,
    specialization: t.specialization,
    hierarchy_level: t.hierarchy_level,
    hierarchy_title: t.hierarchy_title,
    coordinator_role: t.coordinator_role,
    control_level: t.control_level,
    control_badge: t.control_badge,
    classes_assigned: t.classes_assigned,
    subjects: t.subjects,
    is_active: true,
    password: "Teacher@123"
  }));

  const profiles: Profile[] = teachers.map((t) => ({
    id: t.profile_id!,
    email: t.email,
    role: t.id === "t-01" ? "admin" : "teacher",
    full_name: t.full_name,
    is_active: true,
    phone: t.phone,
    password: t.id === "t-01" ? "Admin@123" : "Teacher@123"
  }));

  return { teachers, profiles };
}

// -------------------------------------------------------------
// 2. GENERATE 400 STUDENTS ACROSS CLASSES 1 TO 10TH (BIHAR NAMES)
// -------------------------------------------------------------

const BIHAR_FIRST_NAMES_BOYS = [
  "Aarav", "Rohan", "Shivam", "Aditya", "Alok", "Rahul", "Vikas", "Rakesh", "Saurav", "Amit",
  "Prakash", "Manish", "Deepak", "Anand", "Ranjan", "Suraj", "Kunal", "Naveen", "Abhishek", "Prince",
  "Rituraj", "Raunak", "Gautam", "Chandan", "Pankaj", "Ashish", "Dheeraj", "Mukesh", "Roshan", "Nilesh",
  "Sumit", "Ajay", "Sonu", "Monu", "Satyam", "Sushant", "Shubham", "Vishal", "Mayank", "Nitin"
];

const BIHAR_FIRST_NAMES_GIRLS = [
  "Priya", "Ananya", "Sneha", "Pooja", "Suman", "Neha", "Kavya", "Deepali", "Shilpi", "Puja",
  "Ritu", "Anjali", "Swati", "Nisha", "Komal", "Sonam", "Shreya", "Kriti", "Archana", "Divya",
  "Khushi", "Muskan", "Khusboo", "Simran", "Preeti", "Aarti", "Monika", "Mamta", "Varsha", "Jyoti",
  "Sunita", "Anita", "Roshni", "Pallavi", "Sakshi", "Prerna", "Rashmi", "Tanya", "Saloni", "Vandana"
];

const BIHAR_SURNAMES = [
  "Kumar", "Singh", "Yadav", "Paswan", "Jha", "Mishra", "Sharma", "Prasad", "Verma", "Tiwary",
  "Gupta", "Mandal", "Mahto", "Chaudhary", "Ray", "Manjhi", "Ansari", "Khan", "Sah", "Pandit",
  "Barnwal", "Rawat", "Khatoon", "Ranjan", "Bharti", "Raj", "Pandey", "Sinha", "Pathak", "Das"
];

const BIHAR_PARENTS = [
  "Sunil Kumar", "Rameshwar Singh", "Vikram Yadav", "Subir Roy", "Kamal Pandey", "Anwar Ali",
  "Dinesh Paswan", "Prakash Narayan", "Satish Chandra Mahto", "Brajeshwar Prasad", "Shambhu Sharan Singh",
  "Ashok Kumar Verma", "Ramvilas Paswan", "Manoj Kumar Mandal", "Rajesh Kumar Mandal", "Birendra Kumar Jha",
  "Arun Kumar Tiwary", "Gopal Prasad Gupta", "Mahendra Singh", "Devendra Yadav", "Kailash Paswan",
  "Suresh Chandra Mishra", "Nand Kishore Sharma", "Binod Kumar Ray", "Santosh Kumar Chaudhary"
];

const BIHAR_MOTHERS = [
  "Shanti Devi", "Sunita Devi", "Lalita Devi", "Urmila Devi", "Geeta Devi", "Pushpa Devi",
  "Meena Devi", "Kanti Devi", "Saroj Devi", "Manju Devi", "Rekha Devi", "Sudha Devi",
  "Anita Devi", "Kavita Devi", "Radha Devi", "Basanti Devi", "Shail Devi", "Prabha Devi"
];

const BIHAR_VILLAGES_JAMUI = [
  "Vill Gangra, Gidhaur", "Vill Seva, Jamui", "Mallehpur, Near Rly Stn, Jamui", "Gidhaur Bazar, Ward 4",
  "Purani Bazar, Jhajha", "Maharajganj, Jamui Town", "Near Simultala Station", "Village Sono, Jamui",
  "Village Barhat, Jamui", "Village Sikandra, Jamui", "Village Ratanpur, Gidhaur", "Station Road Gidhaur",
  "Village Khaira, Jamui", "Village Chour, Gidhaur", "Kalyanpur, Gidhaur", "Vill Nabinagar, Jamui",
  "Patneshwar Dham Road", "Babu Tola, Gidhaur", "Minto Tower Chowk, Gidhaur", "Ramballabh Nagar, Jhajha"
];

export function generate400Students(): { students: Student[]; profiles: Profile[] } {
  const students: Student[] = [];
  const profiles: Profile[] = [];

  const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-"];

  // 10 Grades: Class 1 to Class 10 (40 students each)
  for (let grade = 1; grade <= 10; grade++) {
    const classId = `c-${String(grade).padStart(2, "0")}`;
    const baseBirthYear = 2026 - (grade + 5); // Grade 1 ~ 6yo (2020), Grade 10 ~ 15yo (2011)

    for (let index = 1; index <= 40; index++) {
      const isSecA = index <= 20;
      const sectionName = isSecA ? "Section A" : "Section B";
      const className = `Class ${grade}-${isSecA ? "A" : "B"}`;
      const rollNumber = `${String(grade).padStart(2, "0")}${String(index).padStart(2, "0")}`;
      const studentId = `st-${rollNumber}`;
      const profileId = `p-${studentId}`;

      const isBoy = (grade * 40 + index) % 2 === 0;
      const firstName = isBoy
        ? BIHAR_FIRST_NAMES_BOYS[(grade * 7 + index) % BIHAR_FIRST_NAMES_BOYS.length]
        : BIHAR_FIRST_NAMES_GIRLS[(grade * 11 + index) % BIHAR_FIRST_NAMES_GIRLS.length];

      const surname = BIHAR_SURNAMES[(grade * 13 + index) % BIHAR_SURNAMES.length];
      const fullName = `${firstName} ${surname}`;

      const birthMonth = String(((index * 3) % 12) + 1).padStart(2, "0");
      const birthDay = String(((index * 7) % 27) + 1).padStart(2, "0");
      const dob = `${baseBirthYear}-${birthMonth}-${birthDay}`;

      const parentName = BIHAR_PARENTS[(grade * 5 + index) % BIHAR_PARENTS.length];
      const motherName = BIHAR_MOTHERS[(grade * 3 + index) % BIHAR_MOTHERS.length];
      const village = BIHAR_VILLAGES_JAMUI[(grade * 2 + index) % BIHAR_VILLAGES_JAMUI.length];
      const phoneDigits = String(10000 + (grade * 100 + index)).padStart(5, "0");
      const parentPhone = `+91 98351 ${phoneDigits}`;
      const email = `${firstName.toLowerCase()}.${surname.toLowerCase()}.${rollNumber}@edunexus.edu`;

      // Known test overrides for key sample logins
      const testOverrides: Record<string, { full_name: string; dob: string; parent: string; email: string; village: string }> = {
        "1001": { full_name: "Aarav Kumar (आरव कुमार)", dob: "2010-04-15", parent: "Sunil Kumar", email: "aarav.kumar@edunexus.edu", village: "Vill Gangra, Gidhaur" },
        "1002": { full_name: "Priya Kumari (प्रिया कुमारी)", dob: "2010-08-22", parent: "Rameshwar Singh", email: "priya.singh@edunexus.edu", village: "Vill Seva, Jamui" },
        "1003": { full_name: "Rohan Yadav (रोहन यादव)", dob: "2010-01-19", parent: "Vikram Yadav", email: "rohan.yadav@edunexus.edu", village: "Mallehpur, Near Rly Stn, Jamui" },
        "1004": { full_name: "Ananya Roy (अनन्या रॉय)", dob: "2010-11-05", parent: "Subir Roy", email: "ananya.roy@edunexus.edu", village: "Gidhaur Bazar, Ward 4" },
        "1005": { full_name: "Shivam Pandey (शिवम पाण्डेय)", dob: "2010-06-30", parent: "Kamal Pandey", email: "shivam.pandey@edunexus.edu", village: "Purani Bazar, Jhajha" },
        "0901": { full_name: "Md. Tariq Anwar (मो. तारिक अनवर)", dob: "2011-05-14", parent: "Anwar Ali", email: "tariq.anwar@edunexus.edu", village: "Maharajganj, Jamui Town" },
        "0801": { full_name: "Aditya Prakash (आदित्य प्रकाश)", dob: "2012-03-11", parent: "Prakash Narayan", email: "aditya.prakash@edunexus.edu", village: "Village Sono, Jamui" },
        "0701": { full_name: "Pooja Kumari (पूजा कुमारी)", dob: "2013-05-18", parent: "Satish Chandra Mahto", email: "pooja.kumari@edunexus.edu", village: "Village Barhat, Jamui" },
        "0601": { full_name: "Alok Ranjan (आलोक रंजन)", dob: "2014-07-22", parent: "Brajeshwar Prasad", email: "alok.ranjan@edunexus.edu", village: "Village Sikandra, Jamui" },
        "0501": { full_name: "Suman Kumari (सुमन कुमारी)", dob: "2015-09-14", parent: "Shambhu Sharan Singh", email: "suman.kumari@edunexus.edu", village: "Village Ratanpur, Gidhaur" },
        "0401": { full_name: "Rahul Kumar Verma (राहुल वर्मा)", dob: "2016-02-19", parent: "Ashok Kumar Verma", email: "rahul.verma@edunexus.edu", village: "Station Road Gidhaur" },
        "0301": { full_name: "Neha Bharti (नेहा भारती)", dob: "2017-08-10", parent: "Ramvilas Paswan", email: "neha.bharti@edunexus.edu", village: "Village Khaira, Jamui" },
        "0201": { full_name: "Kavya Kumari (काव्या कुमारी)", dob: "2018-11-25", parent: "Manoj Kumar Mandal", email: "kavya.kumari@edunexus.edu", village: "Village Chour, Gidhaur" },
        "0101": { full_name: "Deepali Kumari (दीपाली कुमारी)", dob: "2019-04-05", parent: "Rajesh Kumar Mandal", email: "deepali.kumari@edunexus.edu", village: "Kalyanpur, Gidhaur" }
      };

      const ov = testOverrides[rollNumber];
      const actualFullName = ov ? ov.full_name : fullName;
      const actualDob = ov ? ov.dob : dob;
      const actualParent = ov ? ov.parent : parentName;
      const actualEmail = ov ? ov.email : email;
      const actualVillage = ov ? ov.village : village;

      const student: Student = {
        id: studentId,
        profile_id: profileId,
        full_name: actualFullName,
        roll_number: rollNumber,
        date_of_birth: actualDob,
        gender: isBoy ? "Male" : "Female",
        admission_number: `ADM-2026-${rollNumber}`,
        parent_name: actualParent,
        parent_phone: parentPhone,
        mother_name: motherName,
        village_or_town: actualVillage,
        district: "Jamui",
        state: "Bihar",
        pincode: "811305",
        email: actualEmail,
        is_active: true,
        class_id: classId,
        class_name: className,
        section_name: sectionName,
        blood_group: bloodGroups[(grade + index) % bloodGroups.length]
      };

      students.push(student);

      profiles.push({
        id: profileId,
        email: actualEmail,
        role: "student",
        full_name: actualFullName,
        is_active: true,
        phone: parentPhone,
        password: "Student@123",
        class_name: className
      });
    }
  }

  return { students, profiles };
}

// -------------------------------------------------------------
// 3. GENERATE COMPLETE CURRICULUM RESOURCES FOR ALL CLASSES (1ST - 10TH)
// Covering Bihar Board (BSEB) & CBSE / NCERT with:
// - Chapter notifications
// - Official textbooks
// - Video lecture roadmap to complete the whole syllabus
// -------------------------------------------------------------

export function generateSyllabusResources(): ResourceItem[] {
  const resources: ResourceItem[] = [
    // ---------------------------------------------------------
    // CLASS 10 (MATRICULATION BOARD)
    // ---------------------------------------------------------
    {
      id: "res-c10-math-full",
      title: "Class 10 Mathematics Complete Syllabus & Video Roadmap (BSEB Matric & CBSE)",
      title_hindi: "कक्षा 10 गणित: वास्तविक संख्याएँ, त्रिकोणमिति, द्विघात समीकरण, सांख्यिकी (संपूर्ण पाठ्यक्रम)",
      subject_id: "sub-mat",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Mathematics",
      class_name: "Class 10-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "Bihar State Textbook Publishing Corp 'गणित कक्षा 10' & NCERT Class 10 Ganit",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Complete Class 10 Math Syllabus (Ch 1 to Ch 15)",
      notification_text: "📢 BSEB Matric 2026 Alert: Trigonometry (20 Marks) & Coordinate Geometry (10 Marks) carry highest objective weightage.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhU8gD9J8D-iH3FqTzC5pA3f",
      video_title: "Class 10th Math Complete Syllabus One-Shot Lecture Series (Hindi)",
      description: "Complete chapter-by-chapter roadmap covering Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, Constructions, Areas, Surface Areas & Volumes, Statistics, and Probability.",
      content_markdown: `# Class 10 Mathematics: Full Syllabus Master Plan (BSEB Matric & CBSE)

## 📌 Syllabus Structure & Marks Distribution (BSEB 100 Marks / CBSE 80 Marks)
1. **संख्या पद्धति (Number Systems)** - 10 Marks
   - वास्तविक संख्याएं (Real Numbers) - यूक्लिड विभाजन प्रमेयिका, अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का पुनर्भ्रमण (प्रमाण: √2, √3, √5 अपरिमेय हैं)।
2. **बीजगणित (Algebra)** - 20 Marks
   - बहुपद (Polynomials): शून्यकों का ज्यामितीय अर्थ, विभाजन एल्गोरिथ्म।
   - दो चर वाले रैखिक समीकरण युग्म: प्रतिस्थापन, विलोपन व वज्र-गुणन विधि।
   - द्विघात समीकरण (Quadratic Equations): विविक्तकर (Discriminant D = b² - 4ac) और मूलों की प्रकृति।
   - समांतर श्रेणियाँ (Arithmetic Progressions): nवाँ पद (aₙ = a + (n-1)d), n पदों का योग Sₙ = n/2 [2a + (n-1)d]।
3. **त्रिकोणमिति (Trigonometry)** - 20 Marks
   - त्रिकोणमितीय अनुपात (sin, cos, tan, cot, sec, cosec), विशिष्ट कोणों (0°, 30°, 45°, 60°, 90°) के मान।
   - त्रिकोणमितीय सर्वसमिकाएँ: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.
   - ऊँचाई एवं दूरी (Applications of Trigonometry): उन्नयन कोण व अवनमन कोण पर आधारित प्रश्न।
4. **नियामक ज्यामिति (Coordinate Geometry)** - 10 Marks
   - दूरी सूत्र d = √[(x₂ - x₁)² + (y₂ - y₁)²], विभाजन सूत्र (Section Formula), त्रिभुज का क्षेत्रफल।
5. **ज्यामिति (Geometry)** - 20 Marks
   - त्रिभुज (Triangles): थेल्स प्रमेय (BPT Theorem) एवं पाइथागोरस प्रमेय का सत्यापन।
   - वृत्त (Circles): वृत्त की स्पर्श रेखा से संबंधित प्रमेय।
6. **क्षेत्रमिति (Mensuration)** - 10 Marks
   - वृत्तों से संबंधित क्षेत्रफल, त्रिज्यखंड व वृत्तखंड।
   - पृष्ठीय क्षेत्रफल और आयतन (ठोसों का संयोजन व रूपांतरण, छिन्नक)।
7. **सांख्यिकी एवं प्रायिकता (Statistics & Probability)** - 10 Marks
   - माध्य (Mean), माध्यक (Median), बहुलक (Mode): संबंध 3 माध्यक = बहुलक + 2 माध्य।

## 🎥 Recommended Videos to Complete Whole Syllabus:
- Unit 1-4 (Real Numbers to AP): Class 10 Full Math Playlist (NCERT/BSEB)
- Unit 5 (Trigonometry Masterclass): Heights & Distances with 20 board questions solved.
- Unit 6 (Geometry & Theorems): Step-by-step proofs of Thales Theorem.`,
      file_url: "https://ncert.nic.in/textbook.php?jemh1=0-14",
      upload_date: "2026-09-15",
      author: "Rajesh Sharma (HOD Mathematics)"
    },
    {
      id: "res-c10-sci-full",
      title: "Class 10 Science Complete Syllabus & Experiments (BSEB & CBSE)",
      title_hindi: "कक्षा 10 विज्ञान: भौतिकी, रसायन विज्ञान व जीवविज्ञान (संपूर्ण मैट्रिक पाठ्यक्रम)",
      subject_id: "sub-sci",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Science",
      class_name: "Class 10-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'विज्ञान कक्षा 10' & NCERT Science Book",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Science Complete 16 Chapters",
      notification_text: "📢 Practical Lab Notice: Science practical exam carries 20 marks. All students must submit verified lab records by Nov 30.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhVbJt83_yTj0kHkH34h7_6B",
      video_title: "Class 10 Science All 16 Chapters Complete Animation Lectures",
      description: "Detailed syllabus notes covering Chemical Reactions, Acids & Bases, Metals/Non-metals, Carbon Compounds, Life Processes, Control & Coordination, Reproduction, Heredity, Light, Electricity, Magnetic Effects.",
      content_markdown: `# कक्षा 10 विज्ञान संपूर्ण पाठ्यक्रम एवं अध्याय नोट्स
1. **रासायनिक अभिक्रियाएं एवं समीकरण**: संयोजन, वियोजन, विस्थापन, द्विविस्थापन, उपचयन-अपचयन (Redox), संक्षारण एवं विकृतगंधिता।
2. **अम्ल, क्षारक एवं लवण**: pH मान का दैनिक जीवन में महत्त्व, विरंजक चूर्ण (CaOCl₂), बेकिंग सोडा (NaHCO₃), धोने का सोडा (Na₂CO₃·10H₂O), प्लास्टर ऑफ पेरिस (CaSO₄·½H₂O)।
3. **धातु एवं अधातु**: सक्रियता श्रेणी, आयनिक यौगिकों के गुणधर्म, भर्जन (Roasting) एवं निस्तापन (Calcination)।
4. **कार्बन एवं उसके यौगिक**: सहसंयोजी आबंधन, कार्बन की सर्वतोमुखी प्रकृति, सजातीय श्रेणी, साबुन एवं अपमार्जक की सफाई प्रक्रिया (मिसेल)।
5. **जैव प्रक्रम (Life Processes)**:
   - पोषण (स्वपोषी एवं विषमपोषी, मानव पाचन तंत्र)।
   - श्वसन (वायवीय व अवायवीय श्वसन, ATP)।
   - वहन (मानव हृदय की संरचना, दोहरा परिसंचरण, जाइलम व फ्लोएम)।
   - उत्सर्जन (वृक्काणु / Nephron की संरचना एवं कार्य)।
6. **प्रकाश - परावर्तन तथा अपवर्तन**: दर्पण सूत्र 1/f = 1/v + 1/u, लेंस सूत्र 1/f = 1/v - 1/u, लेंस की क्षमता P = 1/f (डायोप्टर D)।
7. **विद्युत**: ओम का नियम (V = IR), प्रतिरोधों का श्रेणीक्रम (R = R₁ + R₂) व समांतर क्रम (1/R = 1/R₁ + 1/R₂), जूल का तापीय नियम (H = I²Rt)।`,
      file_url: "https://ncert.nic.in/textbook.php?jesc1=0-16",
      upload_date: "2026-09-15",
      author: "Dr. Priyaranjan Jha (HOD Science)"
    },
    {
      id: "res-c10-hin-godhuli",
      title: "Class 10 Hindi 'गोधूलि भाग-2' व 'वर्णिका भाग-2' (Bihar Board Matric)",
      title_hindi: "मैट्रिक हिंदी: गोधूलि एवं वर्णिका संपूर्ण व्याख्या, प्रश्नोत्तर व लेखक परिचय",
      subject_id: "sub-hin",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Hindi",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "बिहार स्टेट टेक्स्टबुक पब्लिशिंग कॉरपोरेशन, पटना - 'गोधूलि' एवं 'वर्णिका'",
      resource_type: "notification",
      chapter_number: 1,
      chapter_name: "Godhuli & Varnika Full Reader",
      notification_text: "📢 BSEB Hindi Pattern: 50 Objective Questions + 5 Short Questions + 1 Long Essay (250 words) + Letter Writing.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhW3_23XpG8jF7D9K20g8_9A",
      video_title: "BSEB 10th Hindi Godhuli & Varnika All Chapters Line by Line Explanation",
      description: "Complete notes for Dr. Bhimrao Ambedkar, Nalin Vilochan Sharma, Max Muller, Hazari Prasad Dwivedi, Amar Kant, Ram Vilas Sharma, Birju Maharaj, Ashok Vajpeyi, Vinod Kumar Shukla, Yatindra Mishra, Mahatma Gandhi.",
      content_markdown: `# कक्षा 10 हिन्दी (गोधूलि भाग-2 एवं वर्णिका) - बिहार बोर्ड
## गद्य खंड:
1. **श्रम विभाजन और जाति प्रथा** (डॉ. भीमराव अंबेडकर): भारतीय समाज में जाति प्रथा पर आधारित श्रम विभाजन अस्वाभाविक है।
2. **विष के दांत** (नलिन विलोचन शर्मा): मध्यमवर्गीय समाज की विडंबनाओं व खोखा और मदन के अंतर्द्वंद्व का मनोवैज्ञानिक चित्रण।
3. **भारत से हम क्या सीखें** (मैक्स मूलर): भारत की सांस्कृतिक विरासत, संस्कृत भाषा का वैशिष्ट्य एवं नीति कथाओं का योगदान।
4. **नाखून क्यों बढ़ते हैं** (आचार्य हजारी प्रसाद द्विवेदी): मनुष्य की पाशविक प्रवृत्ति और मानवीय संवेदना का द्वंद्व।
5. **बहादुर** (अमरकांत): नेपाली किशोर घरेलू नौकर बहादुर का संवेदनशील चित्रण।
6. **शिक्षा और संस्कृति** (महात्मा गांधी): वास्तविक शिक्षा अंतरात्मा के विकास एवं अहिंसक श्रम से प्राप्त होती है।

## वर्णिका भाग-2 (पूरक पाठ्यपुस्तक):
1. **दही वाली मंगम्मा** (श्रीनिवास): सास-बहू के संघर्ष और ग्रामीण जीवन का मार्मिक चित्रण।
2. **ढहते विश्वास** (सातकोड़ी होता): उड़ीसा में बाढ़ की विभीषिका और माँ लक्ष्मी की व्यथा।
3. **माँ** (ईश्वर पेटलीकर): मंदबुद्धि कन्या मंगु और उसकी माँ के अटूट वात्सल्य की अमर कहानी।
4. **नगर** (सुजाता): मदुरै शहर में पाप्पाति के इलाज के लिए वल्ली अम्माल का संघर्ष।`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-hindi-godhuli",
      upload_date: "2026-09-14",
      author: "Manoj Kumar Mishra (HOD Languages)"
    },
    {
      id: "res-c10-san-piyusham",
      title: "Class 10 Sanskrit 'पीयूषम् भाग-2' (Bihar Board Matric 100 Marks)",
      title_hindi: "मैट्रिक संस्कृत: मङ्गलम्, पाटलिपुत्रवैभवम्, अलसकथा, नीतिश्लोकाः व व्याकरण",
      subject_id: "sub-san",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Sanskrit",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "बिहार राज्य पाठ्यपुस्तक निगम 'पीयूषम् भाग 2'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Piyusham Part 2 All 14 Chapters",
      notification_text: "📢 Sanskrit Scoring Alert: Mangalam Upnishad shlokas & Patliputra Vaibhavam carry guaranteed 15 marks.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhW_sanskrit_bseb10",
      video_title: "BSEB 10th Sanskrit Piyusham All 14 Chapters Shloka Meaning & Hindi Anuvad",
      description: "All 14 chapters translated into Hindi with sandhi, samas, pratyaya, karak rules, and expected board exam questions.",
      content_markdown: `# कक्षा 10 संस्कृत 'पीयूषम् भाग-2' - संपूर्ण 14 अध्याय एवं व्याकरण
1. **मङ्गलम्**: उपनिषद् (कठ, ईशावास्य, मुण्डक, श्वेताश्वतर) से संकलित श्लोक। "सत्यमेव जयते नानृतम्"।
2. **पाटलिपुत्रवैभवम्**: प्राचीन पाटलिपुत्र (पटना) का इतिहास, बुद्धकाल में पाटलिग्राम, मौर्यकाल में अशोक का समय, चंद्रगुप्त मौर्य के समय सुव्यवस्था।
3. **अलसकथा**: विद्यापति रचित 'पुरुषपरीक्षा' कथा ग्रंथ; मिथिला के मंत्री वीरेश्वर की दानशीलता एवं चार आलसियों की परीक्षा।
4. **संस्कृतसाहित्ये लेखिकाः**: वैदिक काल से वर्तमान तक संस्कृत साहित्य में गार्गी, मैत्रेयी, विजयाङ्का, पण्डिता क्षमाराव का योगदान।
5. **भारतमहिमा**: विष्णुपुराण व भागवतपुराण के श्लोक। भारत भूमि देवों द्वारा पूजनीय है।
6. **भारतीयसंस्काराः**: 16 संस्कार (गर्भाधान, पुंसवन, सीमन्तोन्नयन, जातकर्म, नामकरण, उपनयन, केशान्त, विवाह, अंत्येष्टि)।
7. **नीतिश्लोकाः**: महाभारत के उद्योगपर्व में महात्मा विदुर द्वारा धृतराष्ट्र को दिए गए नीति उपदेश।
8. **कर्मवीरकथा**: भीखनटोला (बिहार) गाँव के दलित बालक रामप्रवेश राम की कठिन परिश्रम व उच्च प्रशासनिक पद (UPSC) प्राप्ति की प्रेरक कथा।`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-sanskrit",
      upload_date: "2026-09-14",
      author: "Manoj Kumar Mishra"
    },

    // ---------------------------------------------------------
    // CLASS 9 (SECONDARY FOUNDATION)
    // ---------------------------------------------------------
    {
      id: "res-c09-math-full",
      title: "Class 9 Mathematics Complete NCERT & BSEB Syllabus",
      title_hindi: "कक्षा 9 गणित: संख्या पद्धति, बहुपद, निर्देशांक ज्यामिति, वृत्त, हीरोन का सूत्र",
      subject_id: "sub-mat",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Mathematics",
      class_name: "Class 9-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT Mathematics Class 9 / SCERT Bihar Ganit 9",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 9 Math Ch 1 to Ch 12",
      notification_text: "📢 Term 1 Syllabus Notice: Chapters 1 to 6 (Number Systems to Triangles) to be completed by October.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX9_Math_Class9",
      video_title: "Class 9th Maths Full Course One Shot (CBSE & Bihar Board)",
      description: "Complete course on Number Systems, Polynomials, Linear Equations, Triangles, Quadrilaterals, Circles, Heron's Formula, Surface Areas & Volumes, and Statistics.",
      content_markdown: `# Class 9 Mathematics Comprehensive Syllabus
- **Ch 1: Number Systems**: Rational numbers, irrational numbers on number line, real number exponents.
- **Ch 2: Polynomials**: Remainder Theorem, Factor Theorem, algebraic identities (a+b)³, (a-b)³, a³+b³+c³ - 3abc.
- **Ch 3 & 4: Coordinate Geometry & Linear Equations in 2 Variables**: Cartesian plane, plotting points, ax + by + c = 0.
- **Ch 5 & 6: Euclid Geometry, Lines and Angles**: Intersecting lines, parallel lines and transversal, angle sum property.
- **Ch 7: Triangles**: Congruence rules (SAS, ASA, AAS, SSS, RHS), isosceles triangle properties.
- **Ch 10: Heron's Formula**: Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2.
- **Ch 11: Surface Areas and Volumes**: Spheres, cones, cylinders, hemispheres.`,
      file_url: "https://ncert.nic.in/textbook.php?iemh1=0-12",
      upload_date: "2026-09-12",
      author: "Jitendra Kumar Mandal"
    },
    {
      id: "res-c09-sci-full",
      title: "Class 9 Science Complete Roadmap (Physics, Chemistry, Biology)",
      title_hindi: "कक्षा 9 विज्ञान: हमारे आस-पास के पदार्थ, परमाणु एवं अणु, कोशिका, गति, बल",
      subject_id: "sub-sci",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Science",
      class_name: "Class 9-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar Class 9 Vigyan & NCERT Science Book",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Class 9 Science All 12 Chapters",
      notification_text: "📢 Science Exhibition Notification: Model submissions for District Science Fair open till Nov 10.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX9_Science_Full",
      video_title: "Class 9 Science Complete Syllabus Lectures (Hindi Medium)",
      description: "Matter in our Surroundings, Atoms & Molecules, Fundamental Unit of Life (Cell), Tissues, Motion, Force and Laws of Motion, Gravitation, Work and Energy, Sound.",
      content_markdown: `# कक्षा 9 विज्ञान संपूर्ण पाठ्यक्रम
1. **हमारे आस-पास के पदार्थ**: ठोस, द्रव, गैस; वाष्पीकरण को प्रभावित करने वाले कारक।
2. **क्या हमारे आस-पास के पदार्थ शुद्ध हैं**: विलयन, कोलाइड, निलंबन, टिंडल प्रभाव।
3. **परमाणु एवं अणु**: डाल्टन का परमाणु सिद्धांत, रासायनिक सूत्र लिखना, मोल संकल्पना।
4. **जीवन की मौलिक इकाई (कोशिका)**: पादप कोशिका vs जंतु कोशिका, माइटोकॉन्ड्रिया (कोशिका का पावरहाउस), लाइसोसोम।
5. **ऊतक (Tissues)**: विभज्योतक (Meristematic), स्थायी ऊतक, जाइलम, फ्लोएम, पेशीय ऊतक, तंत्रिका ऊतक।
6. **गति एवं बल**: गति के समीकरण (v = u+at, s = ut+½at², v² = u²+2as), न्यूटन के गति नियम, संवेग संरक्षण।
7. **गुरुत्वाकर्षण**: सार्वत्रिक गुरुत्वाकर्षण नियम F = G(m₁m₂)/r², भार एवं द्रव्यमान, आर्कमिडीज का सिद्धांत।`,
      file_url: "https://ncert.nic.in/textbook.php?iesc1=0-12",
      upload_date: "2026-09-12",
      author: "Sangeeta Kumari"
    },

    // ---------------------------------------------------------
    // CLASS 8 (MIDDLE SCHOOL SENIOR)
    // ---------------------------------------------------------
    {
      id: "res-c08-math-full",
      title: "Class 8 Mathematics NCERT & Bihar SCERT Complete Syllabus",
      title_hindi: "कक्षा 8 गणित: परिमेय संख्याएँ, एक चर वाले रैखिक समीकरण, चतुर्भुज, क्षेत्रमिति",
      subject_id: "sub-mat",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Mathematics",
      class_name: "Class 8-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 8' & NCERT Class 8 Mathematics",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 8 Math Chapters 1 to 13",
      notification_text: "📢 NMMS Scholarship Exam Notification: Class 8 students are eligible to apply for National Means-cum-Merit Scholarship.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX8_Maths_NCERT",
      video_title: "Class 8th Maths Complete Syllabus Full Playlist",
      description: "Rational Numbers, Linear Equations in One Variable, Understanding Quadrilaterals, Data Handling, Squares & Square Roots, Cubes, Comparing Quantities, Algebraic Expressions, Mensuration, Exponents.",
      content_markdown: `# Class 8 Mathematics Complete Syllabus
- **Rational Numbers**: Closure, Commutative, Associative properties, additive/multiplicative inverse.
- **Linear Equations in One Variable**: Solving equations having variables on both sides.
- **Understanding Quadrilaterals**: Convex, concave polygons, angle sum property of n-sided polygon = (n-2) × 180°.
- **Squares & Square Roots**: Division method, prime factorization method.
- **Mensuration**: Area of trapezium = ½ (a+b) × h, surface area and volume of cylinder, cuboid.
- **Exponents & Powers**: Laws of exponents: aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ.`,
      file_url: "https://ncert.nic.in/textbook.php?hemh1=0-13",
      upload_date: "2026-09-11",
      author: "Prabhat Kumar Verma"
    },
    {
      id: "res-c08-hin-kislay",
      title: "Class 8 Hindi 'किस्लय भाग-3' (SCERT Bihar)",
      title_hindi: "कक्षा 8 हिन्दी 'किस्लय': तू जिंदा है तो, ईदगाह (प्रेमचंद), कर्मवीर, विक्रमशिला",
      subject_id: "sub-hin",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Hindi",
      class_name: "Class 8-A",
      board: "Bihar Board (BSEB)",
      book_reference: "बिहार राज्य पाठ्यपुस्तक निगम 'किस्लय भाग 3'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Kislay Part 3 Reader",
      notification_text: "📢 Essay Writing Competition: Theme 'बिहार के ऐतिहासिक स्थल - विक्रमशिला एवं नालंदा'.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX8_Hindi_Kislay",
      video_title: "Bihar Board Class 8 Hindi Kislay Bhag 3 All Chapters Explained",
      description: "Complete chapter breakdown for 'तू जिंदा है तो', मुंशी प्रेमचंद की कालजयी कहानी 'ईदगाह' (हामिद और चिमटा), 'कर्मवीर', 'हुंडरू का जलप्रपात', 'विक्रमशिला' एवं 'झांसी की रानी'।",
      content_markdown: `# कक्षा 8 हिन्दी (किस्लय भाग-3) मुख्य पाठ सारांश
1. **तू जिंदा है तो जिंदगी की जीत में यकीन कर** (शंकर शैलेंद्र): आशावादिता एवं संघर्ष की प्रेरक कविता।
2. **ईदगाह** (प्रेमचंद): चार-पाँच साल के अनाथ बालक हामिद के बाल मनोविज्ञान, त्याग व दादी अमीना के प्रति प्रेम की अमर कहानी।
3. **कर्मवीर** (अयोध्या सिंह उपाध्याय 'हरिऔध'): जो कर्म को ही अपना जीवन मानते हैं, वे ही संसार में नए मार्ग बनाते हैं।
4. **विक्रमशिला**: भागलपुर जिले में स्थित प्राचीन अंतरराष्ट्रीय विश्वविद्यालय का गौरवशाली इतिहास।
5. **हुंडरू का जलप्रपात** (कामता प्रसाद सिंह 'काम'): छोटानागपुर के प्राकृतिक सौंदर्य का मनमोहक वर्णन।`,
      file_url: "https://biharboardonline.bihar.gov.in/class8-kislay",
      upload_date: "2026-09-11",
      author: "Manoj Kumar Mishra"
    },

    // ---------------------------------------------------------
    // CLASS 7 (MIDDLE SCHOOL)
    // ---------------------------------------------------------
    {
      id: "res-c07-math-full",
      title: "Class 7 Mathematics Complete Syllabus (NCERT & SCERT Bihar)",
      title_hindi: "कक्षा 7 गणित: पूर्णांक, भिन्न एवं दशमलव, आँकड़ों का प्रबंधन, सरल समीकरण, रेखाएँ और कोण",
      subject_id: "sub-mat",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Mathematics",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 7' & NCERT Class 7 Ganit",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 7 Math All Chapters",
      notification_text: "📢 Periodic Assessment 2: Class 7 Math test scheduled for second week of November.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX7_Maths_NCERT",
      video_title: "Class 7th Maths Full Syllabus Step-by-Step Hindi Lectures",
      description: "Integers, Fractions and Decimals, Data Handling, Simple Equations, Lines and Angles, The Triangle and its Properties, Comparing Quantities, Rational Numbers, Perimeter and Area, Algebraic Expressions.",
      content_markdown: `# Class 7 Mathematics Key Concepts & Syllabus
- **Integers**: Addition, subtraction, multiplication of signed numbers, division rules.
- **Fractions & Decimals**: Multiplication and division of fractions, decimal place values.
- **Simple Equations**: Transposition method to solve 2x + 5 = 15.
- **Lines and Angles**: Complementary (sum = 90°), Supplementary (sum = 180°), vertically opposite angles.
- **The Triangle and its Properties**: Medians, altitudes, exterior angle property, Pythagoras theorem.
- **Perimeter and Area**: Area of parallelogram = base × height, Area of triangle = ½ × base × height, Area of circle = πr².`,
      file_url: "https://ncert.nic.in/textbook.php?gemh1=0-13",
      upload_date: "2026-09-10",
      author: "Rekha Devi"
    },
    {
      id: "res-c07-sci-full",
      title: "Class 7 Science Complete Syllabus & Experiments",
      title_hindi: "कक्षा 7 विज्ञान: पादपों में पोषण, ऊष्मा, अम्ल क्षारक और लवण, जीवों में श्वसन, प्रकाश",
      subject_id: "sub-sci",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Science",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'विज्ञान कक्षा 7' & NCERT Science Book",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Class 7 Science 13 Chapters",
      notification_text: "📢 Science Project: Prepare a natural indicator using turmeric paper or China rose petals.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX7_Science_Hindi",
      video_title: "Class 7 Science Full Course All Chapters Explained",
      description: "Nutrition in Plants & Animals, Heat, Acids, Bases and Salts, Physical and Chemical Changes, Respiration in Organisms, Transportation in Animals and Plants, Reproduction in Plants, Motion and Time, Electric Current, Light.",
      content_markdown: `# कक्षा 7 विज्ञान संपूर्ण सारांश
- **पादपों में पोषण**: प्रकाश संश्लेषण (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂), क्लोरोफिल का कार्य, कीटभक्षी पौधे (घटपर्णी)।
- **ऊष्मा**: तापमापी (थर्मामीटर), चालन (Conduction), संवहन (Convection) एवं विकिरण (Radiation)।
- **अम्ल, क्षारक एवं लवण**: लिटमस पत्र, फेनॉल्फथलीन, उदासीनीकरण अभिक्रिया।
- **भौतिक एवं रासायनिक परिवर्तन**: लोहे में जंग लगना, मैग्नीशियम फीते का जलना।
- **प्रकाश**: समतल दर्पण में प्रतिबिंब, अवतल व उत्तल लेंस के गुणधर्म।`,
      file_url: "https://ncert.nic.in/textbook.php?gesc1=0-13",
      upload_date: "2026-09-10",
      author: "Sudhir Kumar Roy"
    },

    // ---------------------------------------------------------
    // CLASS 6 (MIDDLE SCHOOL ENTRY)
    // ---------------------------------------------------------
    {
      id: "res-c06-math-full",
      title: "Class 6 Mathematics Foundational Concepts (NCERT & SCERT Bihar)",
      title_hindi: "कक्षा 6 गणित: अपनी संख्याओं की जानकारी, पूर्ण संख्याएँ, पूर्णांक, भिन्न, दशमलव",
      subject_id: "sub-mat",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Mathematics",
      class_name: "Class 6-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 6' & NCERT Class 6 Mathematics",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 6 Math Chapters 1 to 12",
      notification_text: "📢 Math Olympiad: Registration open for State Junior Mathematical Talent Search.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX6_Maths_NCERT",
      video_title: "Class 6th Maths Complete NCERT Course in Hindi",
      description: "Knowing Our Numbers, Whole Numbers, Playing with Numbers (LCM & HCF), Basic Geometrical Ideas, Integers, Fractions, Decimals, Data Handling, Mensuration, Algebra, Ratio and Proportion.",
      content_markdown: `# Class 6 Mathematics Comprehensive Guide
- **Knowing Our Numbers**: Indian vs International Place Value system, Roman numerals.
- **Playing with Numbers**: Factors, multiples, prime numbers, divisibility tests (2, 3, 4, 5, 6, 8, 9, 10, 11), HCF and LCM.
- **Integers**: Representation on number line, negative numbers concept.
- **Fractions**: Proper, improper, mixed fractions, addition & subtraction of fractions.
- **Mensuration**: Perimeter of rectangle = 2(l+b), Area of rectangle = l × b.
- **Ratio and Proportion**: Comparing quantities by division, unitary method.`,
      file_url: "https://ncert.nic.in/textbook.php?femh1=0-12",
      upload_date: "2026-09-08",
      author: "Mamta Sinha"
    },
    {
      id: "res-c06-hin-kislay",
      title: "Class 6 Hindi 'किस्लय भाग-1' (SCERT Bihar)",
      title_hindi: "कक्षा 6 हिन्दी 'किस्लय': अरमान, असली चित्र, चिड़िया, सर्वनाम व व्याकरण",
      subject_id: "sub-hin",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Hindi",
      class_name: "Class 6-A",
      board: "Bihar Board (BSEB)",
      book_reference: "बिहार राज्य पाठ्यपुस्तक निगम 'किस्लय भाग 1'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Kislay Part 1 Stories & Poetry",
      notification_text: "📢 Hindi Handwriting & Reading Week: Daily classroom reading session at 9:30 AM.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX6_Hindi_Kislay",
      video_title: "Class 6 Hindi Kislay Bhag 1 Bihar Board Complete Lessons",
      description: "Chapter explanations for 'अरमान' (रामनरेश त्रिपाठी), 'असली चित्र', 'चिड़िया', 'सुभाषचंद्र बोस का पत्र' एवं हिंदी व्याकरण (संज्ञा, सर्वनाम, विशेषण)।",
      content_markdown: `# कक्षा 6 हिन्दी (किस्लय भाग-1) मुख्य पाठ
1. **अरमान** (रामनरेश त्रिपाठी): देश सेवा एवं परोपकार के पवित्र भावों से ओतप्रोत कविता।
2. **असली चित्र**: तेनालीराम की बुद्धिमत्ता एवं चित्रकार के स्वाभिमान की प्रेरक लोककथा।
3. **चिड़िया** (आरसी प्रसाद सिंह): स्वतंत्रता एवं स्वच्छंद प्रकृति का महत्त्व।
4. **व्याकरण**: वर्ण विचार, संज्ञा के पाँचों भेद, लिंग, वचन एवं कारक।`,
      file_url: "https://biharboardonline.bihar.gov.in/class6-kislay",
      upload_date: "2026-09-08",
      author: "Renu Kumari"
    },

    // ---------------------------------------------------------
    // CLASS 5 (PRIMARY EXIT - FOUNDATIONAL FLN)
    // ---------------------------------------------------------
    {
      id: "res-c05-math-magic",
      title: "Class 5 Mathematics 'गणित का जादू' (Math-Magic & SCERT Bihar)",
      title_hindi: "कक्षा 5 गणित: मछली उछली, कोण और आकृतियाँ, कितने वर्ग?, हिस्से और पूरे",
      subject_id: "sub-mat",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Mathematics",
      class_name: "Class 5-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 5' & NCERT Math-Magic Class 5",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Math-Magic Class 5 Full Chapters",
      notification_text: "📢 Primary Scholarship Assessment: Class 5 State FLN Assessment in December.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX5_MathMagic",
      video_title: "Class 5 Maths Ganit Ka Jadu Complete Animated Lessons",
      description: "The Fish Tale (Lakhs & Crores), Shapes and Angles, How Many Squares?, Parts and Wholes, Does it Look the Same?, Be My Multiple, Can You See the Pattern?, Boxes and Sketches, Tenths and Hundredths.",
      content_markdown: `# Class 5 Mathematics (गणित का जादू)
- **मछली उछली (The Fish Tale)**: बड़ी संख्याओं की समझ (लाख और करोड़), गति और दूरी की गणना।
- **कोण और आकृतियाँ (Shapes and Angles)**: समकोण (90°), समकोण से छोटा (न्यूनकोण), समकोण से बड़ा (अधिककोण)।
- **कितने वर्ग? (How Many Squares?)**: ग्रिड पेपर पर आकृतियों का क्षेत्रफल व परिमाप।
- **हिस्से और पूरे (Parts and Wholes)**: भिन्न की प्राथमिक समझ, आधा (1/2), एक-चौथाई (1/4), तीन-चौथाई (3/4)।
- **दसवाँ और सौवाँ (Tenths and Hundredths)**: सेंटीमीटर, मिलीमीटर और रुपये-पैसे में दशमलव की समझ।`,
      file_url: "https://ncert.nic.in/textbook.php?eemh1=0-14",
      upload_date: "2026-09-05",
      author: "Anjali Kumari"
    },
    {
      id: "res-c05-evs-paryavaran",
      title: "Class 5 Environmental Studies 'पर्यावरण और हम भाग-3' (SCERT Bihar)",
      title_hindi: "कक्षा 5 पर्यावरण अध्ययन: पटना से नाथुला की यात्रा, खेल, बीजों का बिखरना, पानी",
      subject_id: "sub-evs",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Environmental Studies",
      class_name: "Class 5-A",
      board: "Bihar Board (BSEB)",
      book_reference: "बिहार राज्य पाठ्यपुस्तक निगम 'पर्यावरण और हम भाग 3'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Paryavaran Aur Hum Part 3",
      notification_text: "📢 Educational Field Trip: Nature walk around Gidhaur Minto Tower and Garhi Dam.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX5_EVS_Bihar",
      video_title: "Class 5 EVS Paryavaran Aur Hum Complete Bihar Syllabus",
      description: "Patna to Nathula Travelogue, Games and Health, Seed Dispersal, Crops of Bihar (Paddy, Wheat, Maize), Clean Drinking Water, Disasters and Safety.",
      content_markdown: `# कक्षा 5 पर्यावरण और हम (भाग-3) - बिहार विशेष
1. **पटना से नाथुला की यात्रा**: बिहार की राजधानी पटना से सिक्किम की सीमा तक का यात्रा वृत्तांत, दार्जिलिंग के चाय बागान।
2. **खेल और स्वास्थ्य**: कबड्डी, खो-खो, बिहार के पारंपरिक खेल एवं शारीरिक विकास।
3. **बीजों का बिखरना**: हवा, पानी, जानवरों और फटने से बीजों का प्रसार।
4. **हमारी फसलें**: खरीफ फसल (धान, मक्का), रबी फसल (गेहूँ, चना, सरसों), जायद फसल।
5. **जल संकट और संरक्षण**: जल प्रदूषण के कारण एवं बिहार में जल-जीवन-हरियाली अभियान।`,
      file_url: "https://biharboardonline.bihar.gov.in/class5-evs",
      upload_date: "2026-09-05",
      author: "Amit Kumar Paswan"
    },

    // ---------------------------------------------------------
    // CLASS 4 (PRIMARY PREPARATORY)
    // ---------------------------------------------------------
    {
      id: "res-c04-math-magic",
      title: "Class 4 Mathematics 'गणित का जादू' (Math-Magic)",
      title_hindi: "कक्षा 4 गणित: ईंटों से बनी इमारत, लंबा और छोटा, भोपाल की सैर, टिक-टिक-टिक",
      subject_id: "sub-mat",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Mathematics",
      class_name: "Class 4-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 4' & NCERT Math-Magic Class 4",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 4 Math Chapters 1 to 14",
      notification_text: "📢 Tables & Mental Math: Daily 5-minute multiplication table drills for Classes 1 to 4.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX4_MathMagic",
      video_title: "Class 4 Maths Complete Syllabus Animated Concepts in Hindi",
      description: "Building with Bricks (Patterns), Long and Short (Length Measurement), A Trip to Bhopal (Word Problems), Tick-Tick-Tick (Time & Clock), The Way the World Looks, Halves and Quarters.",
      content_markdown: `# Class 4 Mathematics (गणित का जादू)
- **ईंटों से बनी इमारत**: ईंटों के विभिन्न पैटर्न, जाली और झरोखा, 3-आयामी आकृतियाँ।
- **लंबा और छोटा**: मीटर (m) और सेंटीमीटर (cm) का संबंध (1 m = 100 cm), किलोमीटर (km) की समझ।
- **भोपाल की सैर**: बस यात्रा में टिकट, पेट्रोल खर्च और समय का व्यावहारिक गणित।
- **टिक-टिक-टिक (घड़ी का समय)**: 12 घंटे व 24 घंटे की घड़ी, ए.एम. (a.m.) और पी.एम. (p.m.)।
- **कबाड़ीवाली**: मुद्रा (रुपये और पैसे) का जोड़-घटाव व गुणा।`,
      file_url: "https://ncert.nic.in/textbook.php?demh1=0-14",
      upload_date: "2026-09-03",
      author: "Mukesh Kumar Sharma"
    },
    {
      id: "res-c04-hin-rimjhim",
      title: "Class 4 Hindi 'रिमझिम भाग-4' व 'कौंपल'",
      title_hindi: "कक्षा 4 हिन्दी: मन के भोले-भाले बादल, जैसा सवाल वैसा जवाब, किरमिच की गेंद",
      subject_id: "sub-hin",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Hindi",
      class_name: "Class 4-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'कौंपल' & NCERT Rimjhim Class 4",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Rimjhim Class 4 Stories",
      notification_text: "📢 Story Narration Activity: Students to prepare 2-minute oral story on Birbal's wit.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX4_Hindi_Rimjhim",
      video_title: "Class 4 Hindi Rimjhim All Chapters Animated Cartoons",
      description: "Poetry and prose for 'मन के भोले-भाले बादल', बीरबल और ख्वाजा सरा की हाजिरजवाबी 'जैसा सवाल वैसा जवाब', 'किरमिच की गेंद' एवं सुंदर लेख अभ्यास।",
      content_markdown: `# कक्षा 4 हिन्दी (रिमझिम एवं कौंपल)
1. **मन के भोले-भाले बादल** (कल्पनाथ सिंह): बादलों के विभिन्न स्वरूपों का बाल सुलभ चित्रण।
2. **जैसा सवाल वैसा जवाब**: अकबर-बीरबल की बुद्धिमानी भरी कथा।
3. **किरमिच की गेंद** (शांता कुमारी जैन): बच्चों की खेल भावना और ईमानदारी की सीख।
4. **पापा जब बच्चे थे**: विभिन्न व्यवसायों के प्रति आदर एवं अच्छे इंसान बनने का संदेश।`,
      file_url: "https://ncert.nic.in/textbook.php?dhdh1=0-14",
      upload_date: "2026-09-03",
      author: "Mukesh Kumar Sharma"
    },

    // ---------------------------------------------------------
    // CLASS 3 (PRIMARY FOUNDATION)
    // ---------------------------------------------------------
    {
      id: "res-c03-math-magic",
      title: "Class 3 Mathematics 'गणित का जादू' (Math-Magic Class 3)",
      title_hindi: "कक्षा 3 गणित: देखें किधर से, संख्याओं की उछलकूद, कुछ लेना कुछ देना, आकृतियों का कमाल",
      subject_id: "sub-mat",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Mathematics",
      class_name: "Class 3-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 3' & NCERT Math-Magic Class 3",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Math-Magic Class 3 Chapters 1 to 14",
      notification_text: "📢 FLN Target: Mastery of 3-digit addition and subtraction with carryover.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX3_MathMagic",
      video_title: "Class 3 Maths Full Course Animated Lessons for Children",
      description: "Where to Look From, Fun with Numbers, Give and Take, Shapes and Designs, Length Measurement, Time Goes On, Who is Heavier? Multiplication tables up to 10.",
      content_markdown: `# Class 3 Mathematics (गणित का जादू)
- **देखें किधर से (Where to Look From)**: ऊपर से दृश्य (Top view), सामने से (Front view), बगल से (Side view)।
- **संख्याओं की उछलकूद (Fun with Numbers)**: तीन अंकों की संख्याएं (100 से 999), शतक और अर्धशतक।
- **कुछ लेना कुछ देना (Give and Take)**: 100 के ग्रिड चार्ट पर संख्याओं को जोड़ना और घटाना।
- **आकृतियों का कमाल (Shapes and Designs)**: किनारे, कोने, रेखाएं (सीधी व घुमावदार), फर्श के पैटर्न।`,
      file_url: "https://ncert.nic.in/textbook.php?cemh1=0-14",
      upload_date: "2026-09-02",
      author: "Sanjay Kumar Pandit"
    },
    {
      id: "res-c03-hin-rimjhim",
      title: "Class 3 Hindi 'रिमझिम भाग-3' व 'कौंपल'",
      title_hindi: "कक्षा 3 हिन्दी: कक्कू, शेखीबाज़ मक्खी, चाँद वाली अम्मा, बहादुर बित्तो",
      subject_id: "sub-hin",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Hindi",
      class_name: "Class 3-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'कौंपल' & NCERT Rimjhim 3",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Rimjhim Class 3 All Stories",
      notification_text: "📢 Reading Milestone: All Class 3 students to read fluently at 45-60 words per minute.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX3_Hindi_Rimjhim",
      video_title: "Class 3 Hindi Rimjhim All Chapters Cartoon Videos",
      description: "Poems and tales: 'कक्कू' (रमेशचंद्र शाह), 'शेखीबाज़ मक्खी', 'चाँद वाली अम्मा', 'बहादुर बित्तो' (पंजाबी लोककथा), 'टिपटिपवा' (उत्तर प्रदेश व बिहार की लोककथा)।",
      content_markdown: `# कक्षा 3 हिन्दी (रिमझिम एवं कौंपल)
1. **कक्कू**: नाम है कक्कू, कक्कू माने कोयल होता, लेकिन यह तो दिन भर रोता!
2. **शेखीबाज़ मक्खी**: घमंडी मक्खी और चतुर लोमड़ी की मनोरंजक कहानी।
3. **चाँद वाली अम्मा**: झाड़ू लगाकर चाँद पर पहुँची अम्मा की लोककथा।
4. **बहादुर बित्तो**: सूझबूझ से शेर को भगाने वाली बहादुर महिला की कहानी।
5. **टिपटिपवा**: बारिश की टप-टप बूंदों से डरने वाले धोबी और बाघ की हास्य कथा।`,
      file_url: "https://ncert.nic.in/textbook.php?chdh1=0-14",
      upload_date: "2026-09-02",
      author: "Pratibha Kumari"
    },

    // ---------------------------------------------------------
    // CLASS 2 (EARLY CHILDHOOD FLN)
    // ---------------------------------------------------------
    {
      id: "res-c02-math-joyful",
      title: "Class 2 Mathematics 'आनंदमय गणित' (Joyful Mathematics & Math-Magic)",
      title_hindi: "कक्षा 2 गणित: क्या है लंबा क्या है गोल?, समूहों में गिनना, तुम कितना उठा सकते हो?",
      subject_id: "sub-mat",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "Mathematics",
      class_name: "Class 2-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT 'Joyful Mathematics Class 2' & SCERT Bihar Ganit 2",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 2 Joyful Math Lessons",
      notification_text: "📢 NIPUN Bharat Target: Recognize 2-digit numbers up to 99 and perform single-digit addition.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX2_JoyfulMath",
      video_title: "Class 2 Joyful Mathematics Animated Fun Episodes",
      description: "Shapes around us, Counting in Groups (pairs, fives, tens), How Much Can You Carry? (heavy vs light), Patterns, Addition and Subtraction up to 50.",
      content_markdown: `# Class 2 Joyful Mathematics (आनंदमय गणित)
- **आकार और वस्तुएँ**: गेंद (गोल), पेंसिल (लंबी), पहिया (गोल), माचिस की डिब्बी (चौकोर)।
- **समूहों में गिनना**: 2-2 के समूह, 5-5 के बंडल और 10-10 की माला।
- **भारी और हल्का**: तराजू की समझ, हाथी भारी है और चूहा हल्का।
- **गिनती और पैटर्न**: 1 से 100 तक गिनती, छूटी हुई संख्याएं भरना।`,
      file_url: "https://ncert.nic.in/textbook.php?bemh1=0-11",
      upload_date: "2026-09-01",
      author: "Kavita Kumari"
    },
    {
      id: "res-c02-hin-sarangi",
      title: "Class 2 Hindi 'सारंगी भाग-2' (NCERT & SCERT Bihar)",
      title_hindi: "कक्षा 2 हिन्दी: नीम की सीख, भालू ने खेली फुटबॉल, म्याऊँ-म्याऊँ, बुलबुल",
      subject_id: "sub-hin",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "Hindi",
      class_name: "Class 2-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT 'सारंगी कक्षा 2' & SCERT Bihar भाषा भारती 2",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Sarangi Class 2 Rhymes & Stories",
      notification_text: "📢 Rhyme Recitation Day: Every Friday Class 2 poem singing competition.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX2_Hindi_Sarangi",
      video_title: "Class 2 Hindi Sarangi Animated Songs and Stories",
      description: "Delightful poems, phonetics, matra practice (आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, अं), and picture-based reading for young learners.",
      content_markdown: `# कक्षा 2 हिन्दी (सारंगी भाग-2)
- **ऊँट चला**: ऊँट चला भाई ऊँट चला, हिलता-डुलता ऊँट चला!
- **भालू ने खेली फुटबॉल**: सर्दियों का मौसम, शेर का बच्चा और भालू की शरारत।
- **म्याऊँ-म्याऊँ**: चूहे से डरती लड़की और बिल्ली की आवाज निकालने की मजेदार कविता।
- **मात्रा अभ्यास**: सभी 12 मात्राओं की पहचान एवं दो-तीन अक्षरों के सरल शब्दों का शुद्ध उच्चारण।`,
      file_url: "https://ncert.nic.in/textbook.php?bshd1=0-15",
      upload_date: "2026-09-01",
      author: "Bipin Bihari Singh"
    },

    // ---------------------------------------------------------
    // CLASS 1 (FOUNDATIONAL ENTRY & PRE-PRIMARY TRANSITION)
    // ---------------------------------------------------------
    {
      id: "res-c01-math-joyful",
      title: "Class 1 Mathematics 'आनंदमय गणित' (Joyful Mathematics Class 1)",
      title_hindi: "कक्षा 1 गणित: आकृतियाँ खोजें, 1 से 9 तक संख्याएँ, जोड़ और घटाव, पैटर्न",
      subject_id: "sub-mat",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "Mathematics",
      class_name: "Class 1-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT 'Joyful Mathematics Class 1' & SCERT Bihar Ganit 1",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Class 1 Math Foundational Numeracy",
      notification_text: "📢 NIPUN Bharat FLN Goal: Every Class 1 child to identify numbers 1 to 20 with concrete objects.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX1_JoyfulMath",
      video_title: "Class 1 Joyful Mathematics Animated Songs and Number Games",
      description: "Finding Shapes, Numbers 1 to 9, Making Ten, Numbers 10 to 20, How Many? (Simple counting, addition and subtraction using fingers and blocks).",
      content_markdown: `# Class 1 Joyful Mathematics (आनंदमय गणित)
- **आकृतियाँ खोजें (Finding Shapes)**: गोल (सिक्का), तिकोना (समोसा), चौकोर (किताब)।
- **गिनती 1 से 9**:
  - एक (1) सूरज आसमान में
  - दो (2) आंखें
  - तीन (3) पहिए रिक्शे के
  - चार (4) पैर गाय के
  - पाँच (5) उँगलियाँ हाथ में।
- **जोड़ और घटाव**: कंकड़ों और गोलियों के माध्यम से 1 से 10 तक जोड़ना।`,
      file_url: "https://ncert.nic.in/textbook.php?aemh1=0-10",
      upload_date: "2026-09-01",
      author: "Priyanka Kumari"
    },
    {
      id: "res-c01-hin-sarangi",
      title: "Class 1 Hindi 'सारंगी भाग-1' व वर्णमाला गीत (NCERT & SCERT Bihar)",
      title_hindi: "कक्षा 1 हिन्दी: झूला, आम की कहानी, आम की टोकरी, पत्ते ही पत्ते, पकौड़ी, छुक-छुक गाड़ी",
      subject_id: "sub-hin",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "Hindi",
      class_name: "Class 1-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT 'सारंगी कक्षा 1' & SCERT Bihar 'अंकुर भाग 1'",
      resource_type: "notification",
      chapter_number: 1,
      chapter_name: "Sarangi Class 1 Full Reader",
      notification_text: "📢 Balvatika Welcome Notice: Special activity-based orientation for all newly admitted Class 1 kids.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX1_Hindi_Sarangi",
      video_title: "Class 1 Hindi Sarangi Rhymes and Alphabet Cartoon Songs",
      description: "Varnamala (Swar: अ से अः, Vyanjan: क से ज्ञ), Rhymes ('अम्मा आज लगा दे झूला', 'छः साल की छोकरी भरकर लाई टोकरी', 'दौड़ी-दौड़ी आई पकौड़ी', 'छुक-छुक करती आई रेल') and letter tracing.",
      content_markdown: `# कक्षा 1 हिन्दी (सारंगी एवं अंकुर)
## 1. वर्णमाला गीत:
- **स्वर**: अ (अनार), आ (आम), इ (इमली), ई (ईख), उ (उल्लू), ऊ (ऊन), ऋ (ऋषि), ए (एड़ी), ऐ (ऐनक), ओ (ओखली), औ (औरत), अं (अंगूर), अः।
- **व्यंजन**: क, ख, ग, घ, ङ ... ज्ञ तक पहचान व चित्र मिलान।

## 2. लोकप्रिय बाल कविताएँ:
- **झूला**:
  - अम्मा आज लगा दे झूला,
  - इस झूले पर मैं झूलूँगा!
- **आम की टोकरी**:
  - छः साल की छोकरी,
  - भरकर लाई टोकरी!
  - टोकरी में आम हैं,
  - नहीं बताती दाम है!
- **छुक-छुक गाड़ी**:
  - छूटी मेरी रेल रे बाबू, छूटी मेरी रेल!`,
      file_url: "https://ncert.nic.in/textbook.php?ashd1=0-15",
      upload_date: "2026-09-01",
      author: "Shambhu Sharan Manjhi"
    }
  ];

  return resources;
}
