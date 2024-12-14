import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";

/**
 * GET all the books 
 * 
 */
export async function GET( req, { params } ) {

    await connectMongoDB();
    const books = await Book.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({books});
}
