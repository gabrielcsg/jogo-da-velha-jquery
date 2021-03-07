var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function () {
    $('#btn-play').click(function () {
        if (!$('#input-player-1').val() || !$('#input-player-1').val().toString().trim()) {
            alert('Informe o apelido do jogador 1');
            return false;
        }
        if (!$('#input-player-2').val() || !$('#input-player-2').val().toString().trim()) {
            alert('Informe o apelido do jogador 2');
            return false;
        }

        $('#nome-player-1').html($('#input-player-1').val());
        $('#nome-player-2').html($('#input-player-2').val());

        $('#pagina_inicial').hide();
        $('#palco_jogo').show();
    });

    $('.jogada').click(function () {
        var id_campo = this.id;
        $(`#${id_campo}`).off();
        jogada(id_campo);
    });

    function jogada(id) {
        var icone = "";
        var ponto = 0;

        // rodada mod 2
        if (rodada % 2 == 1) {
            //alert('jogador 1');
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1;
        } else {
            //alert('jogador 2');
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;
        }
        rodada++;

        $(`#${id}`).css('background-image', icone);

        matriz_jogo[id[0]][id[1]] = ponto;

        verificar_combinacao();
    }

    function verificar_combinacao() {
        // horizontal
        var soma = 0;
        for (var i = 1; i <= 3; i++) {
            soma += matriz_jogo['a'][i];
        }
        ganhador(soma);

        soma = 0;
        for (var i = 1; i <= 3; i++) {
            soma += matriz_jogo['b'][i];
        }
        ganhador(soma);

        soma = 0;
        for (var i = 1; i <= 3; i++) {
            soma += matriz_jogo['c'][i];
        }
        ganhador(soma);

        // vertical
        for (var i = 1; i <= 3; i++) {
            soma = 0;
            soma += matriz_jogo['a'][i];
            soma += matriz_jogo['b'][i];
            soma += matriz_jogo['c'][i];
            ganhador(soma);
        }

        // horizontal
        soma = 0;
        soma = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3]
        ganhador(soma);

        soma = 0;
        soma = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1]
        ganhador(soma);

    }

    function ganhador(pontos) {
        if (pontos === -3) {
            var jogador_1 = $('#input-player-1').val();
            alert(`${jogador_1} venceu!!!!`);
            $('.jogada').off();
        } else if (pontos === 3) {
            var jogador_2 = $('#input-player-2').val();
            alert(`${jogador_2} venceu!!!!`);
            $('.jogada').off();
        };
    }
});
