# 🚀 QUICK START - Deploy to Vercel NOW!

## METHOD 1: Double-Click to Deploy (Easiest)

### Windows:
1. **Double-click** `deploy-to-vercel.bat` in this folder
2. Follow the prompts
3. Done!

### If using PowerShell:
1. Right-click `deploy-to-vercel.ps1`
2. Select "Run with PowerShell"
3. If you get an error, run PowerShell as Administrator and run:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
4. Try again

---

## METHOD 2: Manual Commands

Open Command Prompt or Terminal in this folder and run:

```bash
# 1. Install Vercel CLI (one time only)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

---

## After Deployment

**CRITICAL**: Add environment variables to Vercel:

1. Open your Vercel dashboard at https://vercel.com
2. Go to your project → Settings → Environment Variables
3. Add these variables (get values from `VERCEL_ENV_VARS.md`):
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (use your Vercel URL)
   - `NEXT_PUBLIC_APP_URL` (use your Vercel URL)
   - `DATABASE_URL`
4. Click "Redeploy" to apply the changes

---

## Troubleshooting

### "vercel: command not found"
- Run: `npm install -g vercel`
- Restart your terminal

### "Build failed"
- Check that all dependencies are installed: `npm install`
- Try building locally first: `npm run build`

### "Permission denied" (PowerShell script)
- Run as Administrator:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

### "PowerShell 6+ not available"
- Use the `.bat` file instead (double-click it)
- Or install PowerShell 7 from https://aka.ms/powershell

---

## What Happens During Deployment?

1. ✅ Checks Node.js is installed
2. ✅ Installs project dependencies
3. ✅ Installs Vercel CLI (if needed)
4. ✅ Generates Prisma client
5. ✅ Builds your Next.js app
6. ✅ Logs into Vercel
7. ✅ Deploys to production
8. ⚠️ **YOU MUST** add environment variables in Vercel dashboard

---

## Your Deployment Files

- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `deploy-to-vercel.bat` - Windows batch script (double-click this!)
- ✅ `deploy-to-vercel.ps1` - PowerShell script
- ✅ `VERCEL_ENV_VARS.md` - All environment variables needed
- ✅ `DEPLOYMENT_GUIDE.md` - Detailed deployment documentation

---

## Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `VERCEL_ENV_VARS.md` for environment variables
3. Visit https://vercel.com/docs for Vercel documentation
