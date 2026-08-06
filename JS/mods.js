
var mods
var pagemod=document.getElementById("modflex")
var mme =document.getElementById("modmanage")
var mm =document.getElementById("modman")
var md =document.getElementById("moddown")

function installmod(url,fname,mod){
    window.electronAPI.exec(['./SH/installMod.sh', [
        url,fname,installpath,mod
    ]])

}
function manage(name,type){
    window.electronAPI.exec(['./SH/manageMod.sh', [
        installpath,name,type
    ]])
    let remove = document.getElementsByClassName("MOD-"+name.replaceAll(" ",""));
    if(type=="remove"){
        for (i in remove){
            remove[i].style.display="none"
        }

    }
}
function populateMod(namne){// skrew it, this typo is canon now
    mme.insertAdjacentHTML("beforeend",`

            <div class="file flex MOD-${namne.replaceAll(" ","")}">
                <h2>${namne}</h2>
                <div style="height:100%">
                    <button onclick='manage(
                            "${namne}", "remove"
                        )'>uninstall</button>
                    <!-- <button>disable</button> -->
                    ${namne.split(".").pop()=="zip"?

                    `<button onclick='manage(
                            "${namne}", "unzip"
                        )'>unzip</button>` : 
                        namne.split(".").length==1 ?
                    `<button onclick='manage(
                            "${namne}", "unpack"
                        )'>unpack</button>`:''
                    }
                </div>
            </div>
    `)
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
                        <a href="${list[i]._sProfileUrl}"><button>Open Mod Page</button></a>
                    </div>
                `)
            }
        }
    }
}
mm.addEventListener("click",(e)=>{
    md.classList.remove("active");
    mm.classList.add("active");
    pagemod.style.display="none"
    mme.style.display="block"
})
md.addEventListener("click",(e)=>{
    mm.classList.remove("active");
    md.classList.add("active");
    pagemod.style.display="flex"
    mme.style.display="none"
})