# SobreBudget - Guía Rápida

## 1. Comenzar localmente

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173` en tu navegador.

Al primer acceso, la app creará automáticamente 6 categorías y 8 transacciones de ejemplo.

## 2. Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard - Resumen mensual |
| `/transacciones` | CRUD de transacciones |
| `/categorias` | CRUD de categorías |
| `/reportes` | Gráficas y análisis |
| `/configuracion` | Export/Import/Reset |

## 3. Características principales

### Dashboard
- Selector de mes
- 3 tarjetas: Ingresos, Gastos, Balance
- Tabla de categorías con semáforo (% gastado)

### Transacciones
- Crear, editar, eliminar movimientos
- Filtrar por mes, categoría, búsqueda
- Tabla ordenada por fecha

### Categorías
- Crear, editar, eliminar categorías
- Asignar color y presupuesto mensual
- Protegidas si tienen transacciones

### Reportes
- PieChart: distribución de gastos
- LineChart: gastos por día
- Estadísticas rápidas

### Configuración
- **Exportar** → Descarga JSON con todos tus datos
- **Importar** → Carga un JSON previamente exportado
- **Resetear** → Borra todo y reinicia (datos de ejemplo)

## 4. Datos

**Moneda**: COP (Peso Colombiano)
**Formato**: $1,234,567

**Almacenamiento**: localStorage (local del navegador)
- `sobrebudget:v1:categories`
- `sobrebudget:v1:transactions`

Los datos NO se sincronizan entre dispositivos.

## 5. Desplegar en Vercel

### Opción A: GitHub + Vercel UI (Recomendado)

```bash
git init
git add .
git commit -m "SobreBudget inicial"
git branch -M main
git remote add origin https://github.com/tu-usuario/sobrebudget.git
git push -u origin main
```

Luego en [vercel.com](https://vercel.com):
1. Conectar GitHub
2. "New Project"
3. Seleccionar repositorio
4. Deploy (auto-detecta Vite)

### Opción B: Vercel CLI

```bash
npm i -g vercel
vercel
# Seguir instrucciones
```

## 6. Verificar el deploy

Una vez desplegado:
- Abre `/transacciones` y recarga (F5)
- Abre `/reportes` y recarga
- Los datos deben persistir

Si ves 404, verifica que `vercel.json` esté en la raíz.

## 7. Archivos importantes

| Archivo | Propósito |
|---------|-----------|
| `vercel.json` | Config SPA para Vercel (CRÍTICO) |
| `README.md` | Documentación completa |
| `DELIVERY_CHECKLIST.md` | Checklist de funcionalidades |
| `src/lib/storage.ts` | API localStorage |
| `src/lib/formatters.ts` | Formato COP y fechas |
| `src/lib/helpers.ts` | Lógica de cálculos |

## 8. Troubleshooting

### "Error en build"
```bash
npm install
npm run build
```

### "TypeScript errors"
```bash
npm run typecheck
```

### "Rutas no funcionan en Vercel"
- Verifica `vercel.json` existe en raíz
- Re-deploy después de agregar `vercel.json`

### "localStorage vacío después de importar"
- Verifica JSON es válido
- Debe tener `categories` y `transactions` arrays

---

**Listo para producción** ✅

Para más detalles, ver `README.md` y `DELIVERY_CHECKLIST.md`.
