/// <reference types="cypress" />

describe('Funcionalidade: Criar perfil', () => {

    beforeEach(() => {
        cy.generateFixture()
        cy.visit('/cadastrar')
        cy.readFile("cypress/fixtures/newuser.json").then(usuario => {
            cy.cadastro(usuario.nome, usuario.email, usuario.senha)
        })

    })
    
    it('Deve criar perfil com sucesso', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.preencher_perfil('QAE Pleno', 'Ambev', 'http://www.ambevtech.com', 'São Paulo', 'JavaScript, NodeJS, Python, Java', 'gumami10', 'Eae')

        cy.get('[data-test="dashboard-deleteProfile"]').should('exist')
    });

    it('Deve validar mensagem de URL errada', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()

        cy.preencher_perfil('QAE Pleno', 'Ambev', 'ericlândia', 'São Paulo', 'JavaScript, NodeJS, Python, Java', 'gumami10', 'Eae')

        cy.get('.MuiFormHelperText-root').should('contain', 'Digite uma url válida')
    });

})


/*****
 * Cenario: Fazer o login do usuário com sucesso
 * Dado que eu esteja na tela de login
 * Quando eu preencher os campos com um usuário existente
 * Então deve redirecionar para o dashboard
 * 
*/