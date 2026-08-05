
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
    fi
else
    echo "-title-|-HAT Not installed at $3"
    echo  "-error"

fi
# if [ $? -eq 1 ]; then

#     echo  "-clear"
#     echo  "-start"
#     echo  "-title-|-Downloading Installer"
#     if [ -f $home/$2-$4 ]; then
#         echo Already cached $home/$2-$4, skipping download
#     else
#         wget -P $home/ $1
#         chmod +x $home/$2
#         mv $home/$2 $home/$2-$4
#     fi
#         echo
#         echo
#     sleep .5
#     echo  "-title-|-Installing HAT"
#     if [ "$3" = "Auto Detect" ]; then
#         yes | $home/$2-$4
#     else
#         yes | $home/$2-$4 --path "$3"
#     fi
#     if [ $? -eq 126 ]; then
#         echo "-title-|-Wrong Install Script Used??"
#         echo  "-error"
#     else
#         echo  "-title-|-Complete!"
#         echo  "-finish"
#     fi
# else
#     echo !! MONO NOT FOUND !! Please install a version of mono
#     echo  "-title-|-Missing Dependancy: mono"
#     echo  "-error"
# fi