import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
}
const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET')
}

describe('login', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
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
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.get('header').find('span').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.get('header').find('a').should('contain.text', 'Sair').click()
    Helper.testUrl('/login')
  })
})
