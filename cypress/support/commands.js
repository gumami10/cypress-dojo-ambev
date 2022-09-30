// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('preencher_perfil', (job, company, webSite, location, skills, gitHub, bio) => {
    cy.get('#mui-component-select-status').click()
    cy.get('.MuiList-root').find(`li[data-value='${job}']`).click()
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(company)
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(webSite)
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(location)
    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(skills)
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(gitHub)
    cy.get('[data-test="profile-bio"] > .MuiInputBase-root').type(bio)
    cy.get('[data-test="profile-submit"]').click()
})

Cypress.Commands.add('generateFixture', () => {
    const faker = require('faker-br')
    const nome = `${faker.name.firstName()} ${faker.name.lastName()}`
    const email = faker.internet.email(nome)
    cy.writeFile('cypress/fixtures/newuser.json', {
        'nome':`${nome}`,
        'email':`${email}`,
        'senha':`eric1234`,
    })
})

Cypress.Commands.add('cadastro', (nome, email, senha) => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('gerarToken', (email, senha) => {
    cy.request('POST', 'api/auth', {email, password:senha})
    .then((response) => {
        return response.body.jwt
    })
})