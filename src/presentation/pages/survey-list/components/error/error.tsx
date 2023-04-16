import React, { useContext } from 'react'

import { Context } from '@/presentation/pages/survey-list/components'
import Styles from './item-styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <div className={Styles.errorWrap}>
      {state.error}
      <button>Recarregar</button>
    </div>
  )
}

export default Error
