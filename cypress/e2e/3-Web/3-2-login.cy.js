/// <reference types="cypress" />
const faker = require('faker-br')


describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it("Deve poder fazer o login com sucesso", () => {
        cy.fixture("usuario").then((usuario) => {
            cy.login(usuario.email, usuario.senha)    
            cy.get('[data-test="dashboard-welcome"]').should('contain', `Bem-vindo ${usuario.nome}`)
            cy.get('.large').should('contain', 'Dashboard')
        })
    })

    it("Usuário deve falhar quando jogar credenciais inválidas", () => {
        cy.login(faker.internet.email(), "senha123")
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    })

})


/*****
 * Cenario: Fazer o login do usuário com sucesso
 * Dado que eu esteja na tela de login
 * Quando eu preencher os campos com um usuário existente
 * Então deve redirecionar para o dashboard
 * 
*/