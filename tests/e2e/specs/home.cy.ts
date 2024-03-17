describe('Home', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Join the Rooftop Revolution with')
  })
})
