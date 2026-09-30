import fs from "fs";
import path from "path";
import { getInitialLocalDatabaseState } from "./initial-data";

const DB_PATH = path.join(process.cwd(), "data", "local_db.json");

let memoryCache: any = null;

function ensureDbFile(): any {
  if (memoryCache) return memoryCache;

  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      memoryCache = JSON.parse(raw);
      return memoryCache;
    } catch {
      // If corrupted or empty, re-seed
    }
  }

  const initial = getInitialLocalDatabaseState();
  fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
  memoryCache = initial;
  return memoryCache;
}

export function saveDb(data: any) {
  memoryCache = data;
  try {
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local database file:", err);
  }
}

export function getLocalDb(): any {
  return ensureDbFile();
}

export class LocalDbQueryBuilder {
  private tableName: string;
  private db: any;
  private filters: Array<(item: any) => boolean> = [];
  private orderFn?: (a: any, b: any) => number;
  private limitCount?: number;
  private isSingle = false;
  private isCountHead = false;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = ensureDbFile();
  }

  select(_columns = "*", options?: { count?: "exact"; head?: boolean }) {
    if (options?.head && options?.count) {
      this.isCountHead = true;
    }
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push((item) => {
      const itemVal = item[field];
      return String(itemVal) === String(value);
    });
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    const asc = options?.ascending ?? true;
    this.orderFn = (a, b) => {
      const valA = a[field] ?? "";
      const valB = b[field] ?? "";
      if (valA < valB) return asc ? -1 : 1;
      if (valA > valB) return asc ? 1 : -1;
      return 0;
    };
    return this;
  }

  limit(n: number) {
    this.limitCount = n;
    return this;
  }

  single() {
    this.isSingle = true;
    return this.execute();
  }

  private getTableRows(): any[] {
    const db = ensureDbFile();
    switch (this.tableName) {
      case "profiles":
        return db.profiles || [];
      case "school_settings":
        return db.school_settings ? [db.school_settings] : [];
      case "classes":
        return db.classes || [];
      case "subjects":
        return db.subjects || [];
      case "teachers":
        return db.teachers || [];
      case "students":
        return db.students || [];
      case "attendance_sessions":
        return (db.attendance_sessions || []).map((s: any) => ({
          ...s,
          attendance: (db.attendance || []).filter((a: any) => a.session_id === s.id)
        }));
      case "attendance":
        return db.attendance || [];
      case "exams":
        return (db.exams || []).map((e: any) => {
          const cls = (db.classes || []).find((c: any) => c.id === e.class_id);
          return {
            ...e,
            classes: cls ? { id: cls.id, name: cls.name } : { name: "Class" }
          };
        });
      case "exam_subjects":
        return (db.exam_subjects || []).map((es: any) => {
          const exam = (db.exams || []).find((e: any) => e.id === es.exam_id);
          const subj = (db.subjects || []).find((s: any) => s.id === es.subject_id);
          return {
            ...es,
            exams: exam ? { id: exam.id, name: exam.name } : undefined,
            subjects: subj ? { id: subj.id, name: subj.name, code: subj.code } : undefined
          };
        });
      case "marks":
        return (db.marks || []).map((m: any) => {
          const st = (db.students || []).find((s: any) => s.id === m.student_id);
          return {
            ...m,
            students: st ? { id: st.id, full_name: st.full_name, roll_number: st.roll_number } : undefined
          };
        });
      case "assignments":
        return (db.assignments || []).map((a: any) => {
          const cls = (db.classes || []).find((c: any) => c.id === a.class_id);
          const sub = (db.subjects || []).find((s: any) => s.id === a.subject_id);
          const tch = (db.teachers || []).find((t: any) => t.id === a.teacher_id);
          return {
            ...a,
            classes: cls ? { id: cls.id, name: cls.name } : undefined,
            subjects: sub ? { id: sub.id, name: sub.name } : undefined,
            teachers: tch ? { id: tch.id, full_name: tch.full_name } : undefined
          };
        });
      case "resources":
        return (db.resources || []).map((r: any) => {
          const cls = (db.classes || []).find((c: any) => c.id === r.class_id);
          const sub = (db.subjects || []).find((s: any) => s.id === r.subject_id);
          return {
            ...r,
            classes: cls ? { id: cls.id, name: cls.name } : undefined,
            subjects: sub ? { id: sub.id, name: sub.name } : undefined
          };
        });
      case "parents":
        return db.parents || [];
      case "parent_students":
        return (db.parent_students || []).map((ps: any) => {
          const st = (db.students || []).find((s: any) => s.id === ps.student_id);
          return {
            ...ps,
            students: st ? { id: st.id, full_name: st.full_name, roll_number: st.roll_number } : undefined
          };
        });
      case "student_enrollments":
        return (db.students || []).map((s: any) => ({
          student_id: s.id,
          roll_number: s.roll_number,
          class_id: s.class_id || "c-10",
          is_current: true,
          students: { id: s.id, full_name: s.full_name }
        }));
      case "announcements":
        return db.announcements || [];
      case "teacher_attendance":
        return db.teacher_attendance || [];
      case "report_cards":
        return Object.values(db.report_cards || {});
      case "grade_scales":
        return db.grade_scales || [];
      case "grade_scale_ranges":
        return db.grade_scale_ranges || [];
      default:
        return (db as any)[this.tableName] || [];
    }
  }

  async execute(): Promise<{ data: any; count: number | null; error: any }> {
    let rows = [...this.getTableRows()];

    for (const filter of this.filters) {
      rows = rows.filter(filter);
    }

    if (this.orderFn) {
      rows.sort(this.orderFn);
    }

    const totalCount = rows.length;

    if (this.limitCount !== undefined) {
      rows = rows.slice(0, this.limitCount);
    }

    if (this.isCountHead) {
      return { data: null, count: totalCount, error: null };
    }

    if (this.isSingle) {
      return {
        data: rows.length > 0 ? rows[0] : null,
        count: rows.length > 0 ? 1 : 0,
        error: rows.length > 0 ? null : { message: "Row not found", code: "PGRST116" }
      };
    }

    return { data: rows, count: totalCount, error: null };
  }

  then(resolve: (value: { data: any; count: number | null; error: any }) => void) {
    return this.execute().then(resolve);
  }

  async insert(recordOrRecords: any) {
    const db = ensureDbFile();
    const list = Array.isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
    const created: any[] = [];

    for (const item of list) {
      const newId = item.id || `gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newItem = {
        ...item,
        id: newId,
        is_active: item.is_active ?? true,
        created_at: new Date().toISOString()
      };
      created.push(newItem);

      if (this.tableName === "students") {
        if (!db.students) db.students = [];
        db.students.unshift(newItem);
      } else if (this.tableName === "classes") {
        if (!db.classes) db.classes = [];
        db.classes.push(newItem);
      } else if (this.tableName === "exams") {
        if (!db.exams) db.exams = [];
        db.exams.unshift(newItem);
      } else if (this.tableName === "resources") {
        if (!db.resources) db.resources = [];
        db.resources.unshift(newItem);
      } else if (this.tableName === "assignments") {
        if (!db.assignments) db.assignments = [];
        db.assignments.unshift(newItem);
      } else {
        if (!db[this.tableName]) db[this.tableName] = [];
        db[this.tableName].push(newItem);
      }
    }

    saveDb(db);
    return { data: Array.isArray(recordOrRecords) ? created : created[0], error: null };
  }

  async update(updates: any) {
    const db = ensureDbFile();
    if (this.tableName === "school_settings") {
      db.school_settings = { ...db.school_settings, ...updates };
      saveDb(db);
      return { data: db.school_settings, error: null };
    }

    const rows = (db as any)[this.tableName];
    if (Array.isArray(rows)) {
      for (const row of rows) {
        let matches = true;
        for (const filter of this.filters) {
          if (!filter(row)) {
            matches = false;
            break;
          }
        }
        if (matches) {
          Object.assign(row, updates);
        }
      }
      saveDb(db);
    }
    return { data: updates, error: null };
  }

  async upsert(recordOrRecords: any, _options?: any) {
    const db = ensureDbFile();
    const list = Array.isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];

    if (this.tableName === "attendance_sessions") {
      const item = list[0];
      const sessId = item.id || `att-sess-${item.attendance_date}`;
      if (!db.attendance_sessions) db.attendance_sessions = [];
      const existing = db.attendance_sessions.find(
        (s: any) => s.id === sessId || (s.class_id === item.class_id && s.attendance_date === item.attendance_date)
      );
      if (existing) {
        Object.assign(existing, item);
        saveDb(db);
        return { data: existing, error: null, select: () => ({ single: async () => ({ data: existing, error: null }) }) };
      }
      const newSess = { ...item, id: sessId };
      db.attendance_sessions.push(newSess);
      saveDb(db);
      return { data: newSess, error: null, select: () => ({ single: async () => ({ data: newSess, error: null }) }) };
    }

    if (this.tableName === "attendance") {
      if (!db.attendance) db.attendance = [];
      for (const item of list) {
        const existing = db.attendance.find((a: any) => a.session_id === item.session_id && a.student_id === item.student_id);
        if (existing) {
          existing.status = item.status;
        } else {
          db.attendance.push({ id: `att-${Date.now()}-${Math.random()}`, ...item });
        }
      }
      saveDb(db);
      return { data: list, error: null };
    }

    if (this.tableName === "marks") {
      if (!db.marks) db.marks = [];
      for (const item of list) {
        const existing = db.marks.find((m: any) => m.exam_subject_id === item.exam_subject_id && m.student_id === item.student_id);
        if (existing) {
          existing.marks_obtained = item.marks_obtained;
        } else {
          db.marks.push({ id: `mark-${Date.now()}-${Math.random()}`, ...item });
        }
      }
      saveDb(db);
      return { data: list, error: null };
    }

    return { data: list, error: null };
  }
}

export function getStudentReportCardByRoll(rollNumber: string): any | null {
  const db = ensureDbFile();
  const cleanRoll = rollNumber.trim();
  if (db.report_cards && db.report_cards[cleanRoll]) {
    return db.report_cards[cleanRoll];
  }
  const student = (db.students || []).find((s: any) => s.roll_number === cleanRoll);
  if (!student) return null;

  return {
    student_id: student.id,
    roll_number: student.roll_number,
    full_name: student.full_name,
    date_of_birth: student.date_of_birth,
    admission_number: student.admission_number,
    class_name: student.class_name,
    section_name: student.section_name || "Section A",
    parent_name: student.parent_name,
    mother_name: student.mother_name || "Sunita Devi",
    village_or_town: student.village_or_town,
    attendance_percentage: 95,
    total_working_days: 120,
    days_present: 114,
    exam_name: "Mid-Term Examination 2026 (अर्द्धवार्षिक मूल्यांकन)",
    academic_year: "2026-27",
    board: "Bihar School Examination Board (BSEB) & NCERT",
    subjects: [
      { subject_code: "MATH", subject_name: "Mathematics (गणित)", theory_max: 80, theory_obtained: 72, practical_max: 20, practical_obtained: 18, total_max: 100, total_obtained: 90, percentage: 90, grade: "A+", status: "Distinction" },
      { subject_code: "SCI", subject_name: "Science (विज्ञान)", theory_max: 80, theory_obtained: 70, practical_max: 20, practical_obtained: 18, total_max: 100, total_obtained: 88, percentage: 88, grade: "A", status: "Distinction" },
      { subject_code: "SST", subject_name: "Social Science (सामाजिक विज्ञान)", theory_max: 80, theory_obtained: 68, practical_max: 20, practical_obtained: 17, total_max: 100, total_obtained: 85, percentage: 85, grade: "A", status: "Distinction" },
      { subject_code: "HIN", subject_name: "Hindi (हिंदी)", theory_max: 80, theory_obtained: 73, practical_max: 20, practical_obtained: 19, total_max: 100, total_obtained: 92, percentage: 92, grade: "A+", status: "Distinction" },
      { subject_code: "ENG", subject_name: "English (अंग्रेजी)", theory_max: 80, theory_obtained: 69, practical_max: 20, practical_obtained: 17, total_max: 100, total_obtained: 86, percentage: 86, grade: "A", status: "Distinction" }
    ],
    total_max_marks: 500,
    total_marks_obtained: 441,
    overall_percentage: 88.2,
    overall_grade: "A",
    overall_division: "First Division with Distinction",
    class_rank: 2,
    total_students_in_section: 20,
    teacher_remarks: "Excellent academic consistency and disciplined attitude.",
    principal_remarks: "Promoted with distinction.",
    issue_date: "2026-09-28",
    verification_code: `GCS-VER-${student.roll_number}`
  };
}

export function createLocalServerSupabaseClient(activeUserId?: string) {
  const db = ensureDbFile();

  return {
    from: (table: string) => new LocalDbQueryBuilder(table),
    rpc: async (fnName: string, args: any) => {
      if (fnName === "lookup_public_student") {
        const rollQuery = args.p_roll_number ? String(args.p_roll_number).trim() : "";
        const reportCard = getStudentReportCardByRoll(rollQuery);
        if (!reportCard) return { data: [], error: null };
        return { data: [reportCard], error: null };
      }
      return { data: null, error: { message: `RPC ${fnName} not implemented in local database` } };
    },
    auth: {
      getUser: async () => {
        const userId = activeUserId || "p-admin-01";
        const profile = (db.profiles || []).find((p: any) => p.id === userId) || (db.profiles || [])[0];
        if (!profile) return { data: { user: null }, error: null };

        return {
          data: {
            user: {
              id: profile.id,
              email: profile.email,
              user_metadata: { full_name: profile.full_name, role: profile.role }
            }
          },
          error: null
        };
      },
      signInWithPassword: async ({ email, password }: { email: string; password?: string }) => {
        const normalized = email.toLowerCase().trim();
        const profile = (db.profiles || []).find((p: any) => p.email.toLowerCase() === normalized);
        if (!profile) {
          return { data: null, error: { message: "Invalid email or password" } };
        }

        if (password && profile.password && password !== profile.password) {
          // Allow lenient dummy logins or verify exact match
        }

        return {
          data: {
            user: { id: profile.id, email: profile.email },
            session: { access_token: `mock-jwt-${profile.id}`, user: { id: profile.id } }
          },
          error: null
        };
      }
    }
  };
}
