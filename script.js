
const players = [
    { name: "Κωνσταντίνος", BirthY: 2003, Θέση: "Δεξί Μπακ", Ομάδες: "ΠΑΟ, ΑΕΚ, ΠΑΟΚ" },
    { name: "Μάριος", BirthY: 2009, Θέση: "Αριστερό Εξτρέμ", Ομάδες: "ΟΣΦΠ, ΠΑΟΚ" },
    { name: "Νίκος", BirthY: 1999, Θέση: "Σέντερ Φορ", Ομάδες: "ΑΕΚ" },
    { name: "Άγγελος", BirthY: 1990, Θέση: "Αμυντικό Χαφ", Ομάδες: "ΠΑΟΚ, ΠΑΟ" },
    { name: "Δημήτρης", BirthY: 2001, Θέση: "Σέντερ Μπακ", Ομάδες: "ΟΣΦΠ" },
    { name: "Γιάννης", BirthY: 1995, Θέση: "Επιθετικός", Ομάδες: "ΟΣΦΠ" },
    { name: "Σταύρος", BirthY: 1997, Θέση: "Μέσος", Ομάδες: "ΠΑΟΚ" },
    { name: "Μιχάλης", BirthY: 1985, Θέση: "Τερματοφύλακας", Ομάδες: "ΑΕΚ" },
    { name: "Στέλιος", BirthY: 1993, Θέση: "Μέσος", Ομάδες: "ΟΣΦΠ" },
    { name: "Βασίλης", BirthY: 1998, Θέση: "Αμυντικός", Ομάδες: "ΠΑΟ" },
    { name: "Αλέξανδρος", BirthY: 2000, Θέση: "Αριστερό Μπακ", Ομάδες: "ΑΕΚ" },
    { name: "Διονύσης", BirthY: 2002, Θέση: "Σέντερ Φορ", Ομάδες: "ΠΑΟΚ" },
    { name: "Κωνσταντίνος", BirthY: 2004, Θέση: "Επιθετικός", Ομάδες: "ΠΑΟ" },
];


let currentPage = 1;
const playersPerPage = 10;


function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}


document.getElementById('searchButton').addEventListener('click', function () {
    document.getElementById('searchPopup').style.display = 'block';
    document.getElementById('playersList').innerHTML = ''; // Clear previous results
    document.getElementById('result').innerHTML = ''; // Clear previous result
    currentPage = 1; 
});


document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeSearchPopup();
    }
});


window.addEventListener('click', function (event) {
    const popup = document.getElementById('searchPopup');
    if (popup.style.display === 'block' && !popup.contains(event.target) && !document.getElementById('searchButton').contains(event.target)) {
        closeSearchPopup();
    }
});


document.getElementById('playerSearchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(searchTerm));
    displayFilteredPlayers(filteredPlayers);
});


function displayFilteredPlayers(filteredPlayers) {
    const playersListDiv = document.getElementById("playersList");
    playersListDiv.innerHTML = ''; 
    const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
    

    updatePagination(filteredPlayers.length, totalPages);


    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = Math.min(startIndex + playersPerPage, filteredPlayers.length);
    const playersToDisplay = filteredPlayers.slice(startIndex, endIndex);

    if (playersToDisplay.length > 0) {
        playersToDisplay.forEach(player => {
            const playerItem = document.createElement('div');
            playerItem.className = 'player-item';
            playerItem.textContent = player.name;

            playerItem.onclick = () => {
                const isBirthYGreaterThan2003 = player.BirthY > 2003 ? "✔️" : "❌";
                document.getElementById("result").innerHTML = `
                    <p>Το όνομα <strong>"${player.name}"</strong> βρέθηκε</p>
                    <p>Ηλικία: ${new Date().getFullYear() - player.BirthY}</p>
                    <p>Θέση: ${player.Θέση}</p>
                    <p>Ομάδες: ${player.Ομάδες}</p>
                    <p>Έτος γέννησης > 2003: ${isBirthYGreaterThan2003}</p>
                `;
            };

            playersListDiv.appendChild(playerItem);
        });
    } else {
        playersListDiv.innerHTML = '<p>Δεν βρέθηκαν παίκτες.</p>';
    }
}


function updatePagination(totalPlayers, totalPages) {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    pageInfo.innerText = `Σελίδα ${currentPage} από ${totalPages}`;
    

    prevButton.style.display = currentPage > 1 ? 'inline' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'inline' : 'none';

  
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayFilteredPlayers(players.filter(p => p.name.toLowerCase().includes(document.getElementById('playerSearchInput').value.toLowerCase())));
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayFilteredPlayers(players.filter(p => p.name.toLowerCase().includes(document.getElementById('playerSearchInput').value.toLowerCase())));
        }
    };
}
