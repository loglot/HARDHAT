
var pcan=document.getElementById("paralax")
var pctx=pcan.getContext("2d")
var grid=[]
for(let i = 0; i<3;i++){
    grid[i]=new Image()
    grid[i].src=`./assets/MEMORYGRID_${i}.png`
}
function imgload(img){
    return img.complete && img.naturalWidth !== 0;
}
function drawgrid(img,x,y,a){
    if(imgload(img)){
        // console.log()
        pctx.globalAlpha=a
        pctx.imageSmoothingEnabled = false;
        pctx.drawImage(img,x,0+y,img.naturalWidth*4,img.naturalHeight*4)
        pctx.fillStyle="#ff0063"
        pctx.fillRect(0,y-100000,10000,100000)
    }
}
function paratick(){
    requestAnimationFrame(paratick)
    var y=window.scrollY
    pctx.canvas.width  = window.innerWidth;
    pctx.canvas.height = window.innerHeight;
    pctx.fillStyle="#fff"

    drawgrid(grid[0],-50+y/100,-1000+y/4,.3)
    drawgrid(grid[1],0-y/100,-400-y/4,.5)
    drawgrid(grid[2],-100-y/50,-300-y/2,.9)

    // pctx.fillRect(0, 400+y/2, 100,100)
    // pctx.fillRect(10, 400-y/2, 100,100)
    // pctx.fillRect(20, 400-y, 100,100)
}
requestAnimationFrame(paratick)