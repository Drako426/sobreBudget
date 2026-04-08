# SobreBudget - Presupuesto por Sobres

SobreBudget es una aplicación web de presupuesto personal basada en el método de sobres (envelope budgeting). Gestiona tus ingresos y gastos por categorías, visualiza tu progreso con gráficas y exporta tus datos.

## Características

- 📊 Dashboard mensual con resumen de ingresos, gastos y balance
- 💰 Gestión de categorías con presupuestos mensuales personalizados
- 📋 CRUD completo de transacciones (ingresos/gastos)
- 📈 Reportes con gráficas (distribución de gastos y evolución diaria)
- 🎨 Interfaz responsive y moderna (funciona en móvil, tablet y desktop)
- 💾 Persistencia local (localStorage) - sin backend requerido
- 📥 Exportar e importar datos (JSON)
- 🔄 Resetear datos cuando lo necesites

## Tecnologías

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite
- **Estilos**: Tailwind CSS
- **Routing**: React Router v6
- **Gráficas**: Recharts
- **Almacenamiento**: localStorage (sin backend)

## Instalación y uso local

### Requisitos

- Node.js 16+ instalado

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/sobrebudget.git
   cd sobrebudget
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Construir para producción**
   ```bash
   npm run build
   ```
   Los archivos compilados estarán en la carpeta `dist/`

5. **Visualizar compilación**
   ```bash
   npm run preview
   ```

## Estructura del proyecto

```
src/
├── app/
│   └── (router y configuración)
├── components/
│   ├── Layout.tsx          # Layout principal
│   ├── Navbar.tsx          # Navegación
│   ├── StatCard.tsx        # Tarjetas de estadísticas
│   ├── CategoryBadge.tsx   # Badge de categoría
│   ├── ProgressBar.tsx     # Barra de progreso
│   └── Modal.tsx           # Modal reutilizable
├── pages/
│   ├── Dashboard.tsx       # Página principal
│   ├── Transactions.tsx    # Gestión de transacciones
│   ├── Categories.tsx      # Gestión de categorías
│   ├── Reports.tsx         # Reportes y gráficas
│   └── Settings.tsx        # Configuración (export/import/reset)
├── lib/
│   ├── storage.ts          # API de localStorage
│   ├── formatters.ts       # Formateo de moneda y fechas
│   └── helpers.ts          # Funciones de cálculo
├── types/
│   └── index.ts            # Tipos TypeScript
├── App.tsx                 # Componente principal
├── main.tsx                # Punto de entrada
└── index.css               # Estilos globales
```

## Modelos de datos

### Category
```typescript
{
  id: string;              // UUID
  name: string;            // "Alimentación"
  color: string;           // "#10b981"
  monthlyBudget: number;   // 800000 (COP)
}
```

### Transaction
```typescript
{
  id: string;              // UUID
  type: 'income' | 'expense';
  amount: number;          // En COP
  categoryId: string;      // ID de categoría
  date: string;            // "2024-01-15"
  note?: string;           // Descripción opcional
}
```

## Almacenamiento

Los datos se guardan en localStorage bajo estas claves:
- `sobrebudget:v1:categories` - Array de categorías
- `sobrebudget:v1:transactions` - Array de transacciones

No se requiere backend ni configuración de servidor.

## Moneda y localización

- **Moneda por defecto**: COP (Peso Colombiano)
- **Formato de fechas**: Español de Colombia
- **Formato de números**: Intl.NumberFormat (es-CO)

Ejemplo de salida: `$1,234,567` para 1234567 COP

## Despliegue en Vercel

### Opción 1: GitHub + Vercel (Recomendado)

1. **Subir a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SobreBudget"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/sobrebudget.git
   git push -u origin main
   ```

2. **Importar en Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Conectar tu cuenta de GitHub
   - Hacer clic en "New Project"
   - Seleccionar el repositorio `sobrebudget`
   - Vercel auto-detectará Vite
   - Build Command: `npm run build` (ya configurado)
   - Output Directory: `dist` (ya configurado)
   - Hacer clic en "Deploy"

3. **Tu app estará en vivo en**: `https://sobrebudget-[random].vercel.app`

### Opción 2: Vercel CLI (Alternativa)

```bash
npm i -g vercel
vercel
# Seguir las instrucciones interactivas
```

### Verificación de rutas después del deploy

Después de desplegar, verifica que las rutas funcionen:

- Dashboard: `https://tu-dominio.vercel.app/`
- Transacciones: `https://tu-dominio.vercel.app/transacciones`
- Categorías: `https://tu-dominio.vercel.app/categorias`
- Reportes: `https://tu-dominio.vercel.app/reportes`
- Configuración: `https://tu-dominio.vercel.app/configuracion`

Si alguna ruta retorna 404, verifica que `vercel.json` esté en la raíz y tenga la configuración correcta.

## Funcionalidades detalladas

### Dashboard
- Selector de mes interactivo
- Tarjetas de resumen: ingresos totales, gastos totales, balance
- Tabla de "Top Categorías" con barra de progreso semáforo (verde/amarillo/rojo)
- Semáforo:
  - Verde: ≤70% del presupuesto gastado
  - Amarillo: 70-100%
  - Rojo: >100%

### Transacciones
- CRUD completo
- Validaciones: monto > 0, fecha requerida, categoría requerida
- Filtros: mes, categoría, búsqueda por nota
- Ordenado por fecha descendente

### Categorías
- CRUD completo
- Selector de color (10 colores predefinidos)
- No permite eliminar categorías con transacciones asociadas
- Muestra presupuesto mensual asignado

### Reportes
- PieChart: distribución de gastos por categoría (mes seleccionado)
- LineChart: gastos acumulados por día
- Estadísticas: total transacciones, gasto promedio/día

### Configuración
- Exportar JSON (descarga archivo)
- Importar JSON (sube archivo o pega en textarea)
- Resetear datos (limpia localStorage)

## Datos de ejemplo

Al primer inicio, la app crea automáticamente:

### Categorías (6)
- Alimentación ($800,000/mes) - Verde
- Transporte ($300,000/mes) - Naranja
- Entretenimiento ($200,000/mes) - Púrpura
- Servicios ($400,000/mes) - Azul
- Salud ($500,000/mes) - Rojo
- Otros ($300,000/mes) - Gris

### Transacciones (8)
- 1 Ingreso: Salario $4,000,000
- 7 Gastos variados distribuidos en el mes actual

## Troubleshooting

### "Las rutas no funcionan después de desplegar"
Verifica que:
1. `vercel.json` esté en la raíz del proyecto
2. Contenga exactamente: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
3. Hayas hecho re-deploy después de crear `vercel.json`

### "Los datos no persisten después de recargar"
localStorage requiere que el sitio esté en HTTPS o localhost. Vercel es HTTPS por defecto, así que esto no debería ocurrir.

### "Error de buildx"
Asegúrate de tener Node.js 16+:
```bash
node --version
```

## Contribuir

Los pull requests son bienvenidos. Para cambios mayores, abre primero un issue para discutir los cambios.

## Licencia

MIT

## Autor

Desarrollado como una solución de presupuesto personal usando el método de sobres.

---

**Nota**: Este proyecto usa localStorage para almacenamiento. Los datos están locales en tu navegador y no se sincronizan entre dispositivos.
