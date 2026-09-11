home=~/.hardhat/
if [ -f "${home}/settings" ]; then
    echo settings exist
else
    for i in {1..100}; do echo "" >> $home/settings; done
fi
if [ $1 = "change" ]; then
    sed -i "${2}s/.*/${3}/" $home/settings
    cat $home/settings
fi
if [ $1 = "read" ]; then
    cat $home/settings | sed 's/^/-SETTING-|-/'
fi
