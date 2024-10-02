// script.js

// Lista inicial de equipes (pode ser personalizada)
const initialTeams = [
    { id: 1, name: "Flamengo Arc-Verde", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo-fla-de-arcoverde_2022-logo-frame.png" },
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

    // Limpar opções existentes (exceto a primeira)
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
    updateDashboard();
    updateStandings();
}

// Função para calcular e exibir a classificação
function updateStandings() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const matches = JSON.parse(localStorage.getItem('matches')) || [];

    // Inicializar estatísticas de cada equipe
    const standings = teams.map(team => ({
        id: team.id,
        name: team.name,
        games: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
    }));

    // Atualizar estatísticas com base nos resultados
    matches.forEach(match => {
        const homeTeam = standings.find(team => team.id === match.homeTeamId);
        const awayTeam = standings.find(team => team.id === match.awayTeamId);

        homeTeam.games += 1;
        awayTeam.games += 1;

        homeTeam.goalsFor += match.homeGoals;
        homeTeam.goalsAgainst += match.awayGoals;
        awayTeam.goalsFor += match.awayGoals;
        awayTeam.goalsAgainst += match.homeGoals;

        if (match.homeGoals > match.awayGoals) {
            homeTeam.wins += 1;
            homeTeam.points += 3;
            awayTeam.losses += 1;
        } else if (match.homeGoals < match.awayGoals) {
            awayTeam.wins += 1;
            awayTeam.points += 3;
            homeTeam.losses += 1;
        } else {
            homeTeam.draws += 1;
            awayTeam.draws += 1;
            homeTeam.points += 1;
            awayTeam.points += 1;
        }
    });

    // Calcular saldo de gols
    standings.forEach(team => {
        team.goalDifference = team.goalsFor - team.goalsAgainst;
    });

    // Ordenar a classificação
    standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });

    // Atualizar a tabela no HTML
    const tbody = document.querySelector('#standings-table tbody');
    tbody.innerHTML = '';

    standings.forEach((team, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.games}</td>
            <td>${team.wins}</td>
            <td>${team.draws}</td>
            <td>${team.losses}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.goalDifference}</td>
            <td>${team.points}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para atualizar o Dashboard
function updateDashboard() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const matches = JSON.parse(localStorage.getItem('matches')) || [];
    const totalPoints = teams.reduce((acc, team) => acc + team.points || 0, 0); // Simplificação

    document.getElementById('total-teams').textContent = teams.length;
    document.getElementById('total-matches').textContent = matches.length;
    document.getElementById('total-points').textContent = totalPoints;
}

// Função para inicializar a classificação (chamada ao carregar)
function initializeStandings() {
    updateStandings();
    updateDashboard();
}

// Evento de submissão do formulário
document.getElementById('result-form').addEventListener('submit', addResult);

// Inicialização ao carregar a página
initializeTeams();
loadTeamsIntoSelect();
initializeStandings();
