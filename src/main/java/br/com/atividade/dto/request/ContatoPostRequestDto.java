package br.com.atividade.dto.request;

public record ContatoPostRequestDto(

        String nome,

        String numeroCelular,

        String email
) {
}
