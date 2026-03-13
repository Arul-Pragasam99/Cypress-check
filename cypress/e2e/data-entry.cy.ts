/// <reference types="cypress" />

describe('Data entry form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows errors when required fields are empty', () => {
    cy.get('[data-testid="submit-entry"]').click()

    cy.get('[data-testid="error-name"]').should('contain', 'Name is required')
    cy.get('[data-testid="error-email"]').should('contain', 'Email is required')
    cy.get('[data-testid="error-age"]').should('contain', 'Age is required')
    cy.get('[data-testid="error-birthdate"]').should('contain', 'Date of birth is required')
    cy.get('[data-testid="error-amount"]').should('contain', 'Amount is required')
  })

  it('validates email and number fields', () => {
    cy.get('[data-testid="field-name"]').type('Cypress Test')
    cy.get('[data-testid="field-email"]').type('invalid-email')
    cy.get('[data-testid="field-age"]').type('-5')
    cy.get('[data-testid="field-birthdate"]').type('2024-01-01')
    cy.get('[data-testid="field-amount"]').type('-10')

    cy.get('[data-testid="submit-entry"]').click()

    cy.get('[data-testid="error-email"]').should('contain', 'Email must be a valid address')
    cy.get('[data-testid="error-age"]').should('contain', 'Age must be greater than 0')
    cy.get('[data-testid="error-amount"]').should('contain', 'Amount must be 0 or higher')
  })

  it('submits valid data (including image) and shows it in the submission table', () => {
    cy.get('[data-testid="field-name"]').clear().type('Cypress QA')
    cy.get('[data-testid="field-email"]').clear().type('qa@cypress.io')
    cy.get('[data-testid="field-age"]').clear().type('28')
    cy.get('[data-testid="field-birthdate"]').clear().type('1998-05-15')
    cy.get('[data-testid="field-amount"]').clear().type('123.45')

    cy.fixture('sample.png', 'base64').then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/png')
      const testFile = new File([blob], 'sample.png', { type: 'image/png' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(testFile)

      cy.get('[data-testid="field-image"]').then((input) => {
        const el = input[0] as HTMLInputElement
        el.files = dataTransfer.files
        cy.wrap(el).trigger('change', { force: true })
      })
    })

    cy.get('[data-testid="submit-entry"]').click()

    cy.get('[data-testid="no-submissions"]').should('not.exist')
    cy.get('[data-testid="submissions-table"]').should('be.visible')

    cy.get('[data-testid^="submission-"]')
      .first()
      .within(() => {
        cy.contains('Cypress QA')
        cy.contains('qa@cypress.io')
        cy.contains('28')
        cy.contains('1998-05-15')
        cy.contains('123.45')
        cy.contains('sample.png')
      })
  })
})
