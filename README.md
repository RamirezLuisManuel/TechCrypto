# TechCrypto - Monitoreo de Activos Digitales
## 1. Descripción General
**TechCrypto** es una plataforma web integral diseñada para el análisis y monitoreo en tiempo real del mercado financiero. A diferencia de herramientas convencionales, implementa una arquitectura de motor híbrido de APIs para maximizar la obtención de datos gratuitos: utiliza CoinMarketCap para listados globales, Binance para el renderizado de gráficos históricos y Finnhub para inteligencia de mercado mediante noticias filtradas.

## 2. Configuración del Entorno y Creación
Para garantizar un desarrollo escalable en Python 3.x, se siguieron los siguientes estándares:

### Creación del directorio raíz
        mkdir TechCrypto
        cd TechCrypto

### Entorno Virtual y Dependencias
Se aisló el proyecto para gestionar las librerías necesarias de comunicación y procesamiento de fechas:

        python -m venv venv
        venv\Scripts\activate
        pip install flask

## 3. Estructura del Proyecto
El proyecto sigue un patrón de diseño MVC (Modelo-Vista-Controlador) simplificado para Flask:

        TechCrypto/
        ├── app.py              # Controlador principal y gestión de rutas
        ├── services.py         # Lógica de consumo de APIs (CMC, Binance, Finnhub)
        ├── static/
        │   ├── css/
        │   │   ├── style.css   # Estilos globales y layout
        │   │   ├── index.css   # Efectos de Interactive Cards y Banner
        │   │   └── dashboard.css # Diseño de tablas, buscador y modales
        │   ├── js/
        │   │   ├── realtime.js # Lógica de Chart.js y tablas dinámicas
        │   │   └── news.js     # Paginación y filtrado de noticias
        │   └── images/         # Recursos visuales locales
        └── templates/          # Vistas Jinja2
            ├── layout.html     # Estructura base
            ├── index.html      # Inicio interactivo
            ├── realtime.html   # Dashboard de mercado
            └── news.html       # Terminal de noticias financieras

## 4. Implementación del Backend (Flask)
El archivo app.py gestiona el flujo de datos entre las APIs externas y la interfaz de usuario.

### Estrategia de "Motor Híbrido"
Para superar las limitaciones de los planes gratuitos, el backend coordina tres servicios distintos:

**CryptoService:** Consulta los precios actuales y capitalización en CoinMarketCap.

**HistoryService:** Extrae puntos de datos históricos desde Binance para alimentar los gráficos sin costo de API.

**StockService:** Obtiene noticias globales de Finnhub aplicándoles un filtro de "Solo Dinero" mediante palabras clave financieras.

## 5. Frontend y Tecnologías de Interfaz
Se priorizó una estética Dark Tech con acentos en cian eléctrico para maximizar la legibilidad.

Componentes de Visualización

**Gráficos Dinámicos (Chart.js):** Renderizado de líneas de tendencia con puntos diarios, líneas verticales de cuadrícula y tooltips informativos.

**Interactive Cards:** Tarjetas en el index con efecto de desvanecido y revelación de contenido al hacer hover, optimizadas para funcionar como botones integrales.

**Sistema de Noticias:** Implementación de paginación en el lado del cliente y modales interactivos que permiten previsualizar información sin abandonar la app.

## 6. Proceso de Implementación Paso a Paso

### Paso A: Dashboard y Tabla Realtime
Sincronización de la tabla de CoinMarketCap con los gráficos de Binance mediante el uso de símbolos de activos (BTC, ETH) como identificadores únicos.

### Paso B: Inteligencia de Noticias
Creación de un filtro de categorías que descarta noticias generales para enfocarse en: fusiones, reportes de ganancias, movimientos de la FED y mercados de valores.

### Paso C: Estética y UX
Sustitución de colores opacos por una paleta de alto contraste (Cian Eléctrico #00f2ff) y limpieza de código eliminando dependencias innecesarias de JavaScript como carruseles complejos en favor de banners estáticos de alto impacto.

## 7. Ejecución y Evidencia
Para iniciar la plataforma de monitoreo:

        python app.py

Resultado esperado: Servidor activo en http://127.0.0.1:5000.

### Vista Principal (Index)
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Index_1.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Index_2.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Index_3.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Index_4.png?raw=true" width="400" alt="Vista Index TechCrypto">

### Vista de Mercado de Criptomonedas (Realtime)
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Mercado_1.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Mercado_2.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/Mercado_3.png?raw=true" width="400" alt="Vista Index TechCrypto">

### Vista de Noticias de Finanzas (News) 
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/News_1.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/News_2.png?raw=true" width="400" alt="Vista Index TechCrypto">
<img src="https://github.com/RamirezLuisManuel/TechCrypto/blob/main/static/images/News_3.png?raw=true" width="400" alt="Vista Index TechCrypto">
