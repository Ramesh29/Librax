import connectMongoDB from "@/libs/mongodb";
import Transx from "@/models/transx";
import { NextResponse } from "next/server";


/**
 * POST method to create a new transaction
 * @param {} req 
 * @returns 
 */
export async function POST( req ){
    const { patronid  , firstname, lastname,  bookid, title, author  } = await req.json();
    await connectMongoDB();
    await Transx.create({ patronid, firstname, lastname, bookid, title, author });
    return NextResponse.json({message: "Transaction created"} , { status: 201 });
}

/**
 * GET method to retrieve all transations 
 * @returns 
 */
export async function GET() {
    await connectMongoDB();
    const trans = await Transx.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({ trans })
}