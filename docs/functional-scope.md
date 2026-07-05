# Alcance funcional del piloto

## Flujos demostrables

1. Un emprendedor consulta servicios, filtra por categoría y agenda una asesoría.
2. Una PyME revisa convocatorias, requisitos, documentos y registra una postulación.
3. Un ciudadano consulta beneficiarios y revisa avance de proyectos apoyados.
4. Un ciudadano revisa programas y registra una observación de seguimiento.
5. Un administrador revisa postulaciones, asesorías y observaciones desde el backoffice.

## Datos demo

Los datos base viven en `PortalStoreService`. Los formularios guardan registros en `localStorage`, por lo que la demostración conserva información mientras se use el mismo navegador.

## Próxima fase

- API REST con `.NET Core`.
- SQL Server con tablas para servicios, convocatorias, beneficiarios, programas, indicadores, postulaciones, citas y observaciones.
- Seguridad con roles: ciudadano, emprendedor, funcionario, administrador.
- Trazabilidad documental y reportes de rendición de cuentas.
