package br.com.atividade.entity;


import br.com.atividade.dto.request.ContatoPutRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "contatos")
public class Contato {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numero_celular")
    private String numeroCelular;

    @Column(name = "email")
    private String email;

    public void atualizarInformacoes(ContatoPutRequestDto dto) {
        if(dto.numeroCelular() != null) {
            this.numeroCelular = dto.numeroCelular();
        }
        if(dto.email() != null) {
            this.email = dto.email();
        }
    }

}
