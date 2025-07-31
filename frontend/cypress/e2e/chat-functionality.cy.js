describe('Chat Functionality', () => {
  beforeEach(() => {
    // Start from home and navigate to chat
    cy.visit('/')
    cy.get('[data-testid="user-list-section"]')
      .contains('Message Someone')
      .parent()
      .within(() => {
        cy.contains('button', 'Message').first().click()
      })
  })

  describe('Message Input and Sending', () => {
    it('should allow typing in the message input', () => {
      cy.get('[data-testid="chat-input"]')
        .find('input, textarea')
        .should('be.visible')
        .type('Hello, this is a test message!')
        .should('have.value', 'Hello, this is a test message!')
    })

    it('should send a message when form is submitted', () => {
      const testMessage = 'Test message from Cypress'

      cy.get('[data-testid="chat-input"]').within(() => {
        cy.get('input, textarea').type(testMessage)
        cy.get('input, textarea').type('{enter}')
      })

      // Verify the message appears in the message list
      cy.get('[data-testid="message-list"]').should('contain.text', testMessage)
    })

    it('should clear input after sending a message', () => {
      const testMessage = 'Message that should be cleared'

      cy.get('[data-testid="chat-input"]').within(() => {
        cy.get('input, textarea').type(testMessage)
        cy.get('input, textarea').type('{enter}')

        // Input should be cleared
        cy.get('input, textarea').should('have.value', '')
      })
    })
  })

  describe('Message Display', () => {
    it('should display messages in the message list', () => {
      // Send a test message first
      const testMessage = 'Display test message'

      cy.get('[data-testid="chat-input"]').within(() => {
        cy.get('input, textarea').type(testMessage)
        cy.get('input, textarea').type('{enter}')
      })

      // Check that message appears
      cy.get('[data-testid="message-list"]')
        .should('be.visible')
        .and('contain.text', testMessage)
    })

    it('should distinguish between sent and received messages', () => {
      // Send a message from current user
      cy.get('[data-testid="chat-input"]').within(() => {
        cy.get('input, textarea').type('Sent message test')
        cy.get('input, textarea').type('{enter}')
      })

      // Check that the message has appropriate styling for sent messages
      cy.get('[data-testid="message-item"]')
        .last()
        .should('have.class', 'self-end') // Assuming sent messages are right-aligned
    })
  })

  describe('Chat Header', () => {
    it('should display recipient information', () => {
      cy.get('[data-testid="chat-header"]').within(() => {
        // Should show recipient name and profile
        cy.get('h2, h3').should('not.be.empty')
        cy.get('img').should('have.attr', 'src')
      })
    })

    it('should have a back button that navigates to home', () => {
      cy.get('[data-testid="chat-header"]').within(() => {
        cy.get('[data-testid="back-button"]').click()
      })

      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('Real-time Messaging (WebSocket)', () => {
    it('should maintain WebSocket connection', () => {
      // This test verifies that WebSocket connection is established
      // In a real scenario, you might mock WebSocket or test with multiple browser instances

      // Send a message and verify it appears (indicates WebSocket is working)
      cy.get('[data-testid="chat-input"]').within(() => {
        cy.get('input, textarea').type('WebSocket test message')
        cy.get('input, textarea').type('{enter}')
      })

      // Message should appear immediately (real-time)
      cy.get('[data-testid="message-list"]').should(
        'contain.text',
        'WebSocket test message'
      )
    })
  })

  describe('Multiple Messages Flow', () => {
    it('should handle sending multiple messages in sequence', () => {
      const messages = ['First message', 'Second message', 'Third message']

      messages.forEach((message, index) => {
        cy.get('[data-testid="chat-input"]').within(() => {
          cy.get('input, textarea').type(message)
          cy.get('input, textarea').type('{enter}')
        })

        // Verify message appears
        cy.get('[data-testid="message-list"]').should('contain.text', message)
      })

      // Verify all messages are present
      messages.forEach((message) => {
        cy.get('[data-testid="message-list"]').should('contain.text', message)
      })
    })
  })
})
