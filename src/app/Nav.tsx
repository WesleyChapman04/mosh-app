'use client'

import { Skeleton } from '@/app/components'
import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    Flex,
    Text,
} from '@radix-ui/themes'
import classnames from 'classnames'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

export default function NavBar() {
    return (
        <nav className=' border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href='/'>
                            <AiFillBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

function NavLinks() {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <ul className=' flex space-x-6'>
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        className={classnames({
                            'nav-link': true,
                            '!text-zinc-900': link.href === currentPath,
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

function AuthStatus() {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton width={'3rem'} />

    if (status === 'unauthenticated')
        return (
            <button className='nav-link' onClick={() => signIn()}>
                Login
            </button>
        )

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback='?'
                        size={'3'}
                        radius='full'
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size={'2'}>{session!.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item onClick={() => signOut()}>
                        Sign Out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}
