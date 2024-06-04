<details>
<summary>Menú</summary>

[Requisitos](#requisitos)  
[Cambiar Hostname](#cambiar-hostname)  
[Pruebas](#pruebas)  
[Script para Cambiar Localhost por la IP (CORS)](#script-para-cambiar-localhost-por-la-ip-cors)  
[Cambiar Nombre de Host y Reclamar Netdata](#cambiar-nombre-de-host-y-reclamar-netdata)  
[Descargar Archivos desde Servidor HFS](#descargar-archivos-desde-servidor-hfs)

</details>

[![Texto alternativo](./img/netdata.png)](https://app.netdata.cloud/spaces/ismaprueb01-space/rooms/all-nodes/home?utm_source=website&utm_content=top_navigation_sign_in#metrics_correlation=false&after=-900&before=0&utc=Europe%2FMadrid&offset=%2B2&timezoneName=Brussels%2C%20Copenhagen%2C%20Madrid%2C%20Paris&modal=&modalTab=&modalParams=&selectedIntegrationCategory=deploy.operating-systems&force_play=false)



# NETDATA DOCS
## Requisitos
```bash
wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/ kickstart.sh && sh /tmp/netdata-kickstart.sh # Instalar NETDATA
apt install apache2 #Servidor para el DASHBOARD
apt install npm #Para instalar paquetes
npm install chartjs-adapter-date-fns  # Para las gráficas
yarn add chartjs-adapter-date-fns  # igual q el de arriba
wget -O /etc/netdata/netdata.conf http://localhost:19999/netdata.conf  # FICHERO DE CONFIGURACION
```
## Prometheus
```bash
cd /etc/netdata 2>/dev/null || cd /opt/netdata/etc/netdata
sudo ./edit-config exporting.conf
```

## Cambiar Hostname
sudo nano /etc/hosts

sudo nano /etc/hostname
## PRUEBAS
### Disco + 1G
```bash
fallocate -l 1G fichero12.txt
```
### Stress CPU
```bash
stress --cpu 100 -t 10
```
## SCRIPT PARA CAMBIAR LOCALHOST POR LA IP (CORS)
```bash
#!/bin/bash

# Función para modificar una palabra en un archivo
modificar_palabra_en_archivo() {
    # Solicitar al usuario el nombre del archivo
    read -p "Por favor, ingresa el nombre del archivo que deseas modificar: " nombre_archivo

    # Verificar si el archivo existe
    if [ -f "$nombre_archivo" ]; then
        # Solicitar al usuario la palabra que desea modificar
        read -p "Ingresa la palabra que deseas modificar en el archivo: " palabra_original

        # Solicitar al usuario la palabra por la que desea reemplazar
        read -p "Ingresa la nueva palabra por la que deseas reemplazarla: " palabra_nueva

        # Realizar el reemplazo en el archivo
        sed -i "s/$palabra_original/$palabra_nueva/g" "$nombre_archivo"

        echo "La palabra '$palabra_original' ha sido modificada por '$palabra_nueva' en el archivo '$nombre_archivo'."
    else
        echo "El archivo '$nombre_archivo' no existe."
    fi
}

# Llamar a la función principal
modificar_palabra_en_archivo
```
## Cambiar Nombre de Host y Reclamar Netdata
Este script cambia namehost ademas de cambiar de rooms o instalar netdata

```bash
#!/bin/bash

# Parar el servicio de Netdata si está en ejecución
sudo systemctl stop netdata 2>/dev/null

# Eliminar el archivo que contiene el ID del agente de Netdata si existe
sudo rm /var/lib/netdata/registry/netdata.public.unique.id 2>/dev/null

# Solicitar al usuario si desea cambiar el nombre de host
read -p "¿Desea cambiar el nombre de host? (s/n): " change_hostname
if [ "$change_hostname" == "s" ]; then
    # Solicitar al usuario un nuevo nombre de host
    read -p "Ingrese el nuevo nombre de host: " new_hostname

    # Cambiar el nombre de host en /etc/hostname
    echo "$new_hostname" | sudo tee /etc/hostname >/dev/null

    # Cambiar el nombre de host en /etc/hosts
    sudo sed -i "s/^\(127.0.1.1\s\+\).*$/\1$new_hostname/" /etc/hosts

    echo "El nombre de host se ha cambiado a '$new_hostname'."
else
    echo "No se realizarán cambios en el nombre de host."
fi

# Solicitar al usuario que ingrese el comando completo para instalar y reclamar Netdata
echo "Ingrese el comando completo para instalar y reclamar Netdata (asegúrate de incluir el token):"
read -p "> " install_command

# Ejecutar el comando proporcionado por el usuario
eval "$install_command"

# Iniciar el servicio de Netdata si no estaba en ejecución
sudo systemctl start netdata 2>/dev/null
```
## Descargar Archivos desde Servidor HFS
Descarga los archivos de la ip que le pongamos ademas de añadirlos directamente en la carpeta /var de apache.
__Tener apache instalado antes.__


```bash
#!/bin/bash

# Solicitar la dirección IP del servidor HFS
read -p "Ingrese la dirección IP del servidor HFS: " ip_address

# Solicitar el nombre del archivo a descargar
read -p "Ingrese el nombre del archivo a descargar (incluyendo la extensión .zip): " file_name

# Descargar el archivo desde el servidor HFS
wget "http://$ip_address/$file_name"

# Verificar si la descarga fue exitosa
if [ $? -eq 0 ]; then
    echo "El archivo $file_name se ha descargado correctamente."
else
    echo "Error: No se pudo descargar el archivo $file_name desde el servidor HFS."
    exit 1
fi

# Descomprimir el archivo .zip
unzip -q "$file_name"

# Verificar si la descompresión fue exitosa
if [ $? -eq 0 ]; then
    echo "El archivo $file_name se ha descomprimido correctamente."
else
    echo "Error: No se pudo descomprimir el archivo $file_name."
    exit 1
fi

# Copiar los archivos descomprimidos a /var/www/html
sudo cp -r netdata5.0/* /var/www/html/

# Verificar si la copia fue exitosa
if [ $? -eq 0 ]; then
    echo "Los archivos se han copiado correctamente a /var/www/html."
else
    echo "Error: No se pudieron copiar los archivos a /var/www/html."
    exit 1
fi

echo "El proceso ha finalizado correctamente."
```
## ALL SCRIPT
```bash
#!/bin/bash

# Función para modificar una palabra en un archivo
modificar_palabra_en_archivo() {
    # Solicitar al usuario el nombre del archivo
    read -p "Por favor, ingresa el nombre del archivo que deseas modificar: " nombre_archivo

    # Verificar si el archivo existe
    if [ -f "$nombre_archivo" ]; then
        # Solicitar al usuario la palabra que desea modificar
        read -p "Ingresa la palabra que deseas modificar en el archivo: " palabra_original

        # Solicitar al usuario la palabra por la que desea reemplazar
        read -p "Ingresa la nueva palabra por la que deseas reemplazarla: " palabra_nueva

        # Realizar el reemplazo en el archivo
        sed -i "s/$palabra_original/$palabra_nueva/g" "$nombre_archivo"

        echo "La palabra '$palabra_original' ha sido modificada por '$palabra_nueva' en el archivo '$nombre_archivo'."
    else
        echo "El archivo '$nombre_archivo' no existe."
    fi
}

# Función para detener y reclamar Netdata
detener_y_reclamar_netdata() {
    # Parar el servicio de Netdata si está en ejecución
    sudo systemctl stop netdata 2>/dev/null

    # Eliminar el archivo que contiene el ID del agente de Netdata si existe
    sudo rm /var/lib/netdata/registry/netdata.public.unique.id 2>/dev/null

    # Solicitar al usuario si desea cambiar el nombre de host
    read -p "¿Desea cambiar el nombre de host? (s/n): " change_hostname
    if [ "$change_hostname" == "s" ]; then
        # Solicitar al usuario un nuevo nombre de host
        read -p "Ingrese el nuevo nombre de host: " new_hostname

        # Cambiar el nombre de host en /etc/hostname
        echo "$new_hostname" | sudo tee /etc/hostname >/dev/null

        # Cambiar el nombre de host en /etc/hosts
        sudo sed -i "s/^\(127.0.1.1\s\+\).*$/\1$new_hostname/" /etc/hosts

        echo "El nombre de host se ha cambiado a '$new_hostname'."
    else
        echo "No se realizarán cambios en el nombre de host."
    fi

    # Solicitar al usuario que ingrese el comando completo para instalar y reclamar Netdata
    echo "Ingrese el comando completo para instalar y reclamar Netdata (asegúrate de incluir el token):"
    read -p "> " install_command

    # Ejecutar el comando proporcionado por el usuario
    eval "$install_command"

    # Iniciar el servicio de Netdata si no estaba en ejecución
    sudo systemctl start netdata 2>/dev/null
}

# Instalar Apache2
instalar_apache2() {
    sudo apt install apache2
}

# Instalar npm
instalar_npm() {
    sudo apt install npm
}

# Instalar paquete npm
instalar_paquete_npm() {
    npm install chartjs-adapter-date-fns
}

# Descargar el archivo de configuración de Netdata
descargar_configuracion_netdata() {
    sudo wget -O /etc/netdata/netdata.conf http://localhost:19999/netdata.conf
}

# Función para descargar archivos desde el servidor HFS
download_and_copy() {
    # Solicitar la dirección IP del servidor HFS
    read -p "Ingrese la dirección IP del servidor HFS: " ip_address

    # Solicitar el nombre del archivo a descargar
    read -p "Ingrese el nombre del archivo a descargar (incluyendo la extensión .zip): " file_name

    # Descargar el archivo desde el servidor HFS
    wget "http://$ip_address/$file_name"

    # Verificar si la descarga fue exitosa
    if [ $? -eq 0 ]; then
        echo "El archivo $file_name se ha descargado correctamente."
    else
        echo "Error: No se pudo descargar el archivo $file_name desde el servidor HFS."
        exit 1
    fi

    # Descomprimir el archivo .zip
    unzip -q "$file_name"

    # Obtener el nombre de la carpeta descomprimida
    folder_name=$(basename "$file_name" .zip)

    # Eliminar contenido existente de la carpeta de Apache
    sudo rm -rf /var/www/html/*

    # Copiar los archivos descomprimidos a /var/www/html
    sudo cp -r "$folder_name"/* /var/www/html/

    # Verificar si la copia fue exitosa
    if [ $? -eq 0 ]; then
        echo "Los archivos se han copiado correctamente a /var/www/html."
    else
        echo "Error: No se pudieron copiar los archivos a /var/www/html."
        exit 1
    fi

    echo "El proceso ha finalizado correctamente."
}

# Llamar a la función principal
descargar_y_copiar_a_carpeta_apache

# Menú principal
while :
do
    clear
    echo "Seleccione una opción:"
    echo "1. Modificar palabra en un archivo"
    echo "2. Detener y reclamar Netdata"
    echo "3. Instalar Apache2"
    echo "4. Instalar npm"
    echo "5. Instalar Charts.js"
    echo "6. Descargar archivo de configuración de Netdata"
    echo "7. Descargar y Copiar archivos a la carpeta de Apache"
    echo "8. Salir"
    read -p "Opción: " opcion

    case $opcion in
        1) modificar_palabra_en_archivo ;;
        2) detener_y_reclamar_netdata ;;
        3) instalar_apache2 ;;
        4) instalar_npm ;;
        5) instalar_paquete_npm ;;
        6) descargar_configuracion_netdata ;;
        7) download_and_copy ;;
        8) exit ;;
        *) echo "Opción inválida"; read -p "Presiona Enter para continuar..." ;;
    esac
done

```

