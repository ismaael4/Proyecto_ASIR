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
// Función para actualizar el gráfico de donut de la CPU con animación si la carga supera el umbral
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







// Crear el gráfico de líneas para el uso de la red
var networkChart = new Chart(document.getElementById('networkChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso de Red (MB/s)',
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
                    text: 'Uso de Red (MB/s)'
                }
            }
        }
    }
});

// Función para agregar datos al gráfico de líneas de la red
function addDataToNetworkChart(timestamp, networkUsageKB) {
    // Convertir el uso de Red de kilobytes por segundo a megabytes por segundo
    const networkUsageMB = networkUsageKB / 1024;
    
    // Limitar el uso de Red a un decimal
    const formattedNetworkUsage = networkUsageMB.toFixed(1);

    // Agregar el punto de datos al conjunto de datos del gráfico
    networkChart.data.labels.push(timestamp);
    networkChart.data.datasets[0].data.push(formattedNetworkUsage);

    // Limitar la cantidad de puntos de datos mostrados en el gráfico para mantenerlo limpio
    const maxDataPoints = 10;
    if (networkChart.data.labels.length > maxDataPoints) {
        networkChart.data.labels.shift();
        networkChart.data.datasets[0].data.shift();
    }

    // Actualizar el gráfico
    networkChart.update();
}


// Llamar a la función para obtener el uso de Red y actualizar el gráfico de líneas
function getAndShowNetworkUsageData() {
    const timestamp = new Date();
    const apiUrl = `http://localhost:19999/api/v1/data?chart=system.net&after=-1&points=1&timestamp=${timestamp.getTime()}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const networkUsageKB = parseFloat(data.data[0][1]);
        addDataToNetworkChart(timestamp, networkUsageKB);
    })
    .catch(error => {
        console.error('Error al obtener el uso de Red del sistema:', error);
    });
}
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

// Función para obtener y mostrar la lectura de disco en el gráfico de líneas
function getDiskReadChartData() {
    // Aquí iría la lógica para obtener los datos de lectura de disco (puedes utilizar fetch() u otras técnicas)

    // Ejemplo de datos de lectura de disco (reemplaza esto con la lógica real)
    const timestamp = new Date();
    const diskReadUsageMB = Math.random() * 10; // Simulación de datos aleatorios entre 0 y 10 MB/s

    // Llamar a la función para agregar datos al gráfico de líneas de la lectura de disco
    addDataToDiskReadChart(timestamp, diskReadUsageMB);
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

// Función para obtener y mostrar la escritura de disco en el gráfico de líneas
function getDiskWriteChartData() {
    // Aquí iría la lógica para obtener los datos de escritura de disco (similar a la función `getDiskReadChartData()`)

    // Ejemplo de datos de escritura de disco (reemplaza esto con la lógica real)
    const timestamp = new Date();
    const diskWriteUsageMB = Math.random() * 10; // Simulación de datos aleatorios entre 0 y 10 MB/s

    // Llamar a la función para agregar datos al gráfico de líneas de la escritura de disco
    addDataToDiskWriteChart(timestamp, diskWriteUsageMB);
}

// Llamar a la función inicialmente y luego establecer una actualización periódica
getDiskWriteChartData(); // Obtener datos inicialmente
setInterval(getDiskWriteChartData, 3000); // Actualizar cada 3 segundos



// Llamar a la función inicialmente y luego establecer una actualización periódica
getAndShowNetworkUsageData();
setInterval(getAndShowNetworkUsageData, 3000); // Actualizar cada 3 segundos


