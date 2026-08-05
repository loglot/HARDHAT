steam=~/.local/share/Steam/steamapps/common/FEZ
gog="~/GOG Games/FEZ"
home=~/.hardhat
hat=$(cat $home/path)
echo
path="null"
if [ -d "$hat" ]; then
    echo "-path-|-$hat"
    echo "path found at HAT Install Directory: $hat"
    path=$steam
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
    if [ -f $path/HAT ]; then
        echo "-hat"
    fi
fi