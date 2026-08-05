
home="$3/Mods"
echo "$1 $2 $3 $4"
if [ -d $home ]; then
    echo "-start"
    echo "-title-|-Downloading $4"
    cd $home
    if [ -f "./$2" ]; then
        echo Already cached ./$2, skipping download
        echo "-title-|-$4 already installed"
        echo  "-stop"
    else
        wget -O "$2" "$1"
        echo "./$2"
        echo "-title-|-Installed $4!"
        echo  "-finish"
        echo "-MOD-|-$2"
    fi
else
    echo "-title-|-HAT Not installed at $3"
    echo  "-error"

fi