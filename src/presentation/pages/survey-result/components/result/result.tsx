import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'

import Styles from './styles.scss'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2>{surveyResult.question}</h2>
      </hgroup>
      <FlipMove className={Styles.answersList}>
        {surveyResult.answers.map((answer) => (
          <li
            key={answer.answer}
            className={answer.isCurrentAccountAnswer ? Styles.active : ''}
          >
            {answer.image && (
              <img
                src={answer.image}
                alt={answer.answer}
                aria-label="image list"
              />
            )}
            <span className={Styles.answer} aria-label="answer span">
              {answer.answer}
            </span>
            <span className={Styles.percent} aria-label="percent span">
              {answer.percent}%
            </span>
          </li>
        ))}
      </FlipMove>
      <button className={Styles.button} onClick={goBack}>
        Voltar
      </button>
    </>
  )
}

export default Result
