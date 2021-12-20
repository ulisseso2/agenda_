import validator from 'validator'

export default class Contatos{
    constructor (formClass) {

        this.form = document.querySelector(formClass)

    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target
        const nomeInput = el.querySelector('input[name="nome"]')
        const emailInput = el.querySelector('input[name="email"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        let error = false

        if(!nomeInput.value){
            this.criaErro(nomeInput,'Nome é obrigatório')
            error = true
            return 
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput,'Coloque ao menos um contato')
            error = true
        }
       
        if(!emailInput.value && !telefoneInput.value){
            this.criaErro(telefoneInput,'Coloque ao menos um contato')
            error = true
        }
        if(!error) el.submit()

    }

    criaErro(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('alert-danger')
        campo.insertAdjacentElement('afterend', div)
    }

}