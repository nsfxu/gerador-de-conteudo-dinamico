(function () {

    // MENU SEM SEÇÕES
    const addSectionMSS = document.getElementById("add-opcao");
    var remSectionMSS = document.getElementById("rem-opcao");

    var counter = document.getElementById("qtde");    

    //#region Menu sem seções

    // adiciona opções
    addSectionMSS.addEventListener('click', function (event) {
        event.preventDefault();

        var qtde = parseInt(counter.innerText) + 1;

        if (qtde <= 10) {
            counter.textContent = qtde;
            adicionarOpcao(qtde);

            if (remSectionMSS.disabled == true) {
                remSectionMSS.disabled = false;
            }

            if (qtde >= 10) {
                addSectionMSS.disabled = true;
                return false;
            }
        }

        return false;
    });

    //remove opções
    remSectionMSS.addEventListener('click', function (event) {
        event.preventDefault();

        var qtde = parseInt(counter.innerText);

        if (qtde > 1) {

            document.getElementById(`box-opcao${qtde}`).remove();
            document.getElementById(`box-desc${qtde}`).remove();
            counter.textContent = qtde - 1;

            if (qtde - 1 == 1) {
                remSectionMSS.disabled = true;
            }

            if (addSectionMSS.disabled == true) {
                addSectionMSS.disabled = false;
            }
        }

        return false;
    });        

    function adicionarOpcao(qtde) {

        var html = `
            <div class="box inputbox" id="box-opcao${qtde}"> 
                <div class="title" id="h-menuO">
                    Opção ${qtde}
                    <i class="far fa-question-circle primaria"></i>
                </div>
                <input type="text" name="opcao${qtde}" id="opcao${qtde}" maxlength="24"> 
            </div>
            
            <div class="box inputbox descricao" id="box-desc${qtde}">
                <div class="title" id="h-menuD">
                    Descrição ${qtde}
                    <i class="far fa-question-circle primaria"></i>
                </div>
                <input type="text" name="desc${qtde}" id="desc${qtde}" maxlength="72">
            </div>
            `;

        document.getElementById("form-opcoes").insertAdjacentHTML('beforeend', html);
    }

    //#endregion Menu sem seções

})();