import connectMongoDB from "@/libs/mongodb";
import Transx from "@/models/transx";
import { NextResponse } from "next/server";

/* GET method to retrieve all transations 
 * @returns 
 */
export async function GET() {
    await connectMongoDB();
    const trans = await Transx.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({ trans })
}