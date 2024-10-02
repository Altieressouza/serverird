// add-result.js

// Lista inicial de equipes (personalize conforme necessário)
const initialTeams = [
    { id: 1, name: "Flamengo", logo: "https://upload.wikimedia.org/wikipedia/en/1/17/CR Flamengo_logo.svg" },
    { id: 2, name: "Palmeiras", logo: "https://upload.wikimedia.org/wikipedia/en/4/4f/Palmeiras_logo.svg" },
    { id: 3, name: "Corinthians", logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Logo_Corinthians.svg" },
    { id: 4, name: "São Paulo", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/S%C3%A3o_Paulo_FC_logo.svg" },
    { id: 5, name: "Grêmio", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Gr%C3%AAmio_Foot-Ball_Club_logo.svg" },
    // Adicione mais equipes conforme necessário
];

// Função para inicializar equipes no Local Storage
function initializeTeams() {
    if (!localStorage.getItem('teams')) {
        localStorage.setItem('teams', JSON.stringify(initialTeams));
    }
}

// Função para carregar equipes no formulário de resultados
function loadTeamsIntoSelect() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const homeSelect = document.getElementById('home-team');
    const awaySelect = document.getElementById('away-team');

    homeSelect.innerHTML = '<option value="">Selecione</option>';
    awaySelect.innerHTML = '<option value="">Selecione</option>';

    teams.forEach(team => {
        const option1 = document.createElement('option');
        option1.value = team.id;
        option1.textContent = team.name;
        homeSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = team.id;
        option2.textContent = team.name;
        awaySelect.appendChild(option2);
    });
}

// Função para adicionar um resultado
function addResult(event) {
    event.preventDefault();

    const homeTeamId = parseInt(document.getElementById('home-team').value);
    const awayTeamId = parseInt(document.getElementById('away-team').value);
    const homeGoals = parseInt(document.getElementById('home-goals').value);
    const awayGoals = parseInt(document.getElementById('away-goals').value);

    if (homeTeamId === awayTeamId) {
        alert("Os times da casa e visitante não podem ser os mesmos.");
        return;
    }

    const match = {
        id: Date.now(),
        homeTeamId,
        awayTeamId,
        homeGoals,
        awayGoals
    };

    const matches = JSON.parse(localStorage.getItem('matches')) || [];
    matches.push(match);
    localStorage.setItem('matches', JSON.stringify(matches));

    alert("Resultado adicionado com sucesso!");
    document.getElementById('result-form').reset();
}

// Inicialização ao carregar a página
function initializePage() {
    initializeTeams();
    loadTeamsIntoSelect();
}

// Evento de submissão do formulário
document.getElementById('result-form').addEventListener('submit', addResult);

// Executar a inicialização
initializePage();
