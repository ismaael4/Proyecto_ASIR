#!/bin/bash

# Función para modificar la palabra "localhost" en el archivo /var/www/html/script.js por la dirección IP de la máquina
Introducir_ip() {
    local nombre_archivo="/var/www/html/script.js"

    # Verificar si el archivo existe
    if [ -f "$nombre_archivo" ]; then
        # Obtener la dirección IP de la máquina
        local ip_address=$(hostname -I | awk '{print $1}')

        # Reemplazar "localhost" por la dirección IP en el archivo
        sed -i "s/localhost/$ip_address/g" "$nombre_archivo"

        echo "Se ha modificado 'localhost' por '$ip_address' en el archivo '$nombre_archivo'."
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

# Menú principal
while :
do
    clear
    echo "Seleccione una opción:"
    echo "1. Introducir IP"
    echo "2. Detener y reclamar Netdata"
    echo "3. Instalar Apache2"
    echo "4. Descargar archivo de configuración de Netdata"
    echo "5. Descargar y Copiar archivos a la carpeta de Apache"
    echo "6. Salir"
    read -p "Opción: " opcion

    case $opcion in
        1) Introducir_ip ;;
        2) detener_y_reclamar_netdata ;;
        3) instalar_apache2 ;;
        4) descargar_configuracion_netdata ;;
        5) download_and_copy ;;
        6) exit ;;
        *) echo "Opción inválida"; read -p "Presiona Enter para continuar..." ;;
    esac
done