#!/bin/bash


command_not_found_handle() {
    return 127
}
home=~/.hardhat/
echo
echo $home
echo "-start"
echo
check=1
missdeps=()
unzip -h
if [ $? -eq 127 ]; then
    missdeps+=("unzip")
    check=0
fi
if [ $check = 1 ]; then
    if [ -f $home/backup.zip ]; then
        echo  "-title-|-Restoring Backup"
        echo $1
        cd "$1"

        if [ -f ./FEZ ]; then
            rm -r *
            unzip $home/backup.zip
            sleep .5
            echo "-title-|-Uninstalled HAT"
            echo "-finish"
            echo "-hat-|-nil"
        else
            echo "-title-|-FEZ not found, stopping for safety"
            echo "-error"
        fi
    else
        echo "-title-|-Backup not found, delete FEZ files and reinstall via installation method"
        echo "-error"
    fi
else
    echo "!! DEPENDANCIES NOT FOUND !! Please install ${missdeps[@]} "
    echo  "-title-|-Missing Dependancies: ${missdeps[@]}"
    echo  "-error"
fi