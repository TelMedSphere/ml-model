# Environment Variables Setup Guidelines

This document provides a step-by-step guide to setting up the required `.env` files for both the frontend and backend. These variables are essential for the application to function properly.

---

## **Backend `.env` Variables**

1. **`DBURL`**  
   - **Description:** The MongoDB connection string.  
   - **How to Obtain:** 
     1. Contact the backend administrator or team lead.
     2. Request the MongoDB URL.

2. **`HOST_EMAIL`**  
   - **Description:** The email used as the sender in NodeMailer.  
   - **How to Obtain:** 
     1. Verify with the backend team.
     2. Check with the email service provider.

3. **`PASSWORD`**  
   - **Description:** The app password for the email account used with NodeMailer.  
   - **How to Obtain:** 
     1. Log in to your email account (e.g., Gmail, Outlook).
     2. Navigate to account settings.
     3. Generate an app password.

4. **`PORT`**  
   - **Description:** The port used by NodeMailer for SMTP communication.  
   - **How to Obtain:** 
     1. Check with your email service provider.
     2. Commonly `587` for TLS.

5. **`STRIPE_SECRET_KEY`**  
   - **Description:** The secret key for Stripe payment processing.  
   - **How to Obtain:** 
     1. Log in to the Stripe dashboard.
     2. Access the API Keys section.

6. **`DOMAIN`**  
   - **Description:** The domain of the backend server after deployment.  
   - **How to Obtain:** 
     1. Use the production domain.
     2. Alternatively, use the staging URL provided by the deployment team.

7. **`SECRET`**  
   - **Description:** The secret key used for JWT encryption.  
   - **How to Obtain:** 
     1. Generate a secure random string using a library like `crypto` in Node.js.
     2. Alternatively, request it from the team lead.

8. **`WHATSAPP`**  
   - **Description:** The API token for WhatsApp notifications.  
   - **How to Obtain:** 
     1. Obtain from the WhatsApp API provider.
     2. Alternatively, request it from your team lead.

---

## **Frontend `.env` Variables**

1. **`VITE_PUBLICATION_KEY`**  
   - **Description:** The public Stripe key for client-side payment processing.  
   - **How to Obtain:** 
     1. Log in to the Stripe dashboard.
     2. Access the API Keys section.

2. **`VITE_JAAS_APP_ID`**  
   - **Description:** The key for integrating Jitsi Meet video conferencing.  
   - **How to Obtain:** 
     1. Log in to the Jitsi developer portal.
     2. Obtain the key.

3. **`VITE_API_KEY`**  
   - **Description:** The API key for chatbot integration.  
   - **How to Obtain:** 
     1. Request the key from the chatbot service provider.
     2. Alternatively, request it from your team lead.

---

### **Important Notes**
- Always keep `.env` files private and do not expose them in version control systems like GitHub.  
- Use environment variable management tools like `dotenv` in development or configure the deployment environment with these variables.  
- Ensure secure storage and limited access to keys, passwords, and tokens.  

---

