# Vercel Deployment Guide for Car Rental Project

## 🚀 Quick Fix for Current Error

**Error:** "Environment Variable "RESEND_API_KEY" references Secret "resend_api_key", which does not exist."

**NEW SOLUTION:** Created Vercel API Routes in `/api/` directory for proper backend functionality.

### Step 1: Configure Environment Variables in Vercel

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add these variables:**

```
RESEND_API_KEY = your_actual_resend_api_key_here
FROM_EMAIL = Car Rental <onboarding@resend.dev>
TO_EMAIL = oneeb593@gmail.com
```

### Step 2: Get Resend API Key

1. Visit: https://resend.com/api-keys
2. Create new API key (if needed)
3. Copy the key (starts with `re_`)
4. Add it to Vercel environment variables

### Step 3: Redeploy

1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on your latest deployment
3. Or push a new commit to trigger automatic deployment

## 📧 Email Configuration

### For Development (Local)
- Uses fallback values from `src/config/email.ts`
- No environment variables needed

### For Production (Vercel)
- Must set environment variables in Vercel dashboard
- Uses `onboarding@resend.dev` for testing (no domain verification needed)

### For Production with Custom Domain
1. Verify your domain in Resend dashboard
2. Update `FROM_EMAIL` to use your verified domain
3. Example: `Car Rental <noreply@yourdomain.com>`

## 🔧 Vercel Configuration

### Build Settings
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Environment Variables Required
```
RESEND_API_KEY=re_your_actual_api_key
FROM_EMAIL=Car Rental <onboarding@resend.dev>
TO_EMAIL=oneeb593@gmail.com
```

## 🧪 Testing After Deployment

### Test Email Endpoint
```
GET https://your-domain.vercel.app/api/test-email
```

### Expected Response
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "data": {...},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🚨 Common Issues & Solutions

### 1. "Invalid API key" Error
- **Solution:** Verify your Resend API key is correct
- **Check:** API key format should start with `re_`

### 2. "Domain not verified" Error
- **Solution:** Use `onboarding@resend.dev` for testing
- **Alternative:** Verify your domain in Resend dashboard

### 3. "Rate limit exceeded" Error
- **Solution:** Wait and retry, or upgrade Resend plan
- **Check:** Your current usage in Resend dashboard

### 4. Emails going to spam
- **Solution:** Verify your domain and use proper SPF/DKIM records
- **Alternative:** Use a verified domain for better deliverability

## 📱 Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Resend API key is valid and active
- [ ] Test email endpoint working
- [ ] Booking form submissions working
- [ ] Email notifications being sent successfully

## 🎯 Next Steps After Fix

1. **Test the deployment** using the test email endpoint
2. **Submit a test booking** through your website
3. **Check your email** for the booking notification
4. **Monitor Vercel function logs** for any errors

## 📞 Support

If issues persist:
1. Check Vercel function logs for specific error messages
2. Verify Resend API key and domain configuration
3. Test with the provided test endpoint
4. Contact Resend support if API-related issues persist
