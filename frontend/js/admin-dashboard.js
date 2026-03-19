// Admin Dashboard JavaScript

let currentChartType = 'bar';
let chartCanvas = null;
let chartContext = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarToggle();
    initializeNavigation();
    initializeFilterButtons();
    initializeChartToggle();
    initializeChart();
    initializeSearch();
    initializeNotifications();
    initializeModeSwitcher();
    initializeQueueControls();
    initializeStaffControls();
    initializeSettings();
    updateDateTime();
    startAutoRefresh();
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
}

// Initialize filter buttons
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent container to scope the filter
            const parentSection = this.closest('.control-section');
            if (!parentSection) return;
            
            // Remove active class from all buttons in this section
            const sectionButtons = parentSection.querySelectorAll('.filter-btn');
            sectionButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter logic
            const filterValue = this.textContent.trim().toLowerCase();
            const isQueueSection = parentSection.querySelector('.queue-controls-grid');
            const isStaffSection = parentSection.querySelector('.staff-control-table');
            
            if (isQueueSection) {
                filterQueueCards(filterValue);
            } else if (isStaffSection) {
                filterStaffTable(filterValue);
            }
        });
    });
}

function filterQueueCards(filterValue) {
    const cards = document.querySelectorAll('.queue-control-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (filterValue === 'all' || title.includes(filterValue)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterStaffTable(filterValue) {
    const rows = document.querySelectorAll('.staff-control-table .table-row');
    rows.forEach(row => {
        const role = row.querySelectorAll('.table-cell')[1]?.textContent.toLowerCase() || '';
        const department = row.querySelectorAll('.table-cell')[2]?.textContent.toLowerCase() || '';
        
        if (filterValue === 'all' || 
            role.includes(filterValue) || 
            department.includes(filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize chart toggle
function initializeChartToggle() {
    const toggleButtons = document.querySelectorAll('.chart-toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Get chart type
            currentChartType = this.getAttribute('data-chart');
            // Redraw chart
            drawChart();
        });
    });
}

// Initialize chart
function initializeChart() {
    chartCanvas = document.getElementById('chartCanvas');
    if (!chartCanvas) return;
    
    chartContext = chartCanvas.getContext('2d');
    
    // Set canvas size
    const container = chartCanvas.parentElement;
    chartCanvas.width = container.clientWidth;
    chartCanvas.height = 300;
    
    // Handle resize
    window.addEventListener('resize', function() {
        chartCanvas.width = container.clientWidth;
        chartCanvas.height = 300;
        drawChart();
    });
    
    drawChart();
}

// Draw chart based on type
function drawChart() {
    if (!chartContext) return;
    
    const width = chartCanvas.width;
    const height = chartCanvas.height;
    
    // Clear canvas
    chartContext.clearRect(0, 0, width, height);
    
    // Chart data
    const departments = ['General Medicine', 'Orthopedics', 'Pediatrics', 'Emergency'];
    const values = [32, 12, 9, 2];
    const colors = ['#3A8EEB', '#10B981', '#F59E0B', '#EF4444'];
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...values);
    
    // Draw grid
    chartContext.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    chartContext.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        chartContext.beginPath();
        chartContext.moveTo(padding, y);
        chartContext.lineTo(width - padding, y);
        chartContext.stroke();
    }
    
    if (currentChartType === 'bar') {
        drawBarChart(departments, values, colors, padding, chartWidth, chartHeight, maxValue);
    } else if (currentChartType === 'line') {
        drawLineChart(departments, values, colors, padding, chartWidth, chartHeight, maxValue);
    } else if (currentChartType === 'pie') {
        drawPieChart(departments, values, colors, width / 2, height / 2, Math.min(width, height) / 2 - padding);
    }
}

function drawBarChart(departments, values, colors, padding, chartWidth, chartHeight, maxValue) {
    const barWidth = chartWidth / departments.length * 0.6;
    const barSpacing = chartWidth / departments.length;
    
    departments.forEach((dept, index) => {
        const barHeight = (values[index] / maxValue) * chartHeight;
        const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
        const y = padding + chartHeight - barHeight;
        
        // Draw bar
        chartContext.fillStyle = colors[index];
        chartContext.fillRect(x, y, barWidth, barHeight);
        
        // Draw value label
        chartContext.fillStyle = '#262626';
        chartContext.font = '12px Inter';
        chartContext.textAlign = 'center';
        chartContext.fillText(values[index].toString(), x + barWidth / 2, y - 5);
        
        // Draw department label
        chartContext.fillStyle = '#7B7B7B';
        chartContext.font = '10px Inter';
        chartContext.save();
        chartContext.translate(x + barWidth / 2, padding + chartHeight + 15);
        chartContext.rotate(-Math.PI / 4);
        chartContext.fillText(dept.substring(0, 8), 0, 0);
        chartContext.restore();
    });
}

function drawLineChart(departments, values, colors, padding, chartWidth, chartHeight, maxValue) {
    const pointSpacing = chartWidth / (departments.length - 1);
    const points = departments.map((dept, index) => ({
        x: padding + index * pointSpacing,
        y: padding + chartHeight - (values[index] / maxValue) * chartHeight
    }));
    
    // Draw line
    chartContext.strokeStyle = '#3A8EEB';
    chartContext.lineWidth = 2;
    chartContext.beginPath();
    chartContext.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        chartContext.lineTo(points[i].x, points[i].y);
    }
    chartContext.stroke();
    
    // Draw points
    points.forEach((point, index) => {
        chartContext.fillStyle = colors[index];
        chartContext.beginPath();
        chartContext.arc(point.x, point.y, 5, 0, Math.PI * 2);
        chartContext.fill();
        
        // Draw value label
        chartContext.fillStyle = '#262626';
        chartContext.font = '11px Inter';
        chartContext.textAlign = 'center';
        chartContext.fillText(values[index].toString(), point.x, point.y - 10);
        
        // Draw department label
        chartContext.fillStyle = '#7B7B7B';
        chartContext.font = '10px Inter';
        chartContext.fillText(dept.substring(0, 8), point.x, padding + chartHeight + 15);
    });
}

