# Solimouv' PWA Setup Script
Write-Host "🌟 Configuration de la PWA Solimouv'" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Fichier package.json introuvable. Exécutez ce script depuis le dossier racine du projet." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dépendances installées avec succès!" -ForegroundColor Green

# Check if Rust is available for WASM compilation
Write-Host "🦀 Vérification de Rust pour les modules WASM..." -ForegroundColor Yellow
try {
    $rustVersion = rustc --version
    Write-Host "✅ Rust détecté: $rustVersion" -ForegroundColor Green
    
    # Check for wasm-pack
    try {
        $wasmPackVersion = wasm-pack --version
        Write-Host "✅ wasm-pack détecté: $wasmPackVersion" -ForegroundColor Green
        
        Write-Host "🔨 Compilation du module Rust WASM..." -ForegroundColor Yellow
        Set-Location rust-wasm
        wasm-pack build --target web
        Set-Location ..
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Module WASM compilé avec succès!" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Erreur lors de la compilation WASM (fallback JavaScript disponible)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️ wasm-pack non trouvé. Installez avec: cargo install wasm-pack" -ForegroundColor Yellow
        Write-Host "   Le fallback JavaScript sera utilisé." -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ Rust non trouvé. Le fallback JavaScript sera utilisé." -ForegroundColor Yellow
    Write-Host "   Pour installer Rust: https://rustup.rs/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Configuration terminée!" -ForegroundColor Green
Write-Host "Pour démarrer le serveur de développement:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Pour construire pour la production:" -ForegroundColor Cyan
Write-Host "  npm run build" -ForegroundColor White
Write-Host "  npm run preview" -ForegroundColor White
Write-Host ""
Write-Host "🌐 La PWA sera disponible sur http://localhost:5173" -ForegroundColor Green
