(function () {
    const botaoGerar = document.getElementById("gerar-doc");
    const botaoGerarMCS = document.getElementById("gerar-doc-mcs");

    // valida as entradas
    botaoGerar.addEventListener('click', function (event) {
        validaAbaMSS();
        return false;
    });

    botaoGerarMCS.addEventListener('click', function (event) {
        validaAbaMCS();
        return false;
    });

    function validaAbaMCS() {

        var header = document.forms["mcs-form"]["mcs-header"].value;
        var body = document.forms["mcs-form"]["mcs-body"].value;
        var btnName = document.forms["mcs-form"]["mcs-btn-name"].value;

        if (isVazio(body)) {
            msgErroMCS("É obrigatório usar o corpo na mensagem");
            return false;
        }

        if (isVazio(btnName)) {
            msgErroMCS("É obrigatório usar o nome do botão")
            return false;
        }

        var qtdeS = parseInt(document.getElementById("qtdeS").innerText);
        var form = "";
        var sections = [];

        for (let i = 1; i <= qtdeS; i++) {
            form = document.forms[`mcs-section${i}-form`].querySelectorAll("input");
            var options = [];
            var secao, descricao, opcao = "";
            var erro = false;

            form.forEach(
                function (currentValue, currentIndex) {
                    if (isVazio(currentValue.value)) {
                        if (currentValue.name.includes("secao")) {
                            msgErroMCS(`A seção ${currentValue.name.slice(5, 6)} está vazia.`);
                            erro = true;
                        } else if (currentValue.name.includes(`opcao`)) {
                            msgErroMCS(`A opção ${currentValue.name.slice(5, 6)} está vazia.`);
                            erro = true;
                        }
                    }

                    if (currentValue.name.includes("secao")) {
                        secao = currentValue.value;
                    } else if (currentValue.name.includes("opcao")) {
                        opcao = currentValue.value;
                    } else if (currentValue.name.includes("desc")) {
                        descricao = currentValue.value;

                        options.push({
                            "opcao": opcao,
                            "descricao": descricao
                        });
                    }
                },
            );

            sections.push({
                "nomeSecao": secao,
                "opcoes": options
            })

        }

        if (erro == false) {
            desapareceMsg();
            exibeResultado(montaJSONMCS(header, body, btnName, sections));
        }

        return false;

    }

    function montaJSONMCS(header, body, btnName, sections) {
        let index = 1;
        var rows = "";

        var top = `
        {
            "recipient_type": "individual",
            "type": "interactive",
            "interactive": {
                "type": "list",`;
        if (header != "") {
            top +=
                `
            "header": {
                "type": "text",
                "text": "${header}"
            },`;
        }
        if (body != "") {
            top +=
                `
            "body": {
                "text": "${body}"
            },`;
        }
        var bottom = `
        "action": {
            "button": "${btnName}",
            "sections": [`;

        for (let i = 0; i < sections.length; i++) {

            bottom += `{ "title": "${sections[i].nomeSecao}", "rows": [`;

            for (let j = 0; j < sections[i].opcoes.length; j++) {
                rows += `{"id": "${index}", "title": "${sections[i].opcoes[j].opcao}", "description": "${sections[i].opcoes[j].descricao}"},`;
                index++;

                /*    
                bottom += 
                `
                {
                    "id": "${j}",
                    "title": "${sections[i].opcoes[j].opcao}",
                    "description": "${sections[i].opcoes[j].descricao}"
                },
                `;
                */
            }

            bottom += rows.slice(0, -1) + `]},`;
            rows = "";
        }

        return top + bottom.slice(0, -1) + "]}}}";

    }

    function validaAbaMSS() {

        var header = document.forms["mss-form"]["mss-header"].value;
        var body = document.forms["mss-form"]["mss-body"].value;
        var btnName = document.forms["mss-form"]["mss-btn-name"].value;

        if (isVazio(body)) {
            msgErroMSS("É obrigatório usar o corpo na mensagem");
            return false;
        }

        if (isVazio(btnName)) {
            msgErroMSS("É obrigatório usar o nome do botão")
            return false;
        }

        var qtde = parseInt(document.getElementById("qtde").innerText);

        for (let index = 1; index <= qtde; index++) {
            if (document.forms["mss-btn-form"][`opcao${index}`].value == "") {
                msgErroMSS(`O botão ${index} está vazio.`);
                return false;
            }
        }

        desapareceMsg();
        exibeResultado(montaJSONMSS(header, body, btnName, qtde));
    }

    function montaJSONMSS(header, body, btnName, qtde) {

        var top = `
        {
            "recipient_type": "individual",
            "type": "interactive",
            "interactive": {
                "type": "list",`;
        if (header != "") {
            top +=
                `
            "header": {
                "type": "text",
                "text": "${header}"
            },`;
        }
        if (body != "") {
            top +=
                `
            "body": {
                "text": "${body}"
            },`;
        }
        var bottom = `
        "action": {
            "button": "${btnName}",
            "sections": [
            {
                "title": "",
                "rows": [    
            `;

        for (let index = 1; index <= qtde; index++) {
            /*
            bottom += `{
                "id": "botao${index}",
                "title": "${document.forms["mss-btn-form"][`opcao${index}`].value}",
                "description": "${document.forms["mss-btn-form"][`desc${index}`].value}"
            },
            `;
            */

            bottom += `{ "id": "botao${index}", "title": "${document.forms["mss-btn-form"][`opcao${index}`].value}", "description": "${document.forms["mss-btn-form"][`desc${index}`].value}" },`;

        }


        return top + bottom.slice(0, -1) + "]}]}}}";

    }

    function exibeResultado(json) {

        document.getElementById("tabs-cont").style.display = 'none';
        document.getElementById("aba-resultado").style.display = 'flex';

        var obj = JSON.parse(json);
        var jsonBonitinho = JSON.stringify(obj, undefined, 4)

        document.getElementById("resultado").value = jsonBonitinho;
    }

    function msgErroMCS(texto) {
        document.getElementById("msg-box-mcs").style.display = 'flex';
        document.getElementById("msg-mcs").innerText = texto;
    }

    function msgErroMSS(texto) {
        document.getElementById("msg-box-mss").style.display = 'flex';
        document.getElementById("msg-mss").innerText = texto;
    }

    function desapareceMsg() {
        document.getElementById("msg-box-mss").style.display = 'none';
        document.getElementById("msg-mss").innerText = "";

        document.getElementById("msg-box-mcs").style.display = 'none';
        document.getElementById("msg-mcs").innerText = "";
    }

    function isVazio(input) {
        return input == "";
    }

})();