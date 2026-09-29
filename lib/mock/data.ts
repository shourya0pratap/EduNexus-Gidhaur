export * from "@/lib/local-db/initial-data";

import {
  INITIAL_PROFILES,
  INITIAL_SCHOOL_SETTINGS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE_SESSIONS,
  INITIAL_ATTENDANCE_RECORDS,
  INITIAL_EXAMS,
  INITIAL_EXAM_SUBJECTS,
  INITIAL_MARKS,
  INITIAL_ASSIGNMENTS,
  INITIAL_RESOURCES,
  INITIAL_PARENTS,
  INITIAL_PARENT_STUDENTS
} from "@/lib/local-db/initial-data";

// Compatibility aliases for legacy mock typings
export type MockProfile = typeof INITIAL_PROFILES[0];
export type MockSchoolSettings = typeof INITIAL_SCHOOL_SETTINGS;
export type MockClass = typeof INITIAL_CLASSES[0];
export type MockSubject = typeof INITIAL_SUBJECTS[0];
export type MockTeacher = typeof INITIAL_TEACHERS[0];
export type MockStudent = typeof INITIAL_STUDENTS[0];
export type MockAttendanceSession = typeof INITIAL_ATTENDANCE_SESSIONS[0];
export type MockAttendanceRecord = typeof INITIAL_ATTENDANCE_RECORDS[0];
export type MockExam = typeof INITIAL_EXAMS[0];
export type MockExamSubject = typeof INITIAL_EXAM_SUBJECTS[0];
export type MockMark = typeof INITIAL_MARKS[0];
export type MockAssignment = typeof INITIAL_ASSIGNMENTS[0];
export type MockResource = typeof INITIAL_RESOURCES[0];
export type MockParent = typeof INITIAL_PARENTS[0];
export type MockParentStudent = typeof INITIAL_PARENT_STUDENTS[0];

export const MOCK_PROFILES = INITIAL_PROFILES;
export const MOCK_SCHOOL_SETTINGS = INITIAL_SCHOOL_SETTINGS;
export const MOCK_CLASSES = INITIAL_CLASSES;
export const MOCK_SUBJECTS = INITIAL_SUBJECTS;
export const MOCK_TEACHERS = INITIAL_TEACHERS;
export const MOCK_STUDENTS = INITIAL_STUDENTS;
export const MOCK_ATTENDANCE_SESSIONS = INITIAL_ATTENDANCE_SESSIONS;
export const MOCK_ATTENDANCE_RECORDS = INITIAL_ATTENDANCE_RECORDS;
export const MOCK_EXAMS = INITIAL_EXAMS;
export const MOCK_EXAM_SUBJECTS = INITIAL_EXAM_SUBJECTS;
export const MOCK_MARKS = INITIAL_MARKS;
export const MOCK_ASSIGNMENTS = INITIAL_ASSIGNMENTS;
export const MOCK_RESOURCES = INITIAL_RESOURCES;
export const MOCK_PARENTS = INITIAL_PARENTS;
export const MOCK_PARENT_STUDENTS = INITIAL_PARENT_STUDENTS;
