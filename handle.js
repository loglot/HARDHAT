var verSel=document.getElementById("versions")
var steamos=document.getElementById("steamOS")
var start=document.getElementById("exec")
var path=document.getElementById("path")
var log=document.getElementById("log")
// var clog=document.getElementById("curl")
var releases
var release=0

async function ver(){
    const versions = await fetch("https://api.github.com/repos/FEZModding/HAT/releases")
    if(!versions.ok){
        throw new Error("Could Not Fetch Versions")
    }else{
        var list= await versions.json()
        releases=list
            console.log(
                    list
                    )
            verSel.innerHTML=''
            verSel.appendChild(
                new Option(
                    "Latest ("+versionNumber(0)+")",
                    0
                )
            )

        for(let i = 1; i<list.length;i++){
            verSel.appendChild(
                new Option(
                    versionNumber(i),
                    i
                )
            )
        }
    }
}
function versionNumber(i){
    return (releases[i].html_url
                    .split("/")
                    .pop())
}
function install(){
//   window.electronAPI.write(path.value,"test file")
    console.log(path.value)
    window.electronAPI.exec(['./install2.x.sh', [
        'https://github.com/FEZModding/HAT/releases/download/v2.0.1/HATinstaller-linux-x64', 
        './HATinstaller-linux-x64',
        "Auto Detect",
        "2.0.1"
    ]])
    start.style.display="none"
}
verSel.addEventListener("change",(e)=>{
    release=e.target.value
    console.log(release+" "+versionNumber(release))
    if(
        versionNumber(release).split(".")[0]=="v1"||
        versionNumber(release).split(".")[0]=="1"
    ){
        steamos.style.display="block"
    }else{
        steamos.style.display="none"
        // console.log(release.split(".")[0])

    }
})
start.addEventListener("click",(e)=>{
    install()
})
ver()
window.electronAPI.onLog((text) => {
    log.append(""+text)
        log.scrollTop=log.scrollHeight
})