echo  "-clear"
echo "-title-|-deleting $1"
PTH=~/.hardhat/modpacks/"$1"/
rm -R $PTH
echo "-title-|-deleted modpack: $1"
echo  "-finish"