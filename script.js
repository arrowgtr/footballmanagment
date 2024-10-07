// Πίνακας με 5 ονόματα και πληροφορίες
        const people = [
            { name: "Κωνσταντίνος", BirthY: 2003, Θέση: "Δεξί Μπακ", Ομάδες: "ΠΑΟ, ΑΕΚ, ΠΑΟΚ" },
            { name: "Μάριος", BirthY: 2009, Θέση: "Αριστερό Εξτρέμ", Ομάδες: "ΟΣΦΠ, ΠΑΟΚ" },
            { name: "Νίκος", BirthY: 1999, Θέση: "Σέντερ Φορ", Ομάδες: "ΑΕΚ" },
            { name: "Άγγελος", BirthY: 1990, Θέση: "Αμυντικό Χαφ", Ομάδες: "ΠΑΟΚ, ΠΑΟ" },
            { name: "Δημήτρης", BirthY: 2001, Θέση: "Σέντερ Μπακ", Ομάδες: "ΟΣΦΠ" }
        ];

        // Συνάρτηση για μετατροπή από ελληνικούς χαρακτήρες σε λατινικούς
        function greekToLatin(str) {
            const greekToLatinMap = {
                'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': 'TH', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L',
                'Μ': 'M', 'Ν': 'N', 'Ξ': 'KS', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'CH',
                'Ψ': 'PS', 'Ω': 'O', 'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
                'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l',
                'μ': 'm', 'ν': 'n', 'ξ': 'ks', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch',
                'ψ': 'ps', 'ω': 'o', 'σ': 'ς'
            };

            return str.split('').map(char => greekToLatinMap[char] || char).join('');
        }

        // Συνάρτηση για την εμφάνιση της αντίστοιχης μπάρας αναζήτησης
        function showSearch(type) {
            const searchInputsDiv = document.getElementById("searchInputs");
            const searchTitle = document.getElementById("searchTitle");
            const nameInput = document.getElementById("nameInput");
            const positionInput = document.getElementById("positionInput");
            const resultDiv = document.getElementById("result");
            const playersListDiv = document.getElementById("playersList");

            // Επαναφορά πριν από την επιλογή
            searchInputsDiv.style.display = 'block';
            nameInput.value = ''; // Καθαρισμός του πεδίου ονόματος
            positionInput.value = ''; // Καθαρισμός του πεδίου θέσης
            resultDiv.innerHTML = ''; // Καθαρισμός των αποτελεσμάτων
            playersListDiv.innerHTML = ''; // Καθαρισμός λίστας παικτών
            nameInput.style.display = 'none';
            positionInput.style.display = 'none';

            if (type === 'name') {
                searchTitle.textContent = "Αναζητήστε με Όνομα";
                nameInput.style.display = 'block';
                nameInput.focus(); // Τοποθέτηση του κέρσορα στο πεδίο ονόματος
            } else if (type === 'position') {
                searchTitle.textContent = "Αναζητήστε με Θέση";
                positionInput.style.display = 'block';
                positionInput.focus(); // Τοποθέτηση του κέρσορα στο πεδίο θέσης
            }
        }

        // Συνάρτηση για την αναζήτηση
        function performSearch() {
            const nameInput = document.getElementById("nameInput").value.trim().toLowerCase();
            const positionInput = document.getElementById("positionInput").value.trim().toLowerCase();
            const resultDiv = document.getElementById("result");
            const playersListDiv = document.getElementById("playersList");

            if (nameInput) {
                searchByName(); // Αναζήτηση με βάση το όνομα
            } else if (positionInput) {
                searchByPosition(); // Αναζήτηση με βάση τη θέση
            }
        }

        // Συνάρτηση για την αναζήτηση με βάση το όνομα
        function searchByName() {
            const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
            const resultDiv = document.getElementById("result");
            const normalizedInputName = greekToLatin(inputName);

            const person = people.find(p => greekToLatin(p.name.toLowerCase()) === normalizedInputName);
            if (person) {
                const isBirthYGreaterThan2003 = person.BirthY > 2003 ? "✔️" : "❌";
                resultDiv.innerHTML = `
                    <p>Το όνομα <strong>"${person.name}"</strong> βρέθηκε</p>
                    <p>Ηλικία: ${new Date().getFullYear() - person.BirthY}</p>
                    <p>Θέση: ${person.Θέση}</p>
                    <p>Ομάδες: ${person.Ομάδες}</p>
                    <p>Είναι μεγαλύτερος του 2003: <span class="icon">${isBirthYGreaterThan2003}</span></p>
                `;
                resultDiv.style.color = "green";
            } else {
                resultDiv.textContent = `Το όνομα "${inputName}" δεν βρέθηκε. Προσπαθήστε ξανά.`;
                resultDiv.style.color = "red";
            }
        }

        // Συνάρτηση για την αναζήτηση με βάση τη θέση
        function searchByPosition() {
            const inputPosition = document.getElementById("positionInput").value.trim().toLowerCase();
            const playersListDiv = document.getElementById("playersList");
            const normalizedInputPosition = greekToLatin(inputPosition);

            playersListDiv.innerHTML = '';

            const filteredPlayers = people.filter(p => greekToLatin(p.Θέση.toLowerCase()).includes(normalizedInputPosition));

            if (filteredPlayers.length > 0) {
                filteredPlayers.forEach(player => {
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
                            <p>Είναι μεγαλύτερος του 2003: <span class="icon">${isBirthYGreaterThan2003}</span></p>
                        `;
                        document.getElementById("result").style.color = "green";
                    };

                    playersListDiv.appendChild(playerItem);
                });
            } else {
                playersListDiv.textContent = `Δεν βρέθηκαν παίκτες με θέση "${inputPosition}".`;
                playersListDiv.style.color = "red";
            }
        }

        // Προσθήκη υποστήριξης για πάτημα του πλήκτρου Enter
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
