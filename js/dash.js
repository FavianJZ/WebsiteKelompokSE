// dash.js

// Global variables
let currentUser = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'JD'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadUserStats();
    loadFeaturedDeals();
    createLogoutModal();
});

function initializeDashboard() {
    console.log('ZeroWaste Dashboard initialized');
    updateUserInfo();
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    setTimeout(() => document.body.classList.add('loaded'), 500);
}

function updateUserInfo() {
    document.querySelectorAll('.user-name').forEach(el => el.textContent = currentUser.name);
    document.querySelectorAll('.user-avatar').forEach(el => el.textContent = currentUser.avatar);
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) welcomeTitle.textContent = `Welcome back, ${currentUser.name.split(' ')[0]}!`;
}

function loadUserStats() {
    const stats = {
        orders: Math.floor(Math.random() * 50) + 10,
        moneySaved: Math.floor(Math.random() * 300) + 50,
        foodSaved: (Math.random() * 20 + 5).toFixed(1),
        favorites: Math.floor(Math.random() * 15) + 3
    };
    updateStatCards(stats);
}

function updateStatCards(stats) {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers[0].textContent = stats.orders;
    statNumbers[1].textContent = `$${stats.moneySaved}`;
    statNumbers[2].textContent = `${stats.foodSaved}kg`;
    statNumbers[3].textContent = stats.favorites;
    statNumbers.forEach((el, i) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1.1)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        }, i * 100);
    });
}

function loadFeaturedDeals() {
    console.log('Loading featured deals...');
    document.querySelectorAll('.deal-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 150);
    });
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('active');
}

function orderDeal(dealId) {
    const button = event.target;
    const original = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = original;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
        
        showNotification('Redirecting to purchase...');
        
        // Redirect to buy.html after showing success message
        setTimeout(() => {
            window.location.href = 'buy.html';
        }, 1500);
        
    }, 1500);
    
    console.log(`Ordering deal: ${dealId}`);
}

function browseDeals() {
    showNotification('Redirecting to deals page...', 'info');
    setTimeout(() => window.location.href = 'deals.html', 1000);
}

function viewOrders() {
    showNotification('Loading your orders...', 'info');
    setTimeout(() => window.location.href = 'orders.html', 1000);
}

function viewResto() {
    showNotification('Redirecting to resto page...', 'info');
    setTimeout(() => window.location.href = 'resto.html', 1000);
}

function viewProfile() {
    showNotification('Opening profile settings...', 'info');
    setTimeout(() => window.location.href = 'profile.html', 1000);
}

function viewCart() {
    showNotification('Redirecting to cart...', 'info');
    setTimeout(() => window.location.href = 'cart.html', 1000);
}

function viewSupport() {
    showNotification('Opening support center...', 'info');
    setTimeout(() => window.location.href = 'support.html', 1000);
}

function logout() {
    const modal = document.getElementById('logoutModal');
    modal.style.display = 'flex';
}

function confirmLogout() {
    showNotification('Logging out...', 'info');
    setTimeout(() => {
        console.log('User logged out');
        window.location.href = 'landing.html';
    }, 1500);
}

function cancelLogout() {
    document.getElementById('logoutModal').style.display = 'none';
}

function createLogoutModal() {
    const modal = document.createElement('div');
    modal.id = 'logoutModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.zIndex = '1001';
    modal.style.display = 'none';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
        <div style="background: white; padding: 2rem 3rem; border-radius: 10px; text-align: center; max-width: 400px; width: 90%; box-shadow: 0 8px 30px rgba(0,0,0,0.2);">
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 500;">Are you sure you want to logout?</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="confirmLogout()" style="padding: 0.6rem 1.2rem; background-color: #ff4757; border: none; color: white; border-radius: 6px; font-weight: 600; cursor: pointer;">Yes</button>
                <button onclick="cancelLogout()" style="padding: 0.6rem 1.2rem; background-color: #ccc; border: none; color: #333; border-radius: 6px; font-weight: 600; cursor: pointer;">Cancel</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-item') || e.target.closest('.nav-item')) {
        const navItem = e.target.matches('.nav-item') ? e.target : e.target.closest('.nav-item');
        navItem.style.transform = 'scale(0.98)';
        setTimeout(() => navItem.style.transform = '', 150);
    }
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.body.style.opacity = '1', 100);
});