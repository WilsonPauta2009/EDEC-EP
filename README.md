# EDEC-EP | by SoftLution (piloto)

Prototipo funcional en Angular 22 para presentar una versión mejorada de portal público de desarrollo económico, emprendimiento, innovación, convocatorias, beneficiarios y seguimiento ciudadano para Cuenca.

## Qué incluye

- Portal navegable con rutas: Inicio, Servicios PyME, Convocatorias, Beneficiarios, Seguimiento, DataLab y Administración.
- Formularios demo para postulación, agendamiento de asesoría y observaciones ciudadanas.
- Persistencia local con `localStorage` para demostrar el flujo sin backend.
- Estructura preparada para backend `.NET Core` y base de datos `MS SQL Server`.
- UI responsive con Angular standalone components, Signals, SCSS, Material Symbols y estilo Material PRO institucional.
- Activos visuales en `src/assets`, incluyendo hero bitmap generado para el portal.

## Requisitos

- Node.js compatible con Angular 22.
- npm.
- Angular CLI local del proyecto, instalado con las dependencias.

## Ejecutar en desarrollo

```powershell
npm install
npm start -- --host 127.0.0.1 --port 4200
```

Abrir: `http://127.0.0.1:4200/`

## Compilar

```powershell
npm run build
```

La salida se genera en `dist/edec-ep`.

## Estructura principal

- `src/app/core`: modelos, servicios, sesión, layout y configuración.
- `src/app/features`: módulos funcionales del portal.
- `src/app/shared`: componentes reutilizables.
- `src/assets`: marca, ilustraciones, imagen hero y datos demo.
- `src/environments`: configuración por ambiente.
- `docs`: arquitectura, alcance y fuentes de referencia.

## Nota de alcance

Este piloto no implementa autenticación real ni conexión a SQL Server todavía. La capa `ApiEndpointsService` y los ambientes dejan preparada la integración con un backend `.NET Core` mediante API REST.
