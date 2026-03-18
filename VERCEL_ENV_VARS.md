# Environment Variables for Vercel

Copy these environment variables to your Vercel project settings:

## Required Environment Variables

### 1. BETTER_AUTH_SECRET
```
r4MapA3TTSoW9WPqKdFke6CkrM1FfPa1
```

### 2. BETTER_AUTH_URL
```
https://YOUR-APP-NAME.vercel.app
```
⚠️ Replace YOUR-APP-NAME with your actual Vercel deployment URL

### 3. NEXT_PUBLIC_APP_URL
```
https://YOUR-APP-NAME.vercel.app
```
⚠️ Replace YOUR-APP-NAME with your actual Vercel deployment URL

### 4. DATABASE_URL
```
postgresql://neondb_owner:npg_1gwAdzVkpB0C@ep-nameless-meadow-andgobot-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## How to Add Environment Variables in Vercel

### Via Dashboard:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - Name: Enter the variable name
   - Value: Paste the value
   - Environment: Select all (Production, Preview, Development)
4. Click "Save"

### Via CLI:
```bash
vercel env add BETTER_AUTH_SECRET
# When prompted, paste: r4MapA3TTSoW9WPqKdFke6CkrM1FfPa1
# Select: Production, Preview, Development

vercel env add BETTER_AUTH_URL
# When prompted, paste: https://YOUR-APP-NAME.vercel.app

vercel env add NEXT_PUBLIC_APP_URL
# When prompted, paste: https://YOUR-APP-NAME.vercel.app

vercel env add DATABASE_URL
# When prompted, paste the full DATABASE_URL above
```

---

## Important Notes

- After adding environment variables, you may need to redeploy for changes to take effect
- Keep these values secure and never commit them to version control
- The DATABASE_URL connects to your Neon PostgreSQL database
- BETTER_AUTH_SECRET should be kept secret and never shared
