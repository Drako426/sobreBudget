# 🚀 START HERE - SobreBudget

Bienvenido a **SobreBudget**, tu aplicación personal de presupuesto con método de sobres.

## ⚡ Inicio rápido (3 pasos)

### 1. Instalar
```bash
npm install
```

### 2. Correr localmente
```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### 3. ¡A usar!
La app carga automáticamente con 6 categorías y 8 transacciones de ejemplo.

---

## 📍 Navegación

| Icono | URL | Descripción |
|-------|-----|-------------|
| 📊 | `/` | **Dashboard** - Tu resumen mensual |
| 💳 | `/transacciones` | **Transacciones** - Agrega ingresos/gastos |
| 📂 | `/categorias` | **Categorías** - Define tus sobres |
| 📈 | `/reportes` | **Reportes** - Gráficas e insights |
| ⚙️ | `/configuracion` | **Configuración** - Export/Import/Reset |

---

## 💡 Cómo usar

### Agregar una transacción
1. Ve a **Transacciones** → Click en "Nueva"
2. Selecciona Tipo (Ingreso/Gasto)
3. Ingresa Monto, Categoría, Fecha
4. Agrega una nota opcional
5. Click en "Crear"

### Crear una categoría
1. Ve a **Categorías** → Click en "Nueva"
2. Nombre (ej: "Viajes")
3. Selecciona un color
4. Ingresa el presupuesto mensual
5. Click en "Crear"

### Ver tu dashboard
1. Ve a **Dashboard**
2. Selecciona el mes
3. Verás:
   - **Ingresos totales**
   - **Gastos totales**
   - **Balance** (ingresos - gastos)
   - **Tabla de categorías** con semáforo

### Entender el semáforo
- 🟢 **Verde** = Gastaste ≤70% del presupuesto ✅
- 🟡 **Amarillo** = Gastaste 70-100% ⚠️
- 🔴 **Rojo** = Excediste el presupuesto ❌

### Ver reportes
1. Ve a **Reportes**
2. Selecciona el mes
3. Verás:
   - **Pie Chart** = Dónde fue tu dinero
   - **Line Chart** = Gastos por día
   - **Estadísticas** = Promedios y totales

### Respaldar tus datos
1. Ve a **Configuración**
2. Click en "Exportar"
3. Se descarga un archivo JSON
4. **Guarda este archivo en un lugar seguro**

### Restaurar datos
1. Ve a **Configuración**
2. Click en "Importar"
3. Selecciona el archivo JSON
4. Revisa los datos en el textarea
5. Click en "Importar"

---

## 🔧 Comandos útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Ver build compilado
npm run preview

# Chequear tipos TypeScript
npm run typecheck

# Linter
npm run lint
```

---

## 📱 Funciona en

✅ Desktop (Chrome, Firefox, Safari, Edge)
✅ Tablet (iPad, Android)
✅ Mobile (iPhone, Android)

Los datos se guardan **localmente en tu navegador**. No se sincroniza entre dispositivos.

---

## 💾 Tus datos

- **Almacenados en**: localStorage del navegador
- **Privacidad**: 100% privado (no se envía a servidores)
- **Respaldo**: Exporta JSON cuando quieras
- **Restauración**: Importa JSON previamente guardado

---

## 🌍 Desplegar en Vercel (GRATIS)

### Opción A: Si tienes GitHub (Recomendado)

```bash
# 1. Inicializar git
git init

# 2. Agregar archivos
git add .

# 3. Primer commit
git commit -m "SobreBudget inicial"

# 4. Renombrar rama
git branch -M main

# 5. Agregar remoto
git remote add origin https://github.com/tu-usuario/sobrebudget.git

# 6. Push
git push -u origin main
```

Luego:
1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Conecta tu repo de GitHub
4. Click en "Deploy"
5. Listo! Tu app está en vivo 🎉

### Opción B: Con Vercel CLI

```bash
npm i -g vercel
vercel
# Seguir las instrucciones
```

---

## ✨ Features

✅ CRUD completo (crear, leer, actualizar, eliminar)
✅ Filtros avanzados (mes, categoría, búsqueda)
✅ Gráficas interactivas (Pie + Line chart)
✅ Semáforo de gastos (verde/amarillo/rojo)
✅ Validaciones en tiempo real
✅ Interfaz responsive
✅ Sin internet requerido
✅ Datos privados (localStorage)
✅ Export/Import JSON
✅ Datos de ejemplo al comenzar

---

## 📚 Documentación completa

- **README.md** - Documentación técnica
- **QUICKSTART.md** - Guía rápida
- **DELIVERY_CHECKLIST.md** - Checklist de funcionalidades
- **PROJECT_OVERVIEW.txt** - Visión general del proyecto

---

## 🆘 Ayuda rápida

### "¿Por qué no puedo eliminar una categoría?"
Porque tiene transacciones asociadas. Primero elimina las transacciones de esa categoría.

### "¿Dónde se guardan mis datos?"
En localStorage del navegador. Puedes ver exportando JSON.

### "¿Se sincronizan mis datos entre dispositivos?"
No, solo están en tu navegador. Puedes respaldar con Export/Import.

### "¿Necesito conexión a internet?"
No, funciona 100% offline. Solo necesitas internet para el deploy inicial en Vercel.

### "¿Puedo cambiar la moneda de COP a otra?"
Por ahora es fija (COP - Peso Colombiano). Futuros updates permitirán elegir.

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que tengas Node.js 16+: `node --version`
2. Elimina `node_modules`: `rm -rf node_modules`
3. Reinstala: `npm install`
4. Limpia localStorage: Ve a Configuración → Resetear
5. Intenta nuevamente

---

## 🎯 Próximos pasos

1. ✅ Explora el Dashboard
2. ✅ Crea una categoría nueva
3. ✅ Agrega una transacción
4. ✅ Mira los reportes
5. ✅ Exporta tus datos
6. ✅ (Opcional) Despliega en Vercel

---

**¡Listo para comenzar!** 🚀

Abre `http://localhost:5173` y comienza a gestionar tu presupuesto.

---

*SobreBudget v1.0.0 - Presupuesto por Sobres*
