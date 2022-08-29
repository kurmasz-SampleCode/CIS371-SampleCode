describe('Authors page', () => {

  beforeEach(() => {
    cy.request('http://localhost:3001/initTest').should((response) => {
      expect(response.status).to.eq(204)
    })
  })

  it('loads the list of authors', () => {
    cy.visit('http://localhost:3000')
    cy.get('.author-list tbody tr').should('have.length', 3)
    let expectedData = ['George', 'Washington', 'george@washington.com',
      'John', 'Adams', 'john@adams.com', 'Thomas', 'Jefferson', 'thomas@jefferson.com']
    expectedData.forEach((item) => {
      cy.get('.author-list tbody tr').contains('td', item)
    })
  })

  it('initially displays the "Create" form', () => {
    cy.visit('http://localhost:3000')
    cy.get('#create-button')
    cy.get('#save-button').should('not.exist')
    cy.get('#cancel-button').should('not.exist')
  })

  it('initially displays an empty form', () => {
    cy.visit('http://localhost:3000');
    ['#fname', '#lname', '#email'].forEach((id) => cy.get(id).invoke('val').should('equal', ''))
  })

  it('adds new authors', () => {
    cy.visit('http://localhost:3000')
    cy.get('.author-list tbody tr').should('have.length', 3)
    cy.get('#fname').type('James')
    cy.get('#lname').type('Madison')
    cy.get('#email').type('james@madison.com')
    cy.get('#create-button').click()
    cy.get('.author-list tbody tr').should('have.length', 4)
    cy.get('.author-list tbody tr').contains('td', 'James')
    cy.get('.author-list tbody tr').contains('td', 'Madison')
    cy.get('.author-list tbody tr').contains('td', 'james@madison.com')
  })

  it('clears the form after adding a new author', () => {
    cy.visit('http://localhost:3000')
    cy.get('#fname').type('James')
    cy.get('#lname').type('Madison')
    cy.get('#email').type('james@madison.com')
    cy.get('#create-button').click()
    cy.get('.author-list tbody tr').should('have.length', 4);
    ['#fname', '#lname', '#email'].forEach((id) => cy.get(id).invoke('val').should('equal', ''))
  })

  it('populates the author form when clicking "edit"', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-id="2"] .edit-author').click()
    cy.get('#fname').invoke('val').should('equal', 'John')
    cy.get('#lname').invoke('val').should('equal', 'Adams')
    cy.get('#email').invoke('val').should('equal', 'john@adams.com')
  })

  it('switches to "edit" mode when clicking "edit"', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-id="2"] .edit-author').click()
    cy.get('#save-button')
    cy.get('#cancel-button')
    cy.get('#create-button').should('not.exist')
  })


  it('allows first name to be changed', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-id="2"] .edit-author').click()
    cy.get('#fname').clear().type('Fred')
    cy.get('#save-button').click()
    cy.get('.author-list tbody tr').should('have.length', 3);
    cy.get('[data-id="2"]').contains('td', 'Fred') 
    cy.get('[data-id="2"]').contains('td', 'Adams') 
    cy.get('[data-id="2"]').contains('td', 'john@adams.com') 
  })

  it('allows last name to be changed', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-id="2"] .edit-author').click()
    cy.get('#lname').clear().type('Smith')
    cy.get('#save-button').click()
    cy.get('.author-list tbody tr').should('have.length', 3);
    cy.get('[data-id="2"]').contains('td', 'John') 
    cy.get('[data-id="2"]').contains('td', 'Smith') 
    cy.get('[data-id="2"]').contains('td', 'john@adams.com') 
  })

  it('returns the form to "create" mode when "Cancel" is pressed', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-id="2"] .edit-author').click()
    cy.get('#fname').clear().type('Fred')
    cy.get('#lname').clear().type('Smith')
    cy.get('#cancel-button').click()
    cy.get('#create-button')
    cy.get('#save-button').should('not.exist')
    cy.get('#cancel-button').should('not.exist')
  })
})