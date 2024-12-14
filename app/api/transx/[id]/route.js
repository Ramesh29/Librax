import connectMongoDB from "@/libs/mongodb";
import Transx from "@/models/transx";
import { NextResponse } from "next/server";

/**
 * Update a transaction - make as complete
 * @param {*} req 
 * @param {*} param1 
 * @returns 
 */
export async function PUT( req, {params}) {

    const { id } = params;
    const { completed } = await req.json()
    await connectMongoDB()
    await Transx.findByIdAndUpdate( id, { completed });
    return NextResponse.json({ message : "Transaction is updated "}, { status : 200 });

}

/**
 * GET transaction by ID
 * @param {} req 
 * @param {*} param1 
 * @returns 
 */
export async function GET( req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const tran = await Transx.findOne({ _id: id });
    return NextResponse.json({tran}, { status: 200 });
}