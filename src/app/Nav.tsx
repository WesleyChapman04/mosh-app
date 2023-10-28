'use client'

import { Box, Container, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <nav className=' border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <AiFillBug />
                        <ul className=' flex space-x-6'>
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        className={classnames({
                                            'text-zinc-900':
                                                link.href === currentPath,
                                            'text-zinc-500':
                                                link.href !== currentPath,
                                            'hover:text-zinc-800 transition-colors':
                                                true,
                                        })}
                                        href={link.href}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && (
                            <button onClick={() => signOut()}>Log Out</button>
                        )}
                        {status === 'unauthenticated' && (
                            <button onClick={() => signIn()}>Login</button>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}
export default NavBar
