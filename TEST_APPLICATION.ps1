# PhyChat - Application Test Script
# Tests all endpoints and functionality

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PhyChat - Testing All Systems" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allPassed = $true

# Test 1: Backend Health
Write-Host "[Test 1/5] Backend Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-WebRequest -Uri "http://localhost:8000/api/health" -UseBasicParsing -TimeoutSec 5
    if ($health.StatusCode -eq 200) {
        Write-Host "  ✅ Backend is healthy" -ForegroundColor Green
        Write-Host "  Response: $($health.Content)" -ForegroundColor Gray
    } else {
        Write-Host "  ❌ Backend returned status: $($health.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ Backend not responding: $_" -ForegroundColor Red
    $allPassed = $false
}
Write-Host ""

# Test 2: Frontend Home Page
Write-Host "[Test 2/5] Frontend Home Page..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($frontend.StatusCode -eq 200) {
        Write-Host "  ✅ Frontend is serving pages" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Frontend returned status: $($frontend.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ Frontend not responding: $_" -ForegroundColor Red
    $allPassed = $false
}
Write-Host ""

# Test 3: Backend Chat Endpoint
Write-Host "[Test 3/5] Backend Chat API..." -ForegroundColor Yellow
try {
    $chatBody = @{
        user_id = "TEST001"
        message = "Help me fix this error"
        code_snippet = "for i in range(4):\n    print(numbers[i])"
    } | ConvertTo-Json

    $chat = Invoke-WebRequest -Uri "http://localhost:8000/api/chat" -Method POST `
        -ContentType "application/json" `
        -Body $chatBody `
        -UseBasicParsing -TimeoutSec 5
    
    if ($chat.StatusCode -eq 200) {
        Write-Host "  ✅ Chat API working" -ForegroundColor Green
        $response = $chat.Content | ConvertFrom-Json
        Write-Host "  AI Reply: $($response.reply.Substring(0, [Math]::Min(60, $response.reply.Length)))..." -ForegroundColor Gray
    } else {
        Write-Host "  ❌ Chat API returned status: $($chat.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ Chat API failed: $_" -ForegroundColor Red
    $allPassed = $false
}
Write-Host ""

# Test 4: Backend Recommendation Endpoint
Write-Host "[Test 4/5] Recommendation API..." -ForegroundColor Yellow
try {
    $recommend = Invoke-WebRequest -Uri "http://localhost:8000/api/recommend/TEST001" -UseBasicParsing -TimeoutSec 5
    if ($recommend.StatusCode -eq 200) {
        Write-Host "  ✅ Recommendation API working" -ForegroundColor Green
        $recResponse = $recommend.Content | ConvertFrom-Json
        Write-Host "  Challenge: $($recResponse.challenge.title)" -ForegroundColor Gray
    } else {
        Write-Host "  ❌ Recommendation API returned status: $($recommend.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ Recommendation API failed: $_" -ForegroundColor Red
    $allPassed = $false
}
Write-Host ""

# Test 5: API Documentation
Write-Host "[Test 5/5] API Documentation..." -ForegroundColor Yellow
try {
    $docs = Invoke-WebRequest -Uri "http://localhost:8000/docs" -UseBasicParsing -TimeoutSec 5
    if ($docs.StatusCode -eq 200) {
        Write-Host "  ✅ API docs accessible at /docs" -ForegroundColor Green
    } else {
        Write-Host "  ❌ API docs returned status: $($docs.StatusCode)" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ API docs not accessible: $_" -ForegroundColor Red
    $allPassed = $false
}
Write-Host ""

# Final Summary
Write-Host "========================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "  ✅ ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "  Application is working perfectly!" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  SOME TESTS FAILED" -ForegroundColor Yellow
    Write-Host "  Check the errors above for details" -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🌐 Access Points:" -ForegroundColor White
Write-Host "  • Main App:    http://localhost:3000" -ForegroundColor Gray
Write-Host "  • Backend API: http://localhost:8000" -ForegroundColor Gray
Write-Host "  • API Docs:    http://localhost:8000/docs" -ForegroundColor Gray
Write-Host ""

if ($allPassed) {
    Write-Host "Opening browser..." -ForegroundColor Green
    Start-Process "http://localhost:3000"
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
