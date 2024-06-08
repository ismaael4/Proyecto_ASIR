#!/bin/bash

Introducir_ip() {
    local nombre_archivo="/var/www/html/script.js"
    if [ -f "$nombre_archivo" ]; then
        local ip_address=$(hostname -I | awk '{print $1}')
        sed -i "s/localhost/$ip_address/g" "$nombre_archivo"
        echo "Se ha modificado 'localhost' por '$ip_address' en el archivo '$nombre_archivo'."
    else
        echo "El archivo '$nombre_archivo' no existe."
    fi
}

detener_y_reclamar_netdata() {
    systemctl stop netdata 2>/dev/null
    rm /var/lib/netdata/registry/netdata.public.unique.id 2>/dev/null
    read -p "¿Desea cambiar el nombre de host? (s/n): " change_hostname
    if [ "$change_hostname" == "s" ]; then
        read -p "Ingrese el nuevo nombre de host: " new_hostname
        echo "$new_hostname" | tee /etc/hostname >/dev/null
        sed -i "s/^\(127.0.1.1\s\+\).*$/\1$new_hostname/" /etc/hosts
        echo "El nombre de host se ha cambiado a '$new_hostname'."
    else
        echo "No se realizarán cambios en el nombre de host."
    fi
    echo "Ingrese el comando completo para instalar y reclamar Netdata (asegúrate de incluir el token):"
    read -p "> " install_command
    eval "$install_command"
    systemctl start netdata 2>/dev/null
}

instalar_apache2() {
    apt install apache2
}

descargar_configuracion_netdata() {
    wget -O /etc/netdata/netdata.conf http://localhost:19999/netdata.conf
}

download_and_copy() {
    read -p "Ingrese la dirección IP del servidor HFS: " ip_address
    read -p "Ingrese el nombre del archivo a descargar (incluyendo la extensión .zip): " file_name
    wget "http://$ip_address/$file_name"
    if [ $? -eq 0 ]; then
        echo "El archivo $file_name se ha descargado correctamente."
    else
        echo "Error: No se pudo descargar el archivo $file_name desde el servidor HFS."
        exit 1
    fi
    unzip -q "$file_name"
    folder_name=$(basename "$file_name" .zip)
    rm -rf /var/www/html/*
    cp -r "$folder_name"/* /var/www/html/
    if [ $? -eq 0 ]; then
        echo "Los archivos se han copiado correctamente a /var/www/html."
    else
        echo "Error: No se pudieron copiar los archivos a /var/www/html."
        exit 1
    fi
    echo "El proceso ha finalizado correctamente."
}

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
