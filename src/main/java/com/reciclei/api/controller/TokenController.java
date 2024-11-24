package com.reciclei.api.controller;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.RestController;

import com.reciclei.api.dto.LoginRequest;
import com.reciclei.api.dto.LoginResponse;
import com.reciclei.api.model.Role;
import com.reciclei.api.repository.UserRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class TokenController {

    private final JwtEncoder jwtEncoder;

    private final UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder; //senha encriptada


    public TokenController(JwtEncoder jwtEncoder, UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) { //estou recebendo o login limpo (username OU email e senha limpa)
        
        //var user = userRepository.findByUsername(loginRequest.usernameOrEmail());
        var user = userRepository.findByUsername(loginRequest.username());

        if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder))
        {
            throw new BadCredentialsException("usuario ou senha é invalida");
        }

        var novoHorario = Instant.now();
        var expiresIn = 900L;

        var scopes = user.get().getRoles()
                        .stream()
                        .map(Role::getName)
                        .collect(Collectors.joining(""));

        var claims = JwtClaimsSet.builder()
                        .issuer("Reciclei - API")
                        .subject(user.get().getUserID().toString())
                        .issuedAt(novoHorario)
                        .expiresAt(novoHorario.plusSeconds(expiresIn))
                        .claim("scope", scopes)
                        .build();
        
        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(jwtValue, expiresIn));
    }
    

}
