import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
}

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.get('div')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
      .find('button')
      .should('contain.text', 'Tentar novamente')
  })
})
