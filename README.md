# a11y-audit-lab

Laboratorio de auditoría de accesibilidad con [axe](https://github.com/dequelabs/axe-core) sobre una página propia con fallos sembrados. Es el proyecto 5a de mi portfolio (accesibilidad). La seguridad irá en un proyecto aparte, con OWASP Juice Shop en local.

## Qué hay

- `pagina/index.html`: página de práctica con 10 fallos sembrados (F1 a F10) y una sección de control sin fallos.
- `docs/fallos-sembrados.md`: lista de fallos, predicción escrita antes de medir y resultados.
- `tests/axe.spec.ts`: ejecuta axe sobre la página y guarda lo que encuentra en `resultados/ejecucion-N.json`.
- `tools/clasificar.js`: compara los avisos con la lista de fallos sembrados.

## Cómo se ejecuta

```
npm install
npx playwright install chromium
npm run medir
```

`npm run medir` ejecuta la prueba 3 veces y clasifica los avisos. La salida queda en `resultados/ejecucion.log` y `resultados/clasificacion.json`.

Versiones con las que se midió (MacBook Air): Node 22.18.0, Playwright 1.64.1, @axe-core/playwright 4.14.0.

## Qué mide y qué no

- La prueba no hace aserciones: registra avisos de axe. Que Playwright diga "passed" no significa que la página cumpla accesibilidad.
- axe no cubre todo WCAG. Detecta una parte de los criterios; el resto exige revisión manual (foco, orden de lectura, sentido de los textos). Lo que axe no detecta se cuenta como brecha, no como acierto.
- Se usan las etiquetas `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` y `best-practice`. Algunos fallos (encabezados, tabindex) son reglas de buenas prácticas, no de WCAG.
- Una página, un navegador, una máquina. No dice nada de otras páginas.
- Las tres repeticiones dan lo mismo porque axe es determinista: confirma la estabilidad de la prueba, no una tasa.

## Hallazgos

Los resultados completos están en `docs/fallos-sembrados.md`. La predicción original no se modificó después de medir.
