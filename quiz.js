document.addEventListener('DOMContentLoaded', function () {

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const actionButton = document.getElementById('questionBtn');
    const progressEl = document.getElementById('progress');

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
        { question: "Você sabe o que é phishing?", fact: "conhece_phishing" },
        { question: "Você usa a mesma senha em vários serviços?", fact: "reutiliza_senha" },
        { question: "Você utiliza autenticação em dois fatores (2FA)?", fact: "usa_2fa" },
        { question: "Você costuma clicar em links desconhecidos?", fact: "clica_links_desconhecidos" },
        { question: "Você usa Wi-Fi público com frequência?", fact: "usa_wifi_publico" },
        { question: "Você sabe identificar e-mails falsos ou fraudulentos?", fact: "sabe_identificar_email_falso" },
        { question: "Você mantém seu sistema atualizado?", fact: "atualiza_sistema" },
        { question: "Você usa antivírus no seu dispositivo?", fact: "usa_antivirus" },
        { question: "Você faz backup dos seus dados regularmente?", fact: "faz_backup" },
        { question: "Você usa senhas fortes diferentes para cada serviço?", fact: "usa_senha_forte" }
    ];

    let riskScore = 0;
    let recommendations = [];

    function addRisk(value, rec) {
        riskScore += value;
        if (!recommendations.includes(rec)) {
            recommendations.push(rec);
        }
    }

    function runInference() {
        if (facts.clica_links_desconhecidos) addRisk(2, "⚠️ Evite clicar em links desconhecidos");
        if (facts.reutiliza_senha) addRisk(3, "🔑 Não reutilize senhas em serviços diferentes");
        if (!facts.conhece_phishing) addRisk(2, "📚 Aprenda sobre phishing e como se proteger");
        if (!facts.usa_2fa) addRisk(3, "🛡️ Ative autenticação em dois fatores (2FA)");
        if (facts.usa_wifi_publico) addRisk(2, "📶 Evite Wi-Fi público sem proteção ou use VPN");
        if (facts.reutiliza_senha && !facts.usa_2fa) addRisk(4, "🚨 Senha reutilizada + sem 2FA é alto risco!");
        if (facts.clica_links_desconhecidos && !facts.conhece_phishing) addRisk(4, "🚨 Alto risco de cair em golpes de phishing");
        if (!facts.usa_antivirus) addRisk(2, "🛡️ Instale e mantenha um antivírus ativo");
        if (!facts.atualiza_sistema) addRisk(2, "🔄 Atualize seu sistema operacional regularmente");
        if (!facts.faz_backup) addRisk(2, "💾 Faça backups regulares dos seus dados");
        if (!facts.sabe_identificar_email_falso) addRisk(2, "📧 Aprenda a identificar e-mails fraudulentos");
        if (!facts.usa_senha_forte) addRisk(2, "🔐 Use senhas fortes e únicas para cada serviço");
    }

    function getRiskLevel() {
        if (riskScore <= 5)  return { label: "BAIXO", color: "#00e676", emoji: "✅", msg: "Parabéns! Você tem bons hábitos de segurança digital." };
        if (riskScore <= 12) return { label: "MÉDIO", color: "#ffea00", emoji: "⚠️", msg: "Atenção! Você tem algumas vulnerabilidades que podem ser corrigidas." };
        return                      { label: "ALTO",  color: "#ff1744", emoji: "🚨", msg: "Cuidado! Você está exposto a sérios riscos digitais. Aja agora!" };
    }

    function updateProgress() {
        const pct = Math.round((currentStep / questions.length) * 100);
        progressEl.innerHTML = `
            <span>Pergunta ${currentStep + 1} de ${questions.length}</span>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${pct}%"></div>
            </div>
        `;
    }

    function loadQuestion() {
        const q = questions[currentStep];

        questionContainer.style.opacity = '0';
        questionContainer.style.transform = 'translateY(16px)';
        optionsContainer.style.opacity = '0';

        setTimeout(() => {
            questionContainer.innerHTML = `<h3>${q.question}</h3>`;
            optionsContainer.innerHTML = `
                <label class="option-label"><input type="radio" name="answer" value="sim"> Sim</label>
                <label class="option-label"><input type="radio" name="answer" value="nao"> Não</label>
            `;

            actionButton.textContent = (currentStep === questions.length - 1) ? "Finalizar" : "Próxima";
            actionButton.disabled = false;

            questionContainer.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            optionsContainer.style.transition = 'opacity 0.35s ease 0.1s';

            requestAnimationFrame(() => {
                questionContainer.style.opacity = '1';
                questionContainer.style.transform = 'translateY(0)';
                optionsContainer.style.opacity = '1';
            });
        }, 200);

        updateProgress();
    }

    actionButton.addEventListener('click', function () {
        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            const questionsBox = document.querySelector('.questions');
            questionsBox.classList.add('shake');
            setTimeout(() => questionsBox.classList.remove('shake'), 500);
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

        progressEl.innerHTML = `
            <span>Concluído!</span>
            <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: 100%; background: ${risk.color};"></div>
            </div>
        `;

        questionContainer.style.opacity = '0';
        optionsContainer.style.opacity = '0';
        actionButton.style.opacity = '0';

        setTimeout(() => {
            actionButton.style.display = 'none';

            questionContainer.innerHTML = `
                <div class="result-header" style="--score-color: ${risk.color}">
                    <div class="result-emoji">${risk.emoji}</div>
                    <h2 class="result-title">Nível de Risco: <span style="color:${risk.color}">${risk.label}</span></h2>
                    <p class="result-msg">${risk.msg}</p>
                    <div class="score-ring" style="--score-color: ${risk.color}">
                        <span class="score-number" data-target="${riskScore}">0</span>
                        <span class="score-label">pontos</span>
                    </div>
                </div>
            `;

            optionsContainer.innerHTML = recommendations.length > 0
                ? `<div class="rec-box">
                       <h3 class="rec-title">📋 Recomendações para você:</h3>
                       <ul class="rec-list">
                           ${recommendations.map((r, i) => `<li class="rec-item" style="animation-delay:${i * 0.08}s">${r}</li>`).join('')}
                       </ul>
                   </div>
                   <button class="restart-btn" id="restartBtn">🔁 Refazer o Quiz</button>`
                : `<p class="all-good">🎉 Nenhuma recomendação — continue assim!</p>
                   <button class="restart-btn" id="restartBtn">🔁 Refazer o Quiz</button>`;

            questionContainer.style.transition = 'opacity 0.5s ease';
            optionsContainer.style.transition = 'opacity 0.5s ease 0.2s';
            questionContainer.style.opacity = '1';
            optionsContainer.style.opacity = '1';

            animateCounter(document.querySelector('.score-number'), riskScore);

            document.getElementById('restartBtn').addEventListener('click', restartQuiz);

        }, 300);
    }

    function animateCounter(el, target) {
        if (!el) return;
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(interval);
        }, 40);
    }

    function restartQuiz() {
        currentStep = 0;
        riskScore = 0;
        recommendations = [];
        Object.keys(facts).forEach(k => facts[k] = false);
        actionButton.style.display = '';
        actionButton.style.opacity = '1';
        loadQuestion();
    }

    loadQuestion();
});