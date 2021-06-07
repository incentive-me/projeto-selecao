function showIndexPage() {
    document.getElementById("showIndexPage").style.display = "flex"
    document.getElementById("showCopyCodePage").style.display = "none"
    document.getElementById("showCopyCssPage").style.display = "none"
    document.getElementById("showHowItWorksPage").style.display = "none"
    document.getElementById("showTestPage").style.display = "none"
    document.getElementById("showOurPolicyPage").style.display = "none"
}

function showCopyCodePage() {
    document.getElementById("showIndexPage").style.display = "none"
    document.getElementById("showCopyCodePage").style.display = "block"
    document.getElementById("showCopyCssPage").style.display = "none"
    document.getElementById("showHowItWorksPage").style.display = "none"
    document.getElementById("showTestPage").style.display = "none"
    document.getElementById("showOurPolicyPage").style.display = "none"
}

function showCopyCssPage() {
    document.getElementById("showIndexPage").style.display = "none"
    document.getElementById("showCopyCodePage").style.display = "none"
    document.getElementById("showCopyCssPage").style.display = "block"
    document.getElementById("showHowItWorksPage").style.display = "none"
    document.getElementById("showTestPage").style.display = "none"
    document.getElementById("showOurPolicyPage").style.display = "none"
}

function showHowItWorksPage() {
    document.getElementById("showIndexPage").style.display = "none"
    document.getElementById("showCopyCodePage").style.display = "none"
    document.getElementById("showCopyCssPage").style.display = "none"
    document.getElementById("showHowItWorksPage").style.display = "block"
    document.getElementById("showTestPage").style.display = "none"
    document.getElementById("showOurPolicyPage").style.display = "none"
}

function showTestPage() {
    document.getElementById("showIndexPage").style.display = "none"
    document.getElementById("showCopyCodePage").style.display = "none"
    document.getElementById("showCopyCssPage").style.display = "none"
    document.getElementById("showHowItWorksPage").style.display = "none"
    document.getElementById("showTestPage").style.display = "block"
    document.getElementById("showOurPolicyPage").style.display = "none"
}

function showOurPolicyPage() {
    document.getElementById("showIndexPage").style.display = "none"
    document.getElementById("showCopyCodePage").style.display = "none"
    document.getElementById("showCopyCssPage").style.display = "none"
    document.getElementById("showHowItWorksPage").style.display = "none"
    document.getElementById("showTestPage").style.display = "none"
    document.getElementById("showOurPolicyPage").style.display = "block"
}

function copyHTML() {
    htmlCode = `<form action="https://easyforms.vercel.app/api" method="POST">
    <fieldset>
        <legend>Contato</legend>
        <label for="name">Nome</label>
        <input type="text" name="name" id="name" required>
        <label for="email">E-mail</label>
        <input type="hidden" name="destiny" id="destiny" value="example@email.com">
        <input type="email" name="email" id="email" required>
        <label for="message">Mensagem</label>
        <textarea name="message" id="message" cols="30" rows="10" required></textarea>
        <button type="submit" id="button-send">enviar</button>
    </fieldset>
</form>`

    navigator.clipboard.writeText(htmlCode)
}

function showCopyCssPageCode(e) {
    const color = document.getElementById('cssColor');

    cssCode = `
        form fieldset {
            border-radius: 10px;
            margin: 10px;
            font-size: 2rem;
            box-shadow: 5px 5px 5px #090c0838;
            border: outset 2px;
            width: 200px;
            padding-bottom: 10px;
        }
        
         form fieldset label {
            display: block;
            margin: 5px 20px;
        }
        
         form fieldset legend {
            margin: auto;
            font-size: 1.8rem;
        }
        
         form fieldset input {
             width: auto;
            border-radius: 10px;
            margin: 5px 20px;
            border: solid 1px;
        }
        
         form fieldset textarea {
            border-radius: 10px;
            margin: 5px 20px;
            border: solid 1px;
        }
        
        form button {
            font-size: 1.6rem;
            text-decoration: none;
            color: #231F20;
            padding: 5px;
            border: #231F20 1px solid;
            display: block;
            margin: 5px auto;
            border-radius: 5px;
            background-color: white;
            width: 100px;
            padding: 2px;
        }

        button:hover {
            color: white;
            background-color: ${color.value};
            border-color: ${color.value};
        }`

    navigator.clipboard.writeText(cssCode)

    e.preventDefault()
}