import React, { memo, MouseEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { Logo, currentAccountState } from '@/presentation/components'
import Styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const handleLogout = (event: MouseEvent): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>{getCurrentAccount().name}</span>
          <a href="#" onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
