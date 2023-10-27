import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import prisma from '../../../../../prisma/client'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
})

interface Props {
    params: { id: string }
}

export default async function page({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        notFound()
    }
    return <IssueForm issue={issue} />
}
