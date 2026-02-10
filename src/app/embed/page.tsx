/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import EmbedClient from '@/components/EmbedClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

// YE LINE ADD KARO - build time pe pre-render nahi hoga
export const dynamic = 'force-dynamic'

async function page() {
    const session = await getSession()
    
    // Safety check add karo
    if (!session?.user?.id) {
        return <div>Please login to access this page</div>
    }
    
    return (
        <>
            <EmbedClient ownerId={session.user.id}/>
        </>
    )
}

export default page