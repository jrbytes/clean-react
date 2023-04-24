import React from 'react'
import FlipMove from 'react-flip-move'

import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading } from '@/presentation/components'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual sua linguagem de programação favorita?</h2>
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
