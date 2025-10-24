# Email Notification Setup Guide

## Issue Resolution: Email Notifications Not Working

This guide addresses the email notification failure issue in your car rental booking system.

## Root Causes Identified

1. **Hardcoded API Key**: The Resend API key was hardcoded in the config file
2. **Missing Environment Variables**: No proper environment variable management
3. **Production Configuration**: Email service not properly configured for Vercel deployment
4. **Limited Error Handling**: Insufficient logging for debugging email failures

## Solutions Implemented

### 1. Environment Variable Configuration

- Updated `src/config/email.ts` to use environment variables
- Created `.env.example` template
- Added fallback values for development

### 2. Enhanced Error Handling

- Added comprehensive error logging
- Implemented specific error messages for different failure types
- Added validation for required fields and API key

### 3. Test Endpoint

- Added `/api/test-email` endpoint for debugging
- Provides detailed error information
- Helps verify email service configuration

### 4. Vercel Configuration

- Created `vercel.json` for proper deployment
- Configured environment variables for production

## Deployment Steps

### For Vercel Deployment:

1. **Set Environment Variables in Vercel Dashboard:**
   ```
   RESEND_API_KEY=your_actual_resend_api_key
   FROM_EMAIL=Car Rental <your-verified-domain@yourdomain.com>
   TO_EMAIL=your-email@example.com
   ```

2. **Get a Valid Resend API Key:**
   - Visit [https://resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key
   - Replace the hardcoded key in your environment variables

3. **Verify Your Domain (Recommended):**
   - Add your domain to Resend dashboard
   - Update `FROM_EMAIL` to use your verified domain
   - This improves email deliverability

### Testing the Fix:

1. **Test Email Endpoint:**
   ```
   GET https://your-domain.vercel.app/api/test-email
   ```

2. **Check Server Logs:**
   - Monitor Vercel function logs for detailed error messages
   - Look for specific error patterns mentioned in the code

## Common Issues and Solutions

### 1. "Invalid API key" Error
- **Solution**: Verify your Resend API key is correct and active
- **Check**: API key format should start with `re_`

### 2. "Domain not verified" Error
- **Solution**: Verify your domain in Resend dashboard
- **Alternative**: Use `onboarding@resend.dev` for testing

### 3. "Rate limit exceeded" Error
- **Solution**: Wait and retry, or upgrade your Resend plan
- **Check**: Your current usage in Resend dashboard

### 4. Emails going to spam
- **Solution**: Verify your domain and use proper SPF/DKIM records
- **Alternative**: Use a verified domain for better deliverability

## Monitoring and Debugging

### 1. Check Vercel Function Logs:
```bash
vercel logs --follow
```

### 2. Test Email Functionality:
```bash
curl https://your-domain.vercel.app/api/test-email
```

### 3. Monitor Resend Dashboard:
- Check email delivery status
- Monitor API usage and limits
- Review any bounce or complaint reports

## Next Steps

1. **Deploy the updated code to Vercel**
2. **Set the environment variables in Vercel dashboard**
3. **Test the email functionality using the test endpoint**
4. **Monitor the booking system for successful email notifications**

## Support

If issues persist after following this guide:
1. Check Vercel function logs for specific error messages
2. Verify Resend API key and domain configuration
3. Test with the provided test endpoint
4. Contact Resend support if API-related issues persist
