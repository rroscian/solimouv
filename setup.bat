@echo off
echo 🌟 Configuration de la PWA Solimouv'
echo =================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo ❌ Fichier package.json introuvable. Exécutez ce script depuis le dossier racine du projet.
    pause
    exit /b 1
)

echo 📦 Installation des dépendances...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

echo ✅ Dépendances installées avec succès!
echo.

REM Check for Rust and wasm-pack
echo 🦀 Vérification de Rust pour les modules WASM...
rustc --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Rust détecté
    
    wasm-pack --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ wasm-pack détecté
        echo 🔨 Compilation du module Rust WASM...
        cd rust-wasm
        call wasm-pack build --target web
        cd ..
        if %errorlevel% equ 0 (
            echo ✅ Module WASM compilé avec succès!
        ) else (
            echo ⚠️ Erreur lors de la compilation WASM (fallback JavaScript disponible)
        )
    ) else (
        echo ⚠️ wasm-pack non trouvé. Installez avec: cargo install wasm-pack
        echo    Le fallback JavaScript sera utilisé.
    )
) else (
    echo ⚠️ Rust non trouvé. Le fallback JavaScript sera utilisé.
    echo    Pour installer Rust: https://rustup.rs/
)

echo.
echo 🎉 Configuration terminée!
echo Pour démarrer le serveur de développement:
echo   npm run dev
echo.
echo Pour construire pour la production:
echo   npm run build
echo   npm run preview
echo.
echo 🌐 La PWA sera disponible sur http://localhost:5173
echo.
pause
