/**
 * syncing a user to our data base !!!!
 * when a user login we'r gonna send them to the dashboard 
 * once they are in the dashboard , we are gonna check
 * is the user in our data base ? 
 * yes: everything is fine ,
 * no : then data will be sent to a page 'auth-callback'
 * and this auth.. will sync user to the data base 
 * and we will sent the user to the clint side dashboard
 */
import Dashboard from "@/components/Dashboard"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=dashboard')

    //   const subscriptionPlan = await getUserSubscriptionPlan()

    //   return <Dashboard subscriptionPlan={subscriptionPlan} />


    return <Dashboard />

}

export default Page

//this page is done!