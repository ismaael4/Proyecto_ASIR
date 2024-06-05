// Crear el gráfico de donut para la CPU
var cpuChart = new Chart(document.getElementById('cpuChart').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: ['Carga de CPU (%)', ''],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#007bff', '#f0f0f0'] // Cambiar los colores aquí
        }]
    },
    options: {
        aspectRatio: 1,
        cutoutPercentage: 50,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Carga de CPU: ' + context.parsed + '%';
                    }
                }
            }
        }
    }
});

// Función para actualizar el gráfico de donut de la CPU
function updateCPULoadChart(cpuLoad) {
    // Formatear la carga de la CPU para mostrar solo dos decimales
    const formattedCpuLoad = cpuLoad.toFixed(0);

    // Actualizar el texto de la carga de la CPU
    const cpuLoadText = formattedCpuLoad + '%';
    document.querySelector('.cpu-load').textContent = cpuLoadText;

    // Actualizar los datos del gráfico de donut de la CPU
    cpuChart.data.datasets[0].data[0] = formattedCpuLoad;
    cpuChart.data.datasets[0].data[1] = 100 - formattedCpuLoad;

    // Verificar si la carga de la CPU supera el umbral (por ejemplo, 50%)
    if (cpuLoad > 50) {
        // Agregar una animación al gráfico
        cpuChart.options.animation = {
            duration: 1000, // Duración de la animación en milisegundos
            easing: 'easeInOutQuad' // Tipo de curva de la animación (opcional)
        };
    } else {
        // Si la carga de la CPU está por debajo del umbral, eliminar la animación
        cpuChart.options.animation = false;
    }

    // Actualizar el gráfico
    cpuChart.update();
}

// Función para obtener y mostrar la carga de la CPU en el gráfico de donut
function getCPULoadChartData() {
    // Construir una URL con un parámetro de consulta único para evitar la caché del navegador
    const timestamp = Date.now();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=system.cpu&after=-1&points=1&timestamp=${timestamp}`;

    // Realizar la solicitud GET a la API de Netdata
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener la carga de la CPU
        const cpuLoad = parseFloat(data.data[0][6]);

        // Actualizar el gráfico de donut
        updateCPULoadChart(cpuLoad);
    })
    .catch(error => {
        console.error('Error al obtener la carga de la CPU del sistema:', error);
    });
}

// Llamar a la función para obtener la carga de la CPU inicialmente
getCPULoadChartData();

// Actualizar la carga de la CPU cada segundo
setInterval(getCPULoadChartData, 1000);

// Crear el gráfico de donut para la RAM
var ramChart = new Chart(document.getElementById('ramChart').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: ['Uso de RAM (MB)', 'Libre de RAM (MB)'],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#ff6f61', '#f0f0f0'] // Cambiar los colores aquí
        }]
    },
    options: {
        aspectRatio: 1,
        cutoutPercentage: 50,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Uso de RAM: ' + context.parsed + 'MB';
                    }
                }
            }
        }
    }
});

// Función para actualizar el gráfico de donut de la RAM
function updateRAMChart(usedRAM, freeRAM) {
    // Formatear la carga de RAM para mostrar solo un decimal
    const formattedUsedRAM = usedRAM.toFixed(1);
    const formattedFreeRAM = freeRAM.toFixed(1);

    // Actualizar el texto de la carga de RAM
    const ramLoadText = formattedUsedRAM + ' MB';
    document.querySelector('.ram-load').textContent = ramLoadText;

    // Actualizar los datos del gráfico de donut de la RAM
    ramChart.data.datasets[0].data[0] = formattedUsedRAM;
    ramChart.data.datasets[0].data[1] = formattedFreeRAM;

    // Actualizar el gráfico
    ramChart.update();
}

// Función para obtener y mostrar la carga de RAM en el gráfico de donut
function getRAMChartData() {
    // Construir la URL de la API de Netdata para obtener datos de RAM
    const timestamp = Date.now();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=system.ram&after=-1&points=1&timestamp=${timestamp}`;

    // Realizar una solicitud GET a la API de Netdata
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener los valores de RAM utilizada y libre
        const usedRAM = parseFloat(data.data[0][2]);
        const freeRAM = parseFloat(data.data[0][1]);

        // Actualizar el gráfico de donut de la RAM
        updateRAMChart(usedRAM, freeRAM);
    })
    .catch(error => {
        console.error('Error al obtener la carga de RAM del sistema:', error);
    });
}

