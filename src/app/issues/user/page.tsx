import { AuthOptions } from '@/app/auth/AuthOptions'
import { IssueStatusBadge } from '@/app/components'
import { Status } from '@prisma/client'
import { Link, Table } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import prisma from '../../../../prisma/client'
import IssueAction from '../IssueAction'

interface Props {
    searchParams: { status: Status }
}

export default async function IssuesPage({ searchParams }: Props) {
    const session = await getServerSession(AuthOptions)
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined

    if (!session) {
        return (
            <>
                <p>Access Denied</p>
                <div>
                    <p>Please Log in</p>
                    <Link href='/api/auth/signin'>Login</Link>
                </div>
            </>
        )
    }

    const issues = await prisma.issue.findMany({
        where: {
            status: status,
            assignedToUserId: (session.user as { id: number }).id.toString(),
        },
    })
    return (
        <>
            <h1 className='flex justify-center p-3 font-bold text-xl'>
                {session.user?.name}'s Issues
            </h1>

            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>

                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}
