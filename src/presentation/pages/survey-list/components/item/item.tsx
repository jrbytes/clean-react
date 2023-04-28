import React from 'react'
import { Link } from 'react-router-dom'

import { Calendar, Icon, IconName } from '@/presentation/components'
import Styles from './item-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  survey: LoadSurveyList.Model
}

const Item: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p>{survey.question}</p>
      </div>
      <footer>
        <Link to={`/surveys/${survey.id}`}>Ver resultado</Link>
      </footer>
    </li>
  )
}

export default Item
