/// <reference types="cypress" />

describe('Funcionalidade com Intercept', () => {


    beforeEach(() => {
        cy.visit('/perfis')
    })
    
    it("Usando intercept para pegar o primeiro da lista", () => {
        cy.fixture("perfis").then((body) => {
            cy.intercept('GET', 'api/profile', {
                statusCode: 200,
                body
            })
        })

        cy.reload()

        cy.get('[data-test="profile-name"]').first().should('have.text', 'Paulo Guerra')
    })

    it("Usando intercept para pegar o ultimo da lista", () => {
        cy.fixture("perfis").then((body) => {
            cy.intercept('GET', 'api/profile', {
                statusCode: 200,
                body
            })
        })

        cy.reload()

        cy.get('[data-test="profile-name"]').last().should('have.text', 'Wedney Santos Silva')
    })

    it('deve exibir o terceiro item da lista', () => {
        cy.intercept('**/api/profile**').as('getperfil')
        cy.reload()

        cy.wait('@getperfil')
        cy.get('[data-test="profile-name"]').eq(2).should('have.text', 'Pa Sun')
    });


})