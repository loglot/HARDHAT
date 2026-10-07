#!/bin/bash

echo  "-clear"
echo "-title-|-loading $1"
PTH=~/.hardhat/modpacks/"$1"/
MODS="$2"/Mods/
rm -Rv $MODS
mkdir -pv $MODS
cp -Rv $PTH/* $MODS 
echo "-title-|-loaded modpack: $1"
echo  "-finish"