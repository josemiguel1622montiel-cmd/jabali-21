@echo off
title JABALI 21 - AGENCIA DE PUBLICIDAD IA
cd /d "%~dp0"
echo ========================================================
echo   INICIANDO JABALI 21 - AGENCIA DE PUBLICIDAD CON IA
echo   "El sabor del fuego, la pasion por el asado."
echo ========================================================
start "" http://localhost:5173/
node server.js
pause
