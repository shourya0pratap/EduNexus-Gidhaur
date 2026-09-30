import fs from "fs";
import path from "path";
import { getAllCurriculumResources } from "./curriculum-resources-catalog.mjs";

// -------------------------------------------------------------
// SCRIPT TO GENERATE COMPLETE EXPANDED LOCAL DATABASE (600 STUDENTS, ALL MARKS, ALL RESOURCES, ANNOUNCEMENTS, TEACHER ATTENDANCE, DUE ASSIGNMENTS)
// -------------------------------------------------------------

const DB_PATH = path.join(process.cwd(), "data", "local_db.json");

const BIHAR_FIRST_NAMES_BOYS = [
  "Aarav", "Rohan", "Shivam", "Aditya", "Alok", "Rahul", "Vikas", "Rakesh", "Saurav", "Amit",
  "Prakash", "Manish", "Deepak", "Anand", "Ranjan", "Suraj", "Kunal", "Naveen", "Abhishek", "Prince",
  "Rituraj", "Raunak", "Gautam", "Chandan", "Pankaj", "Ashish", "Dheeraj", "Mukesh", "Roshan", "Nilesh",
  "Sumit", "Ajay", "Sonu", "Monu", "Satyam", "Sushant", "Shubham", "Vishal", "Mayank", "Nitin",
  "Harsh", "Ayush", "Aryan", "Gaurav", "Rohit", "Vikrant", "Devendra", "Hemant", "Vivek", "Kishan"
];

const BIHAR_FIRST_NAMES_GIRLS = [
  "Priya", "Ananya", "Sneha", "Pooja", "Suman", "Neha", "Kavya", "Deepali", "Shilpi", "Puja",
  "Ritu", "Anjali", "Swati", "Nisha", "Komal", "Sonam", "Shreya", "Kriti", "Archana", "Divya",
  "Khushi", "Muskan", "Khusboo", "Simran", "Preeti", "Aarti", "Monika", "Mamta", "Varsha", "Jyoti",
  "Sunita", "Anita", "Roshni", "Pallavi", "Sakshi", "Prerna", "Rashmi", "Tanya", "Saloni", "Vandana",
  "Kajal", "Sweta", "Shalinee", "Bhavna", "Rani", "Rupa", "Menka", "Gunjan", "Rupali", "Soni"
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
  "Suresh Chandra Mishra", "Nand Kishore Sharma", "Binod Kumar Ray", "Santosh Kumar Chaudhary",
  "Tribhuvan Singh", "Baidyanath Yadav", "Jagdish Prasad", "Chandrashekhar Jha", "Ramakant Sharma"
];

const BIHAR_MOTHERS = [
  "Shanti Devi", "Sunita Devi", "Lalita Devi", "Urmila Devi", "Geeta Devi", "Pushpa Devi",
  "Meena Devi", "Kanti Devi", "Saroj Devi", "Manju Devi", "Rekha Devi", "Sudha Devi",
  "Anita Devi", "Kavita Devi", "Radha Devi", "Basanti Devi", "Shail Devi", "Prabha Devi",
  "Bindu Devi", "Malti Devi", "Usha Devi", "Girija Devi", "Kiran Devi", "Sanju Devi"
];

const BIHAR_VILLAGES_JAMUI = [
  "Village Gangra, Gidhaur", "Village Seva, Jamui", "Mallehpur, Near Rly Stn, Jamui", "Gidhaur Bazar, Ward 4",
  "Purani Bazar, Jhajha", "Maharajganj, Jamui Town", "Near Simultala Station", "Village Sono, Jamui",
  "Village Barhat, Jamui", "Village Sikandra, Jamui", "Village Ratanpur, Gidhaur", "Station Road Gidhaur",
  "Village Khaira, Jamui", "Village Chour, Gidhaur", "Kalyanpur, Gidhaur", "Village Nabinagar, Jamui",
  "Patneshwar Dham Road", "Babu Tola, Gidhaur", "Minto Tower Chowk, Gidhaur", "Ramballabh Nagar, Jhajha",
  "Village Keshopur, Gidhaur", "Village Chaura, Jamui", "Kumar Gram, Gidhaur", "Ratanpur Road, Jamui"
];

