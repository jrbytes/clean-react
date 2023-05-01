import React from 'react'

import { Spinner } from '@/presentation/components'
import Styles from './form-status-styles.scss'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }) => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {state.mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
