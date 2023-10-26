import { IssueSchema } from "@/app/ValidationShema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function PATCH(request: NextRequest, { params}: { params: { id: string}}) {
    const body = await request.json()
    const validation = IssueSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const issue = await prisma.issue.findUnique({
        where: {id : parseInt(params.id)},
    })

    if (!issue) 
        return NextResponse.json({ error: 'Invalid Issue'}, { status: 404 })
    
    const updatedIssue = prisma.issue.update({
        where: { id: issue.id },
        data: { title: body.title, description: body.description}
    })

    return NextResponse.json(updatedIssue)
}