(function () {
    const addButton = document.getElementById("add-botao");
    var remButton = document.getElementById("rem-botao");

    var counter = document.getElementById("qtde");

    // adiciona botões
    addButton.addEventListener('click', function (event) {
        event.preventDefault();

        var qtde = parseInt(counter.innerText) + 1;

        if (qtde < 4) {
            counter.textContent = qtde;
            adicionarBotao(qtde);

            if (remButton.disabled == true) {
                remButton.disabled = false;
            }

            if (qtde >= 3) {
                addButton.disabled = true;
                return false;
            }
        }

        return false;
    });

    //remove botões
    remButton.addEventListener('click', function (event) {
        event.preventDefault();

        var qtde = parseInt(counter.innerText);

        if (qtde > 1) {

            document.getElementById(`box-botao${qtde}`).remove();
            counter.textContent = qtde - 1;

            if (qtde - 1 == 1) {
                remButton.disabled = true;
            }

            if (addButton.disabled == true) {
                addButton.disabled = false;
            }
        }

        return false;
    });

    function adicionarBotao(qtde) {

        var html = `
            <div class="box inputbox" id="box-botao${qtde}"> 
                <label>Botão ${qtde}</label> 
                <input type="text" name="botao${qtde}" id="botao${qtde}" maxlength="20"> 
            </div>`;

        document.getElementById("form-botoes").insertAdjacentHTML('beforeend', html)
    }

})();