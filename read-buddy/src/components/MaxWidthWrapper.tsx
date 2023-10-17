/**the whole purpose of this component is 
 * 1. to be reuseable.
 * 2. make spacing on the left and right side of all the pages same 
 * 3. className is optional but the problem is if we give input to the className 
 *    when we'r gonna use this wrapper , our auto class name probably going to be 
 *    overwriten , to fix that we are gonna define a custom utility funciton in 'utils.ts'
 * 4. we are setting our defult value as the first argument to our utlity fn.. CN and using 
 *    className as a additional input , thus it cannot get overwriten 
 *  
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";


const MaxWidthWrapper = ({ className, children }: { className?: string, children: ReactNode }) => {
    return (
        <div className={cn(" mx-auto w-full max-w-screen-xl px-3 md:px-20", className)}>
            {children}
        </div>

    )
}
export default MaxWidthWrapper