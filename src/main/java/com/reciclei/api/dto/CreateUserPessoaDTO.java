package com.reciclei.api.dto;

import java.util.Date;

public record CreateUserPessoaDTO(String username, String password, String nomePessoa, String nomeMaterno, String cpf, String telefone, String celular, String cep, String endereco, String numeroEndereco, Date dataNasc, String sexo) {

}
