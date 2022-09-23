/// <reference types="cypress" />

const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('/cadastrar')
    })

    it("Deve poder cadastrar um usuário com sucesso", () => {
        const nome = `${faker.name.firstName()} ${faker.name.lastName()}`
        const email = faker.internet.email(nome)
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('eric1234')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('eric1234')
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="dashboard-welcome"]').should('contain', `Bem-vindo ${nome}`)
        cy.get('.large').should('contain', 'Dashboard')
    })

})


/*****
 * Cenario: Cadastrar o usuário com sucesso
 * Dado que eu esteja na tela de cadastro
 * Quando eu preencher os campos obrigatórios
 * Então deve redirecionar para o dashboard
 * 
*/