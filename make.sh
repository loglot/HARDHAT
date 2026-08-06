rm -r out
npm run make
mkdir out/HARDHAT-Linux-x64
mv out/hardhat-linux-x64 out/HARDHAT-Linux-x64/
mv out/HARDHAT-Linux-x64/hardhat-linux-x64/resources/app/SH out/HARDHAT-Linux-x64/hardhat-linux-x64/
echo cd ./hardhat-linux-x64 > out/HARDHAT-Linux-x64/HARDHAT.sh
echo ./hardhat >> out/HARDHAT-Linux-x64/HARDHAT.sh
chmod +x out/HARDHAT-Linux-x64/HARDHAT.sh
zip -r out/HARDHAT-Linux-x64.zip out/HARDHAT-Linux-x64