/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/getSession";

export const dynamic = 'force-dynamic'
export default async function Home() {
  const session = await getSession();

  return (
    <HomeClient email={session?.user?.email!} />
  );
}
