// Form state management
const formState = {
    patientName: '',
    visitType: '',
    priority: '',
    department: '',
    mobileNumber: '',
    notes: ''
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeVisitTypeButtons();
    initializePriorityButtons();
    initializeIssueTokenButton();
    initializeNavItems();
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

// Initialize visit type buttons
function initializeVisitTypeButtons() {
    const buttons = document.querySelectorAll('.visit-type-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update form state
            formState.visitType = this.getAttribute('data-type');
        });
    });
}

// Initialize priority buttons
function initializePriorityButtons() {
    const buttons = document.querySelectorAll('.priority-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const priority = this.getAttribute('data-priority');
            // Remove active class from all priority buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update form state
            formState.priority = priority;
        });
    });
}

// Initialize issue token button
function initializeIssueTokenButton() {
    const issueTokenBtn = document.getElementById('issueTokenBtn');
    const patientNameInput = document.getElementById('patientName');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const departmentSelect = document.getElementById('department');
    const notesTextarea = document.getElementById('notes');
    
    // Update form state on input changes
    if (patientNameInput) {
        patientNameInput.addEventListener('input', function() {
            formState.patientName = this.value;
        });
    }
    
    if (mobileNumberInput) {
        mobileNumberInput.addEventListener('input', function() {
            formState.mobileNumber = this.value;
        });
    }
    
    if (departmentSelect) {
        departmentSelect.addEventListener('change', function() {
            formState.department = this.value;
        });
    }
    
    if (notesTextarea) {
        notesTextarea.addEventListener('input', function() {
            formState.notes = this.value;
        });
    }
    
    // Handle issue token button click
    if (issueTokenBtn) {
        issueTokenBtn.addEventListener('click', function() {
            handleIssueToken();
        });
    }
}

// Handle issue token
function handleIssueToken() {
    const issueTokenBtn = document.getElementById('issueTokenBtn');
    
    // Validate form
    if (!formState.patientName.trim()) {
        showNotification('Please enter patient name', 'error');
        return;
    }
    
    if (!formState.visitType) {
        showNotification('Please select visit type', 'error');
        return;
    }
    
    if (!formState.department) {
        showNotification('Please select department', 'error');
        return;
    }
    
    if (!formState.priority) {
        showNotification('Please select priority', 'error');
        return;
    }
    
    // Disable button and show loading state
    issueTokenBtn.disabled = true;
    issueTokenBtn.textContent = 'Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Generate token (mock implementation)
        const token = generateToken(formState.department);
        
        // Show success notification
        showNotification(`Token issued successfully! Token: ${token}`, 'success');
        
        // Reset form
        resetForm();
        
        // Re-enable button
        issueTokenBtn.disabled = false;
        issueTokenBtn.textContent = 'Issue Token';
    }, 1000);
}

// Professional notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: '#FFFFFF',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3A8EEB',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Generate token based on department
function generateToken(department) {
    const prefixes = {
        'general': 'GM',
        'orthopedics': 'OR',
        'pediatrics': 'PD'
    };
    
    const prefix = prefixes[department] || 'TK';
    const number = Math.floor(Math.random() * 100) + 1;
    return `${prefix}-${number}`;
}

// Reset form
function resetForm() {
    formState.patientName = '';
    formState.visitType = '';
    formState.priority = '';
    formState.department = '';
    formState.mobileNumber = '';
    formState.notes = '';
    
    // Reset form elements
    const patientNameInput = document.getElementById('patientName');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const departmentSelect = document.getElementById('department');
    const notesTextarea = document.getElementById('notes');
    
    if (patientNameInput) patientNameInput.value = '';
    if (mobileNumberInput) mobileNumberInput.value = '';
    if (departmentSelect) departmentSelect.value = '';
    if (notesTextarea) notesTextarea.value = '';
    
    // Reset buttons
    document.querySelectorAll('.visit-type-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));
}

// Initialize navigation items
function initializeNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Remove active state from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active state to clicked item
            this.classList.add('active');
            
            // Show notification
            showNotification(`Navigating to: ${text}`, 'info');
            
            // Add your navigation logic here
        });
    });
    
    // Staff login handler
    const staffLogin = document.querySelector('.staff-login');
    if (staffLogin) {
        staffLogin.addEventListener('click', function() {
            showNotification('Opening staff login...', 'info');
            // Add your login logic here
        });
    }
}

// Add active state styling
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-item.active {
        background: rgba(255, 255, 255, 0.8);
        font-weight: 500;
    }
    
    .nav-item.active svg path {
        stroke: #3A8EEB;
    }
`;
document.head.appendChild(navStyle);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Professional form validation feedback
function addFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#EF4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = '';
            }
        });
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    addFormValidation();
});

// Professional keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close modals/notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Add professional loading state for buttons
function addButtonLoadingState() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('no-loading')) {
                const originalText = this.textContent;
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// Initialize button loading states
document.addEventListener('DOMContentLoaded', function() {
    addButtonLoadingState();
});

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
