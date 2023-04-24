import React, { useEffect, useState } from 'react'

import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  Context,
  Error,
  List,
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handlerError = useErrorHandler((error: Error) => [
    setState((old) => ({ ...old, error: error.message })),
  ])
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  })

  useEffect(() => {
    function load(): void {
      loadSurveyList
        .loadAll()
        .then((surveys) => {
          setState((old) => ({ ...old, surveys }))
        })
        .catch(handlerError)
    }
    load()
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <Context.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </Context.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