function drawPieChart(departments, values, colors, centerX, centerY, radius) {
    const total = values.reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2;
    
    values.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        // Draw slice
        chartContext.beginPath();
        chartContext.moveTo(centerX, centerY);
        chartContext.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        chartContext.closePath();
        chartContext.fillStyle = colors[index];
        chartContext.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        chartContext.fillStyle = '#FFFFFF';
        chartContext.font = 'bold 11px Inter';
        chartContext.textAlign = 'center';
        chartContext.fillText(value.toString(), labelX, labelY);
        
        // Draw legend
        const legendX = centerX + radius + 20;
        const legendY = centerY - radius + index * 25;
        chartContext.fillStyle = colors[index];
        chartContext.fillRect(legendX, legendY - 8, 12, 12);
        chartContext.fillStyle = '#262626';
        chartContext.font = '10px Inter';
        chartContext.textAlign = 'left';
        chartContext.fillText(dept.substring(0, 12), legendX + 18, legendY);
        
        currentAngle += sliceAngle;
    });
}

// Initialize search functionality
function initializeSearch() {
    const globalSearch = document.getElementById('globalSearch');
    const queueSearch = document.getElementById('queueSearch');
    const staffSearch = document.getElementById('staffSearch');
    
    if (globalSearch) {
        globalSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterTables(searchTerm);
        });
    }
    
    if (queueSearch) {
        queueSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterTableRows('.queue-control-card', searchTerm, 0);
        });
    }
    
    if (staffSearch) {
        staffSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterTableRows('.staff-control-table .table-row', searchTerm, 0);
        });
    }
}

function filterTables(searchTerm) {
    filterTableRows('.queues-table .table-row', searchTerm, 0);
    filterTableRows('.staff-table .table-row', searchTerm, 0);
}

