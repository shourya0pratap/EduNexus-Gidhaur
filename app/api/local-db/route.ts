import { NextRequest, NextResponse } from "next/server";
import { getLocalDb, saveDb, LocalDbQueryBuilder } from "@/lib/local-db/server-db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const table = searchParams.get("table");

  if (!table) {
    const db = getLocalDb();
    return NextResponse.json(db);
  }

  const builder = new LocalDbQueryBuilder(table);
  const result = await builder.execute();
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, table, record, records, updates, filterField, filterValue } = body;

    const builder = new LocalDbQueryBuilder(table);

    if (action === "insert") {
      const res = await builder.insert(record || records);
      return NextResponse.json(res);
    }

    if (action === "update") {
      if (filterField && filterValue !== undefined) {
        builder.eq(filterField, filterValue);
      }
      const res = await builder.update(updates);
      return NextResponse.json(res);
    }

    if (action === "upsert") {
      const res = await builder.upsert(record || records);
      return NextResponse.json(res);
    }

    if (action === "sync_full_db") {
      saveDb(body.data);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to process request" }, { status: 500 });
  }
}
