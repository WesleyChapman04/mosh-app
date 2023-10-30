import { getServerSession } from 'next-auth/next'
import { AuthOptions } from './auth/AuthOptions'

export default async function Page() {
    const session = await getServerSession(AuthOptions)
    return <pre>{JSON.stringify(session, null, 2)}</pre>
}
