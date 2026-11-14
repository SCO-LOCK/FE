import { Outlet, ScrollRestoration, useMatch } from 'react-router'
import TemporaryHeader from '../components/common/TemporaryHeader'

export default function RootLayout() {
  const isCommonComponentsPage = useMatch('/common_components') !== null

  return (
    <>
      {!isCommonComponentsPage && <TemporaryHeader />}
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
