let editando = false;
let idContatoEditando = 0;

let consultarContatos = (url) => {
    $.ajax({
        type: 'get',
        url: url || 'http://localhost:8080/atividade-api/contato',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        success: (contatos) => {
            let contatosStr = '<tr><th>Id</th><th>Nome</th><th>numeroCelular</th><th>E-mail</th><th></th><th></th></tr>';
            for (contato of contatos) {
                contatosStr +=
                    '<tr>' +
                    '<td>' + contato.id + '</td>' +
                    '<td>' + contato.nome + '</td>' +
                    '<td>' + contato.numeroCelular + '</td>' +
                    '<td>' + contato.email + '</td>' +
                    '<td><i class="bi bi-pencil-fill" onclick="atualizarContato(' + contato.id + ',\'' + contato.nome + '\',\'' + contato.numeroCelular + '\',\'' + contato.email + '\');"></i></td>' +
                    '<td><i class="bi bi-trash-fill" onclick="excluirContato(' + contato.id + ');"></i></td>' +
                    '</tr>';
            }
            $('#tabela-contatos').html(contatosStr);
        },
        error: (erro) => {
            window.alert("Ocorreu um erro: " + JSON.stringify(erro));
        }
    });
};

let excluirContato = (id) => {
    $.ajax({
        type: 'delete',
        url: 'http://localhost:8080/atividade-api/contato/' + id,
        crossDomain: true,
        success: () => {
            consultarContatos();
        },
        error: (erro) => {
            window.alert("Ocorreu um erro: " + JSON.stringify(erro));
        }
    });
};

let atualizarContato = (id, nome, numeroCelular, email) => {
    editando = true;
    idContatoEditando = id;
    $('#form-titulo').html('Editar Contato');
    $('#form-contato').css('display', 'block');
    $('#input-nome').val(nome);
    $('#input-numeroCelular').val(numeroCelular);
    $('#input-email').val(email);
};

$('#btn-novo').click(() => {
    editando = false;
    idContatoEditando = 0;
    $('#form-titulo').html('Novo Contato');
    $('#form-contato').css('display', 'block');
    $('#input-nome').val('');
    $('#input-numeroCelular').val('');
    $('#input-email').val('');
});

$('#btn-cancelar').click(() => {
    $('#form-contato').css('display', 'none');
});

$(document).ready(() => { consultarContatos(); });

$('#btn-salvar').click(() => {
    let dados = {
        id: idContatoEditando,
        nome: $('#input-nome').val(),
        numeroCelular: $('#input-numeroCelular').val(),
        email: $('#input-email').val()
    };

    let type, url;

    if (editando) {
        type = 'put';
        url = 'http://localhost:8080/atividade-api/contato/' + idContatoEditando;
    } else {
        type = 'post';
        url = 'http://localhost:8080/atividade-api/contato';
    }

    $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dados),
        crossDomain: true,
        success: (contato) => {
            consultarContatos();
            $('#form-contato').css('display', 'none');
        },
        error: (erro) => {
            window.alert("Ocorreu um erro: " + erro.message);
        }
    });
});

$('#btn-buscar').click(() => {
    if ($('#input-buscar').val() == "") {
        consultarContatos();
    } else {
        consultarContatos('http://localhost:8080/atividade-api/contato' + $('#input-buscar').val());
    }
});