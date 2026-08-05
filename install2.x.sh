
command_not_found_handle() {
    return 127
}
home=~/.hardhat/
echo
echo $home
echo
echo


mono
if [ $? -eq 1 ]; then

    echo  "-clear"
    echo  "-start"
    echo  "-title-|-Downloading Installer"
    if [ -f $home/$2-$4 ]; then
        echo Already cached $home/$2-$4, skipping download
    else
        wget -P $home/ $1
        chmod +x $home/$2
        mv $home/$2 $home/$2-$4
    fi
        echo
        echo
    sleep .5
    echo  "-title-|-Installing HAT"
    if [ "$3" = "Auto Detect" ]; then
        yes | $home/$2-$4
    else
        yes | $home/$2-$4 --path "$3"
    fi
    if [ $? -eq 126 ]; then
        echo "-title-|-Wrong Install Script Used??"
        echo  "-error"
    else
        echo  "-title-|-Complete!"
        echo  "-finish"
    fi
else
    echo !! MONO NOT FOUND !! Please install a version of mono
    echo  "-title-|-Missing Dependancy: mono"
    echo  "-error"
fi