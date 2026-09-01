pgrep HAT
HAT=$?
pgrep FEZ
FEZ=$?
if [ "$HAT" = 0 ]; then
    echo "-title-|-Not Running; HAT Already Running"
    echo  "-error"
    exit 1
fi
if [ "$FEZ" = 0 ]; then
    echo "-title-|-Not Running; FEZ Already Running"
    echo  "-error"
    exit 1
fi
echo "HAT $HAT"
echo "FEZ $FEZ"
echo "-title-|-Running $2"
echo  "-finish"
$1
exit 0