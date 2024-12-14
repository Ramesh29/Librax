import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron";
import { NextResponse } from "next/server";

/**
 * GET all the books 
 * 
 */
export async function GET( req, { params } ) {

    const { term } = params
    await connectMongoDB();
    const patrons = await Patron.find({ firstname : {$regex:`.*${term}.*` , $options: "i"}}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({patrons});
}