// Llamar a la función para obtener la carga de RAM inicialmente
getRAMChartData();

// Actualizar la carga de RAM cada segundo
setInterval(getRAMChartData, 1000);

// Crear el gráfico de donut para Disco
var diskChart = new Chart(document.getElementById('diskChart').getContext('2d'), {
    type: 'doughnut',
    data: {
        labels: ['Uso de Disco (GB)', ''],
        datasets: [{
            data: [0, 100],
            backgroundColor: ['#2ec4b6', '#f0f0f0'] // Cambiar los colores aquí
        }]
    },
    options: {
        aspectRatio: 1,
        cutoutPercentage: 50,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Uso de Disco: ' + context.parsed + 'GB';
                    }
                }
            }
        }
    }
});

// Función para obtener y mostrar el uso de Disco en el gráfico de donut
function getDiskUsageData() {
    // Construir la URL de la API de Netdata para obtener datos de Disco
    const timestamp = Date.now();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=disk_space._&after=-1&points=1&timestamp=${timestamp}`;

    // Realizar una solicitud GET a la API de Netdata
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener los valores de Disco disponibles y utilizados
        const availDisk = parseFloat(data.data[0][1]);
        const usedDisk = parseFloat(data.data[0][2]);

        // Calcular el total del Disco sumando los valores disponibles y utilizados
        const totalDisk = Math.round((availDisk + usedDisk) * 10) / 10; // Redondear el resultado a 1 decimal

        // Actualizar el gráfico de donut de Disco
        updateDiskChart(usedDisk, totalDisk);
    })
    .catch(error => {
        console.error('Error al obtener el uso de Disco del sistema:', error);
    });
}

// Función para actualizar el gráfico de donut de Disco
function updateDiskChart(usedDisk, totalDisk) {
    const availDisk = totalDisk - usedDisk; // Calcular el Disco disponible restando el Disco utilizado del total

    // Actualizar los datos del gráfico de donut de Disco
    diskChart.data.datasets[0].data[0] = Math.round(usedDisk * 10) / 10; // Redondear el uso de Disco a 1 decimal
    diskChart.data.datasets[0].data[1] = Math.round(availDisk * 10) / 10; // Redondear el Disco disponible a 1 decimal

    // Actualizar el gráfico
    diskChart.update();
}

// Llamar a la función para obtener el uso de Disco inicialmente
getDiskUsageData();

// Actualizar el uso de Disco cada segundo
setInterval(getDiskUsageData, 1000);

// Crear el gráfico de líneas para la lectura de disco
var diskReadChart = new Chart(document.getElementById('diskReadChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Lectura de Disco (MB/s)',
            data: [],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second',
                    tooltipFormat: 'HH:mm:ss',
                    displayFormats: {
                        second: 'HH:mm:ss'
                    }
                },
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Lectura de Disco (MB/s)'
                }
            }
        }
    }
});

// Función para agregar datos al gráfico de líneas de la lectura de disco
function addDataToDiskReadChart(timestamp, diskReadUsageMB) {
    // Agregar el punto de datos al conjunto de datos del gráfico
    diskReadChart.data.labels.push(timestamp);
    diskReadChart.data.datasets[0].data.push(diskReadUsageMB);

    // Limitar la cantidad de puntos de datos mostrados en el gráfico para mantenerlo limpio
    const maxDataPoints = 10;
    if (diskReadChart.data.labels.length > maxDataPoints) {
        diskReadChart.data.labels.shift();
        diskReadChart.data.datasets[0].data.shift();
    }

    // Actualizar el gráfico
    diskReadChart.update();
}

/// Función para obtener y mostrar la lectura de disco en el gráfico de líneas
function getDiskReadChartData() {
    const timestamp = new Date();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=disk.sda&after=-1&points=1&timestamp=${timestamp}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener los valores de lectura de disco
        const diskReadUsageKB = parseFloat(data.data[0][1]);
        const diskReadUsageMB = diskReadUsageKB / 1024;

        // Actualizar el gráfico de líneas de la lectura de disco
        addDataToDiskReadChart(timestamp, diskReadUsageMB);
    })
    .catch(error => {
        console.error('Error al obtener la lectura de disco del sistema:', error);
    });
}

// Llamar a la función inicialmente y luego establecer una actualización periódica
getDiskReadChartData(); // Obtener datos inicialmente
setInterval(getDiskReadChartData, 3000); // Actualizar cada 3 segundos

// Crear el gráfico de líneas para la escritura de disco
var diskWriteChart = new Chart(document.getElementById('diskWriteChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Escritura de Disco (MB/s)',
            data: [],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second',
                    tooltipFormat: 'HH:mm:ss',
                    displayFormats: {
                        second: 'HH:mm:ss'
                    }
                },
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Escritura de Disco (MB/s)'
                }
            }
        }
    }
});

// Función para agregar datos al gráfico de líneas de la escritura de disco
function addDataToDiskWriteChart(timestamp, diskWriteUsageMB) {
    // Agregar el punto de datos al conjunto de datos del gráfico
    diskWriteChart.data.labels.push(timestamp);
    diskWriteChart.data.datasets[0].data.push(diskWriteUsageMB);

    // Limitar la cantidad de puntos de datos mostrados en el gráfico para mantenerlo limpio
    const maxDataPoints = 10;
    if (diskWriteChart.data.labels.length > maxDataPoints) {
        diskWriteChart.data.labels.shift();
        diskWriteChart.data.datasets[0].data.shift();
    }

    // Actualizar el gráfico
    diskWriteChart.update();
}
// Función para eliminar el signo negativo de los valores de escritura
function eliminarSignoNegativo(valor) {
    return Math.abs(valor);
}

// Ejemplo de uso
let valorEscritura = -20.37715;
let valorEscrituraPositivo = eliminarSignoNegativo(valorEscritura);

// Función para obtener y mostrar la escritura de disco en el gráfico de líneas
function getDiskWriteChartData() {
    const timestamp = new Date();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=disk.sda&after=-1&points=1&timestamp=${timestamp}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener los valores de escritura de disco
        let diskWriteUsageKB = parseFloat(data.data[0][2]);
        
        // Eliminar el signo negativo si lo hay
        diskWriteUsageKB = eliminarSignoNegativo(diskWriteUsageKB);

        // Convertir a megabytes
        const diskWriteUsageMB = diskWriteUsageKB / 1024;

        // Actualizar el gráfico de líneas de la escritura de disco
        addDataToDiskWriteChart(timestamp, diskWriteUsageMB);
    })
    .catch(error => {
        console.error('Error al obtener la escritura de disco del sistema:', error);
    });
}


// Llamar a la función inicialmente y luego establecer una actualización periódica
getDiskWriteChartData(); // Obtener datos inicialmente
setInterval(getDiskWriteChartData, 3000); // Actualizar cada 3 segundos

// Crear el gráfico de líneas para el uso de la red
var networkChart = new Chart(document.getElementById('networkChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso de la red (KB/s)',
            data: [],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second',
                    tooltipFormat: 'HH:mm:ss',
                    displayFormats: {
                        second: 'HH:mm:ss'
                    }
                },
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Uso de la red (KB/s)'
                }
            }
        }
    }
});

// Función para agregar datos al gráfico de líneas del uso de la red
function addDataToNetworkChart(timestamp, networkUsageKB) {
    // Agregar el punto de datos al conjunto de datos del gráfico
    networkChart.data.labels.push(timestamp);
    networkChart.data.datasets[0].data.push(networkUsageKB);

    // Limitar la cantidad de puntos de datos mostrados en el gráfico para mantenerlo limpio
    const maxDataPoints = 10;
    if (networkChart.data.labels.length > maxDataPoints) {
        networkChart.data.labels.shift();
        networkChart.data.datasets[0].data.shift();
    }

    // Actualizar el gráfico
    networkChart.update();
}

// Función para obtener y mostrar el uso de la red en el gráfico de líneas
function getNetworkChartData() {
    // Construir la URL de la API de Netdata para obtener datos de uso de la red
    const timestamp = Date.now();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=system.net&after=-1&points=1&timestamp=${timestamp}`;

    // Realizar una solicitud GET a la API de Netdata
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener el valor del uso de la red
        const networkUsageKB = parseFloat(data.data[0][1]) / 1024; // Convertir de B/s a KB/s

        // Llamar a la función para agregar datos al gráfico de líneas del uso de la red
        addDataToNetworkChart(timestamp, networkUsageKB);
    })
    .catch(error => {
        console.error('Error al obtener el uso de la red del sistema:', error);
    });
}

