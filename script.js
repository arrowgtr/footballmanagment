document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("nameInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchName(); // Καλεί τη συνάρτηση αναζήτησης
        }
    });
});
// Πίνακας με 5 ονόματα και πληροφορίες
const people = [
    { name: "Κωνσταντίνος", κατάσταση: "Ελεύθερος", Θέση: "Δεξί Μπακ", Ομάδες: "ΠΑΟ,ΑΕΚ,ΠΑΟΚ", Γκολ: 12 },
    { name: "Μάριος", κατάσταση: "Δανεικός", Θέση: "Αριστερό Εξτρέμ", Ομάδες: "ΟΣΦΠ,ΠΑΟΚ", Γκολ: 0 },
    { name: "Νίκος", κατάσταση: "Σε ομάδα", Θέση: "Σέντερ Φορ", Ομάδες: "ΑΕΚ", Γκολ: 130 },
    { name: "Άγγελος", κατάσταση: "Δανεικός", Θέση: "Αμυντικό Χαφ", Ομάδες: "ΠΑΟΚ,ΠΑΟ", Γκολ: 140 },
    { name: "Δημήτρης", κατάσταση: "Ελεύθερος", Θέση: "Σέντερ Μπακ", Ομάδες: "ΟΣΦΠ", Γκολ: 19 }
];

// Συνάρτηση για μετατροπή από ελληνικούς χαρακτήρες σε λατινικούς
function greekToLatin(str) {
    const greekToLatinMap = {
        'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': 'TH', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L',
        'Μ': 'M', 'Ν': 'N', 'Ξ': 'KS', 'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'CH',
        'Ψ': 'PS', 'Ω': 'O', 'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
        'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l',
        'μ': 'm', 'ν': 'n', 'ξ': 'ks', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch',
        'ψ': 'ps', 'ω': 'o'
    };

    return str.split('').map(char => greekToLatinMap[char] || char).join('');
}

// Συνάρτηση για την αναζήτηση του ονόματος
function searchName() {
    // Παίρνω το όνομα από το πεδίο εισαγωγής
    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");

    // Μετατροπή εισόδου σε λατινικά και πεζά
    const normalizedInputName = greekToLatin(inputName);

    // Ψάχνω αν το όνομα είναι έγκυρο δηλαδή υπάρχει στην λίστα
    const person = people.find(p => greekToLatin(p.name.toLowerCase()) === normalizedInputName);

    // Αν βρεθεί το όνομα, εμφανίζεται μαζί με τις κατάλληλες πληροφορίες 
    if (person) {
        resultDiv.innerHTML = `
            <p>Το όνομα <strong>"${person.name}"</strong> βρέθηκε</p>
            <p>Μεταγραφικό Status: ${person.κατάσταση} </p>
            <p>Θέση: ${person.Θέση}</p>
            <p>Ομάδες: ${person.Ομάδες}</p>
            <p>Γκολ: ${person.Γκολ}</p>
        `;
        resultDiv.style.color = "green";
    } else {
        // Αν δεν βρεθεί, εμφανίζεται μήνυμα αποτυχημένης αναζήτησης 
        resultDiv.textContent = `Το όνομα "${inputName}" δεν βρέθηκε. Προσπαθήστε ξανά`;
        resultDiv.style.color = "red";
    }
}
