import React from 'react'
import { useHistory } from 'react-router-dom'

import Styles from './styles.scss'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { Answer } from '@/presentation/pages/survey-result/components'

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
      <ul className={Styles.answersList}>
        {surveyResult.answers.map((answer) => (
          <Answer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button className={Styles.button} onClick={goBack}>
        Voltar
      </button>
    </>
  )
}

export default Result
