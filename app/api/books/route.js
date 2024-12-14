import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";


/**
 * POST to create a new book
 * @param {*} req 
 * @returns 
 */
export async function POST(req){
    const { img, title, author, isbn } = await req.json();
    console.log(img, title, author, isbn)
    connectMongoDB();
    Book.create({img, title, author, isbn })
    return NextResponse.json({message: "Book crated"}, { status: 201 });
}

/**
 * GET method to retrieve all books
 */

export async function GET(){
    await connectMongoDB();
    const books = await Book.find({}).sort({ $natural: -1 }).limit(100);
    return NextResponse.json({books});
}


