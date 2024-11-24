package com.reciclei.api.dto;

import java.time.Instant;

//ListaItemDTO = Modelo de RETORNO de Empresa
public record ListaItemDTO(long empresaId, String nomeEmpresa, String cnpj, String email, String cep, String endereco, String numeroEndereco, Instant dataCriacao) {

}
