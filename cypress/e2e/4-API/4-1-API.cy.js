/// <reference types="cypress" />

describe('Funcionalidade: API', () => {

    const dojo = {
        aula: "API",
        duracao: 3,
        professor: "Renato"
    }

    it("Validar Dojo", () => {
        expect(dojo.aula).to.equal('API')
        expect(dojo.duracao).to.be.a("number");
        expect(dojo.duracao).to.be.greaterThan(1);
        expect(dojo.professor).to.be.eq("Renato");
    })

    const numero = [0, 2, 4, 6, 8, 10]

    it("Validar Dojo 2", () => {
        expect(numero).to.have.lengthOf(6)
    })

    const alunos = [{
        usuario: "william", cargo: "qa"
    },{
        usuario: "graciane", cargo: "qa"
    }]

    it('Validar alunos', () => {
        expect(alunos[0].usuario).to.be.eql("william")
    })
})
