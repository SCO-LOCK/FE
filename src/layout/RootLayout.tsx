import { Outlet, ScrollRestoration, useMatch } from 'react-router'
import TemporaryHeader from '../components/common/TemporaryHeader'
import { PATHS } from '../routes/paths'

export default function RootLayout() {
  const requestMatch = useMatch(PATHS.request)
  const resultMatch = useMatch(PATHS.result)

  return (
    <>
      <TemporaryHeader alignToPageGrid={Boolean(requestMatch || resultMatch)} />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
