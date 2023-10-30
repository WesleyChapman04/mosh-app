'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

export default function IssueStatusFilter() {
    const statuses: { label: string; value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'INPROGRESS' },
        { label: 'Closed', value: 'CLOSED' },
    ]
    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by Status' />
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || ''}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}
