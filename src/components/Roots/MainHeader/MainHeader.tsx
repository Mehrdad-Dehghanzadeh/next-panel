'use client'
import { type FC } from 'react'
import { logout, goHome } from '@utils'
import { HomeIcon, ExitIcon } from '@radix-ui/react-icons'
import './MainHeader.css'

export const MainHeader: FC = () => {
  return (
    <header id="main-header" className="main-header">
      <span></span>

      <ul className="main-header-actions">
        <li className="main-header-actions__item home" onClick={goHome}>
          <HomeIcon />
          <span className="main-header-actions__title">خانه</span>
        </li>

        <li className="main-header-actions__item logout" onClick={logout}>
          <ExitIcon />
          <span className="main-header-actions__title">خروج از سامانه</span>
        </li>
      </ul>
    </header>
  )
}
