// Application State
let appState = {
  user: null,
  userType: null,
  isConnected: false,
  currentDashboard: null,
  activeSection: 'overview',
  theme: 'light',
  realTimeCounters: {
    liveCounter: 1247.83,
    contributorBalance: 1247.83,
    streamingRate: 1.42,
    timeWorked: { hours: 6, minutes: 23 },
    earnedToday: 543.25
  },
  charts: {}
};

// Application Data
const appData = {
  pricing_tiers: [
    {
      name: "Free",
      price: 0,
      contributors: 10,
      volume: 5000,
      features: ["Basic streaming", "Single chain", "Community support"]
    },
    {
      name: "Startup", 
      price: 49,
      contributors: 50,
      volume: 25000,
      features: ["Multi-chain", "Analytics", "Email support", "Role management"]
    },
    {
      name: "Professional",
      price: 149,
      contributors: 200,
      volume: 100000,
      features: ["Advanced analytics", "Custom integrations", "Priority support", "Compliance tools"]
    },
    {
      name: "Enterprise",
      price: 499,
      contributors: 1000,
      volume: 500000,
      features: ["White-label", "Dedicated support", "SLA", "Custom development"]
    }
  ]
};

// Utility Functions
function showModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function hideAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
}

function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Theme Management
function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', appState.theme);
  
  // Update theme toggle buttons
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => {
    btn.textContent = appState.theme === 'light' ? '🌙' : '☀️';
  });
  
  // Update charts for theme change
  updateChartsTheme();
}

// Real-time Counter Updates
function startRealTimeUpdates() {
  setInterval(() => {
    // Update live counter (hero section)
    const liveCounter = document.getElementById('live-counter');
    if (liveCounter) {
      appState.realTimeCounters.liveCounter += 0.024; // About $1.42/min
      liveCounter.textContent = appState.realTimeCounters.liveCounter.toFixed(2);
    }
    
    // Update contributor balance
    const contributorBalance = document.getElementById('contributor-balance');
    if (contributorBalance) {
      appState.realTimeCounters.contributorBalance += 0.024;
      contributorBalance.textContent = appState.realTimeCounters.contributorBalance.toFixed(2);
    }
    
    // Update time worked
    const timeWorked = document.getElementById('time-worked');
    if (timeWorked) {
      appState.realTimeCounters.timeWorked.minutes++;
      if (appState.realTimeCounters.timeWorked.minutes >= 60) {
        appState.realTimeCounters.timeWorked.hours++;
        appState.realTimeCounters.timeWorked.minutes = 0;
      }
      timeWorked.textContent = `${appState.realTimeCounters.timeWorked.hours}h ${appState.realTimeCounters.timeWorked.minutes}m`;
    }
    
    // Update earned today
    const earnedToday = document.getElementById('earned-today');
    if (earnedToday) {
      appState.realTimeCounters.earnedToday += 0.024;
      earnedToday.textContent = appState.realTimeCounters.earnedToday.toFixed(2);
    }
  }, 1000);
}

// Chart Creation and Management
function createVolumeChart() {
  const ctx = document.getElementById('volumeChart');
  if (!ctx) return;
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Payment Volume ($)',
      data: [45000, 52000, 48000, 61000, 58000, 67000, 73000],
      borderColor: '#1FB8CD',
      backgroundColor: 'rgba(31, 184, 205, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };
  
  appState.charts.volumeChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
          }
        },
        y: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
          }
        }
      }
    }
  });
}

function createPerformanceChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;
  
  const data = {
    labels: ['Alice Chen', 'Bob Martinez', 'Carol Kim'],
    datasets: [{
      label: 'Hours This Month',
      data: [120, 95, 80],
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
      borderWidth: 0
    }]
  };
  
  appState.charts.performanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
            padding: 20
          }
        }
      }
    }
  });
}

function createEarningsChart() {
  const ctx = document.getElementById('earningsChart');
  if (!ctx) return;
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Earnings ($)',
      data: [3200, 3800, 3600, 4100, 4500, 4800],
      borderColor: '#1FB8CD',
      backgroundColor: 'rgba(31, 184, 205, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };
  
  appState.charts.earningsChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
          }
        },
        y: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          },
          grid: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
          }
        }
      }
    }
  });
}

function createDistributionChart() {
  const ctx = document.getElementById('distributionChart');
  if (!ctx) return;
  
  const data = {
    labels: ['Development', 'Design', 'Testing', 'Documentation'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
      borderWidth: 0
    }]
  };
  
  appState.charts.distributionChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
            padding: 20
          }
        }
      }
    }
  });
}

function updateChartsTheme() {
  Object.values(appState.charts).forEach(chart => {
    if (chart && chart.options) {
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
      const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
      const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();
      
      if (chart.options.plugins && chart.options.plugins.legend) {
        chart.options.plugins.legend.labels.color = textColor;
      }
      
      if (chart.options.scales) {
        Object.values(chart.options.scales).forEach(scale => {
          if (scale.ticks) scale.ticks.color = secondaryColor;
          if (scale.grid) scale.grid.color = borderColor;
        });
      }
      
      chart.update();
    }
  });
}