function filterTableRows(selector, searchTerm, columnIndex) {
    const rows = document.querySelectorAll(selector);
    rows.forEach(row => {
        const cell = row.querySelectorAll('.table-cell')[columnIndex];
        if (cell) {
            const text = cell.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        }
    });
}

// Initialize notifications
function initializeNotifications() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const markAllReadBtn = document.querySelector('.btn-mark-all-read');
    
    if (notificationsBtn && notificationsDropdown) {
        // Position dropdown relative to button
        const updateDropdownPosition = () => {
            const rect = notificationsBtn.getBoundingClientRect();
            const headerActions = notificationsBtn.closest('.dashboard-header-actions');
            if (headerActions) {
                headerActions.style.position = 'relative';
            }
        };
        
        updateDropdownPosition();
        window.addEventListener('resize', updateDropdownPosition);
        
        notificationsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
            updateNotificationBadge();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationsBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                notificationsDropdown.classList.remove('show');
            }
        });
    }
    
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            updateNotificationBadge(0);
        });
    }
    
    // Mark notifications as read on click
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                updateNotificationBadge();
            }
        });
    });
    
    // Initialize badge count
    updateNotificationBadge();
}

function updateNotificationBadge(count) {
    const badge = document.getElementById('notificationBadge');
    if (!badge) return;
    
    if (count !== undefined) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    } else {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}



// Auto refresh functionality
function startAutoRefresh() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (!refreshBtn) return;
    
    // Refresh every 30 seconds
    setInterval(function() {
        refreshData();
    }, 30000);
    
    refreshBtn.addEventListener('click', function() {
        refreshData();
    });
}

function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.classList.add('loading');
        refreshBtn.disabled = true;
    }
    
    // Simulate data refresh
    setTimeout(function() {
        // Update stats with random variations
        updateStats();
        
        // Redraw chart
        if (chartContext) {
            drawChart();
        }
        
        if (refreshBtn) {
            refreshBtn.classList.remove('loading');
            refreshBtn.disabled = false;
        }
        
        showToast('Data refreshed successfully', 'success');
    }, 1000);
}

function updateStats() {
    // Simulate updating stats with slight variations
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const currentValue = parseInt(stat.textContent) || 0;
        const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newValue = Math.max(0, currentValue + variation);
        
        if (stat.textContent.includes('min')) {
            stat.textContent = `${newValue} min`;
        } else {
            stat.textContent = newValue.toString();
        }
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '14px 20px',
        borderRadius: '8px',
        color: '#FFFFFF',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3A8EEB',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        animation: 'slideInUp 0.3s ease-out',
        maxWidth: '400px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize mode switcher
function initializeModeSwitcher() {
    const modeButtons = document.querySelectorAll('.header-mode-btn');
    const modeContents = document.querySelectorAll('.mode-content');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetMode = this.getAttribute('data-mode');
            
            // Remove active class from all buttons and contents
            modeButtons.forEach(btn => btn.classList.remove('active'));
            modeContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetMode + 'Mode');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize queue controls
function initializeQueueControls() {
    // Queue toggle switches
    const queueToggles = document.querySelectorAll('.queue-control-card input[type="checkbox"]');
    queueToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const queueName = this.getAttribute('data-queue');
            const statusLabel = this.closest('.queue-control-card').querySelector('.status-label');
            const isActive = this.checked;
            
            if (statusLabel) {
                statusLabel.textContent = isActive ? 'Active' : 'Paused';
                statusLabel.classList.toggle('active', isActive);
                statusLabel.classList.toggle('inactive', !isActive);
            }
            
            showToast(`Queue ${queueName} ${isActive ? 'activated' : 'paused'}`, isActive ? 'success' : 'info');
        });
    });
    
    // Pause/Reset buttons
    const pauseButtons = document.querySelectorAll('.btn-pause');
    pauseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.queue-control-card');
            const toggle = card.querySelector('input[type="checkbox"]');
            const queueName = card.querySelector('h3').textContent;
            
            if (toggle && toggle.checked) {
                toggle.checked = false;
                toggle.dispatchEvent(new Event('change'));
                showToast(`${queueName} queue paused`, 'info');
            } else {
                showToast(`${queueName} queue is already paused`, 'info');
            }
        });
    });
    
    const resetButtons = document.querySelectorAll('.btn-reset');
    resetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.queue-control-card');
            const queueName = card.querySelector('h3').textContent;
            
            if (confirm(`Are you sure you want to reset ${queueName} queue? This will clear all waiting patients.`)) {
                const waitingValue = card.querySelector('.control-value');
                if (waitingValue && waitingValue.textContent.match(/\d+/)) {
                    waitingValue.textContent = '0';
                }
                showToast(`${queueName} queue reset successfully`, 'success');
            }
        });
    });
}

