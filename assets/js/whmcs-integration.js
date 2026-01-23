// ========================================
// WHMCS INTEGRATION MODULE
// ========================================

class WHMCSIntegration {
    constructor(config = {}) {
        // Configuration
        this.apiUrl = config.apiUrl || 'https://yourdomain.com/includes/api.php';
        this.clientArea = config.clientArea || 'https://yourdomain.com/clientarea.php';
        this.language = config.language || 'english';
        this.responseType = 'json';
        this.accessKey = config.accessKey || '';
        this.secretKey = config.secretKey || '';
        this.username = config.username || '';
        this.password = config.password || '';
    }

    /**
     * Get list of products/services
     */
    async getProducts() {
        try {
            const response = await this.apiCall('GetProducts', {
                limitstart: 0,
                limitnum: 100
            });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    }

    /**
     * Get product pricing
     */
    async getProductPricing(productId) {
        try {
            const response = await this.apiCall('GetProducts', {
                pid: productId
            });
            return response;
        } catch (error) {
            console.error('Error fetching product pricing:', error);
            return null;
        }
    }

    /**
     * Create a new order
     */
    async createOrder(customerId, items) {
        try {
            const response = await this.apiCall('CreateOrder', {
                clientid: customerId,
                paymentmethod: 'paypal',
                lineitems: JSON.stringify(items),
                notes: 'Order created from website'
            });
            return response;
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    }

    /**
     * Get client information
     */
    async getClientInfo(clientId) {
        try {
            const response = await this.apiCall('GetClientsDetails', {
                clientid: clientId
            });
            return response;
        } catch (error) {
            console.error('Error fetching client info:', error);
            return null;
        }
    }

    /**
     * Register a new client
     */
    async registerClient(clientData) {
        try {
            const response = await this.apiCall('AddClient', clientData);
            return response;
        } catch (error) {
            console.error('Error registering client:', error);
            return null;
        }
    }

    /**
     * Get domain pricing
     */
    async getDomainPricing(extension) {
        try {
            const response = await this.apiCall('GetDomainPricing', {
                currencyid: 1,
                domain: extension
            });
            return response;
        } catch (error) {
            console.error('Error fetching domain pricing:', error);
            return null;
        }
    }

    /**
     * Check domain availability
     */
    async checkDomain(domain) {
        try {
            const response = await this.apiCall('CheckDomain', {
                domain: domain
            });
            return response;
        } catch (error) {
            console.error('Error checking domain:', error);
            return null;
        }
    }

    /**
     * Get services for a client
     */
    async getClientServices(clientId) {
        try {
            const response = await this.apiCall('GetClientsServices', {
                clientid: clientId
            });
            return response;
        } catch (error) {
            console.error('Error fetching client services:', error);
            return null;
        }
    }

    /**
     * Generic API call method
     */
    async apiCall(action, params = {}) {
        const requestData = {
            action: action,
            responsetype: this.responseType,
            ...params
        };

        // Add authentication
        if (this.accessKey && this.secretKey) {
            requestData.accesskey = this.accessKey;
            requestData.secretkey = this.secretKey;
        } else if (this.username && this.password) {
            requestData.username = this.username;
            requestData.password = this.password;
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Call Error:', error);
            throw error;
        }
    }

    /**
     * Redirect to WHMCS client area
     */
    redirectToClientArea(path = '') {
        const url = `${this.clientArea}${path}`;
        window.location.href = url;
    }

    /**
     * Redirect to order page for a product
     */
    orderProduct(productId) {
        const url = `${this.clientArea}?action=productlist&id=${productId}`;
        window.location.href = url;
    }

    /**
     * Format price
     */
    formatPrice(amount, currency = '$') {
        return `${currency}${parseFloat(amount).toFixed(2)}`;
    }
}

// Initialize WHMCS Integration
// Configure with your WHMCS details
const whmcs = new WHMCSIntegration({
    apiUrl: 'https://yourdomain.com/includes/api.php',
    clientArea: 'https://yourdomain.com/index.php?m=portal',
    accessKey: 'YOUR_API_ACCESS_KEY', // Get from WHMCS Admin > Utilities > API Tokens
    secretKey: 'YOUR_API_SECRET_KEY'
});

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Handle plan purchase
 */
async function handlePlanPurchase(planId) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('whmcs_logged_in');
    
    if (!isLoggedIn) {
        // Redirect to login or signup
        window.location.href = './register.html?plan=' + planId;
    } else {
        // Proceed to checkout with selected plan
        const planMapping = {
            'starter': 1,
            'professional': 2,
            'business': 3,
            'vps_basic': 4,
            'vps_advanced': 5,
            'vps_enterprise': 6
        };

        const productId = planMapping[planId];
        if (productId) {
            whmcs.orderProduct(productId);
        }
    }
}

/**
 * Load pricing from WHMCS
 */
async function loadPricingFromWHMCS() {
    try {
        const products = await whmcs.getProducts();
        if (products && products.products) {
            // Update pricing cards with WHMCS data
            const pricingCards = document.querySelectorAll('.pricing-card');
            products.products.forEach((product, index) => {
                if (pricingCards[index]) {
                    const priceElement = pricingCards[index].querySelector('.price');
                    if (priceElement && product.pricing && product.pricing.monthly) {
                        priceElement.innerHTML = `<span class="currency">$</span>${product.pricing.monthly}<span class="period">/mo</span>`;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading pricing from WHMCS:', error);
    }
}

/**
 * Check domain availability from WHMCS
 */
async function checkDomainAvailability(domain) {
    try {
        const result = await whmcs.checkDomain(domain);
        return result;
    } catch (error) {
        console.error('Error checking domain:', error);
        return null;
    }
}

/**
 * Initialize WHMCS widgets
 */
function initWHMCSWidgets() {
    // Load pricing on page load
    loadPricingFromWHMCS();

    // Setup domain checker
    const domainChecker = document.getElementById('domain-checker');
    if (domainChecker) {
        domainChecker.addEventListener('submit', async (e) => {
            e.preventDefault();
            const domain = domainChecker.querySelector('input[name="domain"]').value;
            const result = await checkDomainAvailability(domain);
            
            if (result && result.available) {
                alert(`${domain} is available!`);
            } else {
                alert(`${domain} is not available.`);
            }
        });
    }
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    initWHMCSWidgets();
});

// Export for use in other modules
window.WHMCSIntegration = WHMCSIntegration;
window.whmcs = whmcs;
