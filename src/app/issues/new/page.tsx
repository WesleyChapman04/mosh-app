'use client'

import { createIssueSchema } from '@/app/ValidationShema'
import { ErrorMessage, Spinner } from '@/app/components/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

export default function NewIssuePage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    })
    const [error, setError] = useState('')

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
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
                        placeholder='Title'
                        {...register('title')}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
