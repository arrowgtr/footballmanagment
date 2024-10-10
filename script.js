const players = [
    { name: "Κωνσταντίνος", surname: "Παπαδόπουλος", BirthY: 2003, Θέση: "Δεξί Μπακ", Ομάδες: "ΠΑΟ, ΑΕΚ, ΠΑΟΚ" },
    { name: "Μάριος", surname: "Αναστασίου", BirthY: 2009, Θέση: "Αριστερό Εξτρέμ", Ομάδες: "ΟΣΦΠ, ΠΑΟΚ" },
    { name: "Νίκος", surname: "Κωνσταντίνου", BirthY: 1999, Θέση: "Σέντερ Φορ", Ομάδες: "ΑΕΚ" },
    { name: "Άγγελος", surname: "Μαυρίδης", BirthY: 1990, Θέση: "Αμυντικό Χαφ", Ομάδες: "ΠΑΟΚ, ΠΑΟ" },
    { name: "Δημήτρης", surname: "Γεωργίου", BirthY: 2001, Θέση: "Σέντερ Μπακ", Ομάδες: "ΟΣΦΠ" },
    { name: "Γιάννης", surname: "Καραγιάννης", BirthY: 1995, Θέση: "Επιθετικός", Ομάδες: "ΟΣΦΠ" },
    { name: "Σταύρος", surname: "Δημητρίου", BirthY: 1997, Θέση: "Μέσος", Ομάδες: "ΠΑΟΚ" },
    { name: "Μιχάλης", surname: "Νικολάου", BirthY: 1985, Θέση: "Τερματοφύλακας", Ομάδες: "ΑΕΚ" },
    { name: "Στέλιος", surname: "Φωτίου", BirthY: 1993, Θέση: "Μέσος", Ομάδες: "ΟΣΦΠ" },
    { name: "Βασίλης", surname: "Χριστοδούλου", BirthY: 1998, Θέση: "Αμυντικός", Ομάδες: "ΠΑΟ" },
    { name: "Αλέξανδρος", surname: "Τσαγγάρης", BirthY: 2000, Θέση: "Αριστερό Μπακ", Ομάδες: "ΑΕΚ" },
    { name: "Διονύσης", surname: "Κατσούλης", BirthY: 2002, Θέση: "Σέντερ Φορ", Ομάδες: "ΠΑΟΚ" },
    { name: "Κωνσταντίνος", surname: "Σαμαράς", BirthY: 2004, Θέση: "Επιθετικός", Ομάδες: "ΠΑΟ" },
];

// Συνάρτηση για αφαίρεση τόνων και μετατροπή σε πεζά
function removeTonos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Αφαιρεί τόνους
}

// Συνδυασμένη συνάρτηση για μετατροπή σε πεζά και αφαίρεση τόνων
function normalizeGreekString(str) {
    return removeTonos(str.toLowerCase()); // Μετατρέπει σε πεζά και αφαιρεί τόνους
}

let currentPage = 1;
const playersPerPage = 10;

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
    const searchTerm = normalizeGreekString(this.value); // Κανονικοποίηση αναζήτησης (πεζά και χωρίς τόνους)
    
    if (searchTerm.length > 0) { // Μόνο όταν ο χρήστης εισάγει κάτι
        const filteredPlayers = players.filter(p => 
            normalizeGreekString(p.name).includes(searchTerm) || 
            normalizeGreekString(p.surname).includes(searchTerm)
        ); // Κανονικοποίηση και των ονομάτων και των επωνύμων
        displayFilteredPlayers(filteredPlayers);
    } else {
        document.getElementById('playersList').innerHTML = ''; // Αν το πεδίο αναζήτησης είναι κενό, η λίστα παραμένει κενή
        document.getElementById('result').innerHTML = ''; // Διαγραφή στοιχείων παίκτη
    }
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
}