export function buildDatabase() {
  console.log("Starting comprehensive database generation...");

  // 1. SCHOOL SETTINGS
  const schoolSettings = {
    id: "sch-01",
    school_name: "Gidhaur Central School (गिद्धौर सेन्ट्रल स्कूल)",
    tagline: "Empowering Rural Bihar Through Quality & Transparent Education",
    address: "Station Road, Gidhaur, District Jamui, Bihar - 811305",
    phone: "+91 94312 34567 / +91 98351 12340",
    email: "principal@edunexus.edu",
    website: "https://gidhaurcentralschool.edu.in",
    principal_name: "Dr. Arvind Pathak (डॉ. अरविंद पाठक), M.Sc. Ph.D.",
    affiliation_code: "BSEB-PAT-JAM-811305 / CBSE-REG-1039",
    board: "Bihar School Examination Board (BSEB) & NCERT Aligned",
    attendance_threshold: 75
  };

  // 2. CLASSES (1st to 10th with Sections A, B, C)
  const classes = [];
  for (let g = 1; g <= 10; g++) {
    const cid = `c-${String(g).padStart(2, "0")}`;
    classes.push({
      id: cid,
      name: `Class ${g}`,
      grade_level: g,
      academic_year: "2026-27",
      is_active: true,
      sections: [
        { id: `${cid}-a`, name: "Section A" },
        { id: `${cid}-b`, name: "Section B" },
        { id: `${cid}-c`, name: "Section C" }
      ]
    });
  }

  // 3. SUBJECTS
  const subjects = [
    { id: "sub-mat", name: "Mathematics (गणित)", code: "MATH", hindi_name: "गणित", description: "Arithmetic, Algebra, Geometry, Trigonometry, Statistics & Number Systems", board_coverage: "Classes 1st to 10th", is_active: true },
    { id: "sub-sci", name: "Science (विज्ञान)", code: "SCI", hindi_name: "विज्ञान", description: "Physics, Chemistry, Biology & Environmental Phenomena", board_coverage: "Classes 1st to 10th", is_active: true },
    { id: "sub-sst", name: "Social Science (सामाजिक विज्ञान)", code: "SST", hindi_name: "सामाजिक विज्ञान", description: "History, Geography, Political Science, Economics & Disaster Management", board_coverage: "Classes 6th to 10th", is_active: true },
    { id: "sub-hin", name: "Hindi (हिंदी)", code: "HIN", hindi_name: "हिंदी (गोधूलि / वर्णिका / वसंत / सारंगी)", description: "Literature, Grammar, Essay & Translation", board_coverage: "Classes 1st to 10th", is_active: true },
    { id: "sub-eng", name: "English (अंग्रेजी)", code: "ENG", hindi_name: "अंग्रेजी (Panorama / First Flight / Honeydew)", description: "Prose, Poetry, Communication & Applied Grammar", board_coverage: "Classes 1st to 10th", is_active: true },
    { id: "sub-san", name: "Sanskrit (संस्कृत)", code: "SAN", hindi_name: "संस्कृत (पीयूषम् / अमृता)", description: "Vedic & Classical Sanskrit, Shlokas, Vyakaran & Translation", board_coverage: "Classes 6th to 10th", is_active: true },
    { id: "sub-evs", name: "Environmental Studies (पर्यावरण और हम)", code: "EVS", hindi_name: "पर्यावरण अध्ययन", description: "Nature, Health, Hygiene, Village Ecosystem & Climate", board_coverage: "Classes 1st to 5th", is_active: true },
    { id: "sub-cs", name: "Computer Science (सूचना प्रौद्योगिकी)", code: "CS", hindi_name: "कम्प्यूटर शिक्षा", description: "Fundamentals, Coding Basics, Digital Literacy & Office Tools", board_coverage: "Classes 3rd to 10th", is_active: true }
  ];

  // 4. TEACHERS (50 Teachers with designated Section In-Charge)
  const teacherDefs = [
    // Executive Leadership
    { id: "t-01", name: "Dr. Arvind Pathak (डॉ. अरविंद पाठक)", code: "GCS-EXEC-001", email: "admin@edunexus.edu", phone: "+91 94312 34567", desig: "Principal & Institutional Patron", qual: "M.Sc. (Physics), Ph.D., B.Ed.", spec: "Institutional Governance & Physics", level: 1, title: "Executive Leadership", section: "Institutional Head", role: null, classes: ["Class 10-A", "Class 10-B"], subs: ["Physics", "Governance"] },
    { id: "t-02", name: "Prof. Shashi Bhushan Sharma (प्रो. शशि भूषण शर्मा)", code: "GCS-EXEC-002", email: "shashi.sharma@edunexus.edu", phone: "+91 94312 34568", desig: "Vice-Principal & Academic Director", qual: "M.Sc. (Math), M.Ed.", spec: "Curriculum Design & Advanced Math", level: 1, title: "Executive Leadership", section: "Academic Director", role: null, classes: ["Class 9-A", "Class 10-A"], subs: ["Advanced Mathematics"] },
    
    // Coordinators & Senior Wing Section In-Charges
    { id: "t-03", name: "Dr. Rameshwar Prasad Singh (डॉ. रामेश्वर प्रसाद सिंह)", code: "GCS-COORD-001", email: "rameshwar.singh@edunexus.edu", phone: "+91 98351 12345", desig: "1st Class Coordinator & Senior Head", qual: "M.Sc. (Chem), Ph.D., B.Ed.", spec: "Senior Wing Administration & Chemistry", level: 2, title: "Chief Class Coordinator", section: "Class 10-A", role: "1st_class_coordinator", classes: ["Class 10-A", "Class 10-B"], subs: ["Chemistry", "Senior Administration"] },
    { id: "t-04", name: "Smt. Sunita Verma (श्रीमती सुनीता वर्मा)", code: "GCS-COORD-002", email: "sunita.verma@edunexus.edu", phone: "+91 98351 12341", desig: "2nd Class Coordinator & Middle Head", qual: "M.A. (English), B.Ed.", spec: "Middle Wing Quality & English", level: 2, title: "Chief Class Coordinator", section: "Class 10-B", role: "2nd_class_coordinator", classes: ["Class 10-B", "Class 9-A"], subs: ["English", "Administration"] },
    { id: "t-05", name: "Sri Rajesh Sharma (श्री राजेश शर्मा)", code: "GCS-FAC-005", email: "rajesh.sharma@edunexus.edu", phone: "+91 98351 12340", desig: "Senior PGT Mathematics", qual: "M.Sc. (Math), B.Ed.", spec: "BSEB 10th Board Math Preparation", level: 3, title: "Senior Faculty", section: "Class 10-C", role: null, classes: ["Class 10-C", "Class 9-A"], subs: ["Mathematics"] },
    { id: "t-06", name: "Manoj Kumar Mishra (मनोज कुमार मिश्रा)", code: "GCS-FAC-006", email: "manoj.mishra@edunexus.edu", phone: "+91 98351 12342", desig: "Head of Oriental Languages (Hindi/Sanskrit)", qual: "Acharya, M.A., B.Ed.", spec: "Piyusham & Godhuli Matric Literature", level: 3, title: "Senior Faculty", section: "Class 9-A", role: null, classes: ["Class 9-A", "Class 10-A"], subs: ["Hindi", "Sanskrit"] },
    { id: "t-07", name: "Archana Singh (अर्चना सिंह)", code: "GCS-FAC-007", email: "archana.singh@edunexus.edu", phone: "+91 98351 12365", desig: "Senior Teacher - English", qual: "M.A. (English), B.Ed.", spec: "Panorama & First Flight", level: 3, title: "Senior Faculty", section: "Class 9-B", role: null, classes: ["Class 9-B", "Class 9-C"], subs: ["English"] },
    { id: "t-08", name: "Pooja Banerjee (पूजा बनर्जी)", code: "GCS-FAC-008", email: "pooja.b@edunexus.edu", phone: "+91 98351 12343", desig: "TGT Science & ICT In-charge", qual: "B.Tech (CS), B.Ed.", spec: "Physics, Practical Labs & ICT", level: 3, title: "Senior Faculty", section: "Class 9-C", role: null, classes: ["Class 9-C", "Class 8-A"], subs: ["Science", "Computer Science"] },
    { id: "t-09", name: "Prabhat Kumar Verma (प्रभात कुमार वर्मा)", code: "GCS-FAC-009", email: "prabhat.verma@edunexus.edu", phone: "+91 98351 12367", desig: "Senior Teacher - Class 8 Mathematics", qual: "M.Sc. (Math), B.Ed.", spec: "Algebra, Mensuration & Geometry", level: 4, title: "Middle Wing Faculty", section: "Class 8-A", role: null, classes: ["Class 8-A", "Class 8-B"], subs: ["Mathematics"] },
    { id: "t-10", name: "Umesh Prasad Mahto (उमेश प्रसाद महतो)", code: "GCS-FAC-010", email: "umesh.mahto@edunexus.edu", phone: "+91 98351 12366", desig: "Senior Teacher - Sanskrit 'अमृता'", qual: "M.A. (Sanskrit), B.Ed.", spec: "Dhatu Roop, Sandhi & Amrita", level: 4, title: "Middle Wing Faculty", section: "Class 8-B", role: null, classes: ["Class 8-B", "Class 8-C"], subs: ["Sanskrit"] },
    { id: "t-11", name: "Nutan Kumari (नूतन कुमारी)", code: "GCS-FAC-011", email: "nutan.kumari@edunexus.edu", phone: "+91 98351 12368", desig: "Senior Teacher - Class 8 Science", qual: "M.Sc. (Zoology), B.Ed.", spec: "Cell Biology & Crop Management", level: 4, title: "Middle Wing Faculty", section: "Class 8-C", role: null, classes: ["Class 8-C", "Class 7-A"], subs: ["Science"] },
    { id: "t-12", name: "Santosh Kumar Pandey (संतोष कुमार पाण्डेय)", code: "GCS-FAC-012", email: "santosh.pandey@edunexus.edu", phone: "+91 98351 12369", desig: "Senior Teacher - Class 7 Social Science", qual: "M.A. (History), B.Ed.", spec: "Medieval History & Civics", level: 4, title: "Middle Wing Faculty", section: "Class 7-A", role: null, classes: ["Class 7-A", "Class 7-B"], subs: ["Social Science"] },
    { id: "t-13", name: "Rekha Devi (रेखा देवी)", code: "GCS-FAC-013", email: "rekha.devi@edunexus.edu", phone: "+91 98351 12370", desig: "Senior Teacher - Class 7 Mathematics", qual: "B.Sc. (Math), B.Ed.", spec: "Fractions, Decimals & Geometry", level: 4, title: "Middle Wing Faculty", section: "Class 7-B", role: null, classes: ["Class 7-B", "Class 7-C"], subs: ["Mathematics"] },
    { id: "t-14", name: "Bipin Bihari Singh (बिपिन बिहारी सिंह)", code: "GCS-FAC-014", email: "bipin.singh@edunexus.edu", phone: "+91 98351 12371", desig: "Senior Teacher - Class 7 Science & EVS", qual: "B.Sc. (Physics), B.Ed.", spec: "Motion, Time & Heat", level: 4, title: "Middle Wing Faculty", section: "Class 7-C", role: null, classes: ["Class 7-C", "Class 6-A"], subs: ["Science"] },
    { id: "t-15", name: "Anand Prakash (आनंद प्रकाश)", code: "GCS-COORD-003", email: "anand.p@edunexus.edu", phone: "+91 98351 12344", desig: "Primary Wing Coordinator & Senior Headmaster", qual: "D.El.Ed., B.A. (Hons), State Awardee", spec: "FLN (Foundational Literacy) & Primary Pedagogy", level: 2, title: "Primary Coordinator", section: "Class 6-A", role: "primary_coordinator", classes: ["Class 6-A", "Class 5-A"], subs: ["Mathematics", "EVS"] },
    { id: "t-16", name: "Sangeeta Kumari (संगीता कुमारी)", code: "GCS-FAC-016", email: "sangeeta.k@edunexus.edu", phone: "+91 98351 12372", desig: "Class 6 Teacher - English & Hindi", qual: "M.A. (Hindi), B.Ed.", spec: "Vasant & Honeysuckle", level: 4, title: "Middle Wing Faculty", section: "Class 6-B", role: null, classes: ["Class 6-B", "Class 6-C"], subs: ["Hindi", "English"] },
    { id: "t-17", name: "Deepak Kumar Sinha (दीपक कुमार सिन्हा)", code: "GCS-FAC-017", email: "deepak.sinha@edunexus.edu", phone: "+91 98351 12373", desig: "Class 6 Teacher - Mathematics", qual: "B.Sc. (Math), B.Ed.", spec: "Integers, Basic Geometry", level: 4, title: "Middle Wing Faculty", section: "Class 6-C", role: null, classes: ["Class 6-C", "Class 5-A"], subs: ["Mathematics"] },
    { id: "t-18", name: "Priyanka Kumari (प्रियंका कुमारी)", code: "GCS-FAC-018", email: "priyanka.k@edunexus.edu", phone: "+91 98351 12374", desig: "Class 5 Senior Teacher - Mathematics", qual: "B.Sc., D.El.Ed.", spec: "Math-Magic Class 5 & FLN", level: 5, title: "Primary Faculty", section: "Class 5-A", role: null, classes: ["Class 5-A", "Class 5-B"], subs: ["Mathematics"] },
    { id: "t-19", name: "Shambhu Sharan Manjhi (शंभु शरण मांझी)", code: "GCS-FAC-019", email: "shambhu.manjhi@edunexus.edu", phone: "+91 98351 12375", desig: "Class 5 Teacher - EVS (पर्यावरण और हम)", qual: "B.A., D.El.Ed.", spec: "Bihar Geography & Rural Ecosystems", level: 5, title: "Primary Faculty", section: "Class 5-B", role: null, classes: ["Class 5-B", "Class 5-C"], subs: ["EVS"] },
    { id: "t-20", name: "Kavita Sinha (कविता सिन्हा)", code: "GCS-FAC-020", email: "kavita.sinha@edunexus.edu", phone: "+91 98351 12376", desig: "Class 5 Teacher - Hindi 'रिमझिम 5'", qual: "M.A. (Hindi), D.El.Ed.", spec: "Rimjhim Poetry & Story Reading", level: 5, title: "Primary Faculty", section: "Class 5-C", role: null, classes: ["Class 5-C", "Class 4-A"], subs: ["Hindi"] },
    { id: "t-21", name: "Rakesh Roshan (राकेश रोशन)", code: "GCS-FAC-021", email: "rakesh.roshan@edunexus.edu", phone: "+91 98351 12377", desig: "Class 4 Teacher - Mathematics", qual: "B.Sc., D.El.Ed.", spec: "Multiplication, Division, Time & Money", level: 5, title: "Primary Faculty", section: "Class 4-A", role: null, classes: ["Class 4-A", "Class 4-B"], subs: ["Mathematics"] },
    { id: "t-22", name: "Anita Sharma (अनीता शर्मा)", code: "GCS-FAC-022", email: "anita.sharma@edunexus.edu", phone: "+91 98351 12378", desig: "Class 4 Teacher - EVS 'आस-पास'", qual: "B.A., D.El.Ed.", spec: "Plants, Animals & Local Craft", level: 5, title: "Primary Faculty", section: "Class 4-B", role: null, classes: ["Class 4-B", "Class 4-C"], subs: ["EVS"] },
    { id: "t-23", name: "Sudhir Kumar (सुधीर कुमार)", code: "GCS-FAC-023", email: "sudhir.kumar@edunexus.edu", phone: "+91 98351 12379", desig: "Class 4 Teacher - English Marigold", qual: "B.A. (English), D.El.Ed.", spec: "Phonics, Vocabulary & Rhymes", level: 5, title: "Primary Faculty", section: "Class 4-C", role: null, classes: ["Class 4-C", "Class 3-A"], subs: ["English"] },
    { id: "t-24", name: "Minakshi Kumari (मीनाक्षी कुमारी)", code: "GCS-FAC-024", email: "minakshi.k@edunexus.edu", phone: "+91 98351 12380", desig: "Class 3 Teacher - Mathematics", qual: "B.Sc., D.El.Ed.", spec: "Shapes, Addition & Subtraction", level: 5, title: "Primary Faculty", section: "Class 3-A", role: null, classes: ["Class 3-A", "Class 3-B"], subs: ["Mathematics"] },
    { id: "t-25", name: "Alok Kumar Jha (आलोक कुमार झा)", code: "GCS-FAC-025", email: "alok.jha@edunexus.edu", phone: "+91 98351 12381", desig: "Class 3 Teacher - EVS & Hindi", qual: "B.A., D.El.Ed.", spec: "Community Helpers & Water", level: 5, title: "Primary Faculty", section: "Class 3-B", role: null, classes: ["Class 3-B", "Class 3-C"], subs: ["EVS", "Hindi"] },
    { id: "t-26", name: "Baby Kumari (बेबी कुमारी)", code: "GCS-FAC-026", email: "baby.kumari@edunexus.edu", phone: "+91 98351 12382", desig: "Class 3 Teacher - English & Art", qual: "B.A., D.El.Ed.", spec: "Alphabet & Action Songs", level: 5, title: "Primary Faculty", section: "Class 3-C", role: null, classes: ["Class 3-C", "Class 2-A"], subs: ["English", "Art"] },
    { id: "t-27", name: "Vandana Kumari (वंदना कुमारी)", code: "GCS-FAC-027", email: "vandana.k@edunexus.edu", phone: "+91 98351 12383", desig: "Class 2 Teacher - Mathematics (आनंदमय गणित 2)", qual: "B.Sc., D.El.Ed.", spec: "Numbers 1-100 & Mental Math", level: 5, title: "Primary Faculty", section: "Class 2-A", role: null, classes: ["Class 2-A", "Class 2-B"], subs: ["Mathematics"] },
    { id: "t-28", name: "Nand Kishore Ray (नंद किशोर राय)", code: "GCS-FAC-028", email: "nand.ray@edunexus.edu", phone: "+91 98351 12384", desig: "Class 2 Teacher - Hindi 'सारंगी 2'", qual: "B.A., D.El.Ed.", spec: "Matra Practice & Bal Geet", level: 5, title: "Primary Faculty", section: "Class 2-B", role: null, classes: ["Class 2-B", "Class 2-C"], subs: ["Hindi"] },
    { id: "t-29", name: "Gita Rani (गीता रानी)", code: "GCS-FAC-029", email: "gita.rani@edunexus.edu", phone: "+91 98351 12385", desig: "Class 2 Teacher - English Joyful", qual: "B.A., D.El.Ed.", spec: "Phonics & Storytelling", level: 5, title: "Primary Faculty", section: "Class 2-C", role: null, classes: ["Class 2-C", "Class 1-A"], subs: ["English"] },
    { id: "t-30", name: "Sarita Kumari (सरिता कुमारी)", code: "GCS-FAC-030", email: "sarita.k@edunexus.edu", phone: "+91 98351 12386", desig: "Class 1 Teacher - Mathematics 'आनंदमय गणित'", qual: "B.A., D.El.Ed.", spec: "FLN Numbers 1-20 & Concrete Counting", level: 5, title: "Primary Faculty", section: "Class 1-A", role: null, classes: ["Class 1-A", "Class 1-B"], subs: ["Mathematics"] },
    { id: "t-31", name: "Binay Kumar Paswan (बिनय कुमार पासवान)", code: "GCS-FAC-031", email: "binay.paswan@edunexus.edu", phone: "+91 98351 12387", desig: "Class 1 Teacher - Hindi 'सारंगी 1' व अंकुर", qual: "B.A., D.El.Ed.", spec: "Varnamala & Rhymes", level: 5, title: "Primary Faculty", section: "Class 1-B", role: null, classes: ["Class 1-B", "Class 1-C"], subs: ["Hindi"] },
    { id: "t-32", name: "Punam Devi (पूनम देवी)", code: "GCS-FAC-032", email: "punam.devi@edunexus.edu", phone: "+91 98351 12388", desig: "Class 1 Teacher - English & Balvatika", qual: "B.A., D.El.Ed.", spec: "Foundational Literacy & Games", level: 5, title: "Primary Faculty", section: "Class 1-C", role: null, classes: ["Class 1-C", "Class 1-A"], subs: ["English", "Balvatika"] }
  ];

  // Fill remaining teachers up to 50
  for (let i = 33; i <= 50; i++) {
    const isSpecialist = i % 3 === 0 ? "Physical Education & Yoga" : i % 3 === 1 ? "Computer Lab & ICT Mentor" : "Art, Music & Bihar Cultural Heritage";
    const sub = i % 3 === 0 ? ["Physical Education"] : i % 3 === 1 ? ["Computer Science"] : ["Art & Culture"];
    teacherDefs.push({
      id: `t-${String(i).padStart(2, "0")}`,
      name: `Faculty Member ${i} (संकाय सदस्य ${i})`,
      code: `GCS-FAC-0${i}`,
      email: `faculty${i}@edunexus.edu`,
      phone: `+91 98351 123${String(i).padStart(2, "0")}`,
      desig: `${isSpecialist} Mentor`,
      qual: "B.P.Ed. / MCA / B.F.A., B.Ed.",
      spec: `${isSpecialist} for All Classes`,
      level: 4,
      title: "Specialist Faculty",
      section: "All Sections Specialist",
      role: null,
      classes: ["Class 10", "Class 9", "Class 8", "Class 7", "Class 6"],
      subs: sub
    });
  }

  const teachers = teacherDefs.map(t => ({
    id: t.id,
    profile_id: `p-${t.id}`,
    full_name: t.name,
    employee_code: t.code,
    email: t.email,
    phone: t.phone,
    designation: t.desig,
    qualification: t.qual,
    specialization: t.spec,
    hierarchy_level: t.level,
    hierarchy_title: t.title,
    coordinator_role: t.role,
    control_level: t.level === 1 ? "Super Institutional Control" : t.level === 2 ? "High Administrative & Moderation Control" : "Classroom & Grading Control",
    control_badge: t.level === 1 ? "Executive Leadership" : t.level === 2 ? "Chief Class Coordinator" : "Faculty",
    classes_assigned: t.classes,
    subjects: t.subs,
    section_in_charge: t.section,
    assigned_section: t.section,
    primary_class: t.classes[0] || "Class 10",
    is_active: true,
    password: "Teacher@123"
  }));

  // 5. TEACHER ATTENDANCE (Today's session)
  const todayStr = new Date().toISOString().slice(0, 10);
  const teacherAttendance = teachers.map((t, idx) => {
    let status = "present";
    let checkIn = "08:15 AM";
    let remarks = "On duty";
    if (idx === 3) {
      status = "late";
      checkIn = "08:45 AM";
      remarks = "Delayed due to train schedule";
    } else if (idx === 7) {
      status = "leave";
      checkIn = "—";
      remarks = "Approved medical leave";
    } else if (idx === 14) {
      status = "present";
      checkIn = "08:10 AM";
      remarks = "Primary wing morning assembly supervision";
    }
    return {
      id: `t-att-${todayStr}-${t.id}`,
      teacher_id: t.id,
      teacher_name: t.full_name,
      employee_code: t.employee_code,
      section_in_charge: t.section_in_charge,
      date: todayStr,
      status: status,
      check_in_time: checkIn,
      remarks: remarks
    };
  });

  // 6. GENERATE 600 STUDENTS (60 PER CLASS, 20 PER SECTION A, B, C)
  const students = [];
  const studentProfiles = [];
  const parentStudents = [];
  const parents = [];
  const bloodGroups = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-"];

  for (let grade = 1; grade <= 10; grade++) {
    const classId = `c-${String(grade).padStart(2, "0")}`;
    const baseBirthYear = 2026 - (grade + 5);

    for (let index = 1; index <= 60; index++) {
      let secName = "Section A";
      let secSuffix = "A";
      if (index > 40) {
        secName = "Section C";
        secSuffix = "C";
      } else if (index > 20) {
        secName = "Section B";
        secSuffix = "B";
      }

      const className = `Class ${grade}-${secSuffix}`;
      const rollNumber = `${String(grade).padStart(2, "0")}${String(index).padStart(2, "0")}`;
      const studentId = `st-${rollNumber}`;
      const profileId = `p-${studentId}`;

      const isBoy = (grade * 60 + index) % 2 === 0;
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

      // Specific known logins
      let actualFullName = fullName;
      let actualDob = dob;
      let actualParent = parentName;
      let actualVillage = village;

      if (rollNumber === "1001") {
        actualFullName = "Aarav Kumar (आरव कुमार)";
        actualDob = "2010-04-15";
        actualParent = "Sunil Kumar (सुनील कुमार)";
        actualVillage = "Village Gangra, Gidhaur";
      } else if (rollNumber === "1002") {
        actualFullName = "Priya Kumari (प्रिया कुमारी)";
        actualDob = "2010-08-22";
        actualParent = "Rameshwar Singh (रामेश्वर सिंह)";
        actualVillage = "Village Seva, Jamui";
      } else if (rollNumber === "1003") {
        actualFullName = "Rohan Yadav (रोहन यादव)";
        actualDob = "2010-01-19";
        actualParent = "Vikram Yadav (विक्रम यादव)";
        actualVillage = "Mallehpur, Near Rly Stn, Jamui";
      } else if (rollNumber === "0901") {
        actualFullName = "Md. Tariq Anwar (मो. तारिक अनवर)";
        actualDob = "2011-05-14";
        actualParent = "Anwar Ali (अनवर अली)";
        actualVillage = "Maharajganj, Jamui Town";
      } else if (rollNumber === "0801") {
        actualFullName = "Aditya Prakash (आदित्य प्रकाश)";
        actualDob = "2012-03-11";
        actualParent = "Prakash Narayan (प्रकाश नारायण)";
        actualVillage = "Village Sono, Jamui";
      } else if (rollNumber === "0501") {
        actualFullName = "Suman Kumari (सुमन कुमारी)";
        actualDob = "2015-09-14";
        actualParent = "Shambhu Sharan Singh";
        actualVillage = "Village Ratanpur, Gidhaur";
      } else if (rollNumber === "0101") {
        actualFullName = "Deepali Kumari (दीपाली कुमारी)";
        actualDob = "2019-04-05";
        actualParent = "Rajesh Kumar Mandal";
        actualVillage = "Kalyanpur, Gidhaur";
      }

      const student = {
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
        email: email,
        is_active: true,
        class_id: classId,
        class_name: className,
        section_name: secName,
        blood_group: bloodGroups[(grade + index) % bloodGroups.length]
      };

      students.push(student);

      studentProfiles.push({
        id: profileId,
        email: email,
        role: "student",
        full_name: actualFullName,
        is_active: true,
        phone: parentPhone,
        password: "Student@123",
        class_name: className
      });

      if (index === 1 || index === 2) {
        const parId = `par-${rollNumber}`;
        parents.push({
          id: parId,
          profile_id: `p-${parId}`,
          full_name: actualParent,
          phone: parentPhone,
          email: `parent.${rollNumber}@edunexus.edu`,
          village: actualVillage,
          occupation: index === 1 ? "Agriculture & Business" : "Government Service"
        });
        parentStudents.push({
          parent_id: parId,
          student_id: studentId,
          relationship: "Father",
          students: { id: studentId, full_name: actualFullName, roll_number: rollNumber }
        });
      }
    }
  }

  // 7. EXAMS, EXAM SUBJECTS, MARKS, AND PRE-COMPUTED REPORT CARDS FOR ALL 600 STUDENTS
  const exams = [
    {
      id: "ex-mid-term-2026",
      name: "Mid-Term Examination 2026 (अर्द्धवार्षिक मूल्यांकन)",
      exam_type: "Mid-Term Assessment",
      academic_year: "2026-27",
      start_date: "2026-09-15",
      end_date: "2026-09-24",
      status: "published"
    },
    {
      id: "ex-sentup-2026",
      name: "BSEB Matric Sent-Up Board Examination 2026 (मैट्रिक सेंट-अप परीक्षा)",
      exam_type: "Pre-Board Sent-Up",
      academic_year: "2026-27",
      start_date: "2026-11-15",
      end_date: "2026-11-25",
      status: "upcoming"
    }
  ];

  // Subject templates per wing
  const subjectsWingMatric = [
    { code: "MATH", name: "Mathematics (गणित)", id: "sub-mat" },
    { code: "SCI", name: "Science (विज्ञान)", id: "sub-sci" },
    { code: "SST", name: "Social Science (सामाजिक विज्ञान)", id: "sub-sst" },
    { code: "HIN", name: "Hindi (हिंदी - गोधूलि)", id: "sub-hin" },
    { code: "ENG", name: "English (अंग्रेजी - Panorama)", id: "sub-eng" },
    { code: "SAN", name: "Sanskrit (संस्कृत - पीयूषम्)", id: "sub-san" }
  ];

  const subjectsWingMiddle = [
    { code: "MATH", name: "Mathematics (गणित)", id: "sub-mat" },
    { code: "SCI", name: "Science (विज्ञान)", id: "sub-sci" },
    { code: "SST", name: "Social Science (सामाजिक विज्ञान)", id: "sub-sst" },
    { code: "HIN", name: "Hindi (हिंदी - वसंत)", id: "sub-hin" },
    { code: "ENG", name: "English (अंग्रेजी - Honeydew)", id: "sub-eng" },
    { code: "SAN", name: "Sanskrit (संस्कृत - अमृता)", id: "sub-san" },
    { code: "CS", name: "Computer Science (कम्प्यूटर)", id: "sub-cs" }
  ];

  const subjectsWingPrimary = [
    { code: "MATH", name: "Mathematics (आनंदमय गणित)", id: "sub-mat" },
    { code: "EVS", name: "Environmental Studies (पर्यावरण और हम)", id: "sub-evs" },
    { code: "HIN", name: "Hindi (सारंगी व रिमझिम)", id: "sub-hin" },
    { code: "ENG", name: "English (Marigold / Joyful)", id: "sub-eng" },
    { code: "ART", name: "Art & Craft (कला एवं सृजनशीलता)", id: "sub-cs" }
  ];

  const examSubjects = [];
  const marks = [];
  const reportCards = {};

  // Build exam subjects
  for (const s of [...subjectsWingMatric, ...subjectsWingMiddle, ...subjectsWingPrimary]) {
    if (!examSubjects.some(es => es.subject_id === s.id)) {
      examSubjects.push({
        id: `es-${s.code.toLowerCase()}`,
        exam_id: "ex-mid-term-2026",
        subject_id: s.id,
        maximum_marks: 100,
        passing_marks: 33,
        weightage: 1,
        subjects: { id: s.id, name: s.name, code: s.code }
      });
    }
  }

  // Pre-generate marks & complete report cards for each of the 600 students
  students.forEach((st) => {
    const rollNum = parseInt(st.roll_number, 10);
    const grade = Math.floor(rollNum / 100);
    const rankIndex = rollNum % 100; // 1 to 60

    // Choose subject curriculum
    const curSubjects = grade >= 9 ? subjectsWingMatric : grade >= 6 ? subjectsWingMiddle : subjectsWingPrimary;

    // Academic performance baseline
    // 1-5: High toppers (90-98%)
    // 6-20: First division (75-89%)
    // 21-45: Solid second division (60-74%)
    // 46-60: Passing (50-59%)
    let baseScore = 75;
    if (rankIndex <= 5) baseScore = 93 - rankIndex;
    else if (rankIndex <= 20) baseScore = 85 - Math.floor((rankIndex - 5) * 0.7);
    else if (rankIndex <= 45) baseScore = 72 - Math.floor((rankIndex - 20) * 0.5);
    else baseScore = 58 - Math.floor((rankIndex - 45) * 0.4);

    const studentSubjectResults = [];
    let totalObtained = 0;
    let totalMax = curSubjects.length * 100;

    curSubjects.forEach((sub, sIdx) => {
      // Deterministic variation per subject
      const variation = ((rankIndex * 7 + sIdx * 11) % 9) - 4;
      let score = Math.min(99, Math.max(45, baseScore + variation));

      // Key topper overrides
      if (st.roll_number === "1001") {
        const scores1001 = [94, 91, 88, 93, 96, 89];
        score = scores1001[sIdx] || 92;
      } else if (st.roll_number === "1002") {
        const scores1002 = [96, 95, 92, 95, 98, 91];
        score = scores1002[sIdx] || 94;
      }

      const theoryMax = 80;
      const practicalMax = 20;
      const theoryObt = Math.round(score * 0.8);
      const practicalObt = score - theoryObt;

      totalObtained += score;

      let gradeLetter = "A";
      let statusStr = "Pass";
      if (score >= 90) { gradeLetter = "A+"; statusStr = "Distinction"; }
      else if (score >= 80) { gradeLetter = "A"; statusStr = "Distinction"; }
      else if (score >= 70) { gradeLetter = "B+"; statusStr = "Pass"; }
      else if (score >= 60) { gradeLetter = "B"; statusStr = "Pass"; }
      else if (score >= 50) { gradeLetter = "C+"; statusStr = "Pass"; }
      else { gradeLetter = "C"; statusStr = "Pass"; }

      studentSubjectResults.push({
        subject_code: sub.code,
        subject_name: sub.name,
        theory_max: theoryMax,
        theory_obtained: theoryObt,
        practical_max: practicalMax,
        practical_obtained: practicalObt,
        total_max: 100,
        total_obtained: score,
        percentage: score,
        grade: gradeLetter,
        status: statusStr
      });

      marks.push({
        id: `mk-${st.id}-${sub.code.toLowerCase()}`,
        exam_subject_id: `es-${sub.code.toLowerCase()}`,
        student_id: st.id,
        marks_obtained: score,
        students: { id: st.id, full_name: st.full_name, roll_number: st.roll_number }
      });
    });

    const overallPct = parseFloat((totalObtained / totalMax * 100).toFixed(1));
    let division = "First Division with Distinction";
    let overallGrade = "A+";
    if (overallPct >= 85) { division = "First Division with Distinction"; overallGrade = "A+"; }
    else if (overallPct >= 75) { division = "First Division (Honours)"; overallGrade = "A"; }
    else if (overallPct >= 60) { division = "First Division"; overallGrade = "B+"; }
    else if (overallPct >= 50) { division = "Second Division"; overallGrade = "B"; }
    else { division = "Third Division"; overallGrade = "C"; }

    // Section Rank (out of 20)
    const secRank = ((rankIndex - 1) % 20) + 1;
    const attPct = Math.min(99, Math.max(78, 97 - ((rankIndex * 3) % 15)));

    reportCards[st.roll_number] = {
      student_id: st.id,
      roll_number: st.roll_number,
      full_name: st.full_name,
      date_of_birth: st.date_of_birth,
      admission_number: st.admission_number,
      class_name: st.class_name,
      section_name: st.section_name,
      parent_name: st.parent_name,
      mother_name: st.mother_name,
      village_or_town: st.village_or_town,
      attendance_percentage: attPct,
      total_working_days: 120,
      days_present: Math.round(120 * (attPct / 100)),
      exam_name: "Mid-Term Examination 2026 (अर्द्धवार्षिक मूल्यांकन)",
      academic_year: "2026-27",
      board: "Bihar School Examination Board (BSEB) & NCERT",
      subjects: studentSubjectResults,
      total_max_marks: totalMax,
      total_marks_obtained: totalObtained,
      overall_percentage: overallPct,
      overall_grade: overallGrade,
      overall_division: division,
      class_rank: secRank,
      total_students_in_section: 20,
      teacher_remarks: overallPct >= 85
        ? "Exemplary performance! Displays strong analytical grasp and consistent classroom dedication."
        : overallPct >= 70
        ? "Very good progress. Keep revising problem-solving steps and grammar exercises."
        : "Satisfactory work. Regular practice in mathematics formulas and science diagrams recommended.",
      principal_remarks: "Promoted with distinction. Certified genuine institutional academic achievement.",
      issue_date: "2026-09-28",
      verification_code: `GCS-VER-${st.roll_number}-${st.date_of_birth.replace(/-/g, "")}`
    };
  });

  // 8. SCHOOL ANNOUNCEMENTS (PUBLIC NOTICE BOARD)
  const announcements = [
    {
      id: "ann-01",
      title: "BSEB 10th Matriculation Board Examination 2026 Schedule & Form Fill-up",
      title_hindi: "बिहार बोर्ड (BSEB) 10वीं मैट्रिक परीक्षा 2026 फॉर्म भरने व सेंट-अप परीक्षा संबंधी आवश्यक सूचना",
      category: "Exams",
      priority: "urgent",
      target_audience: "Classes 9th & 10th, Parents",
      date: "2026-09-28",
      circular_number: "GCS/ACAD/2026/089",
      is_pinned: true,
      author: "Office of the Examination Controller",
      content: "All matriculation students (Class 10) are hereby informed that the BSEB 2026 Sent-Up Examination form submission window opens from October 5th. Ensure your Aadhar card, previous marksheet, and school registration slips are verified with your Class Teacher.",
      content_hindi: "सभी दशम वर्ग (कक्षा 10वीं) के विद्यार्थियों को सूचित किया जाता है कि बिहार विद्यालय परीक्षा समिति (BSEB) मैट्रिक सेंट-अप परीक्षा 2026 के लिए परीक्षा प्रपत्र 5 अक्टूबर से भरे जाएँगे। सभी छात्र अपने आधार कार्ड, पंजीयन रसीद एवं पूर्व अंकतालिका की जांच अपने कक्षा अध्यापक से करा लें।"
    },
    {
      id: "ann-02",
      title: "Distribution of Free SCERT Bihar & NCERT Textbooks for Classes 1 to 8",
      title_hindi: "कक्षा 1 से 8वीं तक के सभी छात्र-छात्राओं को निःशुल्क पाठ्यपुस्तक वितरण",
      category: "Academic",
      priority: "important",
      target_audience: "Classes 1st to 8th, All Parents",
      date: "2026-09-25",
      circular_number: "GCS/SCH/2026/088",
      is_pinned: true,
      author: "Primary & Middle Wing Administration",
      content: "Fresh textbook sets of SCERT Bihar (अंकुर, किसलय, पर्यावरण और हम, भाषा भारती) and NCERT have arrived from the District Education Office Jamui. Parents are requested to collect books from the Main Academic Hall.",
      content_hindi: "जिला शिक्षा पदाधिकारी जमुई द्वारा कक्षा 1 से 8वीं तक की नवीन पाठ्यपुस्तकें (SCERT बिहार एवं NCERT) विद्यालय पहुंच चुकी हैं। अभिभावक विद्यालय के मुख्य सभागार से अपनी कक्षा के अनुसार पुस्तकें प्राप्त करें।"
    },
    {
      id: "ann-03",
      title: "Parent-Teacher Meeting (PTM) & Mid-Term Report Card Release",
      title_hindi: "अभिभावक-शिक्षक संगोष्ठी (PTM) एवं अर्द्धवार्षिक प्रगति पत्रक समीक्षा",
      category: "Events",
      priority: "urgent",
      target_audience: "All Parents & Guardians",
      date: "2026-09-22",
      circular_number: "GCS/PTM/2026/087",
      is_pinned: false,
      author: "Principal Dr. Arvind Pathak",
      content: "The Quarterly Parent-Teacher Meeting will be held on Saturday, October 10th from 9:00 AM to 1:30 PM. Parents can directly review student attendance rates, periodic marks, and interact with Class Coordinators.",
      content_hindi: "शनिवार, 10 अक्टूबर को प्रातः 9:00 बजे से दोपहर 1:30 बजे तक त्रैमासिक अभिभावक-शिक्षक संगोष्ठी आयोजित होगी। अभिभावक अपने पाल्य के अर्द्धवार्षिक परीक्षा परिणाम एवं उपस्थिति की समीक्षा समन्वयकों से कर सकते हैं।"
    },
    {
      id: "ann-04",
      title: "Special Remedial Doubt Classes for Class 10th Science & Mathematics",
      title_hindi: "कक्षा 10वीं के लिए गणित एवं विज्ञान की विशेष उपचारात्मक (Remedial) कक्षाएँ",
      category: "Academic",
      priority: "important",
      target_audience: "Class 10 Matric Aspirants",
      date: "2026-09-18",
      circular_number: "GCS/ACAD/2026/086",
      is_pinned: false,
      author: "Dr. Rameshwar Prasad Singh (1st Coordinator)",
      content: "Starting next Monday, daily 1-hour special doubt-clearing sessions in Mathematics (Trigonometry & Quadratic Equations) and Physics (Light reflection/refraction) will take place from 3:30 PM to 4:30 PM under expert faculty guidance.",
      content_hindi: "सोमवार से कक्षा 10 के छात्रों हेतु प्रतिदिन दोपहर 3:30 से 4:30 तक गणित (त्रिकोणमिति एवं द्विघात समीकरण) व विज्ञान की विशेष कक्षाएं आयोजित होंगी।"
    },
    {
      id: "ann-05",
      title: "Annual Sports Meet & Inter-House Kho-Kho / Cricket Tournament",
      title_hindi: "वार्षिक खेलकूद प्रतियोगिता एवं अंतर-सदन खो-खो व क्रिकेट टूर्नामेंट",
      category: "Events",
      priority: "normal",
      target_audience: "Classes 5th to 10th",
      date: "2026-09-15",
      circular_number: "GCS/SPO/2026/085",
      is_pinned: false,
      author: "Sports Department",
      content: "The Annual Inter-House Sports Championship selections will begin next Wednesday on the School Main Ground. Events include 100m, 200m, 400m race, Kabaddi, Kho-Kho, and Long Jump.",
      content_hindi: "विद्यालय के मुख्य खेल मैदान पर वार्षिक खेलकूद चयन स्पर्धा अगले बुधवार से प्रारंभ होगी। इच्छुक छात्र खेल शिक्षक से संपर्क करें।"
    },
    {
      id: "ann-06",
      title: "Mandatory 75% Attendance Requirement for Board Examination Eligibility",
      title_hindi: "बोर्ड परीक्षा में सम्मिलित होने हेतु न्यूनतम 75% उपस्थिति की अनिवार्यता",
      category: "General",
      priority: "urgent",
      target_audience: "All Students & Guardians",
      date: "2026-09-10",
      circular_number: "GCS/NOT/2026/084",
      is_pinned: false,
      author: "Attendance Oversight Committee",
      content: "As per Bihar School Examination Board and education department directives, any student having less than 75% aggregate attendance without verified medical grounds will not be permitted to sit for Sent-up and Annual examinations.",
      content_hindi: "बिहार बोर्ड के निर्देशानुसार न्यूनतम 75% उपस्थिति अनिवार्य है। 75% से कम उपस्थिति वाले छात्रों को सेंट-अप परीक्षा में बैठने की अनुमति नहीं दी जाएगी।"
    },
    {
      id: "ann-07",
      title: "Gandhi Jayanti & Swachhata Abhiyan Cleanliness Drive Notice",
      title_hindi: "गांधी जयंती एवं विशेष स्वच्छता अभियान पखवाड़ा सूचना",
      category: "Holidays",
      priority: "normal",
      target_audience: "All Staff & Students",
      date: "2026-09-08",
      circular_number: "GCS/CIR/2026/083",
      is_pinned: false,
      author: "Cultural Committee",
      content: "School will observe Gandhi Jayanti on October 2nd. A special cleanliness drive 'Swachh Gidhaur, Swachh Bharat' will be organized in the campus and Minto Tower area.",
      content_hindi: "2 अक्टूबर गांधी जयंती पर विशेष स्वच्छता अभियान 'स्वच्छ गिद्धौर, स्वच्छ भारत' आयोजित किया जाएगा।"
    }
  ];

  // 9. ASSIGNMENTS WITH DUE ALERTS (OVERDUE, DUE WITHIN 48 HOURS, ACTIVE)
  const now = new Date();
  const assignments = [
    // Overdue Alert (Deadline passed)
    {
      id: "asg-01",
      title: "Class 10 Trigonometric Identities Proofs (त्रिकोणमितीय सर्वसमिकाएं अभ्यास)",
      description: "Solve NCERT Exercise 8.4 questions 1 to 5 with complete trigonometric proofs. Draw step-by-step angle diagrams for acute triangles.",
      class_id: "c-10",
      class_name: "Class 10-A",
      subject_id: "sub-mat",
      subject_name: "Mathematics",
      teacher_id: "t-05",
      teacher_name: "Rajesh Sharma",
      assigned_date: "2026-09-20",
      deadline: "2026-09-27T17:00:00", // Passed - Overdue!
      total_marks: 25,
      submission_count: 14,
      total_students: 20,
      priority: "urgent"
    },
    {
      id: "asg-02",
      title: "Class 10 Chemical Reactions & Balancing Equations",
      description: "Balance 20 chemical equations involving oxidation-reduction, displacement and precipitation reactions with states (s, l, g, aq).",
      class_id: "c-10",
      class_name: "Class 10-B",
      subject_id: "sub-sci",
      subject_name: "Science",
      teacher_id: "t-03",
      teacher_name: "Dr. Rameshwar Prasad Singh",
      assigned_date: "2026-09-22",
      deadline: "2026-09-28T16:00:00", // Passed - Overdue!
      total_marks: 20,
      submission_count: 12,
      total_students: 20,
      priority: "urgent"
    },
    // Due Today / In next 24-48 Hours (High Alert)
    {
      id: "asg-03",
      title: "Class 9 Newton's Laws of Motion & Momentum Problems",
      description: "Solve 10 numerical problems calculating acceleration, force F=ma and conservation of momentum during collisions.",
      class_id: "c-09",
      class_name: "Class 9-A",
      subject_id: "sub-sci",
      subject_name: "Science",
      teacher_id: "t-08",
      teacher_name: "Pooja Banerjee",
      assigned_date: "2026-09-27",
      deadline: "2026-10-01T17:00:00", // Tomorrow!
      total_marks: 20,
      submission_count: 9,
      total_students: 20,
      priority: "urgent"
    },
    {
      id: "asg-04",
      title: "Class 10 Hindi 'श्रम विभाजन और जाति प्रथा' प्रश्नोत्तर",
      description: "बाबा साहेब आंबेडकर के भाषण के आधार पर जाति प्रथा के आर्थिक एवं सामाजिक दुष्प्रभावों का 200 शब्दों में विश्लेषण।",
      class_id: "c-10",
      class_name: "Class 10-A",
      subject_id: "sub-hin",
      subject_name: "Hindi",
      teacher_id: "t-06",
      teacher_name: "Manoj Kumar Mishra",
      assigned_date: "2026-09-28",
      deadline: "2026-10-02T18:00:00", // In 48 hours!
      total_marks: 25,
      submission_count: 5,
      total_students: 20,
      priority: "urgent"
    },
    {
      id: "asg-05",
      title: "Class 8 Rational Numbers on Number Line & Distributive Property",
      description: "Represent rational numbers 7/4 and -5/6 on number line; verify distributive property of multiplication over addition.",
      class_id: "c-08",
      class_name: "Class 8-A",
      subject_id: "sub-mat",
      subject_name: "Mathematics",
      teacher_id: "t-09",
      teacher_name: "Prabhat Kumar Verma",
      assigned_date: "2026-09-26",
      deadline: "2026-10-02T15:00:00",
      total_marks: 20,
      submission_count: 11,
      total_students: 20,
      priority: "normal"
    },
    {
      id: "asg-06",
      title: "Class 7 Science Heat, Temperature & Thermometer Reading",
      description: "Draw clinical vs laboratory thermometer diagrams and explain why mercury is preferred in thermometric bulbs.",
      class_id: "c-07",
      class_name: "Class 7-A",
      subject_id: "sub-sci",
      subject_name: "Science",
      teacher_id: "t-14",
      teacher_name: "Bipin Bihari Singh",
      assigned_date: "2026-09-29",
      deadline: "2026-10-05T16:00:00",
      total_marks: 15,
      submission_count: 4,
      total_students: 20,
      priority: "normal"
    },
    {
      id: "asg-07",
      title: "Class 5 Math-Magic Geometry & Finding Angles in Everyday Objects",
      description: "Find 5 right angles, 5 acute angles, and 5 obtuse angles in your house or classroom and write down their names.",
      class_id: "c-05",
      class_name: "Class 5-A",
      subject_id: "sub-mat",
      subject_name: "Mathematics",
      teacher_id: "t-18",
      teacher_name: "Priyanka Kumari",
      assigned_date: "2026-09-29",
      deadline: "2026-10-06T15:00:00",
      total_marks: 15,
      submission_count: 2,
      total_students: 20,
      priority: "normal"
    }
  ];

  // 10. ALL USER PROFILES
  const adminProfile = {
    id: "p-admin-01",
    email: "admin@edunexus.edu",
    role: "admin",
    full_name: "Dr. Arvind Pathak (Principal & Administrator)",
    password: "Admin@123",
    phone: "+91 94312 34567",
    is_active: true
  };

  const teacherProfiles = teachers.map(t => ({
    id: t.profile_id,
    email: t.email,
    role: "teacher",
    full_name: t.full_name,
    password: "Teacher@123",
    phone: t.phone,
    is_active: true
  }));

  const allProfiles = [
    adminProfile,
    ...teacherProfiles,
    ...studentProfiles,
    ...parents.map(p => ({
      id: p.profile_id,
      email: p.email,
      role: "parent",
      full_name: p.full_name,
      password: "Parent@123",
      phone: p.phone,
      is_active: true
    }))
  ];

  // Comprehensive curriculum resources for Classes 1 to 10 across all subjects
  const allResources = getAllCurriculumResources();

  // 11. ASSEMBLE FULL DATABASE
  const fullDb = {
    school_settings: schoolSettings,
    classes: classes,
    subjects: subjects,
    teachers: teachers,
    teacher_attendance: teacherAttendance,
    students: students,
    profiles: allProfiles,
    parents: parents,
    parent_students: parentStudents,
    exams: exams,
    exam_subjects: examSubjects,
    marks: marks,
    report_cards: reportCards,
    announcements: announcements,
    assignments: assignments,
    resources: allResources,
    attendance_sessions: [
      {
        id: `att-sess-${todayStr}`,
        class_id: "c-10",
        section_id: null,
        subject_id: "sub-mat",
        teacher_id: "t-05",
        attendance_date: todayStr
      }
    ],
    attendance: students.slice(0, 60).map(s => ({
      id: `at-rec-${s.id}`,
      session_id: `att-sess-${todayStr}`,
      student_id: s.id,
      status: parseInt(s.roll_number, 10) % 15 === 0 ? "absent" : "present"
    })),
    grade_scales: [
      { id: "gs-01", name: "Bihar Board Matric Grade Scale", is_default: true }
    ],
    grade_scale_ranges: [
      { grade: "A+", min_percentage: 90, max_percentage: 100 },
      { grade: "A", min_percentage: 80, max_percentage: 89.99 },
      { grade: "B+", min_percentage: 70, max_percentage: 79.99 },
      { grade: "B", min_percentage: 60, max_percentage: 69.99 },
      { grade: "C+", min_percentage: 50, max_percentage: 59.99 },
      { grade: "C", min_percentage: 33, max_percentage: 49.99 },
      { grade: "F", min_percentage: 0, max_percentage: 32.99 }
    ]
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(fullDb, null, 2), "utf-8");
  console.log(`Successfully generated and saved local database to ${DB_PATH}!`);
  console.log(`- Students: ${fullDb.students.length}`);
  console.log(`- Teachers: ${fullDb.teachers.length}`);
  console.log(`- Report Cards Pre-computed: ${Object.keys(fullDb.report_cards).length}`);
  console.log(`- Marks: ${fullDb.marks.length}`);
  console.log(`- Announcements: ${fullDb.announcements.length}`);
  console.log(`- Assignments: ${fullDb.assignments.length}`);
  console.log(`- Resources: ${fullDb.resources.length}`);

  return fullDb;
}

buildDatabase();
