import React, { useEffect, useState } from 'react'

import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
  })

  useEffect(() => {
    function load(): void {
      loadSurveyList
        .loadAll()
        .then((surveys) => {
          setState({ ...state, surveys })
        })
        .catch((error) => {
          setState({ ...state, error: error.message })
        })
    }
    load()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error ? (
          <div>{state.error}</div>
        ) : (
          <ul>
            {state.surveys.length > 0 ? (
              state.surveys.map((survey: SurveyModel) => (
                <SurveyItem key={survey.id} survey={survey} />
              ))
            ) : (
              <SurveyItemEmpty />
            )}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
