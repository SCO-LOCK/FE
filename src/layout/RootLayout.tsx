import { Outlet, ScrollRestoration } from 'react-router'
import TemporaryHeader from '../components/common/TemporaryHeader'

export default function RootLayout() {
  return (
    <>
      <TemporaryHeader />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}
