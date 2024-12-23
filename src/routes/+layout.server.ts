import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession()
  return {
    session,
    user,
    cookies: cookies.getAll()
  }
}) satisfies LayoutServerLoad