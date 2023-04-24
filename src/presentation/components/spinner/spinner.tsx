/* eslint-disable react/prop-types */
import React from 'react'

import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({
  isNegative,
  className,
  ...rest
}: Props) => {
  const negativeClass = isNegative ? Styles.negative : ''

  return (
    <div
      {...rest}
      data-testid="spinner"
      className={[Styles.spinner, negativeClass, className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
