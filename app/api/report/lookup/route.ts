import { NextRequest, NextResponse } from "next/server";
import { getStudentReportCardByRoll } from "@/lib/local-db/server-db";
import { z } from "zod";

const schema = z.object({
  roll_number: z.string().min(1, "Roll number is required").max(30),
  date_of_birth: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const result = schema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json(
        { error: "Please provide a valid 4-digit school roll number (e.g. 1001, 1002, 0901, 0101)." },
        { status: 400 }
      );
    }

    const roll = result.data.roll_number.trim();
    const reportCard = getStudentReportCardByRoll(roll);

    if (!reportCard) {
      return NextResponse.json(
        {
          error: `No report card found for School Roll No. "${roll}". Please verify the roll number given by the school or try one of the sample test roll numbers below.`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ student: reportCard });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to process report card lookup" }, { status: 500 });
  }
}
