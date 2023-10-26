import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { IssueSchema } from "../../ValidationShema";


export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = IssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    

    const issue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(issue, {status: 201})
}