# Fallos sembrados · pagina/index.html

Escrito ANTES de ejecutar axe (5/11/2026). No cambiar esta lista después de medir; si un fallo se corrige o se añade otro, se anota con fecha.

| ID | Criterio WCAG 2.2 | Dónde está en la página | Qué debería detectar axe |
|----|-------------------|-------------------------|--------------------------|
| F1 | 1.4.3 Contraste mínimo | Clase `.texto-secundario` (#9a9a9a sobre blanco) | Sí |
| F2 | 1.1.1 Contenido no textual | `<img>` sin `alt` en la primera tarjeta | Sí |
| F3 | 4.1.2 Nombre, función, valor | Botón solo con icono en la cabecera | Sí |
| F4 | 1.3.1 / 4.1.2 | Campo de búsqueda sin etiqueta | Sí |
| F5 | 1.3.1 Información y relaciones | h1 seguido de h4 | Sí |
| F6 | 2.4.7 Foco visible | `.btn-foco:focus { outline: none }` | No (revisión manual) |
| F7 | 2.4.3 Orden del foco | `tabindex="3"` en la primera tarjeta | Sí |
| F8 | 2.4.4 Propósito del enlace | Enlace con texto "aquí" | No (revisión manual) |
| F9 | 3.1.1 Idioma de la página | `<html>` sin `lang` | Sí |
| F10 | 1.4.1 Uso del color | Campo de correo con error solo en borde rojo | No (revisión manual) |

Predicción: axe detecta 7 de 10 (F1, F2, F3, F4, F5, F7, F9) y no detecta F6, F8 y F10.

## Control (sin fallos sembrados)
Sección `#control`: formulario con `label`, imagen con `alt` y texto con contraste suficiente. Predicción: 0 avisos de axe dentro de esta sección.

## Notas para la medición
- F7 y F4 pueden aparecer con más de un aviso; se cuenta por fallo sembrado, no por aviso.
- Un aviso de axe fuera de la lista de fallos ni de la sección de control se anota como hallazgo nuevo, no se descarta.

## Medición (5/11/2026, MacBook Air, `npm run medir`)
Versiones: @playwright/test 1.64.1 · @axe-core/playwright 4.14.0. Tres repeticiones con `--repeat-each=3`; las tres dan lo mismo (11 avisos cada vez).

Predicción original: 7 de 10 detectados. **Resultado: 6 de 7 detectables.**

| ID | Previsto | Resultado |
|----|----------|-----------|
| F1 contraste | sí | detectado |
| F2 imagen sin alt | sí | detectado |
| F3 botón sin nombre | sí | detectado |
| F4 buscador sin etiqueta | sí | **NO detectado** (predicción fallida) |
| F5 encabezados | sí | detectado |
| F6 foco invisible | no | no detectado (como se predijo) |
| F7 tabindex positivo | sí | detectado |
| F8 enlace "aquí" | no | no detectado (como se predijo) |
| F9 lang ausente | sí | detectado |
| F10 error solo por color | no | no detectado (como se predijo) |

**Falso positivo**: ninguno en la sección de control.

**Predicción fallida (F4)**: el buscador tiene `placeholder="Buscar"`. Axe acepta el placeholder como nombre accesible y por eso no da aviso de `label`. Esto es una deducción a partir de la regla y del resultado, no una comprobación directa. Un placeholder no sustituye a una etiqueta para WCAG 1.3.1, así que el fallo sigue ahí: es una brecha de la herramienta, no un acierto.

**Corrección (6/11/2026)**: la predicción original de F4 cita WCAG 1.3.1 / 4.1.2. Tras revisar el W3C, el criterio que mejor encaja es **3.3.2 (Etiquetas o instrucciones)**: el campo no tiene etiqueta visible y el placeholder desaparece al escribir. Se mantiene la tabla original sin cambios; esta nota es la corrección. Interpretación nuestra: el texto del criterio no define el placeholder como etiqueta. La medición no cambia: axe no lo detecta.

**Hallazgos nuevos (no sembrados)**:
- H1: el campo de correo (`.error-campo`) sin etiqueta. Tampoco da aviso porque el campo "Nombre" tiene placeholder; el de correo no tiene, así que sí sale.
- `target-size` en el enlace "Catálogo" del menú (criterio 2.5.8 de WCAG 2.2). No lo sembré: es un problema real de la página que no estaba previsto.

**Qué mide esta prueba y qué no**: la prueba no hace aserciones, solo registra avisos. El "passed" de Playwright no significa que la página cumpla. Las tres repeticiones son idénticas porque axe es determinista: solo confirma que la prueba es estable en esta máquina.
