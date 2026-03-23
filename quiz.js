document.addEventListener('DOMContentLoaded', function () {

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const actionButton = document.getElementById('questionBtn');

    let currentStep = 0;

    let facts = {
        conhece_phishing: false,
        conhece_ransomware: false,
        conhece_2fa: false,
        usa_senha_forte: false,
        sabe_identificar_email_falso: false,
        clica_links_desconhecidos: false,
        reutiliza_senha: false,
        usa_wifi_publico: false,
        atualiza_sistema: false,
        usa_antivirus: false,
        verifica_urls: false,
        compartilha_dados: false,
        faz_backup: false,
        usa_2fa: false,
        abre_anexos_desconhecidos: false,
        confia_em_promocoes: false,
        usa_senha_padrao: false,
        ignora_alertas: false,
        acessa_sites_inseguros: false,
        baixa_arquivos_desconhecidos: false
    };

    const questions = [
        {
            question: "Você sabe o que é phishing?",
            fact: "conhece_phishing"
        },
        {
            question: "Você usa a mesma senha em vários serviços?",
            fact: "reutiliza_senha"
        },
        {
            question: "Você utiliza autenticação em dois fatores (2FA)?",
            fact: "usa_2fa"
        },
        {
            question: "Você costuma clicar em links desconhecidos?",
            fact: "clica_links_desconhecidos"
        },
        {
            question: "Você usa Wi-Fi público com frequência?",
            fact: "usa_wifi_publico"
        },
        {
            question: "Você sabe identificar e-mails falsos ou fraudulentos?",
            fact: "sabe_identificar_email_falso"
        },
        {
            question: "Você mantém seu sistema atualizado?",
            fact: "atualiza_sistema"
        },
        {
            question: "Você usa antivírus no seu dispositivo?",
            fact: "usa_antivirus"
        },
        {
            question: "Você faz backup dos seus dados regularmente?",
            fact: "faz_backup"
        },
        {
            question: "Você usa senhas fortes diferentes para cada serviço?",
            fact: "usa_senha_forte"
        }
    ];


    let riskScore = 0;
    let recommendations = [];

    function addRisk(value, rec) {
        riskScore += value;
        recommendations.push(rec);
    }

    function runInference() {

        if (facts.clica_links_desconhecidos) addRisk(2, "Evite clicar em links desconhecidos");
        if (facts.reutiliza_senha) addRisk(3, "Não reutilize senhas");
        if (!facts.conhece_phishing) addRisk(2, "Aprenda sobre phishing");
        if (!facts.usa_2fa) addRisk(3, "Ative autenticação em dois fatores");
        if (facts.usa_wifi_publico) addRisk(2, "Evite Wi-Fi público sem proteção");
        if (facts.reutiliza_senha && !facts.usa_2fa) addRisk(4, "Senha vulnerável + sem 2FA");
        if (facts.clica_links_desconhecidos && !facts.conhece_phishing) addRisk(4, "Alto risco de golpe");
        if (!facts.usa_antivirus) addRisk(2, "Use antivírus");
        if (!facts.atualiza_sistema) addRisk(2, "Atualize seu sistema");
        if (!facts.faz_backup) addRisk(2, "Faça backups regulares");
        if (!facts.sabe_identificar_email_falso) addRisk(2, "Aprenda a identificar e-mails fraudulentos");
        if (!facts.usa_senha_forte) addRisk(2, "Use senhas fortes diferentes para cada serviço");
    }

    function getRiskLevel() {
        if (riskScore <= 5) return "BAIXO";
        if (riskScore <= 12) return "MÉDIO";
        return "ALTO";
    }

    function loadQuestion() {
        const q = questions[currentStep];

        questionContainer.innerHTML = `<h3>${q.question}</h3>`;

        optionsContainer.innerHTML = `
            <label><input type="radio" name="answer" value="sim"> Sim</label><br>
            <label><input type="radio" name="answer" value="nao"> Não</label>
        `;

        actionButton.textContent = (currentStep === questions.length - 1) ? "Finalizar" : "Próximo";
    }

    actionButton.addEventListener('click', function () {

        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            alert("Selecione uma opção!");
            return;
        }

        const factName = questions[currentStep].fact;
        facts[factName] = selected.value === "sim";

        if (currentStep < questions.length - 1) {
            currentStep++;
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {

        runInference();
        const risk = getRiskLevel();

        questionContainer.innerHTML = `<h2>Risco: ${risk}</h2>`;

        optionsContainer.innerHTML = `
            <p>Pontuação: ${riskScore}</p>
            <h3>Recomendações:</h3>
            <ul>
                ${recommendations.map(r => `<li>${r}</li>`).join('')}
            </ul>
        `;

        actionButton.style.display = "none";
    }

    loadQuestion();
});