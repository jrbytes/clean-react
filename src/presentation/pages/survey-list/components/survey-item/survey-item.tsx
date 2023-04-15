import React from 'react'

import { Icon, IconName } from '@/presentation/components'
import Styles from './survey-item-styles.scss'
import { SurveyModel } from '@/domain/models'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={Styles.iconWrap} />
        <time>
          <span aria-label="day" className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span aria-label="month" className={Styles.month}>
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .substring(0, 3)}
          </span>
          <span aria-label="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p>{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}

export default SurveyItem
