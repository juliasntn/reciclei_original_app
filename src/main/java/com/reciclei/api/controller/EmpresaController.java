package com.reciclei.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.reciclei.api.dto.CreateUserEmpresaDTO;
import com.reciclei.api.dto.ListaItemDTO;
import com.reciclei.api.dto.ListaEmpresasDTO;
import com.reciclei.api.model.Empresa;
import com.reciclei.api.model.Role;
import com.reciclei.api.repository.EmpresaRepository;
import com.reciclei.api.repository.UserRepository;

import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class EmpresaController {

    private final EmpresaRepository empresaRepository;

    private final UserRepository userRepository;

    public EmpresaController(EmpresaRepository empresaRepository, UserRepository userRepository) {
        this.empresaRepository = empresaRepository;
        this.userRepository = userRepository;
    }

    //@PostMapping("/NovaEmpresa")
    public ResponseEntity<Void> criarPaciente(@RequestBody CreateUserEmpresaDTO dto, JwtAuthenticationToken token) {
        
        var user = userRepository.findById(UUID.fromString(token.getName()));

        var empresa = new Empresa();
        empresa.setUser(user.get());
        empresa.setNomeEmpresa(dto.nomeEmpresa());
        empresa.setCnpj(dto.cnpj());
        empresa.setEmail(dto.email());
        empresa.setTelefone(dto.telefone());
        empresa.setCelular(dto.celular());
        empresa.setCep(dto.cep());
        empresa.setEndereco(dto.endereco());
        empresa.setNumeroEndereco(dto.numeroEndereco());

        empresaRepository.save(empresa);

        return ResponseEntity.ok().build();

    }
    
    @DeleteMapping("/DeleteEmpresa/{id}")
    public ResponseEntity<Void> deletaEmpresa (@PathVariable("id") Long idEmpresa, JwtAuthenticationToken token)
    {
        var empresa = empresaRepository.findById(idEmpresa)
                                     .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        var user = userRepository.findById(UUID.fromString(token.getName()));
        var isAdmin = user.get().getRoles()
                                .stream()
                                .anyMatch(role -> role.getName().equalsIgnoreCase(Role.Values.ADMIN.name()));

        if (isAdmin || empresa.getUser().getUserID().equals(UUID.fromString(token.getName())))
        {
            empresaRepository.deleteById(idEmpresa);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/PontosMapa")
    public ResponseEntity<ListaEmpresasDTO> listaTodasEmpresas(@RequestParam(value = "page", defaultValue = "0") int page, 
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
            JwtAuthenticationToken token) 
    {
        // Verifica se o usuário autenticado existe
        var user = userRepository.findById(UUID.fromString(token.getName()))
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        // Busca todas as empresas do banco com paginação e ordenação
        var listaEmpresasPage = empresaRepository.findAll(PageRequest.of(page, pageSize, Sort.Direction.ASC, "dataCriacao"))
                                                .map(listaItem -> new ListaItemDTO(
                                                        listaItem.getEmpresaId(), 
                                                        listaItem.getNomeEmpresa(), 
                                                        listaItem.getCnpj(), 
                                                        listaItem.getEmail(),
                                                        listaItem.getCep(),                                                        listaItem.getEndereco(),
                                                        listaItem.getNumeroEndereco(), 
                                                        listaItem.getDataCriacao()
                                                    ));

        // Retorna a resposta com os dados paginados
        return ResponseEntity.ok(new ListaEmpresasDTO(
            listaEmpresasPage.getContent(), 
            page, 
            pageSize, 
            listaEmpresasPage.getTotalPages(), 
            listaEmpresasPage.getTotalElements()
        ));
    }

    
    
}
