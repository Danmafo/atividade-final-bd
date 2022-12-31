package br.com.atividade.dto.request;

public record ContatoPutRequestDto(

        String nome,

        String numeroCelular,

        String email
) {
}
