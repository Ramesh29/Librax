import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron";
import { NextResponse } from "next/server";

/**
 * POST method to create a new Patron
 * @param {*} req 
 * @returns 
 */
export async function POST( req ){
    const { firstname, lastname, address , cardnumber ,email , phone  } = await req.json();

    console.log("in log", firstname, lastname, address , cardnumber ,email , phone)
    await connectMongoDB();
    await Patron.create({ firstname, lastname, address , cardnumber ,email , phone  });
    return NextResponse.json({message: "Patron created"} , { status: 201 });
}

/**
 * GET method to retrieve all the patrons 
 * @returns 
 */
export async function GET() {
    await connectMongoDB();
    const patrons = await Patron.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({ patrons })
}