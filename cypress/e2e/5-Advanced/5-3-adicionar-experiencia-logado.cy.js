/// <reference types="cypress" />

const expPage = require('../../support/pages/add-experience.page')

import user from '../../fixtures/usuario.json'

describe('Funcionalidade: adicionar experiencia já logado', () => {

    beforeEach(() => {
        cy.gerarToken(user.email, user.senha).then(tkn => {
            Cypress.env('token', tkn)
        })
    })
    
    it("acessar o perfil logado", () => {
        cy.clearCookies()
        cy.setCookie('jwt', Cypress.env('token'))

        cy.visit('/adicionar-experiencia')
        
    })
})