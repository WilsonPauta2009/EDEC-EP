param(
  [string]$Target = 'D:\_Requisites\_dev\EDEC-EP'
)

$ErrorActionPreference = 'Stop'
$source = Split-Path -Parent $PSScriptRoot
$expected = 'D:\_Requisites\_dev\EDEC-EP'

if ((Resolve-Path -LiteralPath $source).Path -notlike '*\pilot\EDEC-EP') {
  throw "La ruta de origen no parece ser el proyecto piloto EDEC-EP: $source"
}

if ($Target -ne $expected) {
  throw "Destino no permitido para este script: $Target"
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null
robocopy $source $Target /MIR /XD node_modules .angular dist /XF work-ng-serve.out.log work-ng-serve.err.log /R:2 /W:2 /NFL /NDL /NP

$exitCode = $LASTEXITCODE
if ($exitCode -gt 7) {
  throw "Robocopy terminó con código $exitCode"
}

Write-Host "Proyecto sincronizado en $Target"
