import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";

/**
 * GET a book by term
 * 
 */
export async function GET( req, { params } ) {
    const { term } = params
    console.log("value of term is " , term)
    await connectMongoDB();
    const books = await Book.find({ title : {$regex:`.*${term}.*` , $options: "i"}}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({books});
}
