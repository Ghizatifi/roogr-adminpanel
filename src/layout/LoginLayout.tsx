import LoginHeader from '../components/Header/LoginHeader'
import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <div>
        <LoginHeader/>
        <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
    </div>
  )
}
