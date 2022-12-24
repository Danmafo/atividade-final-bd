package br.com.atividade.dto.response;

import br.com.atividade.entity.Contato;

public record ContatoResponseDto(

        Long id,

        String nome,

        String numeroCelular,

        String email
) {

    public ContatoResponseDto (Contato entidade) {
        this(entidade.getId(), entidade.getNome(), entidade.getNumeroCelular(), entidade.getEmail());
    }

}
