echo  "-clear"
echo "-title-|-saving $1"
PTH=~/.hardhat/modpacks/"$1"/
MODS="$2"/Mods
rm -R $PTH
mkdir -p $PTH
cp -R $MODS/* $PTH
echo "-title-|-saved modpack: $1"
echo  "-finish"