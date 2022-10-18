/// <reference types="cypress" />

const expPage = require('../../support/pages/add-experience.page')

describe('Funcionalidade: adicionar experiencia', () => {


    beforeEach(() => {
        cy.visit('/login')
        cy.fixture("usuario").then((usuario) => {
            cy.login(usuario.email, usuario.senha)    
        })
    })
    
    it("Adiciona experiencia", () => {
        cy.get('[data-test="dashboard-addExperience"]').click()
        expPage.adicionarExperiencia('Analista QA', 'Ambevtech', 'Blumenau', '20/07/2021', ' ', 'Descricao', true)
    })
})