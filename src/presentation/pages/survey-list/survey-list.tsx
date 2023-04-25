import React, { useEffect, useState } from 'react'

import { Footer, Header, Error } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import { List } from '@/presentation/pages/survey-list/components'
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

  const reload = (): void =>
    setState((old) => ({
      surveys: [],
      error: '',
      reload: !old.reload,
    }))

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
        {state.error ? (
          <Error error={state.error} reload={reload} />
        ) : (
          <List surveys={state.surveys} />
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
