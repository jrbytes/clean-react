import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /api\/surveys/
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET')
}
const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET')
}
const mockSuccess = (): void => {
  Http.mockOk(path, 'GET', 'survey-list')
}

describe('SurveyList', () => {
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

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
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
    cy.get('li:not(:empty)').should('have.length', 2)
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
    cy.get('header')
      .find('a')
      .should('contain.text', 'Sair')
      .click()
      .then(() => {
        Helper.testUrl('/login')
      })
  })

  it('should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[aria-label=day]').text(), '03')
      assert.equal(li.find('[aria-label=month]').text(), 'fev')
      assert.equal(li.find('[aria-label=year]').text(), '2018')
      assert.equal(li.find('p').text(), 'Question 1')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('img').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[aria-label=day]').text(), '20')
      assert.equal(li.find('[aria-label=month]').text(), 'out')
      assert.equal(li.find('[aria-label=year]').text(), '2020')
      assert.equal(li.find('p').text(), 'Question 2')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('img').attr('src'), icon.thumbDown)
      })
    })
  })
})
