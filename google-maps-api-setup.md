# Google Maps API Setup Guide for CleanPro

## Overview

This guide walks you through setting up Google Maps APIs for CleanPro's location features:
- **Geocoding API** - Convert addresses to coordinates (for auto-detect nearby client)
- **Directions API** - Create optimized routes between clients
- **Distance Matrix API** - Calculate distances for auto-assigning clients to teams

**Estimated cost:** $0-2/month (covered by Google's free $200 monthly credit)

---

## Step 1: Create a Google Cloud Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (or create one)
3. Accept the terms of service

---

## Step 2: Create a New Project

1. Click the project dropdown at the top of the page (next to "Google Cloud")
2. Click **"New Project"**
3. Enter project name: `CleanPro` (or any name you prefer)
4. Click **"Create"**
5. Wait for the project to be created, then select it from the dropdown

---

## Step 3: Enable Billing (Required)

> ⚠️ **Don't worry!** You won't be charged. Google gives you $200 free credit monthly.

1. Go to **Navigation Menu (☰)** → **Billing**
2. Click **"Link a billing account"**
3. If you don't have one, click **"Create billing account"**
4. Enter your credit card information
5. Complete the setup

### Why is a card required?
Google requires this to verify you're a real person and prevent API abuse. With the budget caps we'll set up, **you'll never be charged**.

---

## Step 4: Enable the Required APIs

### Enable Geocoding API
1. Go to **Navigation Menu (☰)** → **APIs & Services** → **Library**
2. Search for **"Geocoding API"**
3. Click on it, then click **"Enable"**

### Enable Directions API
1. Go back to the **Library**
2. Search for **"Directions API"**
3. Click on it, then click **"Enable"**

### Enable Distance Matrix API
1. Go back to the **Library**
2. Search for **"Distance Matrix API"**
3. Click on it, then click **"Enable"**

### Enable Maps JavaScript API (for displaying maps)
1. Go back to the **Library**
2. Search for **"Maps JavaScript API"**
3. Click on it, then click **"Enable"**

---

## Step 5: Create an API Key

1. Go to **Navigation Menu (☰)** → **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** at the top
3. Select **"API key"**
4. Your new API key will be displayed - **copy it and save it somewhere safe**
5. Click **"Edit API key"** (or click on the key name)

---

## Step 6: Secure Your API Key (IMPORTANT!)

### Rename the key
1. Change the name to: `CleanPro Production Key`

### Set Application Restrictions
1. Under **"Application restrictions"**, select **"HTTP referrers (websites)"**
2. Click **"Add"** under "Website restrictions"
3. Add your allowed domains:
   ```
   https://yourusername.github.io/*
   https://yourdomain.com/*
   http://localhost:*
   http://127.0.0.1:*
   ```
   Replace `yourusername` and `yourdomain` with your actual values.

### Set API Restrictions
1. Under **"API restrictions"**, select **"Restrict key"**
2. Check only these APIs:
   - ✅ Geocoding API
   - ✅ Directions API
   - ✅ Distance Matrix API
   - ✅ Maps JavaScript API
3. Click **"Save"**

---

## Step 7: Set Up Budget Alerts (IMPORTANT!)

This ensures you're never surprised by charges.

### Create a Budget
1. Go to **Navigation Menu (☰)** → **Billing** → **Budgets & alerts**
2. Click **"Create Budget"**
3. Configure:
   - **Name:** `CleanPro Monthly Budget`
   - **Budget amount:** `$10` (you'll likely use $1-2, this is just a safety cap)
   - **Alert thresholds:** 50%, 90%, 100%
4. Click **"Finish"**

### Set a Hard Spending Limit (Optional extra safety)
1. Go to **Navigation Menu (☰)** → **APIs & Services** → **Quotas**
2. You can set daily limits for each API here

---

## Step 8: Add the API Key to CleanPro

### Option A: Environment Variable (Recommended for production)
Create a file called `config.js` in your project:

```javascript
// config.js
const CONFIG = {
  GOOGLE_MAPS_API_KEY: 'YOUR_API_KEY_HERE'
};
```

> ⚠️ **For GitHub:** Add `config.js` to your `.gitignore` file so your key isn't public!

### Option B: Firebase Config (Most secure)
Store the key in Firebase and load it at runtime:

1. Go to Firebase Console → Your Project
2. Go to **Realtime Database** or **Firestore**
3. Create a document/node: `config/googleMaps`
4. Add field: `apiKey: "YOUR_API_KEY_HERE"`
5. Set security rules so only authenticated users can read it

---

## Step 9: Test Your Setup

### Quick test in browser console
Open your website, then open Developer Tools (F12) and paste:

```javascript
// Replace YOUR_API_KEY with your actual key
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY`)
  .then(r => r.json())
  .then(data => console.log(data));
```

If successful, you'll see location data for Google's headquarters.

---

## API Usage Examples

### Geocoding (Address → Coordinates)
```javascript
async function geocodeAddress(address, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === 'OK') {
    return {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng
    };
  }
  return null;
}

