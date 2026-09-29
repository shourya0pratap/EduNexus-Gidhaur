import { getLocalDb } from "../lib/local-db/server-db";
import fs from "fs";
import path from "path";

console.log("Seeding persistent local database engine...");
const db = getLocalDb();

console.log(`Database initialized successfully!`);
console.log(`- Total Students: ${db.students.length}`);
console.log(`- Total Teachers: ${db.teachers.length}`);
console.log(`- Total Classes: ${db.classes.length}`);
console.log(`- Total Resources: ${db.resources.length}`);
console.log(`- Total Marks records: ${db.marks.length}`);
console.log(`- Total Attendance records: ${db.attendance.length}`);
console.log(`- Total User Profiles: ${db.profiles.length}`);

const dbPath = path.join(process.cwd(), "data", "local_db.json");
if (fs.existsSync(dbPath)) {
  const stats = fs.statSync(dbPath);
  console.log(`- Written to ${dbPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}
