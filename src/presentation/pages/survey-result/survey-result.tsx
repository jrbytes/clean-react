import React, { useState } from 'react'
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

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  })

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>
                Qual sua linguagem de programação favorita? Qual sua linguagem
                de programação favorita? Qual sua linguagem de programação
                favorita?
              </h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
              <li>
                <img src="https://legacy.reactjs.org/logo-og.png" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://legacy.reactjs.org/logo-og.png" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="https://legacy.reactjs.org/logo-og.png" alt="" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
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
