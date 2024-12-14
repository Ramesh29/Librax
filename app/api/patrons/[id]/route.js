import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron";
import { NextResponse } from "next/server";

export async function PUT( req, {params}) {

    const { id } = params;
    const { firstname, lastname, address, cardnumber, email, phone } = await req.json()
    console.log(firstname, lastname, address, cardnumber, email, phone )
    await connectMongoDB()

    console.log(firstname, lastname)
    await Patron.findByIdAndUpdate( id, { firstname, lastname, address, cardnumber, email, phone });
    return NextResponse.json({ message : "Patron updated "}, { status : 200 });

}

export async function GET( req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const patron = await Patron.findOne({ _id: id });
    return NextResponse.json({patron}, { status: 200 });
}