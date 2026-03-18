@echo off
cd /d "%~dp0"
echo ====================================
echo Vercel Deployment Automation
echo ====================================
echo.
echo Project: my-app
echo Location: %CD%
echo.

echo Step 1: Checking Node.js...
node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js: OK

echo.
echo Step 2: Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies: OK

echo.
echo Step 3: Checking for Vercel CLI...
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install Vercel CLI
        echo Please run manually: npm install -g vercel
        pause
        exit /b 1
    )
)
echo Vercel CLI: OK

echo.
echo Step 4: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Prisma generation failed. Will retry during build.
)

echo.
echo Step 5: Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed! Please fix errors before deploying.
    echo Check the output above for details.
    pause
    exit /b 1
)
echo Build: OK

echo.
echo Step 6: Logging into Vercel...
echo A browser window will open for authentication...
call vercel login
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Login failed
    pause
    exit /b 1
)

echo.
echo Step 7: Deploying to Vercel...
echo.
echo INSTRUCTIONS:
echo - Set up and deploy? Press Y
echo - Link to existing project? Press N (for first deploy)
echo - Project name? Press Enter or type a name
echo - In which directory? Press Enter
echo - Override settings? Press N
echo.
pause
call vercel --prod
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Deployment failed
    pause
    exit /b 1
)

echo.
echo ====================================
echo DEPLOYMENT SUCCESSFUL!
echo ====================================
echo.
echo IMPORTANT: Set Environment Variables
echo Open VERCEL_ENV_VARS.md and add all variables to Vercel dashboard
echo.
echo Steps:
echo 1. Go to your Vercel dashboard
echo 2. Open your project settings
echo 3. Go to Environment Variables
echo 4. Add each variable from VERCEL_ENV_VARS.md
echo 5. Redeploy if needed
echo.
echo Done!
pause
