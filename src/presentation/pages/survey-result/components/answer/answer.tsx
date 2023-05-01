import React from 'react'
import { useRecoilValue } from 'recoil'

import Styles from './styles.scss'
import { SurveyResultAnswerModel } from '@/domain/models'
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/components'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)

  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) return
    onAnswer(answer.answer)
  }

  return (
    <li
      onClick={answerClick}
      className={[Styles.answerWrap, activeClassName].join(' ')}
    >
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
