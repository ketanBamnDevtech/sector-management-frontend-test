import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: user, mutate: mutateUser } = useSWR('/api/session', fetcher);
  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
