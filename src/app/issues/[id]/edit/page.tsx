import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '../../../../../prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: string
}

export default async function page({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params) },
    })

    if (!issue) {
        notFound()
    }
    return <IssueForm issue={issue} />
}
