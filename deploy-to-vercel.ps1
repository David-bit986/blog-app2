# Vercel Deployment Script (PowerShell)
# Run this script from the project root

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Vercel Deployment Automation" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

Write-Host "Project: my-app" -ForegroundColor Yellow
Write-Host "Location: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check Node.js
Write-Host "Step 1: Checking Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version
    Write-Host "Node.js: $nodeVersion - OK" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    pause
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "Dependencies: OK" -ForegroundColor Green

# Check Vercel CLI
Write-Host ""
Write-Host "Step 3: Checking for Vercel CLI..." -ForegroundColor Green
$vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelExists) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install Vercel CLI" -ForegroundColor Red
        Write-Host "Please run manually: npm install -g vercel" -ForegroundColor Red
        pause
        exit 1
    }
}
Write-Host "Vercel CLI: OK" -ForegroundColor Green

# Generate Prisma Client
Write-Host ""
Write-Host "Step 4: Generating Prisma Client..." -ForegroundColor Green
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Prisma generation failed. Will retry during build." -ForegroundColor Yellow
}

# Build project
Write-Host ""
Write-Host "Step 5: Building project..." -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed! Please fix errors before deploying." -ForegroundColor Red
    Write-Host "Check the output above for details." -ForegroundColor Red
    pause
    exit 1
}
Write-Host "Build: OK" -ForegroundColor Green

# Login to Vercel
Write-Host ""
Write-Host "Step 6: Logging into Vercel..." -ForegroundColor Green
Write-Host "A browser window will open for authentication..." -ForegroundColor Yellow
vercel login
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Login failed" -ForegroundColor Red
    pause
    exit 1
}

# Deploy
Write-Host ""
Write-Host "Step 7: Deploying to Vercel..." -ForegroundColor Green
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "- Set up and deploy? Press Y" -ForegroundColor Yellow
Write-Host "- Link to existing project? Press N (for first deploy)" -ForegroundColor Yellow
Write-Host "- Project name? Press Enter or type a name" -ForegroundColor Yellow
Write-Host "- In which directory? Press Enter" -ForegroundColor Yellow
Write-Host "- Override settings? Press N" -ForegroundColor Yellow
Write-Host ""
pause

vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Deployment failed" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Set Environment Variables" -ForegroundColor Yellow
Write-Host "Open VERCEL_ENV_VARS.md and add all variables to Vercel dashboard" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps:" -ForegroundColor Cyan
Write-Host "1. Go to your Vercel dashboard" -ForegroundColor Cyan
Write-Host "2. Open your project settings" -ForegroundColor Cyan
Write-Host "3. Go to Environment Variables" -ForegroundColor Cyan
Write-Host "4. Add each variable from VERCEL_ENV_VARS.md" -ForegroundColor Cyan
Write-Host "5. Redeploy if needed" -ForegroundColor Cyan
Write-Host ""
Write-Host "Done!" -ForegroundColor Green
pause
