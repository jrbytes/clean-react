import React, { useContext } from 'react'

import { Context } from '@/presentation/pages/survey-list/components'
import Styles from './item-styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(Context)
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      {state.error}
      <button onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
