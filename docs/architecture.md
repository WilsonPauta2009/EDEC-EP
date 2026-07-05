# Arquitectura del piloto EDEC-EP

## Enfoque

El piloto está construido como aplicación Angular 22 standalone, organizada por dominios funcionales y preparada para crecer hacia una arquitectura frontend + API `.NET Core` + `MS SQL Server`.

## Módulos funcionales

- `Inicio`: vista ejecutiva, accesos por necesidad, indicadores y trazabilidad del Artículo 17.
- `Servicios PyME`: rutas de atención por categoría y agendamiento demo.
- `Convocatorias`: publicación de bases, requisitos y postulación demo.
- `Beneficiarios`: consulta pública de proyectos apoyados, filtros e impacto.
- `Seguimiento`: avance de programas, responsables, presupuesto referencial y observaciones ciudadanas.
- `DataLab`: indicadores, fuentes de integración y formatos abiertos.
- `Admin`: revisión de registros generados durante la demostración.

## Mapeo Artículo 17

- Literal a): difundido en Inicio mediante Plan Cantonal, indicadores y accesos ejecutivos.
- Literal b): cubierto por Convocatorias, con bases, requisitos, cronograma y postulación.
- Literal c): cubierto por Beneficiarios, con fichas públicas de proyectos apoyados.
- Literal d): cubierto por Seguimiento, con avance, responsables, hitos y participación ciudadana.

## Evolución técnica sugerida

- Sustituir `PortalStoreService` por servicios HTTP conectados a `.NET Core`.
- Conservar modelos de `src/app/core/models` como contrato inicial de DTO.
- Proteger `Admin` con autenticación institucional.
- Agregar publicación de documentos en almacenamiento seguro.
- Exponer indicadores en JSON, CSV y XLSX con fecha de corte y responsable.
