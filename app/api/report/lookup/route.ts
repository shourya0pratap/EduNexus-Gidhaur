import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { z } from "zod";

const schema=z.object({roll_number:z.string().min(1).max(30),date_of_birth:z.string().date()});

export async function POST(req:NextRequest){
  try{
    const body=schema.parse(await req.json());
    const supabase=await createServerSupabase();
    const {data,error}=await supabase.rpc("lookup_public_student",{p_roll_number:body.roll_number,p_date_of_birth:body.date_of_birth});
    if(error)return NextResponse.json({error:"Lookup failed"},{status:400});
    if(!data?.length)return NextResponse.json({error:"Student could not be verified"},{status:404});
    return NextResponse.json({student:data[0]});
  }catch{return NextResponse.json({error:"Invalid request"},{status:400})}
}
