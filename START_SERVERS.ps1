# PhyChat - Automated Server Startup Script
# This script starts both backend and frontend servers in a virtual environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PhyChat - Starting All Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set base path
$BASE_PATH = "f:\Research Methodology & Scientific Communication\CST\PhyChatImp\PhyChat"

# Check if virtual environment exists
Write-Host "[1/4] Checking Python virtual environment..." -ForegroundColor Yellow
if (!(Test-Path "$BASE_PATH\backend\venv")) {
    Write-Host "  ❌ Virtual environment not found. Creating..." -ForegroundColor Red
    cd "$BASE_PATH\backend"
    python -m venv venv
    Write-Host "  ✅ Virtual environment created" -ForegroundColor Green
}

# Check if dependencies are installed
Write-Host "[2/4] Checking backend dependencies..." -ForegroundColor Yellow
cd "$BASE_PATH\backend"
.\venv\Scripts\Activate.ps1
$pipList = pip list
if ($pipList -notmatch "fastapi") {
    Write-Host "  ❌ Dependencies not found. Installing..." -ForegroundColor Red
    pip install fastapi uvicorn python-dotenv httpx
    Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ✅ Dependencies already installed" -ForegroundColor Green
}

# Check Node.js dependencies
Write-Host "[3/4] Checking frontend dependencies..." -ForegroundColor Yellow
if (!(Test-Path "$BASE_PATH\pytutor-its\node_modules")) {
    Write-Host "  ❌ Node modules not found. Installing..." -ForegroundColor Red
    cd "$BASE_PATH\pytutor-its"
    npm install --ignore-scripts --legacy-peer-deps
    Write-Host "  ✅ Node modules installed" -ForegroundColor Green
} else {
    Write-Host "  ✅ Node modules already installed" -ForegroundColor Green
}

# Start servers
Write-Host "[4/4] Starting servers..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
Write-Host "🚀 Starting Backend Server (Port 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH\backend'; .\venv\Scripts\Activate.ps1; python main.py"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "🚀 Starting Frontend Server (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH\pytutor-its'; node ./node_modules/next/dist/bin/next dev"

# Wait for frontend to start
Start-Sleep -Seconds 5

# Open browser
Write-Host "🌐 Opening browser..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ All Servers Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "⚡ Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "📚 API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
