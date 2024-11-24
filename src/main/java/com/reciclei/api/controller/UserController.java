package com.reciclei.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.reciclei.api.dto.CreateUserEmpresaDTO;
import com.reciclei.api.dto.CreateUserPessoaDTO;
import com.reciclei.api.model.Empresa;
import com.reciclei.api.model.Pessoa;
import com.reciclei.api.model.Role;
import com.reciclei.api.model.User;
import com.reciclei.api.repository.EmpresaRepository;
import com.reciclei.api.repository.PessoaRepository;
import com.reciclei.api.repository.RoleRepository;
import com.reciclei.api.repository.UserRepository;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UserController {

    private final UserRepository userRepository;

    private final EmpresaRepository empresaRepository;

    private final PessoaRepository pessoaRepository;

    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder;


    public UserController(UserRepository userRepository, EmpresaRepository empresaRepository,
            PessoaRepository pessoaRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.empresaRepository = empresaRepository;
        this.pessoaRepository = pessoaRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<Void> newUserPessoa (@RequestBody CreateUserPessoaDTO createUserPessoaDTO) 
    {

        var basicRole = roleRepository.findByName(Role.Values.BASIC.name());

        var userFromUsernameDB = userRepository.findByUsername(createUserPessoaDTO.username());
        if (userFromUsernameDB.isPresent())
        {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        var user = new User();
        user.setUsername(createUserPessoaDTO.username());
        user.setPassword(passwordEncoder.encode(createUserPessoaDTO.password()));
        user.setRoles(Set.of(basicRole));

        // Salva o usuário e armazena o retorno na variável userSaved
        User userSaved = userRepository.save(user);

        var pessoa = new Pessoa();
        pessoa.setUser(userSaved);  // Define o user do paciente como o usuário recém-criado
        pessoa.setNomePessoa(createUserPessoaDTO.nomePessoa());
        pessoa.setNomeMaterno(createUserPessoaDTO.nomeMaterno());
        pessoa.setCpf(createUserPessoaDTO.cpf());
        pessoa.setTelefone(createUserPessoaDTO.telefone());
        pessoa.setCelular(createUserPessoaDTO.celular());
        pessoa.setCep(createUserPessoaDTO.cep());
        pessoa.setEndereco(createUserPessoaDTO.endereco());
        pessoa.setNumeroEndereco(createUserPessoaDTO.numeroEndereco());
        pessoa.setDataNasc(createUserPessoaDTO.dataNasc());
        pessoa.setSexo(createUserPessoaDTO.sexo());
        
        
        pessoaRepository.save(pessoa);

        return ResponseEntity.ok().build();
    }

    @Transactional
    @PostMapping("/registerEmpresa")
    public ResponseEntity<Void> newEmpresa (@RequestBody CreateUserEmpresaDTO createUserEmpresaDTO) 
    {

        var basicRole = roleRepository.findByName(Role.Values.BASIC.name());

        var userFromUsernameDB = userRepository.findByUsername(createUserEmpresaDTO.username());
        if (userFromUsernameDB.isPresent())
        {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        var user = new User();
        user.setUsername(createUserEmpresaDTO.username());
        user.setPassword(passwordEncoder.encode(createUserEmpresaDTO.password()));
        user.setRoles(Set.of(basicRole));

        // Salva o usuário e armazena o retorno na variável userSaved
        User userSaved = userRepository.save(user);

        var empresa = new Empresa(); 
        empresa.setUser(userSaved);  // Define o user do paciente como o usuário recém-criado
        empresa.setNomeEmpresa(createUserEmpresaDTO.nomeEmpresa());
        empresa.setCnpj(createUserEmpresaDTO.cnpj());
        empresa.setEmail(createUserEmpresaDTO.email());
        empresa.setTelefone(createUserEmpresaDTO.telefone());
        empresa.setCelular(createUserEmpresaDTO.celular());
        empresa.setCep(createUserEmpresaDTO.cep());
        empresa.setEndereco(createUserEmpresaDTO.endereco());
        empresa.setNumeroEndereco(createUserEmpresaDTO.numeroEndereco());
        empresaRepository.save(empresa);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<User>> listaUsuarios () 
    {
        var users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    

}
