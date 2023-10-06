import { AppRouter } from '@/trpc'
import { createTRPCReact } from "@trpc/react-query"
import exp from "constants"


export const trpc = createTRPCReact<AppRouter>({})