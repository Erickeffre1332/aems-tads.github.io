document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const actionButton = document.getElementById('questionBtn');

    let currentStep = 0;
    let score = 0;

    const questions = [
        {
            question: "Qual é o principal objetivo de um ataque de 'Phishing'?",
            correct: "Enganar usuários para que revelem informações sensíveis como senhas e dados bancários.",
            wrongs: [
                "Criptografar os arquivos do usuário para exigir um resgate em dinheiro.",
                "Infectar o computador com um vírus que se replica automaticamente pela rede.",
                "Sobrecarregar um servidor com tráfego falso para torná-lo indisponível."
            ]
        },
        {
            question: "O que caracteriza um ataque de 'Ransomware'?",
            correct: "O bloqueio de acesso aos arquivos do sistema através de criptografia, seguido de um pedido de resgate.",
            wrongs: [
                "A alteração visual da página inicial de um site para exibir mensagens políticas.",
                "O uso de robôs para adivinhar senhas por meio de tentativas exaustivas.",
                "A interceptação silenciosa de dados que trafegam em uma rede Wi-Fi pública."
            ]
        },
        {
            question: "O que é a Autenticação de Dois Fatores (2FA)?",
            correct: "Uma camada extra de segurança que exige algo que você sabe (senha) e algo que você possui (como um código no celular).",
            wrongs: [
                "O processo de validar se um e-mail é verdadeiro verificando o nome do remetente duas vezes.",
                "Um sistema que permite o acesso de dois usuários simultâneos em uma mesma conta.",
                "A exigência de criar duas senhas diferentes para o mesmo serviço."
            ]
        },
        {
            question: "Qual destas senhas é considerada a mais segura para proteger uma conta?",
            correct: "G7#p!2mQ9v",
            wrongs: ["Sua data de nascimento", "123456", "senha123"]
        },
        {
            question: "Se você receber um e-mail de um banco pedindo para clicar em um link urgente para 'atualizar seus dados', o que deve fazer?",
            correct: "Ignorar o e-mail ou entrar em contato com o banco por um canal oficial.",
            wrongs: [
                "Encaminhar para todos os seus amigos para avisá-los.",
                "Clicar imediatamente para não ter a conta bloqueada.",
                "Responder ao e-mail enviando apenas seu CPF."
            ]
        }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledQuestions = shuffle([...questions]);

    function loadQuestion() {
        const q = shuffledQuestions[currentStep];
        const allOptions = shuffle([q.correct, ...q.wrongs]);

        questionContainer.innerHTML = `<h3>${currentStep + 1}. ${q.question}</h3>`;
        optionsContainer.innerHTML = '';
        
        allOptions.forEach((opt, index) => {
            const letter = String.fromCharCode(97 + index);
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="quiz-answer" value="${opt}"> 
                ${letter.toUpperCase()}) ${opt}
            `;
            optionsContainer.appendChild(label);
        });

        actionButton.textContent = (currentStep === shuffledQuestions.length - 1) ? "Finalizar" : "Próximo";
    }

    actionButton.addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');

        if (!selectedOption) {
            alert("Por favor, selecione uma resposta antes de continuar!");
            return;
        }

        if (selectedOption.value === shuffledQuestions[currentStep].correct) {
            score++;
        }

        if (currentStep < shuffledQuestions.length - 1) {
            currentStep++;
            loadQuestion();
        } else {
            showFinalResults();
        }
    });

    function showFinalResults() {
        let message = "";
        let color = "";

        if (score === 0) {
            message = "Alerta crítico! Você está muito vulnerável. Leia nossas dicas de prevenção urgentemente.";
            color = "#ff4444";
        } else if (score <= 2) {
            message = "Cuidado! Seu conhecimento básico precisa de reforço para evitar golpes reais.";
            color = "#ff8800";
        } else if (score <= 4) {
            message = "Bom trabalho! Você conhece bem os riscos, mas ainda pode melhorar sua atenção.";
            color = "#ffff00";
        } else {
            message = "Parabéns, Você é um especialista em cibersegurança e sabe como se proteger.";
            color = "#00ff88";
        }

        questionContainer.innerHTML = "<h2>Teste Concluído!</h2>";
        optionsContainer.innerHTML = `
            <div style="text-align: center;">
                <p style='font-size: 1.8rem; margin-bottom: 10px;'>Você acertou <strong>${score}</strong> de ${shuffledQuestions.length}</p>
                <p style='font-size: 1.2rem; color: ${color}; font-weight: bold; line-height: 1.4;'>${message}</p>
                <br>
                <a href="index.html" style="color: #fff; text-decoration: underline;">Voltar ao início</a>
            </div>
        `;
        actionButton.style.display = "none";
    }

    loadQuestion();
});