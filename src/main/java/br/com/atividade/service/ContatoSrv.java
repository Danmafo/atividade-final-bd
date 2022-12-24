package br.com.atividade.service;

import br.com.atividade.dto.request.ContatoPostRequestDto;
import br.com.atividade.dto.request.ContatoPutRequestDto;
import br.com.atividade.dto.response.ContatoResponseDto;
import br.com.atividade.entity.Contato;
import br.com.atividade.repository.ContatoRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class ContatoSrv {

    @Autowired
    ContatoRepo repository;

    public ContatoResponseDto cadastrar(ContatoPostRequestDto dto) {
        Contato contato = new Contato();
        BeanUtils.copyProperties(dto, contato);
        repository.save(contato);
        return new ContatoResponseDto(contato);
    }

    public ContatoResponseDto buscarPorId(Long id) throws Exception {
        Contato contato = repository.findById(id).orElseThrow(() -> new Exception("Contato com id {id} não encontrado"));
        return new ContatoResponseDto(contato);
    }

    public List<ContatoResponseDto> listar() {
        List<Contato> contatos = repository.findAll();
        List<ContatoResponseDto> contatosDto = contatos.stream().map(ContatoResponseDto::new).toList();
        return contatosDto;
    }

    public ContatoResponseDto atualizar(Long id, ContatoPutRequestDto dto) {
        Contato contato = repository.getReferenceById(id);
        contato.atualizarInformacoes(dto);
        return new ContatoResponseDto(contato);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

}
