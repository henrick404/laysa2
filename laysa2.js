// Dados das perguntas e opções
const questions = [
    {
        id: 1,
        text: "Como você prefere trabalhar?",
        options: [
            { text: "Sozinho, com foco e concentração", attributes: { analysis: 20, creativity: 10 } },
            { text: "Em equipe, colaborando com outras pessoas", attributes: { communication: 20, leadership: 10 } },
            { text: "Em um ambiente dinâmico com várias tarefas", attributes: { leadership: 15, communication: 10, analysis: 5 } },
            { text: "Com liberdade para explorar novas ideias", attributes: { creativity: 20, analysis: 10 } }
        ]
    },
    {
        id: 2,
        text: "O que mais te motiva no trabalho?",
        options: [
            { text: "Resolver problemas complexos", attributes: { analysis: 20, creativity: 10 } },
            { text: "Ajudar outras pessoas", attributes: { communication: 20, leadership: 10 } },
            { text: "Criar algo novo e inovador", attributes: { creativity: 20, analysis: 10 } },
            { text: "Liderar projetos e equipes", attributes: { leadership: 20, communication: 10 } }
        ]
    },
    {
        id: 3,
        text: "Como você lida com desafios?",
        options: [
            { text: "Analiso cuidadosamente antes de agir", attributes: { analysis: 20, creativity: 5 } },
            { text: "Busco ajuda e opiniões de outras pessoas", attributes: { communication: 15, leadership: 10 } },
            { text: "Penso em soluções criativas e fora do comum", attributes: { creativity: 20, analysis: 5 } },
            { text: "Assumo a liderança para resolver a situação", attributes: { leadership: 20, communication: 5 } }
        ]
    },
    {
        id: 4,
        text: "Qual ambiente de trabalho você prefere?",
        options: [
            { text: "Estruturado e organizado", attributes: { analysis: 15, communication: 10 } },
            { text: "Dinâmico e em constante mudança", attributes: { creativity: 15, leadership: 10 } },
            { text: "Colaborativo e social", attributes: { communication: 20, leadership: 10 } },
            { text: "Flexível e com autonomia", attributes: { creativity: 15, analysis: 10 } }
        ]
    },
    {
        id: 5,
        text: "Como você toma decisões importantes?",
        options: [
            { text: "Baseado em dados e fatos", attributes: { analysis: 20, communication: 5 } },
            { text: "Consultando outras pessoas", attributes: { communication: 15, leadership: 10 } },
            { text: "Seguindo minha intuição", attributes: { creativity: 15, analysis: 10 } },
            { text: "Analisando riscos e benefícios", attributes: { analysis: 15, leadership: 10 } }
        ]
    }
];

// Dados das profissões
const professions = [
    {
        name: "Analista de Dados",
        description: "Profissional que coleta, processa e analisa dados para extrair insights valiosos para empresas e organizações.",
        skills: ["Análise estatística", "Programação", "Visualização de dados", "Pensamento crítico"],
        attributes: { analysis: 80, creativity: 40, leadership: 20, communication: 50 }
    },
    {
        name: "Designer UX/UI",
        description: "Especialista em criar experiências digitais intuitivas e atraentes para usuários de aplicativos e sites.",
        skills: ["Design thinking", "Prototipagem", "Pesquisa de usuário", "Criatividade"],
        attributes: { creativity: 80, analysis: 60, communication: 50, leadership: 30 }
    },
    {
        name: "Gerente de Projetos",
        description: "Profissional responsável por planejar, executar e finalizar projetos, garantindo que sejam entregues no prazo e dentro do orçamento.",
        skills: ["Liderança", "Planejamento", "Comunicação", "Resolução de problemas"],
        attributes: { leadership: 80, communication: 70, analysis: 60, creativity: 40 }
    },
    {
        name: "Psicólogo Organizacional",
        description: "Especialista em comportamento humano no ambiente de trabalho, focando no bem-estar e desenvolvimento dos colaboradores.",
        skills: ["Empatia", "Comunicação", "Análise comportamental", "Mediação"],
        attributes: { communication: 80, analysis: 60, leadership: 40, creativity: 50 }
    },
    {
        name: "Empreendedor",
        description: "Indivíduo que identifica oportunidades, assume riscos e cria novos negócios ou projetos inovadores.",
        skills: ["Visão estratégica", "Resiliência", "Criatividade", "Liderança"],
        attributes: { creativity: 70, leadership: 70, analysis: 60, communication: 60 }
    },
    {
        name: "Consultor de Negócios",
        description: "Profissional que assessora empresas na identificação de problemas e implementação de soluções para melhorar performance.",
        skills: ["Análise de negócios", "Comunicação", "Pensamento estratégico", "Resolução de problemas"],
        attributes: { analysis: 70, communication: 70, leadership: 50, creativity: 50 }
    }
];

// Estado da aplicação
let currentQuestion = 0;
let userAttributes = {
    creativity: 0,
    leadership: 0,
    analysis: 0,
    communication: 0
};
let userAnswers = [];

// Elementos DOM
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const professionResults = document.getElementById('profession-results');
const progressBar = document.getElementById('progress-bar');
const restartBtn = document.getElementById('restart-btn');

// Inicializar o quiz
function initQuiz() {
    showQuestion(currentQuestion);
    updateProfile();
}

