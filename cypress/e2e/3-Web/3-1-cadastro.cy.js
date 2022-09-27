/// <reference types="cypress" />

const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.generateFixture()
        cy.visit('/cadastrar')
    })

    it("Deve poder cadastrar um usuário com sucesso", () => {
        cy.readFile("cypress/fixtures/newuser.json").then(usuario => {
            cy.cadastro(usuario.nome, usuario.email, usuario.senha)
            cy.get('[data-test="dashboard-welcome"]').should('contain', `Bem-vindo ${usuario.nome}`)
        })
        cy.get('.large').should('contain', 'Dashboard')
    })

    it("Deve jogar um erro ao cadastrar um usuário já existente", () => {

        cy.fixture("usuario").then((usuario) => {
            cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(usuario.nome)
            cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(usuario.email)
        })
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('eric1234')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('eric1234')
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')
    })

})


/*****
 * Cenario: Cadastrar o usuário com sucesso
 * Dado que eu esteja na tela de cadastro
 * Quando eu preencher os campos obrigatórios
 * Então deve redirecionar para o dashboard
 * 
*/