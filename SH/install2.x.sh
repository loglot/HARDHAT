
command_not_found_handle() {
    return 127
}
home=~/.hardhat/
echo
echo $home
echo
echo


check=1
missdeps=()

mono
if [ $? -eq 127 ]; then
    missdeps+=("mono")
    check=0
fi
zip
if [ $? -eq 127 ]; then
    missdeps+=("zip")
    check=0
fi
unzip
if [ $? -eq 127 ]; then
    missdeps+=("unzip")
    check=0
fi

if [ $check = 1 ]; then

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
    # if [ "$3" = "Auto Detect" ]; then
    #     yes | $home/$2-$4
    # else
    if [ -f "$3/FEZ" ]; then

        if [ -f $home/backup.zip ] then
            echo  "-title-|-Restoring Backup"
            cd $3
            rm -r *
            unzip $home/backup.zip
            sleep .5

        else
            if [ -d $3/Mods ]; then
                echo  "-title-|-Unable to Back FEZ up, Already Modified?"
                sleep .5
                echo  "-title-|-Results Unstable, as we are Modifying an Already Modified Game"
                sleep .5
            else
                echo  "-title-|-Backing up FEZ"
                cd $3 
                zip -R $home/backup.zip *
            fi
        fi
        
        echo  "-title-|-Installing HAT"


            yes | $home/$2-$4 --path "$3"
        # fi
        if [ $? -eq 126 ]; then
            echo "-title-|-Wrong Install Script Used??"
            echo  "-error"
        else
            if [ -f $3/HAT ]; then
                echo  "-title-|-Complete!"
                echo  "-finish"
                echo "$3" > $home/path 
                echo $4 > $home/version
                mkdir $3/Mods
                echo "-hat-|-$4"
            else
                echo  "-title-|-HAT installation failed; Check logs"
                echo  "-error"
            fi
        fi
    
    else
        echo  "-title-|-FEZ Not Found At PATH"
        echo  "-error"
    fi
else
    echo "!! DEPENDANCIES NOT FOUND !! Please install ${missdeps[@]} "
    echo  "-title-|-Missing Dependancies: ${missdeps[@]}"
    echo  "-error"
fi