document.addEventListener("DOMContentLoaded", function () {
  initializeVideos();
  initializeCategories();
  initializeTournaments();
  initializeSearch();
});

function initializeVideos() {
  const featuredVideos = document.querySelector(".featured-videos");
  const contentNav = document.querySelector(".content-nav");
  let currentVideoIndex = 0;

  appData.videos.forEach((video, index) => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("loop", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("playsinline", "");
    if (index === 0) {
      videoElement.classList.add("active");
    }

    const source = document.createElement("source");
    source.src = video.src;
    source.type = video.type;

    videoElement.appendChild(source);
    featuredVideos.appendChild(videoElement);

    const navBtn = document.createElement("div");
    navBtn.classList.add("content-nav-btn");
    if (index === 0) navBtn.classList.add("active");
    contentNav.appendChild(navBtn);

    navBtn.addEventListener("click", () => switchVideo(index));
  });

  function switchVideo(index) {
    const videos = featuredVideos.querySelectorAll("video");
    const navBtns = contentNav.querySelectorAll(".content-nav-btn");

    videos[currentVideoIndex].classList.remove("active");
    navBtns[currentVideoIndex].classList.remove("active");

    currentVideoIndex = index;
    videos[currentVideoIndex].classList.add("active");
    navBtns[currentVideoIndex].classList.add("active");

    videos[currentVideoIndex].currentTime = 0;
    videos[currentVideoIndex].play();
  }

  const firstVideo = featuredVideos.querySelector("video");
  if (firstVideo) {
    firstVideo.play();
  }
}

function initializeCategories() {
  const categoryGrid = document.getElementById("categoryGrid");

  appData.categories.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.className =
      "bg-gray-800/50 p-6 rounded-xl text-center cursor-pointer hover:transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-700/50";
    categoryElement.textContent = category;

    categoryElement.addEventListener("click", () => {
      alert(`Has seleccionado la categoría: ${category}`);
    });

    categoryGrid.appendChild(categoryElement);
  });
}

function initializeTournaments() {
  const tournamentsContainer = document.getElementById("tournamentsContainer");

  appData.tournaments.forEach((tournament) => {
    const tournamentCard = createTournamentCard(tournament);
    tournamentsContainer.appendChild(tournamentCard);
  });
}

function createTournamentCard(tournament) {
  const card = document.createElement("div");
  card.className =
    "tournament-card bg-purple-900/30 rounded-xl overflow-hidden";

  card.innerHTML = `
        <div class="flex flex-col md:flex-row">
            <img src="${tournament.image}" 
                 alt="${tournament.title}" 
                 class="w-full md:w-48 h-48 object-cover">
            <div class="p-6 flex-1">
                <h3 class="text-xl font-bold mb-2">${tournament.title}</h3>
                <p class="text-cyan-400 mb-4">${tournament.game}</p>
                <div class="flex flex-wrap gap-4 mb-4">
                    <span class="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                        🎮 ${tournament.type}
                    </span>
                    <span class="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                        👥 ${tournament.teamSize}
                    </span>
                    <span class="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                        🎯 ${tournament.slots}
                    </span>
                </div>
                <p class="mb-4">
                    Hosted by <span class="text-cyan-400">${tournament.host}</span>
                </p>
                <div class="flex justify-between items-center">
                    <span class="text-gray-400">${tournament.date}</span>
                    <span class="text-yellow-400 font-bold">
                        🏆 ${tournament.prize}
                    </span>
                </div>
            </div>
        </div>
    `;

  return card;
}

function initializeSearch() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const tournamentCards = document.querySelectorAll(".tournament-card");

    tournamentCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const game = card
        .querySelector(".text-cyan-400")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || game.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
