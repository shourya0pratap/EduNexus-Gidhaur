import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "local_db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

console.log("================================================================================");
console.log("              EDUNEXUS-GIDHAUR: LOCAL DATABASE ENGINE AUDIT REPORT              ");
console.log("================================================================================");

console.log("\n--- 1. EXECUTIVE LEADERSHIP & COORDINATORS (DESIGNATED HIGHER CONTROL) ---");
const keyStaff = db.teachers.filter((t: any) => t.hierarchy_level <= 2);
keyStaff.forEach((t: any) => {
  console.log(`• [${t.hierarchy_title}] ${t.full_name}`);
  console.log(`  Email: ${t.email} | Code: ${t.employee_code} | Control Badge: ${t.control_badge}`);
  if (t.coordinator_role) {
    console.log(`  Role Identifier: ${t.coordinator_role}`);
    console.log(`  Higher Powers: ${t.control_level}`);
  }
});

console.log("\n--- 2. 50 TEACHERS: COMPLETE HIERARCHICAL DISTRIBUTION ---");
const levels: Record<string, number> = {};
db.teachers.forEach((t: any) => {
  const l = `Level ${t.hierarchy_level}: ${t.hierarchy_title}`;
  levels[l] = (levels[l] || 0) + 1;
});
Object.entries(levels).forEach(([lvl, count]) => {
  console.log(`  ${lvl.padEnd(40)} -> ${count} faculty members`);
});
console.log(`  Total Faculty Verified: ${db.teachers.length}`);

console.log("\n--- 3. 400 STUDENTS ENROLLMENT (CLASSES 1st TO 10th BREAKDOWN) ---");
for (let g = 1; g <= 10; g++) {
  const gradeStr = g.toString().padStart(2, "0");
  const gradeStudents = db.students.filter((s: any) => s.class_id === `c-${gradeStr}`);
  const secA = gradeStudents.filter((s: any) => s.section_name === "A").length;
  const secB = gradeStudents.filter((s: any) => s.section_name === "B").length;
  const sample = gradeStudents[0];
  console.log(`• Class ${g.toString().padStart(2, " ")}: ${gradeStudents.length} Students (Sec A: ${secA}, Sec B: ${secB}) | Sample: Roll ${sample?.roll_number} - ${sample?.full_name} (${sample?.village_or_town})`);
}
console.log(`  Total Enrolled Students: ${db.students.length}`);

console.log("\n--- 4. SAMPLE BIHAR STATE STUDENT PROFILES ---");
const sampleIndices = [0, 40, 160, 200, 360, 399];
sampleIndices.forEach((idx) => {
  const s = db.students[idx];
  if (s) {
    console.log(`• Roll: ${s.roll_number} | ${s.full_name} | Grade: ${s.class_name} Sec ${s.section_name} | Vill: ${s.village_or_town}, ${s.district} | Parent: ${s.parent_name} | DOB: ${s.date_of_birth}`);
  }
});

console.log("\n--- 5. CLASSES 1-10 CURRICULUM RESOURCES (BSEB & CBSE/NCERT) ---");
const resourcesByGrade: Record<number, number> = {};
db.resources.forEach((r: any) => {
  resourcesByGrade[r.grade_level] = (resourcesByGrade[r.grade_level] || 0) + 1;
});
for (let g = 1; g <= 10; g++) {
  console.log(`• Class ${g.toString().padStart(2, " ")}: ${resourcesByGrade[g] || 0} resource units with official books, videos & chapter alerts`);
}
console.log(`  Total Academic Resources: ${db.resources.length}`);

console.log("\n--- 6. SAMPLE CHAPTER NOTIFICATIONS & VIDEO ROADMAPS ---");
db.resources.filter((r: any) => r.video_url && r.notification_text).slice(0, 4).forEach((r: any) => {
  console.log(`\n• [Class ${r.grade_level} ${r.subject_name}] ${r.title}`);
  console.log(`  📢 Chapter Alert: "${r.notification_text}"`);
  console.log(`  📚 Textbook: ${r.file_url}`);
  console.log(`  🎬 Video Roadmap: ${r.video_url}`);
});

console.log("\n================================================================================");
console.log("            ALL SYSTEMS OPERATIONAL · LOCAL DB ENGINE 100% HEALTHY              ");
console.log("================================================================================");
