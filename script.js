// Función para renderizar los torneos

function renderTournaments(data) {
  const container = document.getElementById("tournaments-container");

  data.tournaments.forEach((tournament) => {
    const tournamentCard = `
            <div class="tournament-card">
                <img src="${tournament.image}" alt="${tournament.title}" class="tournament-image">
                <div class="tournament-details">
                    <h3>${tournament.title}</h3>
                    <p class="game-name">${tournament.game}</p>
                    <div class="tournament-info">
                        <span class="info-item">🎮 ${tournament.type}</span>
                        <span class="info-item">👥 ${tournament.format}</span>
                        <span class="info-item">🎯 ${tournament.slots.filled} / ${tournament.slots.total}</span>
                    </div>
                    <p class="host">
                        Hosted by <span class="host-name">${tournament.host}</span> ✓
                    </p>
                    <div class="tournament-footer">
                        <span class="date-time">${tournament.date}</span>
                        <span class="prize">🏆 ${tournament.prize}</span>
                    </div>
                </div>
            </div>
        `;
    container.innerHTML += tournamentCard;
  });
}

// Cargar los datos y renderizar los torneos
fetch("Bloques.json")
  .then((response) => response.json())
  .then((data) => renderTournaments(data))
  .catch((error) => console.error("Error:", error));