// Llamar a la función inicialmente y luego establecer una actualización periódica
getNetworkChartData(); // Obtener datos inicialmente
setInterval(getNetworkChartData, 3000); // Actualizar cada 3 segundos


// Función para obtener las alertas del Alertmanager
function getAlerts() {
    const apiUrl = 'http://192.168.2.50:9093/api/v2/alerts';

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Llamar a la función para mostrar las alertas
        displayAlerts(data);
    })
    .catch(error => {
        console.error('Error al obtener las alertas de Alertmanager:', error);
    });
}

// Función para mostrar las alertas en el dashboard
function displayAlerts(alerts) {
    // Verificar si hay alertas y mostrarlas en algún contenedor HTML
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas alertas

    if (alerts && alerts.length > 0) {
        alerts.forEach(alert => {
            // Construir la estructura HTML para mostrar la alerta
            const alertHTML = `
                <div class="alert ${alert.labels.severity.toLowerCase()}">
                    <h3>Nombre de la alerta: ${alert.labels.alertname}</h3>
                    <p>Instancia: ${alert.labels.instance}</p>
                    <p>Severidad: ${alert.labels.severity}</p>
                </div>
            `;
            // Agregar la alerta al contenedor
            alertsContainer.insertAdjacentHTML('beforeend', alertHTML);
        });
    } else {
        // Si no hay alertas, mostrar un mensaje indicando que no hay alertas activas
        alertsContainer.innerHTML = '<p>No hay alertas activas en este momento.</p>';
    }
}

