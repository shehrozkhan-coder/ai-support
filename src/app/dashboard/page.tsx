/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

export const dynamic = 'force-dynamic'

async function  page() {
  const session = await getSession()
  
  return (
    <>
<DashboardClient ownerId={session?.user?.id!} />

    </>
  )
}

export default page
 