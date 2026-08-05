steam=~/.local/share/Steam/steamapps/common/FEZ
gog="~/GOG Games/FEZ"
echo
if [ -d "$steam" ]; then
    echo "-path-|-$steam"
    echo "path found at $steam"
elif [ -d "$gog" ]; then
    echo "-path-|-$gog"
    echo "path found at $gog"
else
    echo no path found
fi