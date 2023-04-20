import faker from 'faker'

import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
// import {} from ''

describe('login', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName(),
    })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')

    cy.get('div')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
      .find('button')
      .should('contain.text', 'Tentar novamente')
  })
})