// Dashboard Navigation
function switchSection(sectionName) {
  // Update active nav item
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionName) {
      item.classList.add('active');
    }
  });
  
  // Update active section
  const dashboardSections = document.querySelectorAll('.dashboard-section');
  dashboardSections.forEach(section => {
    section.classList.remove('active');
    if (section.dataset.section === sectionName) {
      section.classList.add('active');
    }
  });
  
  appState.activeSection = sectionName;
  
  // Initialize charts when analytics section is shown
  if (sectionName === 'analytics' && appState.userType === 'dao') {
    setTimeout(() => {
      createVolumeChart();
      createPerformanceChart();
    }, 100);
  }
  
  // Initialize charts when performance section is shown
  if (sectionName === 'performance' && appState.userType === 'contributor') {
    setTimeout(() => {
      createEarningsChart();
      createDistributionChart();
    }, 100);
  }
}

// Wallet Connection Flow
function handleWalletConnection() {
  showModal('.wallet-modal');
}

function handleWalletSelection(walletType) {
  hideModal('.wallet-modal');
  
  // Simulate wallet connection
  showNotification('Connecting wallet...');
  setTimeout(() => {
    showNotification(`Connected to ${walletType} successfully!`);
    appState.isConnected = true;
    showModal('.user-type-modal');
  }, 1500);
}

function handleUserTypeSelection(userType) {
  appState.userType = userType;
  hideModal('.user-type-modal');
  
  // Show profile modal with appropriate fields
  const daoFields = document.querySelectorAll('.dao-fields');
  const contributorFields = document.querySelectorAll('.contributor-fields');
  
  if (userType === 'dao') {
    daoFields.forEach(field => field.style.display = 'block');
    contributorFields.forEach(field => field.style.display = 'none');
  } else {
    daoFields.forEach(field => field.style.display = 'none');
    contributorFields.forEach(field => field.style.display = 'block');
  }
  
  showModal('.profile-modal');
}

function handleProfileSubmit(event) {
  event.preventDefault();
  
  const profileName = document.getElementById('profile-name').value;
  
  if (!profileName.trim()) {
    showNotification('Please enter your name or organization name', 'error');
    return;
  }
  
  appState.user = {
    name: profileName,
    type: appState.userType
  };
  
  if (appState.userType === 'dao') {
    appState.user.orgType = document.getElementById('org-type').value;
  } else {
    appState.user.role = document.getElementById('contributor-role').value;
    appState.user.hourlyRate = document.getElementById('hourly-rate').value || 50;
  }
  
  hideModal('.profile-modal');
  showDashboard();
  showNotification('Profile setup completed successfully!');
}

// Dashboard Display
function showDashboard() {
  const landingPage = document.querySelector('.landing-page');
  const daoDashboard = document.querySelector('.dao-dashboard');
  const contributorDashboard = document.querySelector('.contributor-dashboard');
  
  landingPage.style.display = 'none';
  
  if (appState.userType === 'dao') {
    daoDashboard.classList.remove('hidden');
    contributorDashboard.classList.add('hidden');
    appState.currentDashboard = 'dao';
  } else {
    contributorDashboard.classList.remove('hidden');
    daoDashboard.classList.add('hidden');
    appState.currentDashboard = 'contributor';
    
    // Initialize default charts for contributor
    setTimeout(() => {
      createEarningsChart();
      createDistributionChart();
    }, 100);
  }
  
  // Start real-time updates when dashboard is shown
  startRealTimeUpdates();
}

// Stream Controls
function setupStreamControls() {
  // Start all streams
  const startAllBtn = document.getElementById('start-all-streams');
  if (startAllBtn) {
    startAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.stream-item').forEach(item => {
        item.classList.add('active-stream');
        const status = item.querySelector('.stream-status');
        if (status) {
          status.classList.remove('paused');
          status.classList.add('streaming');
          const statusText = status.querySelector('span');
          if (statusText) statusText.textContent = 'Streaming';
          const indicator = status.querySelector('.status-indicator');
          if (indicator) indicator.classList.add('active');
        }
      });
      showNotification('All payment streams started!');
    });
  }
  
  // Pause all streams
  const pauseAllBtn = document.getElementById('pause-all-streams');
  if (pauseAllBtn) {
    pauseAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.stream-item').forEach(item => {
        item.classList.remove('active-stream');
        const status = item.querySelector('.stream-status');
        if (status) {
          status.classList.remove('streaming');
          status.classList.add('paused');
          const statusText = status.querySelector('span');
          if (statusText) statusText.textContent = 'Paused';
          const indicator = status.querySelector('.status-indicator');
          if (indicator) indicator.classList.remove('active');
        }
      });
      showNotification('All payment streams paused!');
    });
  }
  
  // Individual stream controls
  document.querySelectorAll('.stream-controls .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const streamItem = e.target.closest('.stream-item');
      const status = streamItem.querySelector('.stream-status');
      const contributorName = streamItem.querySelector('.contributor-details strong');
      const contributor = contributorName ? contributorName.textContent : 'contributor';
      
      if (e.target.textContent === 'Start') {
        streamItem.classList.add('active-stream');
        status.classList.remove('paused');
        status.classList.add('streaming');
        status.querySelector('span').textContent = 'Streaming';
        status.querySelector('.status-indicator').classList.add('active');
        e.target.textContent = 'Pause';
        e.target.classList.remove('btn--primary');
        e.target.classList.add('btn--outline');
        showNotification(`Payment stream started for ${contributor}!`);
      } else if (e.target.textContent === 'Pause') {
        streamItem.classList.remove('active-stream');
        status.classList.remove('streaming');
        status.classList.add('paused');
        status.querySelector('span').textContent = 'Paused';
        status.querySelector('.status-indicator').classList.remove('active');
        e.target.textContent = 'Start';
        e.target.classList.remove('btn--outline');
        e.target.classList.add('btn--primary');
        showNotification(`Payment stream paused for ${contributor}!`);
      }
    });
  });
}

