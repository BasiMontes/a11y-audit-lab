// Clasifica los avisos de axe frente a la lista de fallos sembrados (docs/fallos-sembrados.md).
// Uso: node tools/clasificar.js (lee resultados/ejecucion-*.json)
const fs = require('fs');
const path = require('path');

const carpeta = path.join(__dirname, '..', 'resultados');
const archivos = fs.readdirSync(carpeta).filter((f) => /^ejecucion-\d+\.json$/.test(f)).sort();

// Reglas de axe que corresponden a un fallo sembrado previsto.
const porRegla = {
  'color-contrast': 'F1',
  'image-alt': 'F2',
  'button-name': 'F3',
  'heading-order': 'F5',
  'tabindex': 'F7',
  'html-has-lang': 'F9',
};
const PREVISTOS_DETECTABLES = ['F1', 'F2', 'F3', 'F4', 'F5', 'F7', 'F9'];
const NO_DETECTABLES = ['F6', 'F8', 'F10'];

// Marcadores de la sección de control: cualquier aviso sobre ellos es falso positivo.
const MARCADORES_CONTROL = ['foto-control', 'c-nombre', 'Logotipo de la tienda'];

function clasificar(v) {
  if (v.regla === 'label') {
    // F4 es solo el buscador; los campos de contacto sin etiqueta son hallazgo nuevo H1.
    return v.html.includes('name="q"') ? 'F4' : 'H1';
  }
  if (MARCADORES_CONTROL.some((m) => v.html.includes(m))) return 'FALSO_POSITIVO';
  return porRegla[v.regla] || 'NO_PREVISTO:' + v.regla;
}

const resumen = [];
for (const archivo of archivos) {
  const datos = JSON.parse(fs.readFileSync(path.join(carpeta, archivo), 'utf8'));
  const etiquetas = datos.violaciones.map((v) => ({ ...v, clase: clasificar(v) }));
  const detectados = PREVISTOS_DETECTABLES.filter((id) => etiquetas.some((e) => e.clase === id));
  const noDetectados = PREVISTOS_DETECTABLES.filter((id) => !detectados.includes(id));
  const falsosPositivos = etiquetas.filter((e) => e.clase === 'FALSO_POSITIVO').length;
  const hallazgosNuevos = etiquetas.filter((e) => e.clase === 'H1' || e.clase.startsWith('NO_PREVISTO')).map((e) => e.clase + ' ' + e.target);
  resumen.push({ archivo, avisos: etiquetas.length, detectados, noDetectados, falsosPositivos, hallazgosNuevos, sinDetectar: NO_DETECTABLES });
}

fs.writeFileSync(path.join(carpeta, 'clasificacion.json'), JSON.stringify(resumen, null, 2));
for (const r of resumen) {
  console.log(`${r.archivo}: ${r.avisos} avisos · detectados ${r.detectados.join(', ')} · no detectados ${r.noDetectados.join(', ')} · falsos positivos ${r.falsosPositivos}`);
  for (const h of r.hallazgosNuevos) console.log('  hallazgo nuevo: ' + h);
}
