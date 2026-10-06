
var start=document.getElementById("exec")
var stopp=document.getElementById("execun")
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
function uninstall(){
    window.electronAPI.exec(['./SH/uninstall.sh', [
        path.value
    ]])
}
start.addEventListener("click",(e)=>{
    install()
})
stopp.addEventListener("click",(e)=>{
    uninstall()
})