
home="$1/Mods"
if [ -d $home ]; then
        cd $home
    if [ $3 = "remove" ]; then
        echo "-start"
        echo "-title-|-removing $2"
        rm "./$2"
        rm -r "./$2"
        echo "-title-|-removed $2"
        echo  "-finish"
    elif [ $3 = "unzip" ]; then
        echo "-start"
        echo "-title-|-unzipping $2"
        yes | unzip ./$2
        zipinfo -1 $2 | grep -v '/.' | sort -u | sed 's/^/-MOD-|-/'
        echo "-title-|-unzipped $2"
        echo  "-finish"
    elif [ $3 = "unpack" ]; then
        echo "-start"
        echo "-title-|-unpacking $2"
        ls ./$2 -1 | sed 's/^/-MOD-|-/'
        ls ./$2
        yes | mv ./$2/* ./
        echo "-title-|-unpacked $2"
        echo  "-finish"
    else
        echo failed
    fi
else
    echo $home
    echo "-title-|-HAT Not installed at $1"
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