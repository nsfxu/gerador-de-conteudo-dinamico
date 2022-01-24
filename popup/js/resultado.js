(function () {
    const botaoCopiar = document.getElementById("btn-copiar");
    //const botaoColar = document.getElementById("btn-colar");

    /*
    botaoColar.addEventListener('click', function (event) {
        return false;
    });
    */

    botaoCopiar.addEventListener('click', function (event) {
        (async () => {
            copiarConteudo(document.getElementById('resultado'));
        })();

        return false;
    });

    function copiarConteudo(conteudo) {
        navigator.clipboard.writeText(conteudo.value);
    }

})();


