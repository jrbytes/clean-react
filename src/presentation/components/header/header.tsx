import React, { memo, MouseEvent, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const logout = (event: MouseEvent): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>{getCurrentAccount().name}</span>
          <a href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
