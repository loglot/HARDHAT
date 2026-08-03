
if [ -f $2-$4 ]; then
    echo Already cached $2$4, skipping download
else
    wget $1
    chmod +x $2
    mv $2 $2-$4
fi
if [ "$3" = "Auto Detect" ]; then
    yes | $2-$4
else
    yes | $2-$4 --path $3
fi
