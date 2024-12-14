import connectMongoDB from "@/libs/mongodb";
import Transx from "@/models/transx";
import { NextResponse } from "next/server";

/**
 * GET all the books 
 * 
 */
export async function GET( req, { params } ) {

    const { term } = params
    await connectMongoDB();
    const  trans = await Transx.find({ firstname : {$regex:`.*${term}.*` , $options: "i"}}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({trans});
}
