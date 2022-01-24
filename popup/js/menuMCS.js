(function () {

    // MENU COM SEÇÕES
    const addSectionMCS = document.getElementById("add-section-mcs");
    var remSectionMCS = document.getElementById("rem-section-mcs");
    
    var remSectionMSS = document.getElementById("rem-opcao");

    var counterOptions = document.getElementById("qtdeO");
    var counterSection = document.getElementById("qtdeS");

    //#region Menu com seções

    addSectionMCS.addEventListener('click', function (event) {
        event.preventDefault();

        var qtdeS = parseInt(counterSection.innerText) + 1;
        var qtdeO = parseInt(counterOptions.innerText) + 1;

        if (qtdeS <= 10 && qtdeO <= 10) {
            counterSection.textContent = qtdeS;
            counterOptions.textContent = qtdeO;
            adicionarSecao(qtdeS, qtdeO);

            if (remSectionMSS.disabled == true) {
                remSectionMCS.disabled = false;
            }

            if (qtdeS >= 10 || qtdeO >= 10) {
                addSectionMCS.disabled = true;
                return false;
            }
        }

        return false;
    });

    remSectionMCS.addEventListener('click', function (event) {
        event.preventDefault();

        var qtdeS = parseInt(counterSection.innerText);
        var qtdeO = parseInt(counterOptions.innerText);

        if (qtdeS > 1) {

            var form = document.getElementById(`form-section${qtdeS}`);

            counterOptions.textContent = qtdeO - ((form.childElementCount - 2) / 2);
            counterSection.textContent = qtdeS - 1;

            document.getElementById(`mcs-section${qtdeS}-form`).remove();

            if (qtdeS - 1 == 1) {
                remSectionMCS.disabled = true;
            }

            if (addSectionMCS.disabled == true) {
                addSectionMCS.disabled = false;
                activateAllAddsMCS(parseInt(counterSection.innerText));
            }
        }

        return false;
    });

    function adicionarSecao(qtdeS, qtdeO) {

        var html =
            `
            <div class="content-box" id="mcs-section${qtdeS}-form">
                <form name="mcs-section${qtdeS}-form" id="form-section${qtdeS}">

                        <div class="box inputbox section" id="box-secao${qtdeS}">
                            <label>Seção ${qtdeS}</label>
                            <input type="text" name="secao${qtdeS}" id="secao${qtdeS}">
                        </div>

                        <div class="box inputbox" id="box-opcao${qtdeO}">
                            <label>Opção ${qtdeO}</label>
                            <input type="text" name="opcao${qtdeO}" id="opcao${qtdeO}">
                        </div>

                        <div class="box inputbox desc" id="box-desc${qtdeO}">
                            <label>Descrição ${qtdeO}</label>
                            <input type="text" name="desc${qtdeO}" id="desc${qtdeO}">
                        </div> `;

        if (qtdeO == 10) {
            html +=
                `
                <!-- Adiciona mais opções -->
                    <div class="button-box darker" id="btn-box${qtdeS}">
                        <button id="add-opcao-sec${qtdeS}" disabled>Adicionar</button>
                        <button id="rem-opcao-sec${qtdeS}" disabled>Remover</button>
                    </div>                    
                </form>
            </div>
                `;
            document.getElementById("form-opcoes-mcs").insertAdjacentHTML('beforeend', html)
            deactiveAllAddsMCS(qtdeS);

        } else {
            html +=
                `
                <!-- Adiciona mais opções -->
                    <div class="button-box darker" id="btn-box${qtdeS}">
                        <button id="add-opcao-sec${qtdeS}">Adicionar</button>
                        <button id="rem-opcao-sec${qtdeS}" disabled>Remover</button>
                    </div>                    
                </form>
            </div>
                `;
            document.getElementById("form-opcoes-mcs").insertAdjacentHTML('beforeend', html)

        }

    }

    document.querySelector('body').addEventListener('click', event => {

        if (event.target.id.includes("add-opcao-sec")) {

            event.preventDefault();

            var sectionId = event.target.id.substring(13, 14);
            adicionaOpcaoMCS(sectionId);

        } else if (event.target.id.includes("rem-opcao-sec")) {

            event.preventDefault();

            var sectionId = event.target.id.substring(13, 14);
            removeOpcaoMCS(sectionId);
        }

    });

    function removeOpcaoMCS(sectionId) {
        var qtdeO = parseInt(counterOptions.innerText);

        if (qtdeO > 1) {

            counterOptions.textContent = qtdeO - 1;

            var opcoes = document.forms[`mcs-section${sectionId}-form`].querySelectorAll("div");
            opcoes[opcoes.length - 3].remove();
            opcoes[opcoes.length - 2].remove();

            var addOptionMCS = document.getElementById(`add-opcao-sec${sectionId}`);
            var remOptionMCS = document.getElementById(`rem-opcao-sec${sectionId}`);

            var opcoes = document.forms[`mcs-section${sectionId}-form`].querySelectorAll("div");

            if (qtdeO - 1 == 1 || opcoes.length == 4) {
                remOptionMCS.disabled = true;
            }

            if (addOptionMCS.disabled == true) {
                activateAllAddsMCS(parseInt(counterSection.innerText));
                addSectionMCS.disabled = false;
            }
        }

        return false;
    }

    function adicionaOpcaoMCS(sectionId) {
        var qtdeO = parseInt(counterOptions.innerText) + 1;

        if (qtdeO <= 10) {

            var remOptionMCS = document.getElementById(`rem-opcao-sec${sectionId}`);
            counterOptions.textContent = qtdeO;
            
            // verifica se já existe uma opção com o número igual
            if(document.getElementById(`box-opcao${qtdeO}`) != null){
                qtdeO = novoQtdeO(qtdeO);
            }
                
            // insere um novo campo de opções no HTML
            insereHtmlMCS(sectionId, qtdeO);
            
            if (remOptionMCS.disabled == true) {
                remOptionMCS.disabled = false;
            }

            if (qtdeO >= 10) {
                deactiveAllAddsMCS(parseInt(counterSection.innerText));
                addSectionMCS.disabled = true;
                return false;
            }
        }
    }

    function novoQtdeO(){
        for (let index = 1; index <= 10; index++) {
            if(document.getElementById(`box-opcao${index}`) == null){
                return index;
            }
        }
    }

    function insereHtmlMCS(sectionId, qtdeO) {

        var html = `
            <div class="box inputbox" id="box-opcao${qtdeO}"> 
                <label>Opção ${qtdeO}</label> 
                <input type="text" name="opcao${qtdeO}" id="opcao${qtdeO}"> 
            </div>
            
            <div class="box inputbox descricao" id="box-desc${qtdeO}">
                <label>Descrição ${qtdeO}</label>
                <input type="text" name="desc${qtdeO}" id="desc${qtdeO}">
            </div>
            `;

        document.getElementById(`btn-box${sectionId}`).insertAdjacentHTML("beforebegin", html);
    }

    function deactiveAllAddsMCS(qtdeS) {
        for (let index = 1; index <= qtdeS; index++) {
            document.getElementById(`add-opcao-sec${index}`).disabled = true;
        }
    }

    function activateAllAddsMCS(qtdeS) {
        for (let index = 1; index <= qtdeS; index++) {
            document.getElementById(`add-opcao-sec${index}`).disabled = false;
        }
    }

    //#endregion Menu com seções

})();