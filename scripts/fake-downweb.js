// Compte à rebours simple (à titre d'exemple)
function updateCountdown() {
    // Définissez ici la date et l'heure de fin de la maintenance
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 2);
    endTime.setMinutes(endTime.getMinutes() + 20);
    endTime.setSeconds(endTime.getSeconds() + 30);
    
    function update() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            document.querySelector('.time-block:nth-child(1) .value').textContent = '00';
            document.querySelector('.time-block:nth-child(2) .value').textContent = '00';
            document.querySelector('.time-block:nth-child(3) .value').textContent = '00';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.querySelector('.time-block:nth-child(1) .value').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.time-block:nth-child(2) .value').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.time-block:nth-child(3) .value').textContent = seconds.toString().padStart(2, '0');
        
        setTimeout(update, 1000);
    }
    
    update();
}

// Démarrer le compte à rebours au chargement de la page
window.addEventListener('load', updateCountdown);