# Builds the standalone renderer boot bundle (React + client shim).
# Run from the standalone directory.
$ErrorActionPreference = "Stop"
$node = "C:\Users\ASUS\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
$pnpm = "C:\Users\ASUS\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.cjs"
if (-not (Test-Path $node)) { $node = "node" }
if (Test-Path $pnpm) {
  & $node $pnpm dlx esbuild@0.21.5 boot.src.js --bundle --format=iife --platform=browser --outfile=renderer/boot.js
} else {
  npx esbuild boot.src.js --bundle --format=iife --platform=browser --outfile=renderer/boot.js
}
Write-Host "Built renderer/boot.js"
