import { type FC } from 'react'
import Image from 'next/image'
import { MENU_ITEMS } from '@constants'
import Link from 'next/link'
import './AsideMenu.css'

export const AsideMenu: FC = () => {
  return (
    <aside id="aside-menu" className="aside-menu">
      <div className="aside-menu__top">
        <Image
          className="aside-menu__logo"
          src="/images/logo.svg"
          alt="ap-logo"
          width={137}
          height={40}
          priority
        />
      </div>

      <nav className="aside-menu-nav">
        <ul className="aside-menu-nav__list">
          {MENU_ITEMS?.map((item, index) => (
            <li className="aside-menu-nav__item" key={`aside-${index}`}>
              <Link className="aside-menu-nav__link" href={item.href} title={item.title}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
