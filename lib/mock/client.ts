import {
  MOCK_PROFILES,
  MOCK_SCHOOL_SETTINGS,
  MOCK_CLASSES,
  MOCK_SUBJECTS,
  MOCK_TEACHERS,
  MOCK_STUDENTS,
  MOCK_ATTENDANCE_SESSIONS,
  MOCK_ATTENDANCE_RECORDS,
  MOCK_EXAMS,
  MOCK_EXAM_SUBJECTS,
  MOCK_MARKS,
  MOCK_ASSIGNMENTS,
  MOCK_RESOURCES,
  MOCK_PARENTS,
  MOCK_PARENT_STUDENTS,
  Student
} from "./data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export { isSupabaseConfigured };

// In-memory data store for the browser session
class MockDataStore {
  profiles = [...MOCK_PROFILES];
  schoolSettings = { ...MOCK_SCHOOL_SETTINGS };
  classes = [...MOCK_CLASSES];
  subjects = [...MOCK_SUBJECTS];
  teachers = [...MOCK_TEACHERS];
  students = [...MOCK_STUDENTS];
  attendanceSessions = [...MOCK_ATTENDANCE_SESSIONS];
  attendance = [...MOCK_ATTENDANCE_RECORDS];
  exams = [...MOCK_EXAMS];
  examSubjects = [...MOCK_EXAM_SUBJECTS];
  marks = [...MOCK_MARKS];
  assignments = [...MOCK_ASSIGNMENTS];
  resources = [...MOCK_RESOURCES];
  parents = [...MOCK_PARENTS];
  parentStudents = [...MOCK_PARENT_STUDENTS];
  currentUserId: string = "p-admin-01"; // default admin in demo mode

  constructor() {
    // Restore from localStorage or cookie if in browser
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("edunexus_mock_user_id");
        if (storedUser) this.currentUserId = storedUser;

        const storedStudents = localStorage.getItem("edunexus_mock_students");
        if (storedStudents) this.students = JSON.parse(storedStudents);

        const storedSettings = localStorage.getItem("edunexus_mock_settings");
        if (storedSettings) this.schoolSettings = JSON.parse(storedSettings);

        const storedMarks = localStorage.getItem("edunexus_mock_marks");
        if (storedMarks) this.marks = JSON.parse(storedMarks);

        const storedExams = localStorage.getItem("edunexus_mock_exams");
        if (storedExams) this.exams = JSON.parse(storedExams);

        const storedClasses = localStorage.getItem("edunexus_mock_classes");
        if (storedClasses) this.classes = JSON.parse(storedClasses);

        const storedResources = localStorage.getItem("edunexus_mock_resources");
        if (storedResources) this.resources = JSON.parse(storedResources);
      } catch {
        // ignore localStorage errors
      }
    }
  }

  saveBrowserState() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("edunexus_mock_user_id", this.currentUserId);
        localStorage.setItem("edunexus_mock_students", JSON.stringify(this.students));
        localStorage.setItem("edunexus_mock_settings", JSON.stringify(this.schoolSettings));
        localStorage.setItem("edunexus_mock_marks", JSON.stringify(this.marks));
        localStorage.setItem("edunexus_mock_exams", JSON.stringify(this.exams));
        localStorage.setItem("edunexus_mock_classes", JSON.stringify(this.classes));
        localStorage.setItem("edunexus_mock_resources", JSON.stringify(this.resources));
      } catch {
        // ignore
      }
    }
  }
}

// Global store singleton for client execution
const globalMockStore = new MockDataStore();

// Helper to push updates to server JSON database file asynchronously
async function syncToServer(payload: any) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/local-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    // offline or local-only fallback
  }
}

export class MockQueryBuilder {
  private tableName: string;
  private store: MockDataStore;
  private filters: Array<(item: any) => boolean> = [];
  private orderFn?: (a: any, b: any) => number;
  private limitCount?: number;
  private isSingle = false;
  private isCountHead = false;