// Mostrar pergunta atual
function showQuestion(index) {
    const question = questions[index];
    
    let optionsHTML = '';
    question.options.forEach((option, i) => {
        optionsHTML += `
            <div class="option" data-index="${i}">
                ${option.text}
            </div>
        `;
    });
    
    quizContainer.innerHTML = `
        <div class="question">
            <div class="question-text">${question.text}</div>
            <div class="options">
                ${optionsHTML}
            </div>
        </div>
        <div class="navigation">
            <button class="btn-prev" id="prev-btn" ${index === 0 ? 'disabled' : ''}>Anterior</button>
            ${index === questions.length - 1 ? '<button class="btn-next" id="results-btn" disabled>Ver Resultados</button>' : ''}
        </div>
    `;
    
    // Adicionar eventos aos botões
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    
    // Adicionar botão de resultados se for a última pergunta
    if (index === questions.length - 1) {
        document.getElementById('results-btn').addEventListener('click', showResults);
    }
    
    // Adicionar eventos às opções
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.addEventListener('click', () => selectOption(option, index));
    });
    
    // Marcar opção selecionada anteriormente, se houver
    if (userAnswers[index] !== undefined) {
        optionElements[userAnswers[index]].classList.add('selected');
        
        // Habilitar botão de resultados se for a última pergunta
        if (index === questions.length - 1) {
            document.getElementById('results-btn').disabled = false;
        }
    }
}

// Selecionar uma opção
function selectOption(option, questionIndex) {
    // Remover seleção anterior
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Marcar nova seleção
    option.classList.add('selected');
    
    // Salvar resposta
    const optionIndex = parseInt(option.getAttribute('data-index'));
    userAnswers[questionIndex] = optionIndex;
    
    // Atualizar atributos do usuário
    const selectedOption = questions[questionIndex].options[optionIndex];
    for (const attr in selectedOption.attributes) {
        userAttributes[attr] += selectedOption.attributes[attr];
    }
    
    // Atualizar perfil
    updateProfile();
    
    // Se não for a última pergunta, mudar automaticamente para a próxima
    if (questionIndex < questions.length - 1) {
        // Pequeno delay para dar feedback visual da seleção
        setTimeout(() => {
            currentQuestion++;
            showQuestion(currentQuestion);
        }, 500);
    } else {
        // Se for a última pergunta, habilitar o botão de resultados
        document.getElementById('results-btn').disabled = false;
    }
}

// Voltar para a pergunta anterior
function prevQuestion() {
    if (currentQuestion > 0) {
        // Remover atributos da resposta anterior
        if (userAnswers[currentQuestion] !== undefined) {
            const previousAnswer = questions[currentQuestion].options[userAnswers[currentQuestion]];
            for (const attr in previousAnswer.attributes) {
                userAttributes[attr] -= previousAnswer.attributes[attr];
            }
            userAnswers[currentQuestion] = undefined;
        }
        
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProfile();
    }
}

// Atualizar barra de perfil
function updateProfile() {
    // Calcular percentual de conclusão
    const answeredQuestions = userAnswers.filter(answer => answer !== undefined).length;
    const completionPercentage = (answeredQuestions / questions.length) * 100;
    
    // Atualizar barra de progresso
    progressBar.style.width = `${completionPercentage}%`;
    document.querySelector('.completion').textContent = `${Math.round(completionPercentage)}% completo`;
    
    // Calcular valores máximos possíveis para normalização
    const maxValues = {
        creativity: 0,
        leadership: 0,
        analysis: 0,
        communication: 0
    };
    
    questions.forEach(question => {
        question.options.forEach(option => {
            for (const attr in option.attributes) {
                maxValues[attr] += option.attributes[attr];
            }
        });
    });
    
    // Atualizar valores dos atributos
    for (const attr in userAttributes) {
        const percentage = Math.min(100, Math.round((userAttributes[attr] / maxValues[attr]) * 100));
        document.getElementById(attr).textContent = `${percentage}%`;
    }
}

// Mostrar resultados
function showResults() {
    // Calcular similaridade com cada profissão
    const professionMatches = professions.map(profession => {
        let similarity = 0;
        let totalWeight = 0;
        
        for (const attr in userAttributes) {
            const userValue = userAttributes[attr];
            const professionValue = profession.attributes[attr];
            const weight = Math.abs(userValue - professionValue);
            
            similarity += 100 - (weight / profession.attributes[attr] * 100);
            totalWeight++;
        }
        
        return {
            profession: profession,
            match: Math.max(0, Math.round(similarity / totalWeight))
        };
    });
    
    // Ordenar por similaridade (maior primeiro)
    professionMatches.sort((a, b) => b.match - a.match);
    
    // Mostrar as 3 profissões mais compatíveis
    let resultsHTML = '';
    for (let i = 0; i < Math.min(3, professionMatches.length); i++) {
        const match = professionMatches[i];
        const profession = match.profession;
        
        let skillsHTML = '';
        profession.skills.forEach(skill => {
            skillsHTML += `<span class="skill-tag">${skill}</span>`;
        });
        
        resultsHTML += `
            <div class="profession-card">
                <div class="profession-title">${profession.name} - ${match.match}% de compatibilidade</div>
                <div class="profession-description">${profession.description}</div>
                <div class="profession-skills">
                    ${skillsHTML}
                </div>
            </div>
        `;
    }
    
    professionResults.innerHTML = resultsHTML;
    
    // Mostrar container de resultados
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
}

// Reiniciar o quiz
function restartQuiz() {
    currentQuestion = 0;
    userAttributes = {
        creativity: 0,
        leadership: 0,
        analysis: 0,
        communication: 0
    };
    userAnswers = [];
    
    resultsContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    initQuiz();
}

// Event listeners
restartBtn.addEventListener('click', restartQuiz);

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', initQuiz);