// Initialize staff controls
function initializeStaffControls() {
    const addStaffBtn = document.querySelector('.btn-add-staff');
    if (addStaffBtn) {
        addStaffBtn.addEventListener('click', function() {
            showAddStaffModal();
        });
    }
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.staff-control-table .btn-icon');
    editButtons.forEach(btn => {
        if (btn.querySelector('path[stroke="#262626"]')) {
            btn.addEventListener('click', function() {
                const row = this.closest('.table-row');
                const staffName = row.querySelector('.staff-info span').textContent;
                showToast(`Editing ${staffName}...`, 'info');
                // Add edit modal functionality here
            });
        }
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.staff-control-table .btn-icon');
    deleteButtons.forEach(btn => {
        if (btn.querySelector('path[stroke="#EF4444"]')) {
            btn.addEventListener('click', function() {
                const row = this.closest('.table-row');
                const staffName = row.querySelector('.staff-info span').textContent;
                
                if (confirm(`Are you sure you want to remove ${staffName}?`)) {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.remove();
                        showToast(`${staffName} removed successfully`, 'success');
                    }, 300);
                }
            });
        }
    });
    
    // Staff status toggles
    const staffToggles = document.querySelectorAll('.staff-control-table input[type="checkbox"]');
    staffToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const row = this.closest('.table-row');
            const staffName = row.querySelector('.staff-info span').textContent;
            const isActive = this.checked;
            showToast(`${staffName} ${isActive ? 'activated' : 'deactivated'}`, isActive ? 'success' : 'info');
        });
    });
}

// Initialize settings
function initializeSettings() {
    const saveSettingsBtn = document.querySelector('.btn-save-settings');
    const resetSettingsBtn = document.querySelector('.btn-reset-settings');
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            showToast('Settings saved successfully', 'success');
        });
    }
    
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to default?')) {
                // Reset all settings to default
                const selects = document.querySelectorAll('.setting-select');
                selects.forEach(select => {
                    select.selectedIndex = 0;
                });
                
                const inputs = document.querySelectorAll('.setting-input');
                inputs.forEach(input => {
                    if (input.type === 'number') {
                        input.value = input.getAttribute('value') || '25';
                    }
                });
                
                const toggles = document.querySelectorAll('.settings-grid input[type="checkbox"]');
                toggles.forEach(toggle => {
                    toggle.checked = true;
                });
                
                showToast('Settings reset to default', 'success');
            }
        });
    }
}

// Show add staff modal (simplified version)
function showAddStaffModal() {
    const staffName = prompt('Enter staff name:');
    if (staffName) {
        const role = prompt('Enter role:');
        const department = prompt('Enter department:');
        
        if (role && department) {
            // In a real app, you would add this to the table
            showToast(`Staff ${staffName} added successfully`, 'success');
        }
    }
}

// Handle export reports button
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showToast('Exporting reports...', 'info');
            // Simulate export
            setTimeout(() => {
                showToast('Reports exported successfully', 'success');
            }, 1500);
        });
    }
    
    // Handle configure queues button
    const configureBtn = document.querySelector('.btn-configure');
    if (configureBtn) {
        configureBtn.addEventListener('click', function() {
            showToast('Opening queue configuration...', 'info');
        });
    }
});
