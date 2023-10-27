import dynamic from 'next/dynamic'
import IssueForm from '../_components/IssueForm'
import IssueFormSkeleton from './loading'

const issueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
})

export default function NewIssuePage() {
    return <IssueForm />
}
