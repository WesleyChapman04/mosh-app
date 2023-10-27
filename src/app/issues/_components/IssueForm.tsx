'use client'

import { IssueSchema } from '@/app/ValidationShema'
import { ErrorMessage, Spinner } from '@/app/components/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import SimpleMDE from 'react-simplemde-editor'

type IssueFormData = z.infer<typeof IssueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema),
    })
    const [error, setError] = useState('')

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            if (issue) await axios.patch(`/api/issues/` + issue.id, data)
            else await axios.post('/api/issues', data)
            router.push('/issues')
            router.refresh()
        } catch (Error) {
            setIsSubmitting(false)
            setError(`An unexpected error has occured | ${Error}`)
        }
    })

    return (
        <div className='max-w-xl space-y-3 mb-5'>
            {error && (
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
                <TextField.Root className=''>
                    <TextField.Input
                        defaultValue={issue?.title}
                        placeholder='Title'
                        {...register('title')}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    defaultValue={issue?.description}
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Create New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
