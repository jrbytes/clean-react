import React, { useContext } from 'react'

import Styles from './list-styles.scss'
import { SurveyModel } from '@/domain/models'
import {
  Context,
  Item,
  ItemEmpty,
} from '@/presentation/pages/survey-list/components'

const List: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <ul className={Styles.listWrap}>
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <Item key={survey.id} survey={survey} />
        ))
      ) : (
        <ItemEmpty />
      )}
    </ul>
  )
}

export default List
