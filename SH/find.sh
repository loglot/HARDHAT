#!/bin/bash

steam=~/.local/share/Steam/steamapps/common/FEZ
gog="~/GOG Games/FEZ"
home=~/.hardhat
hat=$(cat $home/path)
version=$(cat $home/version)
echo
path="null"
if [ -d "$hat" ]; then
    echo "-path-|-$hat"
    echo "path found at HAT Install Directory: $hat"
    path=$hat
elif [ -d "$steam" ]; then
    echo "-path-|-$steam"
    echo "path found at $steam"
    path=$steam
elif [ -d "$gog" ]; then
    echo "-path-|-$gog"
    echo "path found at $gog"
    path=$gog
else
    echo no path found
fi
if [ $path = "null" ]; then
    echo "-path-|-FEZ Not Detected"
else
    if [[ -f $path/HAT.dll || -f $path/HAT ]]; then
        echo "-hat-|-$version"
        cat $path/Mods/ignorelist.txt | sed 's/^/-DISABLE-|-/'
        echo
        echo
        ls -I "*list.txt" $path/Mods -1 | sed 's/^/-MOD-|-/'
        rm -R $home/modpacks/!EMPTY!
        mkdir $home/modpacks/!EMPTY!

        # ls $home/modpacks | sed 's/^/-MODPACK-|-/'
        for i in $home/modpacks/* ; do
            if test -d "$i" ; then
                NAME=$(basename $i)
                COUNT=$(ls -1 -I "*list.txt" $i | wc -l)
                echo "-MODPACK-|-$NAME-|-$COUNT"
                # echo "Doing somthing to $i"
            fi
        done

    fi
fi