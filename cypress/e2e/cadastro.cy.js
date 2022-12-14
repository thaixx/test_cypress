import { cyan } from "colorette"
import SignupPage from "../pages/SignupPage"
import SignupFactory from "../factories/SignupFactory"

describe ('Cadastro', function(){
    //function(){} é igual ao arrow function ()=>{} que será usado abaixo

    /*beforeEach(()=>{
        cy.fixture('entregador').then((massa)=>{
                this.entregador = massa

        })
    })*/
    
    var signup = new SignupPage()
    it('O usuário deve se tornar um entregador', ()=>{
        
        var entregador = SignupFactory.entregador()

        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldbe(expectedMessage)

    })
    it('CPF INCORRETO', ()=>{

        var entregador = SignupFactory.entregador()
        entregador.cpf = '00000000000'

        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldbe('Oops! CPF inválido')
  
    })
    it('EMAIL INCORRETO', ()=>{

        var entregador = SignupFactory.entregador()
        entregador.email = 'thaismachado'

        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldbe('Oops! Email com formato inválido.')
  
    })
    it('CAMPOS OBRIGATORIOS', ()=>{
        signup.go()
        signup.submit()
        signup.alertMessageShouldbe('É necessário informar o nome')
        signup.alertMessageShouldbe('É necessário informar o CPF')
        signup.alertMessageShouldbe('É necessário informar o email')
        signup.alertMessageShouldbe('É necessário informar o CEP')
        signup.alertMessageShouldbe('É necessário informar o número do endereço')
        signup.alertMessageShouldbe('Selecione o método de entrega')
        signup.alertMessageShouldbe('Adicione uma foto da sua CNH')
       
    })


})