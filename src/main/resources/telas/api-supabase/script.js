let editando = false;
let idContatoEditando = 0;
const apiUrl = 'https://rrpnysfketxofprpwuit.supabase.co/rest/v1/contatos';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycG55c2ZrZXR4b2ZwcnB3dWl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjUwMDg2MiwiZXhwIjoxOTg4MDc2ODYyfQ.gqtez-RCJ7lvXRsnUzbdkKnftqRpuF6S6bxxEKn1SdM';
const apiAuthorization = 'Bearer ' + apiKey;

let consultarContatos = (url) => {
    $.ajax({
        type: 'get',
        url: url || (apiUrl + '?select=*'),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        headers: {
            'apikey': apiKey,
            'Authorization': apiAuthorization
        },
        success: (contatos) => {
            let contatosStr = '<tr><th>Id</th><th>Nome</th><th>Celular</th><th>E-mail</th><th></th><th></th></tr>';
            for (contato of contatos) {
                contatosStr +=
                    '<tr>' +
                    '<td>' + contato.id + '</td>' +
                    '<td>' + contato.nome + '</td>' +
                    '<td>' + contato.celular + '</td>' +
                    '<td>' + contato.email + '</td>' +
                    '<td><i class="bi bi-pencil-fill" onclick="atualizarContato(' + contato.id + ',\'' + contato.nome + '\',\'' + contato.celular + '\',\'' + contato.email + '\');"></i></td>' +
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
        url: apiUrl + '?id=eq.' + id,
        crossDomain: true,
        headers: {
            'apikey': apiKey,
            'Authorization': apiAuthorization
        },
        success: () => {
            consultarContatos();
        },
        error: (erro) => {
            window.alert("Ocorreu um erro: " + JSON.stringify(erro));
        }
    });
};

let atualizarContato = (id, nome, celular, email) => {
    editando = true;
    idContatoEditando = id;
    $('#form-titulo').html('Editar Contato');
    $('#form-contato').css('display', 'block');
    $('#input-nome').val(nome);
    $('#input-celular').val(celular);
    $('#input-email').val(email);
};

$('#btn-novo').click(() => {
    editando = false;
    idContatoEditando = 0;
    $('#form-titulo').html('Novo Contato');
    $('#form-contato').css('display', 'block');
    $('#input-nome').val('');
    $('#input-celular').val('');
    $('#input-email').val('');
});

$('#btn-cancelar').click(() => {
    $('#form-contato').css('display', 'none');
});

$(document).ready(() => { consultarContatos(); });

$('#btn-salvar').click(() => {
    let dados = {
        nome: $('#input-nome').val(),
        celular: $('#input-celular').val(),
        email: $('#input-email').val()
    };

    let type, url;

    if (editando) {
        type = 'patch';
        url = apiUrl + '?id=eq.' + idContatoEditando;
    } else {
        type = 'post';
        url = apiUrl;
    }

    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(dados),
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        headers: {
            'apikey': apiKey,
            'Authorization': apiAuthorization
        },
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
        consultarContatos(apiUrl + '?nome=ilike.%25' + $('#input-buscar').val() + '%25');
    }
});