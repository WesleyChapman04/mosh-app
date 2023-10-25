import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'
import { record } from 'zod'

const statusMap: Record<
    Status,
    { label: string; color: 'red' | 'violet' | 'green' }
> = {
    OPEN: { label: 'Open', color: 'red' },
    INPROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

export default function IssueStatusBadge({ status }: { status: Status }) {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
}
