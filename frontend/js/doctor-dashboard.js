// Doctor Dashboard JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeActionButtons();
    initializeSidebarToggle();
    updateDateTime();
});

// Update date and time
function updateDateTime() {
    const dateTimeElement = document.querySelector('.date-time');
    if (dateTimeElement) {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const day = days[now.getDay()];
        const month = months[now.getMonth()];
        const date = now.getDate();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        dateTimeElement.textContent = `${day}, ${month} ${date} | ${hours}:${minutes} ${ampm}`;
    }
}

// Initialize navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Staff login handler
    const staffLogin = document.querySelector('.staff-login');
    if (staffLogin) {
        staffLogin.addEventListener('click', function() {
            console.log('Staff login clicked');
            // Add your login logic here
        });
    }
}

// Initialize action buttons
function initializeActionButtons() {
    const markCompletedBtn = document.querySelector('.btn-primary');
    const callNextBtn = document.querySelectorAll('.btn-secondary')[0];
    const putOnHoldBtn = document.querySelectorAll('.btn-secondary')[1];
    
    if (markCompletedBtn) {
        markCompletedBtn.addEventListener('click', function() {
            console.log('Mark as completed clicked');
            // Add your logic here
        });
    }
    
    if (callNextBtn) {
        callNextBtn.addEventListener('click', function() {
            console.log('Call Next Person clicked');
            // Add your logic here
        });
    }
    
    if (putOnHoldBtn) {
        putOnHoldBtn.addEventListener('click', function() {
            console.log('Put On Hold clicked');
            // Add your logic here
        });
    }
}

// Initialize sidebar toggle functionality
function initializeSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!sidebarToggle || !sidebar) return;
    
    // Load saved state from localStorage
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
    }
    
    // Toggle sidebar on button click
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // Save state to localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
}
