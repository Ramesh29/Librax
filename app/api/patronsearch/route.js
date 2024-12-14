import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron";
import { NextResponse } from "next/server";

/**
 * GET method to retrieve all the patrons 
 * @returns 
 */
export async function GET() {
    await connectMongoDB();
    const patrons = await Patron.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({ patrons })
}