// Llamar a la función para obtener las alertas inicialmente y luego establecer una actualización periódica
getAlerts(); // Obtener datos inicialmente
setInterval(getAlerts, 5000); // Actualizar cada 5 segundos

// Función para obtener los targets y mostrar su estado
function getTargets() {
    const apiUrl = 'http://192.168.2.50:9090/api/v1/targets';

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Llamar a la función para mostrar los targets y su estado
        displayTargets(data.data.activeTargets);
    })
    .catch(error => {
        console.error('Error al obtener los targets:', error);
    });
}

// Función para mostrar la lista de targets y su estado
function displayTargets(targets) {
    const targetsListContainer = document.getElementById('targetsList');

    // Limpiar el contenedor antes de agregar los nuevos elementos
    targetsListContainer.innerHTML = '';

    // Recorrer cada target y mostrarlo en la lista
    targets.forEach(target => {
        const targetItem = document.createElement('li');
        const targetIp = target.labels.instance.split(":")[0]; // Obtener solo la dirección IP
        targetItem.textContent = `Target: ${target.labels.instance}, Estado: ${target.health}`;
        targetItem.dataset.url = `http://${targetIp}:80`; // Formar la URL completa con la dirección IP y el puerto 80

        // Añadir clases de estilo según el estado del target
        targetItem.classList.add(target.health === 'up' ? 'up' : 'down');

        // Agregar evento de clic para abrir la URL en la misma página
        targetItem.addEventListener('click', () => {
            window.location.href = targetItem.dataset.url;
        });

        targetsListContainer.appendChild(targetItem);
    });
}

// Llamar a la función para obtener los targets inicialmente y luego establecer una actualización periódica
getTargets(); // Obtener datos inicialmente
setInterval(getTargets, 5000); // Actualizar cada 5 segundos


// Llamar a la función para obtener los targets inicialmente y luego establecer una actualización periódica
getTargets(); // Obtener datos inicialmente
setInterval(getTargets, 5000); // Actualizar cada 5 segundos

// Obtener elementos del DOM
const toggleMenuBtn = document.getElementById('toggleMenu');
const menu = document.getElementById('menu');

// Mostrar el menú al pasar el ratón sobre el botón o el menú
toggleMenuBtn.addEventListener('mouseenter', () => {
    menu.classList.add('show');
});

// Mantener el menú visible al pasar el ratón sobre él
menu.addEventListener('mouseenter', () => {
    menu.classList.add('show');
});

// Ocultar el menú al sacar el ratón del botón o el menú
toggleMenuBtn.addEventListener('mouseleave', () => {
    menu.classList.remove('show');
});

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('show');
});