// Logout Functionality
function handleLogout() {
  appState.user = null;
  appState.userType = null;
  appState.isConnected = false;
  appState.currentDashboard = null;
  
  // Hide dashboards and show landing page
  const landingPage = document.querySelector('.landing-page');
  const daoDashboard = document.querySelector('.dao-dashboard');
  const contributorDashboard = document.querySelector('.contributor-dashboard');
  
  daoDashboard.classList.add('hidden');
  contributorDashboard.classList.add('hidden');
  landingPage.style.display = 'block';
  
  // Reset sections
  switchSection('overview');
  
  showNotification('Logged out successfully!');
}

// Navigation scroll functionality
function setupNavigation() {
  // Features link
  const featuresLink = document.querySelector('a[href="#features"]');
  if (featuresLink) {
    featuresLink.addEventListener('click', (e) => {
      e.preventDefault();
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Pricing link
  const pricingLink = document.querySelector('a[href="#pricing"]');
  if (pricingLink) {
    pricingLink.addEventListener('click', (e) => {
      e.preventDefault();
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Initialize Application
function init() {
  console.log('Initializing Web3 SmartPay application...');
  
  // Initialize theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  appState.theme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', appState.theme);
  
  // Update theme toggle buttons
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach(btn => {
    btn.textContent = appState.theme === 'light' ? '🌙' : '☀️';
  });
  
  // Setup navigation
  setupNavigation();
  
  // Wallet connection events
  const connectWalletBtn = document.querySelector('.connect-wallet-btn');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleWalletConnection();
    });
  }
  
  const startAsDaoBtn = document.querySelector('.start-as-dao');
  if (startAsDaoBtn) {
    startAsDaoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleUserTypeSelection('dao');
    });
  }
  
  const startAsContributorBtn = document.querySelector('.start-as-contributor');
  if (startAsContributorBtn) {
    startAsContributorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleUserTypeSelection('contributor');
    });
  }
  
  // Wallet selection events
  document.addEventListener('click', (e) => {
    if (e.target.closest('.wallet-option')) {
      const walletType = e.target.closest('.wallet-option').dataset.wallet;
      if (walletType) {
        handleWalletSelection(walletType);
      }
    }
    
    if (e.target.closest('.user-type-option')) {
      const userType = e.target.closest('.user-type-option').dataset.type;
      if (userType) {
        handleUserTypeSelection(userType);
      }
    }
  });
  
  // Profile form submission
  const profileForm = document.querySelector('.profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileSubmit);
  }
  
  // Modal close events
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-modal')) {
      hideAllModals();
    }
    
    if (e.target.classList.contains('modal-overlay')) {
      hideAllModals();
    }
  });
  
  // Dashboard navigation
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-item')) {
      const section = e.target.dataset.section;
      if (section) {
        switchSection(section);
      }
    }
  });
  
  // Theme toggle events
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('theme-toggle')) {
      e.preventDefault();
      toggleTheme();
    }
  });
  
  // Logout events
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('logout-btn')) {
      e.preventDefault();
      handleLogout();
    }
  });
  
  // Setup stream controls
  setupStreamControls();
  
  // Quick actions (contributor dashboard)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn')) {
      const actionText = e.target.closest('.action-btn').querySelector('strong');
      if (actionText) {
        showNotification(`${actionText.textContent} feature clicked! (Demo)`);
      }
    }
  });
  
  // Settings forms
  document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('settings-form')) {
      e.preventDefault();
      showNotification('Settings updated successfully!');
    }
  });
  
  // Time filter buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.time-filter') && e.target.classList.contains('btn')) {
      const timeFilterBtns = e.target.closest('.time-filter').querySelectorAll('.btn');
      timeFilterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      showNotification(`Filter applied: ${e.target.textContent}`);
    }
  });
  
  // Start the real-time counter on landing page
  startRealTimeUpdates();
  
  console.log('Web3 SmartPay application initialized successfully!');
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}