package com.reciclei.api.dto;

import java.util.List;

public record ListaEmpresasDTO(List<ListaItemDTO> listaEmpresas, int page, int pageSize, int totalPages, long totalElements) {

}
