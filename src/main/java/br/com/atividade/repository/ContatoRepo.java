package br.com.atividade.repository;

import br.com.atividade.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepo extends JpaRepository<Contato, Long> {
}
