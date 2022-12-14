class SignupPage {

    //essa funcao acessa o formulario
    go(){
        cy.viewport (1440, 900)
        cy.visit('https://buger-eats-qa.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
    }

    //essa funcao preencher o formulario
    fillForm(entregador){
        cy.get('input[name="fullName"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        //abaixo o localizador é input mas é button, por isso seu localizador tem duas propriedade nos []
        cy.get('input[type=button][value="Buscar CEP"]').click()
        //a seguir vamos validar que o auto complete funcionou usando have.value
        cy.get('input[name="address"]').should('have.value',entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value',entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value',entregador.endereco.cidade_uf)
        //agora iremos preencher os outros campos do endereco
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
        //a baixo nao se esqueca do . antes do delivery
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        /*o proximo elemento é para fazer upload de imagem, o ^significa 'comeca com', o $ significa 'termina com' 
        e o * significa 'contem', sao expressoes regulares basicas para encontrar elementos no html
        além disso é interessante ver que o cypress busca pelo arquivo na pasta >fixture< apenas pelo seu nome, 
        se quiser pode organizar os arquivos em pastas, porém precisa colocar o nome da pasta na variavel que irá buscar. exe: /imagens/ */

        cy.get('input[accept*="image"]').attachFile('/imagens/'+entregador.cnh) 
    }

    //essa funcao envia o formulario
    submit(){
        cy.get('form button[type="submit"]').click()
    }

    //essa funcao verifica a submissao
    modalContentShouldbe (expectedMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldbe (expectedMessage){
        //cy.get('.alert-error').should('have.text',expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}

export default SignupPage;