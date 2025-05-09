document.addEventListener('DOMContentLoaded', function() {
    // Éléments du formulaire
    const identificationForm = document.getElementById('identification-form');
    const passwordForm = document.getElementById('password-form');
    const phishingAlert = document.getElementById('phishing-alert');
    
    // Boutons
    const continueToPasswordBtn = document.getElementById('continue-to-password');
    const backToIdentificationBtn = document.getElementById('back-to-identification');
    const savePasswordBtn = document.getElementById('save-password');
    const closePhishingAlertBtn = document.getElementById('close-phishing-alert');
    
    // Étapes
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    
    // Champs
    const nirInput = document.getElementById('nir');
    const emailInput = document.getElementById('email');
    const birthdateInput = document.getElementById('birthdate');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Messages d'erreur
    const nirError = document.getElementById('nir-error');
    const emailError = document.getElementById('email-error');
    const birthdateError = document.getElementById('birthdate-error');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Validation des champs en temps réel
    if (nirInput) {
        nirInput.addEventListener('input', function() {
            if (this.validity.patternMismatch || this.validity.valueMissing) {
                nirError.style.display = 'block';
            } else {
                nirError.style.display = 'none';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.validity.typeMismatch || this.validity.valueMissing) {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }
        });
    }
    
    if (birthdateInput) {
        birthdateInput.addEventListener('input', function() {
            if (this.validity.valueMissing) {
                birthdateError.style.display = 'block';
            } else {
                birthdateError.style.display = 'none';
            }
        });
    }

    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            if (this.value.length < 8) {
                newPasswordError.style.display = 'block';
            } else {
                newPasswordError.style.display = 'none';
            }
        });
    }

    if (confirmPasswordInput && newPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== newPasswordInput.value) {
                confirmPasswordError.style.display = 'block';
            } else {
                confirmPasswordError.style.display = 'none';
            }
        });
    }

    // Navigation entre les étapes
    if (continueToPasswordBtn) {
        continueToPasswordBtn.addEventListener('click', function() {
            if (validateIdentificationForm()) {
                identificationForm.classList.remove('active');
                passwordForm.classList.add('active');
                step1.classList.remove('active');
                step1.classList.add('completed');
                step2.classList.add('active');
            }
        });
    }

    if (backToIdentificationBtn) {
        backToIdentificationBtn.addEventListener('click', function() {
            passwordForm.classList.remove('active');
            identificationForm.classList.add('active');
            step2.classList.remove('active');
            step1.classList.remove('completed');
            step1.classList.add('active');
        });
    }

    // Bouton Enregistrer - déclenche l'alerte de phishing
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', function() {
            if (validatePasswordForm()) {
                captureUserData();
                if (phishingAlert) phishingAlert.style.display = 'flex';
            }
        });
    }

    // Fermer l'alerte de phishing
    if (closePhishingAlertBtn) {
        closePhishingAlertBtn.addEventListener('click', function() {
            phishingAlert.style.display = 'none';
        });
    }

    // Fonctions de validation
    function validateIdentificationForm() {
        let isValid = true;
        
        if (nirInput && (nirInput.validity.patternMismatch || nirInput.validity.valueMissing)) {
            nirError.style.display = 'block';
            isValid = false;
        }
        
        if (emailInput && (emailInput.validity.typeMismatch || emailInput.validity.valueMissing)) {
            emailError.style.display = 'block';
            isValid = false;
        }
        
        if (birthdateInput && birthdateInput.validity.valueMissing) {
            birthdateError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }

    function validatePasswordForm() {
        let isValid = true;
        
        if (newPasswordInput && newPasswordInput.value.length < 8) {
            newPasswordError.style.display = 'block';
            isValid = false;
        }
        
        if (confirmPasswordInput && newPasswordInput && confirmPasswordInput.value !== newPasswordInput.value) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }

    // Capture les données pour l'alerte
    function captureUserData() {
        const capturedNir = document.getElementById('captured-nir');
        const capturedEmail = document.getElementById('captured-email');
        const capturedBirthdate = document.getElementById('captured-birthdate');
        const capturedNewPassword = document.getElementById('captured-new-password');

        if (capturedNir && nirInput) capturedNir.textContent = nirInput.value;
        if (capturedEmail && emailInput) capturedEmail.textContent = emailInput.value;
        if (capturedBirthdate && birthdateInput) capturedBirthdate.textContent = birthdateInput.value;
        if (capturedNewPassword && newPasswordInput) capturedNewPassword.textContent = newPasswordInput.value;
    }

    // Gestion de la visibilité des mots de passe
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.querySelector('.eye-icon').style.display = 'none';
                    this.querySelector('.eye-off-icon').style.display = 'block';
                } else {
                    passwordInput.type = 'password';
                    this.querySelector('.eye-icon').style.display = 'block';
                    this.querySelector('.eye-off-icon').style.display = 'none';
                }
            }
        });
    });
});
