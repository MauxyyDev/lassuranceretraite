/**
 * Script principal pour l'exercice de sensibilisation au phishing
 * Ce fichier contient la logique pour:
 * - La gestion des étapes du formulaire
 * - La validation des champs
 * - La navigation entre les étapes
 * - L'affichage de l'alerte de phishing
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== SÉLECTION DES ÉLÉMENTS ==========
    
    // Formulaires
    const identificationForm = document.getElementById('identification-form');
    const verificationForm = document.getElementById('verification-form');
    const passwordForm = document.getElementById('password-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const phishingAlert = document.getElementById('phishing-alert');

    // Boutons de navigation
    const continueToVerification = document.getElementById('continue-to-verification');
    const continueToPassword = document.getElementById('continue-to-password');
    const continueToConfirmation = document.getElementById('continue-to-confirmation');
    const backToIdentification = document.getElementById('back-to-identification');
    const backToVerification = document.getElementById('back-to-verification');
    const closePhishingAlert = document.getElementById('close-phishing-alert');

    // Étapes visuelles
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    // Champs de formulaire
    const nirInput = document.getElementById('nir');
    const emailInput = document.getElementById('email');
    const birthdateInput = document.getElementById('birthdate');
    const codeInput = document.getElementById('code');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Messages d'erreur
    const nirError = document.getElementById('nir-error');
    const emailError = document.getElementById('email-error');
    const birthdateError = document.getElementById('birthdate-error');
    const codeError = document.getElementById('code-error');
    const currentPasswordError = document.getElementById('current-password-error');
    const newPasswordError = document.getElementById('new-password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // ========== VALIDATION DES CHAMPS ==========
    
    // Numéro de sécurité sociale
    if (nirInput) {
        nirInput.addEventListener('input', function() {
            if (this.validity.patternMismatch || this.validity.valueMissing) {
                nirError.style.display = 'block';
            } else {
                nirError.style.display = 'none';
            }
        });
    }
    
    // Email
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.validity.typeMismatch || this.validity.valueMissing) {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }
        });
    }
    
    // Date de naissance
    if (birthdateInput) {
        birthdateInput.addEventListener('input', function() {
            if (this.validity.valueMissing) {
                birthdateError.style.display = 'block';
            } else {
                birthdateError.style.display = 'none';
            }
        });
    }

    // Code de vérification
    if (codeInput) {
        codeInput.addEventListener('input', function() {
            if (this.validity.patternMismatch || this.validity.valueMissing) {
                codeError.style.display = 'block';
            } else {
                codeError.style.display = 'none';
            }
        });
    }

    // Mot de passe actuel
    if (currentPasswordInput) {
        currentPasswordInput.addEventListener('input', function() {
            if (this.validity.valueMissing) {
                currentPasswordError.style.display = 'block';
            } else {
                currentPasswordError.style.display = 'none';
            }
        });
    }

    // Nouveau mot de passe
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            // Validation simple du nouveau mot de passe
            if (this.value.length < 8) {
                newPasswordError.style.display = 'block';
            } else {
                newPasswordError.style.display = 'none';
            }
        });
    }

    // Confirmation du mot de passe
    if (confirmPasswordInput && newPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value !== newPasswordInput.value) {
                confirmPasswordError.style.display = 'block';
            } else {
                confirmPasswordError.style.display = 'none';
            }
        });
    }

    // ========== FONCTIONS DE VALIDATION ==========
    
    /**
     * Valide les champs du formulaire d'identification
     * @returns {boolean} - True si tous les champs sont valides
     */
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

    /**
     * Valide les champs du formulaire de vérification
     * @returns {boolean} - True si tous les champs sont valides
     */
    function validateVerificationForm() {
        let isValid = true;
        
        if (codeInput && (codeInput.validity.patternMismatch || codeInput.validity.valueMissing)) {
            codeError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * Valide les champs du formulaire de mot de passe
     * @returns {boolean} - True si tous les champs sont valides
     */
    function validatePasswordForm() {
        let isValid = true;
        
        if (currentPasswordInput && currentPasswordInput.validity.valueMissing) {
            currentPasswordError.style.display = 'block';
            isValid = false;
        }
        
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

    // ========== NAVIGATION ENTRE LES ÉTAPES ==========
    
    // Passer à l'étape de vérification
    if (continueToVerification) {
        continueToVerification.addEventListener('click', function() {
            if (validateIdentificationForm()) {
                identificationForm.classList.remove('active');
                verificationForm.classList.add('active');
                step1.classList.remove('active');
                step1.classList.add('completed');
                step2.classList.add('active');
                
                // Afficher l'email pour le code de vérification
                const emailDisplay = document.getElementById('email-display');
                if (emailDisplay && emailInput) {
                    emailDisplay.textContent = emailInput.value;
                }
            }
        });
    }

    // Passer à l'étape du mot de passe
    if (continueToPassword) {
        continueToPassword.addEventListener('click', function() {
            if (validateVerificationForm()) {
                verificationForm.classList.remove('active');
                passwordForm.classList.add('active');
                step2.classList.remove('active');
                step2.classList.add('completed');
                step3.classList.add('active');
            }
        });
    }

    // Passer à l'étape de confirmation
    if (continueToConfirmation) {
        continueToConfirmation.addEventListener('click', function() {
            if (validatePasswordForm()) {
                // Pour le démo de phishing, capture des informations saisies
                captureUserData();
                
                // Afficher l'alerte de phishing au lieu de passer à l'étape de confirmation
                if (phishingAlert) phishingAlert.style.display = 'flex';
                
                // Si vous voulez montrer l'étape de confirmation sans l'alerte:
                // passwordForm.classList.remove('active');
                // confirmationMessage.classList.add('active');
                // step3.classList.remove('active');
                // step3.classList.add('completed');
                // step4.classList.add('active');
            }
        });
    }

    // Retour à l'étape d'identification
    if (backToIdentification) {
        backToIdentification.addEventListener('click', function() {
            verificationForm.classList.remove('active');
            identificationForm.classList.add('active');
            step2.classList.remove('active');
            step1.classList.remove('completed');
            step1.classList.add('active');
        });
    }

    // Retour à l'étape de vérification
    if (backToVerification) {
        backToVerification.addEventListener('click', function() {
            passwordForm.classList.remove('active');
            verificationForm.classList.add('active');
            step3.classList.remove('active');
            step2.classList.remove('completed');
            step2.classList.add('active');
        });
    }

    // Fermer l'alerte de phishing
    if (closePhishingAlert) {
        closePhishingAlert.addEventListener('click', function() {
            phishingAlert.style.display = 'none';
            // Vous pouvez rediriger vers une page de fin ou afficher un message ici
            alert("Merci pour votre participation à cet exercice de sensibilisation.");
        });
    }

    // ========== FONCTIONS UTILITAIRES ==========
    
    /**
     * Capture les données utilisateur pour les afficher dans l'alerte
     */
    function captureUserData() {
        const capturedNir = document.getElementById('captured-nir');
        const capturedEmail = document.getElementById('captured-email');
        const capturedBirthdate = document.getElementById('captured-birthdate');
        const capturedCurrentPassword = document.getElementById('captured-current-password');
        const capturedNewPassword = document.getElementById('captured-new-password');

        if (capturedNir && nirInput) capturedNir.textContent = nirInput.value;
        if (capturedEmail && emailInput) capturedEmail.textContent = emailInput.value;
        if (capturedBirthdate && birthdateInput) capturedBirthdate.textContent = birthdateInput.value;
        if (capturedCurrentPassword && currentPasswordInput) capturedCurrentPassword.textContent = currentPasswordInput.value;
        if (capturedNewPassword && newPasswordInput) capturedNewPassword.textContent = newPasswordInput.value;
    }

    // ========== GESTION DES BOUTONS DE VISIBILITÉ DES MOTS DE PASSE ==========
    
    // Toggle pour afficher/masquer les mots de passe
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                // Basculer entre password et text
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