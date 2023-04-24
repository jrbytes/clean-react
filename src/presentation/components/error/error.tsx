import React from 'react'

import Styles from './styles.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={Styles.errorWrap}>
      {error}
      <button onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
