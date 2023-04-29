import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
}
const mockSuccess = (): void => {
  Http.mockOk(path, 'GET', 'fx:survey-result')
}
const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET')
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

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.get('div')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )
      .find('button')
      .should('contain.text', 'Tentar novamente')
    mockSuccess()
    cy.get('div')
      .find('button')
      .should('contain.text', 'Tentar novamente')
      .click()
    cy.get('header').should('exist')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    const { name } = Helper.getLocalStorageItem('account')
    cy.get('header').find('span').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.get('header').find('a').should('contain.text', 'Sair').click()
    Helper.testUrl('/login')
  })

  it('should present survey items', () => {
    mockSuccess()
    cy.visit('/surveys/any_id')
    cy.get('hgroup').find('h2').should('have.text', 'Question 1')
    cy.get('hgroup').find('[aria-label="day"]').should('have.text', '03')
    cy.get('hgroup').find('[aria-label="month"]').should('have.text', 'fev')
    cy.get('hgroup').find('[aria-label="year"]').should('have.text', '2018')
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[aria-label="answer span"]').text(), 'any_answer')
      assert.equal(li.find('[aria-label="percent span"]').text(), '70%')
      assert.equal(
        li.find('[aria-label="image list"]').attr('src'),
        'any_image'
      )
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[aria-label="answer span"]').text(), 'any_answer_2')
      assert.equal(li.find('[aria-label="percent span"]').text(), '30%')
      assert.notExists(li.find('[aria-label="image list"]'))
    })
  })
})
