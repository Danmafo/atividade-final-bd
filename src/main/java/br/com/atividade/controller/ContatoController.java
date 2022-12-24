package br.com.atividade.controller;

import br.com.atividade.dto.request.ContatoPostRequestDto;
import br.com.atividade.dto.request.ContatoPutRequestDto;
import br.com.atividade.dto.response.ContatoResponseDto;
import br.com.atividade.service.ContatoSrv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/contato")
public class ContatoController {

    @Autowired
    ContatoSrv service;

    @Transactional
    @CrossOrigin
    @PostMapping
    public ResponseEntity<ContatoResponseDto> cadastrar(@RequestBody ContatoPostRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(dto));
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ContatoResponseDto> buscarPorId(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<ContatoResponseDto>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @Transactional
    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<ContatoResponseDto> atualizar(@PathVariable Long id, @RequestBody ContatoPutRequestDto dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @Transactional
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

}
