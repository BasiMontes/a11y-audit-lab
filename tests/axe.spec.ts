import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

// Medición, no aserción: cada repetición guarda lo que encuentra axe en resultados/ejecucion-N.json.
// La clasificación frente a fallos-sembrados.md se hace en tools/clasificar.js.
const pagina = path.resolve(__dirname, '..', 'pagina', 'index.html');

test('axe sobre la página de práctica', async ({ page }, testInfo) => {
  await page.goto('file://' + pagina);

  const resultado = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();

  const violaciones = resultado.violations.flatMap((v) =>
    v.nodes.map((n) => ({
      regla: v.id,
      impacto: v.impact,
      criterios: v.tags.filter((t) => t.startsWith('wcag')),
      target: n.target.join(' '),
      html: n.html,
    })),
  );

  const carpeta = path.resolve(__dirname, '..', 'resultados');
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(
    path.join(carpeta, `ejecucion-${testInfo.repeatEachIndex}.json`),
    JSON.stringify({ fecha: new Date().toISOString(), repeticion: testInfo.repeatEachIndex, violaciones }, null, 2),
  );
});
