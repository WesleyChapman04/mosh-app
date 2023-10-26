import { Skeleton } from '@/app/components'
import { Box, Card } from '@radix-ui/themes'

export default function LoadingIssueId() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <div className='flex space-x-3 my-2'>
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />
            </div>
            <Card className='prose mt-4'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}
