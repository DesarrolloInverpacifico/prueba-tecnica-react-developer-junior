# Prueba técnica – Desarrollador Fron-End React Junior 

## Descripción del proyecto
Se ha desarrollado una API de empleados que gestiona horarios y registros de control de asistencia. La tarea consiste en consumir esta API y construir una interfaz funcional que permita visualizar, filtrar, ordenar y calcular información clave sobre los empleados y sus horas trabajadas.

## Objetivo de la prueba
El candidato deberá:
  1. Consumir datos de la API y mostrar la lista de empleados y sus registros de asistencia.
  2.	Implementar funciones de filtrado y búsqueda para encontrar empleados según distintos criterios (nombre, cargo, fecha, etc.).
  3.	Calcular el total de horas trabajadas por empleado y determinar si hay horas extras.
  4.	Clasificar las horas extras según el tipo (ejemplo: nocturnas, festivas, etc.).
  5.	Calcular el salario total de un empleado con base en sus horas trabajadas y horas extras.
  6.	Optimizar el rendimiento en el manejo de datos para evitar sobrecarga de memoria.
  7.	Aplicar buenas prácticas de desarrollo, como separación de componentes, uso adecuado de hooks y gestión eficiente del estado.

## Requerimientos técnicos 
### 1. Listado de empleado.
Consumir la API de empleados y mostrar una tabla con los siguientes datos: 
 - Nombre
 - Apellido
 - Correo electronico
 - Cargo
 - Salario
### 2.	Filtros y búsqueda
  - Implementar un buscador para encontrar empleados por **nombre, correo o cargo**.
  - Aplicar filtro para ordenar los datos de la tabla por: **nombre** o **salario**
### 3.	Calculo de horas extras y salario a devengar
- Determinar las horas extras con base en las horas trabajadas y el horario establecido
- Clasificar las horas extras y/o recargos en:
  - **HED**: Horas extras diurnas
  - **HED**: Horas extras nocturnas
  - **HEDD**: Hora extras diurna dominical o festiva
  - **HEDN**: Hora extra dominical nocturna
  - **RC**: Recargo nocturno
  - **RD**: Recargo dominical
  - **RND**: Recargo nocturno dominical
- Calcular el salario estimado según
  - Horas regulares trabajadas
  - Tarifas adicionales por hora extra según el tipo
    
### 4.	Optimización y buenas practicas
  - Implementar gestión eficiente del estado utilizando React Hooks (useState, useEffect, useMemo, etc.).
  - Aplicar paginación o carga bajo demanda si la API devuelve una gran cantidad de datos.
Para apoyarse y tener conceptos mas claros del caculo de horas laborales visitar el siguiente enlace: https://actualicese.com/horas-extra-y-recargos

### Instrucciones de entrega
1.	Realiza un fork o clona el repo base de la prueba
2.	Implementa la solución en React y organiza el código en componentes reutilizables.
3.	Sube el código a un repositorio público en GitHub y comparte el enlace o realiza una pull request al repositorio principal.

### Notas finales
Esta prueba busca evaluar habilidades técnicas clave para un desarrollador React junior, incluyendo el consumo de APIs, manipulación de datos, optimización del código y buenas prácticas. No es obligatorio completar todos los puntos, pero se valorará la calidad del código y la solución presentada.
