# CloudHost - Premium Web Hosting Template with WHMCS Integration

A modern, responsive web hosting company template with full WHMCS integration capabilities. Perfect for creating professional hosting company websites.

## Features

✅ **Professional Design**
- Modern, clean UI with gradient backgrounds
- Fully responsive design (mobile, tablet, desktop)
- Fast loading and optimized performance
- Smooth animations and transitions

✅ **Service Offerings**
- Shared Hosting
- VPS Hosting
- Dedicated Servers
- Cloud Solutions

✅ **WHMCS Integration Ready**
- Product catalog integration
- Pricing synchronization
- Client login and registration
- Order management
- Invoice management
- Service management

✅ **Pages Included**
- Homepage (index.html)
- Client Area / Login (client-area.html)
- Dashboard (dashboard.html)
- Fully functional navigation

## Project Structure

```
website/
├── index.html                          # Main homepage
├── client-area.html                    # Login and registration page
├── dashboard.html                      # Client dashboard
├── assets/
│   ├── css/
│   │   └── style.css                  # Main stylesheet
│   └── js/
│       ├── main.js                    # Core JavaScript functionality
│       └── whmcs-integration.js       # WHMCS API integration
└── README.md                           # This file
```

## Getting Started

### 1. Installation

1. Download/clone the template files
2. Upload to your web hosting server
3. Ensure all file permissions are correct

### 2. Basic Configuration

Edit the following in your files:

**In `index.html`:**
- Company name and contact information
- Email address and phone number
- Social media links
- Service descriptions

**In `client-area.html` and `dashboard.html`:**
- Company branding
- Support contact information

### 3. WHMCS Integration Setup

#### Step 1: Get WHMCS API Credentials

1. Login to your WHMCS Admin Panel
2. Go to **Utilities → API Tokens**
3. Create a new API token with these permissions:
   - Products
   - Orders
   - Clients
   - Domains
4. Copy the **Access Key** and **Secret Key**

#### Step 2: Configure WHMCS in JavaScript

Edit `assets/js/whmcs-integration.js` and update the configuration:

```javascript
const whmcs = new WHMCSIntegration({
    apiUrl: 'https://yourdomain.com/includes/api.php',     // Your WHMCS API URL
    clientArea: 'https://yourdomain.com/index.php?m=portal', // Your client portal URL
    accessKey: 'YOUR_API_ACCESS_KEY',  // From API Tokens
    secretKey: 'YOUR_API_SECRET_KEY'   // From API Tokens
});
```

#### Step 3: Update Product Mapping

In `assets/js/whmcs-integration.js`, update the `planMapping` object with your actual WHMCS product IDs:

```javascript
const planMapping = {
    'starter': 1,           // Your Shared Hosting - Starter product ID
    'professional': 2,      // Your Shared Hosting - Professional product ID
    'business': 3,          // Your Shared Hosting - Business product ID
    'vps_basic': 4,         // Your VPS - Basic product ID
    'vps_advanced': 5,      // Your VPS - Advanced product ID
    'vps_enterprise': 6     // Your VPS - Enterprise product ID
};
```

**To find your product IDs:**
1. Login to WHMCS Admin
2. Go to **Products → Products/Services**
3. Each product has an ID number

#### Step 4: Connect Login System to WHMCS

For production use, replace the demo login in `client-area.html` with actual WHMCS authentication:

```javascript
// In client-area.html, replace the demo login with WHMCS API call
async function authenticateWithWHMCS(email, password) {
    const response = await whmcs.apiCall('ValidateLogin', {
        email: email,
        password: password
    });
    
    if (response.valid) {
        localStorage.setItem('whmcs_logged_in', 'true');
        localStorage.setItem('whmcs_client_id', response.clientid);
        window.location.href = './dashboard.html';
    }
}
```

## WHMCS API Integration Methods

The template includes these ready-to-use WHMCS methods:

### Products
```javascript
// Get all products
await whmcs.getProducts();

// Get specific product pricing
await whmcs.getProductPricing(productId);
```

### Orders
```javascript
// Create a new order
await whmcs.createOrder(customerId, items);
```

