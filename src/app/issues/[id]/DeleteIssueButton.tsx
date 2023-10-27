import { Button } from '@radix-ui/themes'
import React from 'react'

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
    return <Button color='red'>Delete Issue</Button>
}
