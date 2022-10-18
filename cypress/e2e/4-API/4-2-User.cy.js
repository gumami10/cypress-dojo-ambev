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

    it("Adicionar experiencia", () => {
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

    it("pegar usuario logado", () => {
        
        const options = {method: 'GET', url:  '/api/auth',
            headers: { cookie: token}
        }
        cy.request(options).then(res => {
            expect(res.status).to.be.eq(200)
            expect(res.body._id).length.to.be.greaterThan(0)
            expect(res.body.email).to.be.eq("eric.lepore@ambevtech.com.br")
        })
    })

    it("deleta experiencia", () => {
        let len;
        const optionsGet = {method: 'GET', url:  '/api/profile/me',
            headers: { cookie: token}
        }
        cy.request(optionsGet).then(res => {
            len = res.body.experience.length
            const optionsDelete = {method: 'DELETE', url:  `/api/profile/experience/${res.body.experience[0]._id}`,
                headers: { cookie: token}
            }
            return cy.request(optionsDelete)
        }).then(res => {
            expect(res.body.experience.length).to.be.eq(len - 1)
            expect(res.status).to.be.eq(200)
        })
    })

    it("adicionar educação", () => {
        const body = {
            "school": "FATEC",
            "degree": "Associate",
            "fieldofstudy": "ADS",
            "from": "2018-01-01",
            "to": "2021-01-07",
            "current": false,
            "description": "ADS"
        }

        const options = {method: 'PUT', url:  '/api/profile/education',
            headers: { cookie: token},
            body
        }
        cy.request(options).then(res => {
            expect(res.status).to.be.eq(200)
            expect(res.body._id).length.to.be.greaterThan(0)
            expect(res.body.education.length).to.be.greaterThan(0)
        })
    })
    it.only("deletar educação", () => {
        let len;
        const optionsGet = {method: 'GET', url:  '/api/profile/me',
            headers: { cookie: token}
        }
        cy.request(optionsGet).then(res => {
            len = res.body.education.length
            const optionsDelete = {method: 'DELETE', url:  `/api/profile/education/${res.body.education[0]._id}`,
                headers: { cookie: token}
            }
            return cy.request(optionsDelete)
        }).then(res => {
            expect(res.body.education.length).to.be.eq(len - 1)
            expect(res.status).to.be.eq(200)
        })
        
    })


})