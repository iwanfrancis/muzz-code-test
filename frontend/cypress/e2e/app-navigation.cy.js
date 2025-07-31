describe('App Navigation and Core Features', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  })

  describe('Home Page', () => {
    it('should display the app logo and title', () => {
      cy.get('img[alt="Logo"]').should('be.visible')
      cy.get('h1').should('contain.text', 'Muzz')
      cy.get('p').should('contain.text', 'Connect and chat with your friends')
    })

    it('should show the current user', () => {
      cy.get('[data-testid="current-user"]').should('be.visible')
    })

    it('should display user lists with action buttons', () => {
      // Check "Select Current User" section
      cy.contains('Select Current User').should('be.visible')

      // Check "Message Someone" section
      cy.contains('Message Someone').should('be.visible')

      // Verify user cards are displayed
      cy.get('[data-testid="user-card"]').should('have.length.at.least', 3)

      // Check that each user card has name and profile image
      cy.get('[data-testid="user-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('img').should('have.attr', 'src')
          cy.get('h3').should('not.be.empty')
        })
      })
    })

    it('should allow switching between users', () => {
      // Find a user that is not the current user and switch to them
      cy.get('[data-testid="user-list-section"]')
        .contains('Select Current User')
        .parent()
        .within(() => {
          // Find a "Switch to" button (not "Current User")
          cy.contains('button', 'Switch to').first().click()
        })

      // Verify the URL changed to home (refresh effect)
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should navigate to chat when messaging a user', () => {
      // Click on a message button
      cy.get('[data-testid="user-list-section"]')
        .contains('Message Someone')
        .parent()
        .within(() => {
          cy.contains('button', 'Message').first().click()
        })

      // Should navigate to chat page
      cy.url().should('include', '/chat')
    })
  })
})
