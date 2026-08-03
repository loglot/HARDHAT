home=~/.hardhat/
echo $home
if [ -f $home/$2-$4 ]; then
    echo Already cached $home/$2-$4, skipping download
else
    wget -P $home/ $1
    chmod +x $home/$2
    mv $home/$2 $home/$2-$4
fi
if [ "$3" = "Auto Detect" ]; then
    yes | $home/$2-$4
else
    yes | $home/$2-$4 --path $3
fi
