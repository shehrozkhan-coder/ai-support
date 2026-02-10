import { cookies } from "next/headers";
import { getScalekit } from "@/lib/scalekit";



export async function getSession() {
    const scalekit = getScalekit()
    
    const session = await cookies()
    const token = session.get("access_token")?.value
    if (!token){
        return null
    }
    try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result:any = await scalekit.validateToken(token)
    const user = await scalekit.user.getUser(result.sub)
    return user
    } catch (error) {
        console.log(error)
    }
}