// Usage
const coords = await geocodeAddress('123 Main St, Omaha, NE', 'YOUR_API_KEY');
// Returns: { lat: 41.2565, lng: -96.0345 }
```

### Directions (Route between points)
```javascript
async function getRoute(origin, destination, waypoints, apiKey) {
  const waypointsStr = waypoints.map(w => `${w.lat},${w.lng}`).join('|');
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=optimize:true|${waypointsStr}&key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data;
}
```

### Distance Matrix (Distances between multiple points)
```javascript
async function getDistanceMatrix(origins, destinations, apiKey) {
  const originsStr = origins.map(o => `${o.lat},${o.lng}`).join('|');
  const destsStr = destinations.map(d => `${d.lat},${d.lng}`).join('|');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originsStr}&destinations=${destsStr}&key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data;
}
```

---

## Pricing Reference

| API | Cost per 1,000 | Free with $200 credit |
|-----|----------------|----------------------|
| Geocoding | $5.00 | 40,000 requests |
| Directions | $5.00 | 40,000 requests |
| Distance Matrix | $5.00 | 40,000 elements |
| Maps JavaScript | $7.00 | 28,000 loads |

**Your estimated monthly usage:** $1-2 (well within free tier)

---

## Troubleshooting

### "API key not valid" error
- Check that the key is copied correctly (no extra spaces)
- Verify the APIs are enabled in Google Cloud Console
- Check that your domain is in the allowed referrers list

### "Request denied" error
- Make sure billing is enabled on your project
- Check API restrictions - your domain must be allowed
- Verify the specific API you're calling is enabled

### "Over query limit" error
- You've exceeded your daily quota
- Wait 24 hours or increase your quota in Google Cloud Console

### Maps not displaying
- Check browser console for errors
- Verify Maps JavaScript API is enabled
- Make sure your domain is in the allowed referrers

---

## Security Checklist

- [ ] API key is restricted to your domains only
- [ ] API key is restricted to only the APIs you need
- [ ] Budget alerts are set up
- [ ] API key is NOT committed to public GitHub repo
- [ ] API key is stored securely (environment variable or Firebase)

---

## Quick Reference

**Google Cloud Console:** https://console.cloud.google.com/

**Your API Key:** `_________________________________` (fill in after creating)

**APIs Enabled:**
- [ ] Geocoding API
- [ ] Directions API
- [ ] Distance Matrix API
- [ ] Maps JavaScript API

**Budget set:** $______/month

---

## Next Steps

Once your API is set up, I can help you implement:

1. **Auto-geocode clients** - Automatically get coordinates when adding new clients
2. **Batch geocode existing clients** - One-time script to add coordinates to all current clients
3. **Route optimization** - Daily route planning for each team
4. **Auto-assign clients to teams** - Cluster nearby clients together
5. **Nearby client detection** - Auto-prompt when employee arrives at client location

---

*Last updated: December 2024*