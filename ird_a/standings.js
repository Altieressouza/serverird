// standings.js

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

// Função para atualizar o Dashboard (estatísticas gerais)
function updateDashboard() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    const matches = JSON.parse(localStorage.getItem('matches')) || [];
    const totalPoints = teams.reduce((acc, team) => acc + team.points || 0, 0); // Simplificação

    // Adicione elementos no index.html para exibir estas estatísticas se desejar
    // Por exemplo:
    // document.getElementById('total-teams').textContent = teams.length;
    // document.getElementById('total-matches').textContent = matches.length;
    // document.getElementById('total-points').textContent = totalPoints;
}

// Função para inicializar a classificação (chamada ao carregar)
function initializeStandings() {
    updateStandings();
    updateDashboard();
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', initializeStandings);
