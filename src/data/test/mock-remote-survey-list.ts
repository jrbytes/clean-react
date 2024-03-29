import { faker } from '@faker-js/faker'

import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyModal = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString(),
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModal(),
  mockRemoteSurveyModal(),
  mockRemoteSurveyModal(),
]
