
var navin=document.getElementById("installation")
var navmo=document.getElementById("mods")
var navla=document.getElementById("launch")
var pagein=document.getElementById("pagein")
var pagemo=document.getElementById("pagemo")
var pagela=document.getElementById("pagela")

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