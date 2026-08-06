
var releases
var verSel=document.getElementById("versions")
var depricated=document.getElementById("depricated")
var unsupported=document.getElementById("unsupported")
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
function versionNumber(i){
    return (releases[i].html_url
                    .split("/")
                    .pop())
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