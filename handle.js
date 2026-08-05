
var verSel=document.getElementById("versions")
var depricated=document.getElementById("depricated")
var unsupported=document.getElementById("unsupported")
var start=document.getElementById("exec")
var path=document.getElementById("path")
var log=document.getElementById("log")
var logstat=document.getElementById("logstat")
var logButton=document.getElementById("logs")
var FEZ=document.getElementById("FEZ")
var HAT=document.getElementById("HAT")
var navin=document.getElementById("installation")
var navmo=document.getElementById("mods")
var navla=document.getElementById("launch")
var pagein=document.getElementById("pagein")
var pagemo=document.getElementById("pagemo")
var pagemod=document.getElementById("modflex")
var pagela=document.getElementById("pagela")
var title=document.getElementById("h")
var con=document.getElementById("confirm")
var nins=document.getElementById("nins")
// var clog=document.getElementById("curl")
var mods
var releases
var release=0
var running=false
var installpath=""
async function ver(){
    const versions = await fetch("https://api.github.com/repos/FEZModding/HAT/releases")
    if(!versions.ok){
        throw new Error("Could Not Fetch Versions")
    }else{
        var list= await versions.json()
        releases=list
        // console.log(list)
        verSel.innerHTML=''
        var makeVer=(ver, i)=>{
            verSel.appendChild(
                new Option(ver,i)
            )
        }

        makeVer("Latest ("+versionNumber(0)+")",0)
        for(let i = 1; i<list.length;i++){
            makeVer(versionNumber(i),i)
        }
    }
    start.style.display="block"
}
function installmod(url,fname,mod){
    window.electronAPI.exec(['./installMod.sh', [
        url,fname,installpath,mod
    ]])

}
async function mod(){
    const versions = await fetch("https://gamebanana.com/apiv12/Game/9985/Subfeed")
    if(!versions.ok){
        throw new Error("Could Not Fetch Mods")
    }else{
        var obj= await versions.json()
        var list=obj._aRecords
        mods=list
        // console.log(list)
        // console.log(list._aRecords)
        for(let i = 0; i<list.length;i++){
            if(list[i]._aRootCategory._sName=="HAT Mods"){
                var img=list[i]._aPreviewMedia._aImages[0]
                const mod = await fetch("https://gamebanana.com/apiv12/Mod/"+list[i]._idRow+"/ProfilePage")
                var modobj= await mod.json()
                var file = modobj._aFiles[0]
                console.log(modobj)
                pagemod.insertAdjacentHTML('beforeend',`
                    <div class="mod" id="${file._sFile}">
                        <img class="modimg" src="${img._sBaseUrl+"/"+img._sFile}">
                        <h2>${list[i]._sName}</h2>
                        <p>${modobj._sDescription}</p>
                        <button onclick='installmod(
                            "${file._sDownloadUrl}",
                            "${file._sFile}",
                            "${list[i]._sName}"
                        )'>Install</button>
                    </div>
                `)
            }
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
    const installer=releases[release]
    window.electronAPI.exec(['./install2.x.sh', [
        installer.assets[0].browser_download_url, 
        './'+installer.assets[0].name,
        path.value,
        versionNumber(release)
    ]])
    // start.style.display="none"
}
function compareVer(ver1, ver2){

    const split = [ver1.split("."),ver2.split("."),[]]
    for(let i in split){
        for (let x in split[i]){
            split[i][x]=parseInt(split[i][x].replace("v",""))
        }
    }
    for (let i in split[0]){
        console.log(split[0],split[1])
        if(split[0][i]>split[1][i]){
            return true
        }else if(split[0][i]==split[1][i]){

        }else{
            return false
        }
    }
    return true
}
verSel.addEventListener("change",(e)=>{
    release=e.target.value
    console.log(release+" "+versionNumber(release))
    var ver=versionNumber(release)


    const dep = !compareVer(ver, "2.0.0")
    const uns = !compareVer(ver, "2.0.0")
    console.log(dep, uns)
    depricated.style.display= dep ? "block" : "none"
    unsupported.style.display= uns ? "block" : "none"
    start.style.display= !uns ? "block" : "none"
})
start.addEventListener("click",(e)=>{
    install()
})
var logsShown=false
logButton.addEventListener("click",(e)=>{
    log.style.display   = logsShown ? "none" : "block"
    logButton.innerHTML = logsShown ? "show logs" : "hide logs"
    logsShown=!logsShown
    log.scrollTop=log.scrollHeight
})
ver()
window.electronAPI.onLog((text) => {
    var split=text.split("\n")
        console.log(split)
    for(let i in split){
        var parsed=split[i].split("-|-")
        console.log(split[i])
console.log(logstat.innerHTML)
        switch(parsed[0]){
            case("-title"):
                logstat.innerHTML= parsed[1]
                break
            case("-start"):
                running=true
                // start.style.display="none"
                logstat.style.color="#c8bfd8"
                break
            case("-clear"):
                log.innerHTML=""
                break
            case("-error"):
                logstat.style.color="#e1aaaa"
                start.style.display="block"
                running=false
                break
            case("-finish"):
                logstat.style.color="#aae1aa"
                start.style.display="block"
                running=false
                break
            case("-stop"):
                // logstat.style.color="#aae1aa"
                start.style.display="block"
                running=false
                break
            case("-path"):
                // logstat.style.color="#aae1aa"
                // start.style.display="block"
                // running=false
                path.value=parsed[1]
                break
            case("-hat"):
                con.style.display="block"
                start.innerHTML="reinstall"
                installpath=path.value
                nins.style.display="none"
                pagemod.style.display="flex"
                break
            default:
                if(i!=0){
                    log.append("\n")
                }
                log.append(split[i])
                log.scrollTop=log.scrollHeight
        }
    }
})
var intervalID = window.setInterval(feedback, 1000);
function feedback(){
    if(running) logstat.append(".")
}

window.electronAPI.exec(['./find.sh',[]])


FEZ.addEventListener("click",(e)=>{
    window.electronAPI.exec([path.value+'/FEZ',[]])
})

HAT.addEventListener("click",(e)=>{
    window.electronAPI.exec([path.value+'/HAT',[]])
})


function select(sel, sel2=title){
    var nav=[navin, navmo, navla]
    for (let i in nav){
        nav[i].classList.remove("active");
    } 
    sel.classList.add("active");
    var pages=[pagein, pagela, pagemo]
    for (let i in pages){
        pages[i].style.display="none";
    } 
    sel2.style.display="block"
}
navla.addEventListener("click",(e)=>{
    select(navla,pagela)
})
navmo.addEventListener("click",(e)=>{
    select(navmo, pagemo)
})
navin.addEventListener("click",(e)=>{
    select(navin,pagein)
})
mod()