  constructor(tableName: string, store: MockDataStore = globalMockStore) {
    this.tableName = tableName;
    this.store = store;
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

  private getTableData(): any[] {
    switch (this.tableName) {
      case "profiles":
        return this.store.profiles;
      case "school_settings":
        return [this.store.schoolSettings];
      case "classes":
        return this.store.classes;
      case "subjects":
        return this.store.subjects;
      case "teachers":
        return this.store.teachers;
      case "students":
        return this.store.students;
      case "attendance_sessions":
        return this.store.attendanceSessions;
      case "attendance":
        return this.store.attendance;
      case "exams":
        return this.store.exams.map(e => {
          const cls = this.store.classes.find(c => c.id === e.class_id);
          return {
            ...e,
            classes: cls ? { id: cls.id, name: cls.name } : { name: "Class" }
          };
        });
      case "exam_subjects":
        return this.store.examSubjects.map(es => {
          const exam = this.store.exams.find(e => e.id === es.exam_id);
          const subj = this.store.subjects.find(s => s.id === es.subject_id);
          return {
            ...es,
            exams: exam ? { id: exam.id, name: exam.name } : undefined,
            subjects: subj ? { id: subj.id, name: subj.name, code: subj.code } : undefined
          };
        });
      case "marks":
        return this.store.marks.map(m => {
          const st = this.store.students.find(s => s.id === m.student_id);
          return {
            ...m,
            students: st ? { id: st.id, full_name: st.full_name, roll_number: st.roll_number } : undefined
          };
        });
      case "assignments":
        return this.store.assignments.map(a => {
          const cls = this.store.classes.find(c => c.id === a.class_id);
          const sub = this.store.subjects.find(s => s.id === a.subject_id);
          const tch = this.store.teachers.find(t => t.id === a.teacher_id);
          return {
            ...a,
            classes: cls ? { id: cls.id, name: cls.name } : undefined,
            subjects: sub ? { id: sub.id, name: sub.name } : undefined,
            teachers: tch ? { id: tch.id, full_name: tch.full_name } : undefined
          };
        });
      case "resources":
        return this.store.resources.map(r => {
          const cls = this.store.classes.find(c => c.id === r.class_id);
          const sub = this.store.subjects.find(s => s.id === r.subject_id);
          return {
            ...r,
            classes: cls ? { id: cls.id, name: cls.name } : undefined,
            subjects: sub ? { id: sub.id, name: sub.name } : undefined
          };
        });
      case "parents":
        return this.store.parents;
      case "parent_students":
        return this.store.parentStudents;
      case "student_enrollments":
        return this.store.students.map((s) => ({
          student_id: s.id,
          roll_number: s.roll_number,
          class_id: s.class_id || "c-10",
          is_current: true,
          students: { id: s.id, full_name: s.full_name }
        }));
      default:
        return [];
    }
  }

  async execute(): Promise<{ data: any; count: number | null; error: any }> {
    let rows = [...this.getTableData()];

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
        this.store.students.unshift(newItem as Student);
      } else if (this.tableName === "classes") {
        this.store.classes.push(newItem);
      } else if (this.tableName === "exams") {
        const cls = this.store.classes.find(c => c.id === newItem.class_id);
        this.store.exams.unshift({ ...newItem, classes: { id: newItem.class_id, name: cls?.name ?? "Class" } });
      } else if (this.tableName === "resources") {
        this.store.resources.unshift(newItem);
      } else if (this.tableName === "assignments") {
        this.store.assignments.unshift(newItem);
      }
    }

    this.store.saveBrowserState();
    syncToServer({ action: "insert", table: this.tableName, records: list });
    return { data: Array.isArray(recordOrRecords) ? created : created[0], error: null };
  }

  async update(updates: any) {
    if (this.tableName === "school_settings") {
      this.store.schoolSettings = { ...this.store.schoolSettings, ...updates };
      this.store.saveBrowserState();
      syncToServer({ action: "update", table: this.tableName, updates });
      return { data: this.store.schoolSettings, error: null };
    }

    let rows = this.getTableData();
    for (const filter of this.filters) {
      rows = rows.filter(filter);
    }

    for (const row of rows) {
      Object.assign(row, updates);
    }

    this.store.saveBrowserState();
    syncToServer({ action: "update", table: this.tableName, updates });
    return { data: rows, error: null };
  }

  async upsert(recordOrRecords: any, _options?: any) {
    const list = Array.isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];

    if (this.tableName === "attendance_sessions") {
      const item = list[0];
      const sessId = item.id || `att-sess-${item.attendance_date}`;
      const existing = this.store.attendanceSessions.find(
        s => s.id === sessId || (s.class_id === item.class_id && s.attendance_date === item.attendance_date)
      );
      if (existing) {
        Object.assign(existing, item);
        this.store.saveBrowserState();
        syncToServer({ action: "upsert", table: this.tableName, record: item });
        return { data: existing, error: null, select: () => ({ single: async () => ({ data: existing, error: null }) }) };
      }
      const newSess = { ...item, id: sessId };
      this.store.attendanceSessions.push(newSess);
      this.store.saveBrowserState();
      syncToServer({ action: "upsert", table: this.tableName, record: newSess });
      return { data: newSess, error: null, select: () => ({ single: async () => ({ data: newSess, error: null }) }) };
    }

    if (this.tableName === "attendance") {
      for (const item of list) {
        const existing = this.store.attendance.find(a => a.session_id === item.session_id && a.student_id === item.student_id);
        if (existing) {
          existing.status = item.status;
        } else {
          this.store.attendance.push({ id: `att-${Date.now()}-${Math.random()}`, ...item });
        }
      }
      this.store.saveBrowserState();
      syncToServer({ action: "upsert", table: this.tableName, records: list });
      return { data: list, error: null };
    }

    if (this.tableName === "marks") {
      for (const item of list) {
        const existing = this.store.marks.find(m => m.exam_subject_id === item.exam_subject_id && m.student_id === item.student_id);
        if (existing) {
          existing.marks_obtained = item.marks_obtained;
        } else {
          this.store.marks.push({ id: `mark-${Date.now()}-${Math.random()}`, ...item });
        }
      }
      this.store.saveBrowserState();
      syncToServer({ action: "upsert", table: this.tableName, records: list });
      return { data: list, error: null };
    }

    this.store.saveBrowserState();
    syncToServer({ action: "upsert", table: this.tableName, records: list });
    return { data: list, error: null };
  }
}

