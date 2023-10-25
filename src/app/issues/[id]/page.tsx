import React from 'react'
import prisma from '../../../../prisma/client'
import { parse } from 'path'
import { notFound } from 'next/navigation'

interface Props {
    params: { id: string }
}

export default async function DetailPage({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        notFound()
    }
    return (
        <>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </>
    )
}
