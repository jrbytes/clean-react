import React from 'react'

import Styles from './styles.scss'
import { SurveyResultAnswerModel } from '@/domain/models'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  return (
    <li className={[Styles.answerWrap, activeClassName].join(' ')}>
      {answer.image && (
        <img src={answer.image} alt={answer.answer} aria-label="image list" />
      )}
      <span className={Styles.answer} aria-label="answer span">
        {answer.answer}
      </span>
      <span className={Styles.percent} aria-label="percent span">
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