export function createMockSupabaseClient(activeUserId?: string) {
  const store = globalMockStore;
  if (activeUserId) {
    store.currentUserId = activeUserId;
  }

  return {
    from: (table: string) => new MockQueryBuilder(table, store),
    rpc: async (fnName: string, args: any) => {
      if (fnName === "lookup_public_student") {
        const student = store.students.find(
          s => s.roll_number === args.p_roll_number && s.date_of_birth === args.p_date_of_birth
        );
        if (!student) return { data: [], error: null };

        return {
          data: [
            {
              id: student.id,
              full_name: student.full_name,
              roll_number: student.roll_number,
              date_of_birth: student.date_of_birth,
              class_name: student.class_name || "Class 10-A",
              section_name: student.section_name || "Section A",
              admission_number: student.admission_number,
              attendance_percentage: 95
            }
          ],
          error: null
        };
      }
      return { data: null, error: { message: `RPC ${fnName} not mocked` } };
    },
    auth: {
      getUser: async () => {
        // Read from document cookie if available
        let profile = store.profiles.find(p => p.id === store.currentUserId);
        if (typeof document !== "undefined") {
          const match = document.cookie.match(/edunexus_session=([^;]+)/) || document.cookie.match(/edunexus_mock_session=([^;]+)/);
          if (match) {
            try {
              const parsed = JSON.parse(decodeURIComponent(match[1]));
              const found = store.profiles.find(p => p.id === parsed.id || p.email === parsed.email);
              if (found) profile = found;
            } catch {
              // ignore
            }
          }
        }

        if (!profile) profile = store.profiles[0];

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
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          const json = await res.json();
          if (!res.ok) {
            return { data: null, error: { message: json.error || "Login failed" } };
          }

          store.currentUserId = json.profile?.id || "p-admin-01";
          store.saveBrowserState();

          return {
            data: {
              user: { id: json.profile?.id, email: json.profile?.email },
              session: { access_token: "mock-token", user: { id: json.profile?.id } }
            },
            error: null
          };
        } catch {
          // In offline fallback
          const profile = store.profiles.find(p => p.email.toLowerCase() === email.toLowerCase().trim()) || store.profiles[0];
          store.currentUserId = profile.id;
          store.saveBrowserState();
          if (typeof document !== "undefined") {
            const val = encodeURIComponent(JSON.stringify({ id: profile.id, email: profile.email, role: profile.role }));
            document.cookie = `edunexus_session=${val}; path=/; max-age=604800`;
            document.cookie = `edunexus_mock_session=${val}; path=/; max-age=604800`;
          }
          return {
            data: {
              user: { id: profile.id, email: profile.email },
              session: { access_token: "mock-token", user: { id: profile.id } }
            },
            error: null
          };
        }
      },
      signOut: async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch {
          // ignore
        }
        if (typeof document !== "undefined") {
          document.cookie = "edunexus_session=; path=/; max-age=0";
          document.cookie = "edunexus_mock_session=; path=/; max-age=0";
          localStorage.removeItem("edunexus_mock_user_id");
        }
        return { error: null };
      }
    }
  };
}
