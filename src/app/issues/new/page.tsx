'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller, set } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
    title: string
    description: string
}

export default function NewIssuePage() {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const [error, setError] = useState('')
    return (
        <div className='max-w-xl space-y-3 mb-5'>
            {error && (
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (Error) {
                        setError(`An unexpected error has occured | ${Error}`)
                    }
                })}>
                <TextField.Root className=''>
                    <TextField.Input
                        placeholder='Title'
                        {...register('title')}
                    />
                </TextField.Root>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}