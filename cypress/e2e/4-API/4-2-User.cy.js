/// <reference types="cypress" />
let token;

describe('Funcionalidade da API: User', () => {


    beforeEach(() => {
        cy.fixture('usuario').then(usuario => {
            cy.gerarToken(usuario.email, usuario.senha).then(tkn => {token = tkn})
        })
    })
    
    it("Validar cadastro de usuário", () => {
        const faker = require('faker-br')
        const email = faker.internet.email()
        cy.request('POST', 'api/users', {name: 'eric groppe', email, password: 'asdjiajsdi'})
        .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.to.have.property("jwt")
        })
    })

    it("Validar login de usuário", () => {
        cy.fixture('usuario').then(usuario => {
            cy.request('POST', 'api/auth', {email: usuario.email, password: usuario.senha})
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.to.have.property("jwt")
                expect(response.duration).to.be.lessThan(1000)
            })
        })
    })

    it("Validar perfil de usuário", () => {
        const options = {method: 'GET', url:  '/api/profile/me',
            headers: { cookie: token}
        }
        cy.request(options).then(res => {
            expect(res.body.user.name).to.be.eql("Eric Groppe")
            expect(res.body.skills[0]).to.be.eql("JavaScript")
        })
    })

    it.only("Adicionar experiencia", () => {
        const body = {
            title: 'Especialista em QA',
            company: 'Ambev',
            from: '2022-09-08'
        }
        
        const options = {method: 'PUT', url:  '/api/profile/experience',
            headers: { cookie: token},
            body
        }
        cy.request(options).then(res => {
            expect(res.status).to.be.eq(200)
            expect(res.body.experience).length.to.be.greaterThan(0)
        })
    })

})