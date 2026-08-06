
var start=document.getElementById("exec")
function install(){
//   window.electronAPI.write(path.value,"test file")
    console.log(path.value)
    const installer=releases[release]
    window.electronAPI.exec(['./SH/install2.x.sh', [
        installer.assets[0].browser_download_url, 
        './'+installer.assets[0].name,
        path.value,
        versionNumber(release)
    ]])
    // start.style.display="none"
}
start.addEventListener("click",(e)=>{
    install()
})