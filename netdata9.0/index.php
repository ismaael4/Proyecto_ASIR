<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Monitoring</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <!-- Información de la instancia -->
    <div id="instanceInfo" class="instance-info">
        Instancia: <span id="instanceIP">IP de la máquina</span>
    </div>
    <!-- Fila para los donuts -->
    <div class="donuts-row">
        <div class="chart-container">
            <canvas id="cpuChart"></canvas>
            <div class="label cpu-label">CPU</div>
            <div class="label cpu-load"></div>
        </div>
        <div class="chart-container">
            <canvas id="ramChart"></canvas>
            <div class="label ram-label">RAM</div>
            <div class="label ram-load"></div>
        </div>
        
        <div class="chart-container">
            <canvas id="diskChart"></canvas>
            <div class="label disk-label">Disco</div>
            <div class="label disk-usage"></div>
        </div>
    </div>
    <!-- Datos de red centrados -->
    <div class="chart-container-network">
        <canvas id="networkChart"></canvas>
        <div class="label network-label"></div>
        <div class="label network-usage"></div>
    </div>
    <!-- Gráficas de escritura y lectura del disco -->
    <div class="disk-row">
        <div class="chart-container">
            <canvas id="diskWriteChart"></canvas>
            <div class="label disk-write-label">Escritura de Disco</div>
            <div class="label disk-write-usage"></div>
        </div>
        <div class="chart-container">
            <canvas id="diskReadChart"></canvas>
            <div class="label disk-read-label">Lectura de Disco</div>
            <div class="label disk-read-usage"></div>
        </div>
    </div>

    <!-- Botón para mostrar/ocultar Targets -->
    <div class="target-button">
        <button id="toggleMenu" class="toggle-menu">Mostrar Targets</button>
    </div>

    <!-- Contenedor de Targets -->
    <div id="menu" class="menu">
        <h2>Targets</h2>
        <ul id="targetsList" class="targets-list"></ul>
    </div>

    <!-- Botón para alternar entre temas -->
    <button id="themeToggle" class="theme-toggle">Alternar Tema</button>
</div>

<!-- Contenedor de Alertas -->
<div id="alertsContainer" class="alerts-container">
    <!-- Pantalla de alertas -->
    <!-- Las alertas se agregarán aquí dinámicamente -->
</div>



<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
<script src="script.js"></script>
<script src="theme.js"></script> <!-- Agregamos el script para el cambio de tema -->
</body>
</html>
