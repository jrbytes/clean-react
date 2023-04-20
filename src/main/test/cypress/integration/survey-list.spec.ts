import faker from 'faker'

import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

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

  it('should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.get('header').find('span').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.get('header').find('a').should('contain.text', 'Sair').click()
    Helper.testUrl('/login')
  })
})