### Clients
```javascript
// Get client information
await whmcs.getClientInfo(clientId);

// Register new client
await whmcs.registerClient(clientData);

// Get client services
await whmcs.getClientServices(clientId);
```

### Domains
```javascript
// Check domain availability
await whmcs.checkDomain('example.com');

// Get domain pricing
await whmcs.getDomainPricing('.com');
```

### Navigation
```javascript
// Redirect to WHMCS client area
whmcs.redirectToClientArea();

// Redirect to specific product order page
whmcs.orderProduct(productId);
```

## Customization Guide

### Changing Colors

Edit the CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #0066ff;        /* Main brand color */
    --secondary-color: #00d4ff;      /* Accent color */
    --dark-color: #0f1419;           /* Dark backgrounds */
    --light-color: #f8f9fa;          /* Light backgrounds */
    --text-color: #333;              /* Text color */
    --border-color: #e0e0e0;         /* Border color */
    --success-color: #27ae60;        /* Success/active status */
}
```

### Updating Pricing

Pricing can be updated in two ways:

1. **Manually** - Edit prices in the pricing section of `index.html`
2. **Automatically from WHMCS** - The `loadPricingFromWHMCS()` function in `assets/js/whmcs-integration.js` pulls live pricing

### Adding More Services

Add new service items in the Services section of `index.html`:

```html
<div class="service-item">
    <div class="service-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Service Name</h3>
    <p>Service description</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Feature 1</li>
        <li><i class="fas fa-check"></i> Feature 2</li>
    </ul>
</div>
```

## Email Setup

To enable contact form emails:

1. Create a PHP backend script (e.g., `send-email.php`):

```php
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = 'support@yourdomain.com';
    $subject = 'New Contact Form Submission';
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    
    if (mail($to, $subject, $body)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
```

2. Update the form submission in `assets/js/main.js`:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const response = await fetch('./send-email.php', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    if (result.success) {
        alert('Message sent successfully!');
        contactForm.reset();
    }
});
```

## Security Considerations

1. **API Keys** - Never expose API keys in client-side code in production
2. **HTTPS** - Always use HTTPS for your website
3. **Input Validation** - Validate all user inputs server-side
4. **CORS** - Configure CORS properly for API calls
5. **Authentication** - Implement proper session management

For production, create a backend API that handles WHMCS calls securely:

```
User → Your Backend → WHMCS API (secure)
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. Optimize images and use WebP format
2. Enable gzip compression on server
3. Use CDN for static assets
4. Minimize CSS/JS files
5. Lazy load images
6. Cache WHMCS API responses

## Troubleshooting

### WHMCS Connection Issues

**Problem:** API calls return errors

**Solutions:**
1. Verify API credentials are correct
2. Check WHMCS API URL is correct
3. Ensure API token has required permissions
4. Check server firewall allows outgoing connections
5. Verify CORS is configured if making requests from different domain

### Pricing Not Updating

**Problem:** Pricing shows as "$0.00"

**Solutions:**
1. Verify API credentials
2. Check product IDs in planMapping
3. Ensure products exist in WHMCS
4. Check browser console for errors
5. Verify WHMCS API response format

### Login Not Working

**Problem:** Users can't login

**Solutions:**
1. Test with demo credentials first
2. Verify WHMCS API endpoint URL
3. Check ValidateLogin API permission is enabled
4. Clear browser localStorage and try again

## Support

For WHMCS API documentation:
- https://developers.whmcs.com/api-reference/

For template support:
- Check browser console (F12) for error messages
- Verify all file paths are correct
- Ensure proper file permissions on server

## License

This template is provided as-is for use with WHMCS installations. Ensure compliance with WHMCS terms and conditions.

## Next Steps

1. ✅ Configure WHMCS API credentials
2. ✅ Update company information
3. ✅ Customize colors and branding
4. ✅ Map your WHMCS products
5. ✅ Set up email notifications
6. ✅ Test all functionality
7. ✅ Deploy to production

---

**Ready to launch your hosting business? Start with this template and customize it to match your brand!**
