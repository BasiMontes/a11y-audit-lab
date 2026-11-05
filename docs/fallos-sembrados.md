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
