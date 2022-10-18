// class ExperiencePage {
//     get #posicao(){
//         return cy.get('[data-test="experience-title"]')
//     }

//     get #empresa(){
//         return cy.get('[data-test="experience-company"]')
//     }

//     get #localizacao(){
//         return cy.get('[data-test="experience-location"]')
//     }

//     get #inicio(){
//         return cy.get('#from')
//     }

//     get #fim(){
//         return cy.get('#to')
//     }

//     get #desc(){
//         return cy.get('[data-test="experience-description"]')
//     }

//     get #enviar(){
//         return cy.get('[data-test="experience-submit"]')
//     }

//     get #atual(){
//         return cy.get('.jss6')
//     }

//     adicionarExperiencia(posicao, empresa, localizacao, inicio, fim, desc, atual) {
//         this.#posicao().type(posicao)
//         this.#empresa().type(empresa)
//         this.#localizacao().type(localizacao)
//         this.#inicio().type(inicio)
//         this.#fim().type(fim)
//         this.#desc().type(desc)

//         if(atual) {
//             this.#atual.check()
//         }
//     }
// }

class ExperiencePage {
    #posicao(posicao){
        return cy.get('[data-test="experience-title"]').type(posicao)
    }

    #empresa(empresa){
        return cy.get('[data-test="experience-company"]').type(empresa)
    }

    #localizacao(local){
        return cy.get('[data-test="experience-location"]').type(local)
    }

    #inicio(inicio){
        return cy.get('#from').type(inicio)
    }

    #fim(fim){
        return cy.get('#to').type(fim)
    }

    #desc(desc){
        return cy.get('[data-test="experience-description"]').type(desc)
    }

    #enviar(){
        return cy.get('[data-test="experience-submit"]').click()
    }

    #atual(){
        return cy.get('.MuiFormControlLabel-root').click()
    }

    adicionarExperiencia(posicao, empresa, localizacao, inicio, fim, desc, atual) {
        this.#posicao(posicao)
        this.#empresa(empresa)
        this.#localizacao(localizacao)
        this.#inicio(inicio)
        this.#fim(fim)
        this.#desc(desc)

        if(atual) {
            this.#atual()
        }

        this.#enviar()
    }
}

module.exports = new ExperiencePage()
// export default new ExperiencePage()