import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";


/**
 * update a book by ID
 * @param {*} req 
 * @param {*} param1 
 */
export async function PUT( req, { params }) {
    console.log("**************************************************")

    const { id } = await params;
    const {img , title, author, isbn } = await req.json();
    await connectMongoDB();
    await Book.findByIdAndUpdate( id, {img, title, author, isbn });
    return NextResponse.json({ message: "book updated"}, { status: 200});

}

/**
 * GET a book by ID
 * 
 */

export async function GET( req, { params } ) {
    const {id } = await params;
    await connectMongoDB();
    const book = await Book.findOne({_id : id });
    return NextResponse.json({book}, { status: 200 });
}
