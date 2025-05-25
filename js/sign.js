// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandlers();
    initializePasswordStrength();
    initializeFormValidation();
});

// Initialize form handlers
function initializeFormHandlers() {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }
    
    // Social buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
}

// Handle Sign In
function handleSignIn(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validate form
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!password || password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoading(submitBtn);
    
    // Simulate API call
    setTimeout(() => {
        hideLoading(submitBtn);
        
        // Mock successful login
        showSuccess('Successfully signed in! Redirecting...');
        
        // Store remember me preference
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', email);
        }
        
        // Redirect after success
        setTimeout(() => {
            // Replace with your dashboard URL
            window.location.href = 'dash.html';
        }, 1500);
        
    }, 2000);
}

// Handle Sign Up
function handleSignUp(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validate form
    if (!firstName || !lastName) {
        showError('Please enter your full name');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!validatePhone(phone)) {
        showError('Please enter a valid phone number');
        return;
    }
    
    if (!validatePassword(password)) {
        showError('Password must be at least 8 characters with uppercase, lowercase, and number');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!terms) {
        showError('Please accept the Terms of Service and Privacy Policy');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoading(submitBtn);
    
    // Simulate API call
    setTimeout(() => {
        hideLoading(submitBtn);
        
        // Mock successful registration
        showSuccess('Account created successfully! Please check your email to verify your account.');
        
        // Clear form
        e.target.reset();
        
        // Redirect to sign in page after success
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 2000);
        
    }, 2500);
}

// Password toggle functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Initialize password strength checker
function initializePasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (passwordInput && document.getElementById('passwordStrength')) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

// Check password strength
function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password strength';
        strengthFill.className = 'strength-fill';
        return;
    }
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('at least 8 characters');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('uppercase letter');
    
    // Lowercase check
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('lowercase letter');
    
    // Number check
    if (/\d/.test(password)) score += 1;
    else feedback.push('number');
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('special character');
    
    // Update UI based on score
    let strength = '';
    let width = '0%';
    let className = '';
    
    if (score <= 2) {
        strength = 'Weak';
        width = '33%';
        className = 'strength-fill strength-weak';
    } else if (score <= 3) {
        strength = 'Medium';
        width = '66%';
        className = 'strength-fill strength-medium';
    } else if (score >= 4) {
        strength = 'Strong';
        width = '100%';
        className = 'strength-fill strength-strong';
    }
    
    strengthFill.style.width = width;
    strengthFill.className = className;
    
    if (feedback.length > 0 && score < 4) {
        strengthText.textContent = `${strength} - Add: ${feedback.slice(0, 2).join(', ')}`;
    } else {
        strengthText.textContent = `${strength} password`;
    }
}

// Initialize form validation
function initializeFormValidation() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearError);
    });
}

// Validate individual input
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    clearInputError(input);
    
    if (!value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    switch (input.type) {
        case 'email':
            if (!validateEmail(value)) {
                showInputError(input, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'tel':
            if (!validatePhone(value)) {
                showInputError(input, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'password':
            if (input.id === 'confirmPassword') {
                const password = document.getElementById('password').value;
                if (value !== password) {
                    showInputError(input, 'Passwords do not match');
                    return false;
                }
            }
            break;
    }
    
    return true;
}

// Clear error on input
function clearError(e) {
    clearInputError(e.target);
}

// Validation helper functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// Show input error
function showInputError(input, message) {
    input.style.borderColor = '#e74c3c';
    
    // Remove existing error
    const existingError = input.parentElement.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentElement.parentElement.appendChild(errorDiv);
}

// Clear input error
function clearInputError(input) {
    input.style.borderColor = '#e1e8ed';
    
    const errorMessage = input.parentElement.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Handle social login
function handleSocialLogin(e) {
    const provider = e.currentTarget.classList.contains('google-btn') ? 'Google' : 'Facebook';
    
    // Show loading state
    const originalText = e.currentTarget.innerHTML;
    e.currentTarget.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting...`;
    e.currentTarget.disabled = true;
    
    // Simulate social login
    setTimeout(() => {
        e.currentTarget.innerHTML = originalText;
        e.currentTarget.disabled = false;
        
        showSuccess(`Successfully connected with ${provider}! Redirecting...`);
        
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 1500);
    }, 2000);
}

// Loading state functions
function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
}

function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
}

// Notification functions
function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Remember me functionality
function loadRememberMe() {
    const rememberMe = localStorage.getItem('rememberMe');
    const userEmail = localStorage.getItem('userEmail');
    
    if (rememberMe && userEmail) {
        const emailInput = document.getElementById('email');
        const rememberCheckbox = document.getElementById('remember');
        
        if (emailInput) emailInput.value = userEmail;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }
}

// Load remember me data on sign in page
if (window.location.pathname.includes('signin')) {
    document.addEventListener('DOMContentLoaded', loadRememberMe);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            const form = activeElement.closest('form');
            if (form) {
                const submitBtn = form.querySelector('.submit-btn');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
        }
    }
});

// Form auto-save for better UX (optional)
function autoSaveForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input:not([type="password"])');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formId = form.id;
                const inputId = input.id;
                const value = input.value;
                
                if (formId && inputId && value) {
                    localStorage.setItem(`${formId}_${inputId}`, value);
                }
            });
            
            // Load saved value
            const formId = form.id;
            const inputId = input.id;
            if (formId && inputId) {
                const savedValue = localStorage.getItem(`${formId}_${inputId}`);
                if (savedValue && input.type !== 'email') { // Don't auto-fill email for security
                    input.value = savedValue;
                }
            }
        });
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', autoSaveForm);

// Clear auto-saved data on successful form submission
function clearAutoSave(formId) {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith(formId + '_')) {
            localStorage.removeItem(key);
        }
    });
}