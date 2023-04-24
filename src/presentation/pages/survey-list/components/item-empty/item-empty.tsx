import React from 'react'

import Styles from './styles.scss'

const ItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyItemEmptyWrap}></li>
      <li className={Styles.surveyItemEmptyWrap}></li>
      <li className={Styles.surveyItemEmptyWrap}></li>
    </>
  )
}

export default ItemEmpty
