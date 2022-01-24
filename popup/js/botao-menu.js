(function () {
    const botaoGerar = document.getElementById("gerar-doc");

    // valida as entradas
    botaoGerar.addEventListener('click', function (event) {

        if (document.getElementById("tab1").checked == true) {
            validaAbaSecao();
        }
        else if (document.getElementById("tab2").checked == true) {
            validaAbaNaoSecao();
        }    
        return false;
    });
    

    function validaAbaSecao(){        

        var qtde = parseInt(document.getElementById("qtde").innerText);

        for (let index = 1; index <= qtde; index++) {
            if (document.forms["btn-form"][`botao${index}`].value == "") {
                msgErro(`O botão ${index} está vazio.`);
                return false;
            }
        }

        desapareceMsg();
        exibeResultado(montaJSONtxt(header, body, footer, qtde));
    }

    function montaJSONvid(url, body, footer, qtde) {

        var top = `
        {
            "recipient_type": "individual",
            "type": "interactive",
            "interactive": {
                "type": "button",`;
        if (url != "") {
            top +=
                `
            "header": {
                "type": "video",
                "text": "video",
                "video": {
                    "link": "${url}"
                }
            },`;
        }
        if (body != "") {
            top +=
                `
            "body": {
                "text": "${body}"
            },`;
        }
        if (footer != "") {
            top +=
                `
            "footer": {
                "text": "${footer}"
            },`;
        }

        var bottom =
            `
        "action": {
            "buttons":[`;

        for (let index = 1; index <= qtde; index++) {
            bottom += `
            {
                "type": "reply",
                "reply": {
                    "id": "botao${index}",
                    "title": "${document.forms["btn-form"][`botao${index}`].value}" 
                }
            },`;
        }

        return top + bottom.slice(0, -1) + "]}}}";
    }

    function montaJSONimg(url, body, footer, qtde) {

        var top = `
        {
            "recipient_type": "individual",
            "type": "interactive",
            "interactive": {
                "type": "button",`;
        if (url != "") {
            top +=
                `
            "header": {
                "type": "image",
                "text": "Imagem",
                "image": {
                    "link": "${url}"
                }
            },`;
        }
        if (body != "") {
            top +=
                `
            "body": {
                "text": "${body}"
            },`;
        }
        if (footer != "") {
            top +=
                `
            "footer": {
                "text": "${footer}"
            },`;
        }

        var bottom =
            `
        "action": {
            "buttons":[`;

        for (let index = 1; index <= qtde; index++) {
            bottom += `
            {
                "type": "reply",
                "reply": {
                    "id": "botao${index}",
                    "title": "${document.forms["btn-form"][`botao${index}`].value}" 
                }
            },`;
        }

        return top + bottom.slice(0, -1) + "]}}}";
    }

    function montaJSONtxt(header, body, footer, qtde) {

        var top = `
        {
            "recipient_type": "individual",
            "type": "interactive",
            "interactive": {
                "type": "button",`;
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
        if (footer != "") {
            top +=
                `
            "footer": {
                "text": "${footer}"
            },`;
        }

        var bottom =
            `
        "action": {
            "buttons":[`;

        for (let index = 1; index <= qtde; index++) {
            bottom += `
            {
                "type": "reply",
                "reply": {
                    "id": "botao${index}",
                    "title": "${document.forms["btn-form"][`botao${index}`].value}" 
                }
            },`;
        }

        return top + bottom.slice(0, -1) + "]}}}";
    }

    function exibeResultado(json) {
        document.getElementById("main").style.display = 'none';
        document.getElementById("tabs-cont").style.display = 'none';
        document.getElementById("aba-resultado").style.display = 'flex';

        var obj = JSON.parse(json);
        var jsonBonitinho = JSON.stringify(obj, undefined, 4)

        document.getElementById("resultado").value = jsonBonitinho;
    }    

    function msgErro(texto) {
        document.getElementById("msg-box").style.display = 'flex';
        document.getElementById("msg").innerText = texto;
    }

    function desapareceMsg() {
        document.getElementById("msg-box").style.display = 'none';
        document.getElementById("msg").innerText = "";
    }

    function isVazio(input) {
        return input == "";
    }

})();