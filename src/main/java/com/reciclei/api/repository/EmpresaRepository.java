package com.reciclei.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reciclei.api.model.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

     /**
     * Retorna uma página de pacientes associados a um usuário específico.
     *
     * @param userID  O UUID do usuário.
     * @param pageable Informações de paginação.
     * @return Página de pacientes.
     */
    Page<Empresa> findByUserUserID(UUID userID, Pageable pageable);

    //Page<Empresa> findEmpresaByUserID(UUID userID, Pageable pageable)
}