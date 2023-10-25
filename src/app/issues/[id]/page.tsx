import React from 'react'
import prisma from '../../../../prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

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
            <Heading>{issue.title}</Heading>
            <div className='flex space-x-3 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card className='prose mt-4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}
