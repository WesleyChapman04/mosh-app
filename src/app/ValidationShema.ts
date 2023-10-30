import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255),
    description: z.string().min(1, 'Description is Required').max(65535)
});

export const PacthIssueSchema = z.object({
    title: z.string().min(1, 'Title is Required').max(255).optional(),
    description: z.string().min(1, 'Description is Required').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'Assinged To User Id is Required').max(255).optional().nullable(),
});

