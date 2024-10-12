let players = []; // Δημιουργία άδειου πίνακα για τους παίκτες

// Λήψη δεδομένων παικτών από το PHP script
fetch('fetch_players.php')
    .then(response => response.json())
    .then(data => {
        players = data;
        console.log(players); // Πρόσθεσε αυτό το line
    })
    .catch(error => console.error('Σφάλμα:', error));

// Συνάρτηση για αφαίρεση τόνων και μετατροπή σε πεζά
function removeTonos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Αφαιρεί τόνους
}

// Συνδυασμένη συνάρτηση για μετατροπή σε πεζά και αφαίρεση τόνων
function normalizeGreekString(str) {
    return removeTonos(str.toLowerCase()); // Μετατρέπει σε πεζά και αφαιρεί τόνους
}

let currentPage = 1;
const playersPerPage = 20;

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}

// Άνοιγμα του popup επικοινωνίας
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'block'; // Εμφάνιση overlay
    document.getElementById('contactuspopup').style.display = 'block'; // Εμφάνιση popup
}

// Κλείσιμο του popup επικοινωνίας
function closecontactusPopup() {
    document.getElementById('popupOverlay').style.display = 'none'; // Απόκρυψη overlay
    document.getElementById('contactuspopup').style.display = 'none'; // Απόκρυψη popup
}

// Κλείσιμο του popup όταν κάνεις κλικ στο overlay
document.getElementById('popupOverlay').addEventListener('click', closecontactusPopup);

document.getElementById('searchButton').addEventListener('click', function () {
    document.getElementById('searchPopup').style.display = 'block';
    document.getElementById('playersList').innerHTML = ''; // Clear previous results
    document.getElementById('result').innerHTML = ''; // Clear previous result
    currentPage = 1;
});

// Προσθήκη event listener για το κουμπί επικοινωνίας
document.querySelector('.support-button').addEventListener('click', openPopup);

// Αρχικά άδεια η λίστα των παικτών
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('playersList').innerHTML = ''; // Κενή λίστα παικτών κατά την αρχική φόρτωση
});

window.addEventListener('click', function (event) {
    const popup = document.getElementById('searchPopup');
    if (popup.style.display === 'block' && !popup.contains(event.target) && !document.getElementById('searchButton').contains(event.target)) {
        closeSearchPopup();
    }
});

// Κατά την εισαγωγή στο πεδίο αναζήτησης
document.getElementById('playerSearchInput').addEventListener('input', function () {
    const searchTerm = this.value.trim();
    
    if (searchTerm.length > 0) { 
        const filteredPlayers = filterPlayersByCriteria(searchTerm);
        displayFilteredPlayers(filteredPlayers);
    } else {
        document.getElementById('playersList').innerHTML = ''; 
        document.getElementById('result').innerHTML = ''; 
    }
});

// Συνάρτηση για φιλτράρισμα παικτών με βάση τα κριτήρια (όνομα, επώνυμο, θέση, ηλικία)
function filterPlayersByCriteria(searchTerm) {
    // Διαχωρισμός του όρου αναζήτησης σε μέρη
    const terms = searchTerm.split(' ').map(t => normalizeGreekString(t));

    return players.filter(player => {
        const playerName = normalizeGreekString(player.name);
        const playerSurname = normalizeGreekString(player.surname);
        const playerPosition = normalizeGreekString(player.Θέση);
        const playerAge = new Date().getFullYear() - player.BirthY;

        return terms.every(term => 
            playerName.includes(term) ||
            playerSurname.includes(term) ||
            playerPosition.includes(term) ||
            (term.match(/^\d+$/) && playerAge == term) // Έλεγχος για αριθμό ηλικίας
        );
    });
}

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
            playerItem.textContent = `${player.name} ${player.surname}`; // Εμφάνιση ονόματος και επωνύμου

            // Όταν κάνεις κλικ σε κάποιον παίκτη, εμφανίζει τα στοιχεία του
            playerItem.onclick = () => {
                const isBirthYGreaterThan2003 = player.BirthY >= 2003 ? "✔️" : "❌";
                document.getElementById("result").innerHTML = `
                    <p><strong>Όνομα Παίκτη:</strong> ${player.name} ${player.surname}</p>
                    <p><strong>Ηλικία:</strong> ${new Date().getFullYear() - player.BirthY}</p>
                    <p><strong>Θέση:</strong> ${player.Θέση}</p>
                    <p><strong>Ομάδες:</strong> ${player.Ομάδες}</p>
                    <p><strong>Παίζει Μικρός:</strong> ${isBirthYGreaterThan2003}</p>
                `;
            };

            playersListDiv.appendChild(playerItem);
        });
    } else {
        playersListDiv.innerHTML = '<p>Δεν βρέθηκαν παίκτες.</p>'; // Μήνυμα όταν δεν βρεθούν παίκτες
        document.getElementById("result").innerHTML = ''; // Διαγραφή στοιχείων παίκτη αν δεν βρέθηκαν παίκτες
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
            displayFilteredPlayers(players.filter(p => 
                normalizeGreekString(p.name).includes(normalizeGreekString(document.getElementById('playerSearchInput').value)) || 
                normalizeGreekString(p.surname).includes(normalizeGreekString(document.getElementById('playerSearchInput').value))
            ));
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayFilteredPlayers(players.filter(p => 
                normalizeGreekString(p.name).includes(normalizeGreekString(document.getElementById('playerSearchInput').value)) || 
                normalizeGreekString(p.surname).includes(normalizeGreekString(document.getElementById('playerSearchInput').value))
            ));
        }
    };
}

// Εμφάνιση/απόκρυψη της υποκατηγορίας Αμυντικού
document.getElementById('defender').addEventListener('click', function() {
    const subMenu = document.getElementById('defenderOptions');
    subMenu.classList.toggle('show');
});

// Εμφάνιση/απόκρυψη της υποκατηγορίας Κεντρικού Μέσου
document.getElementById('midfielder').addEventListener('click', function() {
    const subMenu = document.getElementById('midfielderOptions');
    subMenu.classList.toggle('show');
});

// Εμφάνιση/απόκρυψη της υποκατηγορίας Επιθετικού
document.getElementById('forward').addEventListener('click', function() {
    const subMenu = document.getElementById('forwardOptions');
    subMenu.classList.toggle('show');
});
