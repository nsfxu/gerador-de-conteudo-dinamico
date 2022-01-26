(function () {
    const botaoGerar = document.getElementById("gerar-doc");

    // valida as entradas
    botaoGerar.addEventListener('click', function (event) {

        if (document.getElementById("tab1").checked == true) {
            validaAbaMensagem();
        }
        else if (document.getElementById("tab2").checked == true) {
            validaAbaImagem();
        }
        else if (document.getElementById("tab3").checked == true) {
            validaAbaVideo();
        }

        return false;
    });

    function validaAbaVideo() {

        var url = document.forms["vid-form"]["vid-url"].value;
        var body = document.forms["vid-form"]["vid-body"].value;
        var footer = document.forms["vid-form"]["vid-footer"].value;

        if (isVazio(url)) {
            msgErro("URL do vídeo está vazio.");
            return false;
        }

        if (isVazio(body)) {
            msgErro("O corpo da mensagem está vazio.");
            return false;
        }

        if(footer.length > 60){
            msgErro("O rodapé da mensagem só pode ter no máx. 60 caracteres.")
            return false;
        }

        var qtde = parseInt(document.getElementById("qtde").innerText);

        for (let index = 1; index <= qtde; index++) {
            if (document.forms["btn-form"][`botao${index}`].value == "") {
                msgErro(`O botão ${index} está vazio.`);
                return false;
            } else if (document.forms["btn-form"][`botao${index}`].value.length > 20) {
                msgErro(`O botão ${index} só pode ter no máx. 20 caracteres.`);
                return false;
            }
        }

        desapareceMsg();
        exibeResultado(montaJSONvid(url, body, footer, qtde));
    }

    function validaAbaImagem() {

        var url = document.forms["img-form"]["img-url"].value;
        var body = document.forms["img-form"]["img-body"].value;
        var footer = document.forms["img-form"]["img-footer"].value;

        if (isVazio(url)) {
            msgErro("URL da imagem está vazia.");
            return false;
        }

        if (isVazio(body)) {
            msgErro("O corpo da mensagem está vazio.");
            return false;
        }

        if(footer.length > 60){
            msgErro("O rodapé da mensagem só pode ter no máx. 60 caracteres.")
            return false;
        }

        var qtde = parseInt(document.getElementById("qtde").innerText);

        for (let index = 1; index <= qtde; index++) {
            if (document.forms["btn-form"][`botao${index}`].value == "") {
                msgErro(`O botão ${index} está vazio.`);
                return false;
            } else if (document.forms["btn-form"][`botao${index}`].value.length > 20) {
                msgErro(`O botão ${index} só pode ter no máx. 20 caracteres.`);
                return false;
            }
        }

        desapareceMsg();
        exibeResultado(montaJSONimg(url, body, footer, qtde));
    }

    function validaAbaMensagem() {

        var header = document.forms["txt-form"]["text-header"].value;
        var body = document.forms["txt-form"]["text-body"].value;
        var footer = document.forms["txt-form"]["text-footer"].value;

        if (isVazio(header) && isVazio(body)) {
            msgErro("É obrigatório usar ou o corpo ou o cabeçalho na mensagem");
            return false;
        }

        if(header.length > 60){
            msgErro("O cabeçalho da mensagem só pode ter no máx. 60 caracteres.")
            return false;
        }

        if(footer.length > 60){
            msgErro("O rodapé da mensagem só pode ter no máx. 60 caracteres.")
            return false;
        }

        var qtde = parseInt(document.getElementById("qtde").innerText);

        for (let index = 1; index <= qtde; index++) {
            if (document.forms["btn-form"][`botao${index}`].value == "") {
                msgErro(`O botão ${index} está vazio.`);
                return false;
            } else if (document.forms["btn-form"][`botao${index}`].value.length > 20) {
                msgErro(`O botão ${index} só pode ter no máx. 20 caracteres.`);
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