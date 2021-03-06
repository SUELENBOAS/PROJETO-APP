const database = require('../database/connection')

class MedController {
    novoMedicamento(request, response) {
        const { nomeMedicamento, intervaloH, qntdPilula, liquido } = request.body

        console.log(nomeMedicamento, intervaloH, qntdPilula, liquido)

        database.insert({ nomeMedicamento, intervaloH, qntdPilula, liquido }).table("medicamentos").then(data => {
            console.log(data)
            response.json({ message: "Medicamento cadastrado com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }

    listarMedicamentos(request, response) {
        database.select("*").table("medicamentos").then(medicamentos => {
            console.log(medicamentos)
            response.json(medicamentos)
        }).catch(error => {
            console.log(error)
        })
    }

    buscaMedicamento(request, response) {
        const id = request.params.id

        database.select("*").table("medicamentos").where({ id: id }).then(medicamento => {
            response.json(medicamento)

        }).catch(error => {
            console.log(error)
        })
    }

    removerMedicamento(request, response) {
        const id = request.params.id

        database.where({ id: id }).del().table("medicamentos").then(data => {
            response.json({ message: "Medicamento removido com sucesso" })

        }).catch(error => {
            console.log(error)
        })
    }

    atualizarMedicamento(request, response) {
        const id = request.params.id
        const {nomeMedicamento, intervaloH, qntdPilula, liquido} = request.body

        database.where({id:id}).update({nomeMedicamento:nomeMedicamento, intervaloH:intervaloH, qntdPilula:qntdPilula,liquido:liquido}).table("medicamentos").then(data => {
            response.json({ message: "Medicamento atualizado com sucesso" })
        }).catch(error => {
            response.json(error)
        })
    }



    novocadastro(request, response) {
        const { nome, email, senha, contato, emergencia, cidade, cep, logradouro, uf, numero, bairro, alergias, peso, altura,
            dataNasc, tpsanguinio, genero, id } = request.body

        console.log(nome, email, senha, contato, emergencia, cidade, cep, logradouro, uf, numero, bairro, alergias, peso, altura,
            dataNasc, tpsanguinio, genero,id)

        database.insert({
            nome, email, senha, contato, emergencia, cidade, cep, logradouro, uf, numero, bairro, alergias, peso, altura,
            dataNasc, tpsanguinio, genero,id
        }).table("cadastro").then(data => {
            console.log(data)
            response.json({ message: "Cadastro incluso com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }

    listarcadastro(request, response) {
        database.select("*").table("cadastro").then(cadastro => {
            console.log(cadastro)
            response.json(cadastro)
        }).catch(error => {
            console.log(error)
        })
    }

    buscacadastro(request, response) {
        const id = request.params.id

        database.select("*").table("cadastro").where({ id: id }).then(cadastro => {
            response.json(cadastro)



        }).catch(error => {
            console.log(error)
        })
    }


    removercadastro(request, response) {
        const id = request.params.id
      
        database.where({ id: id }).del().table("cadastro").then(data => {
            response.json({ message: "Cadastro removido com sucesso" })
           
        }).catch(error => {
            console.log(error)
        })      
        

       
    }

    atualizarcadastro(request, response) {
        const id = request.params.id
        const { email } = request.body


        database.where({ id: id }).update({ email: email}).table("cadastro").then(data => {
            response.json({ message: "Cadastro atualizado com sucesso" })

        }).catch(error => {
            console.log(error)
        })
    }




}

module.exports = new MedController();