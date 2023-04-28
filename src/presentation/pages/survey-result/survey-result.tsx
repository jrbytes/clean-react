import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

import Styles from './styles.scss'
import {
  Calendar,
  Footer,
  Header,
  Loading,
  Error,
} from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const handlerError = useErrorHandler((error: Error) => [
    setState((old) => ({ ...old, surveyResult: null, error: error.message })),
  ])
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  })

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })))
      .catch(handlerError)
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2>{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              {state.surveyResult.answers.map((answer) => (
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
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
