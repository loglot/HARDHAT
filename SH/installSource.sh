
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
dotnet --listsdks
if [ $? -eq 155 ]; then
    missdeps+=("dotnet-sdk")
    check=0
fi
git
if [ $? -eq 127 ]; then
    missdeps+=("git")
    check=0
fi

if [ $check = 1 ]; then

    echo  "-clear"
    echo  "-start"
    echo  "-title-|-Cloning Git Repository"
    cd $home
    mkdir git
    cd git
    git clone https://github.com/FEZModding/HAT.git
    cd HAT
    echo  "-title-|-Building HAT"
    dotnet build
    sleep .5
    echo  "-title-|-Installing HAT"
    cd Installer/bin/Debug/net8.0/linux-x64/
    ls
    if [ -f "$3/FEZ" ]; then
            yes | ./HATinstaller --path "$3"
        # fi
        if [ $? -eq 126 ]; then
            echo "-title-|-Breaking Change?? raise an issue with logs"
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