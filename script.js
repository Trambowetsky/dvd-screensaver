(function(){
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    imageCreated = false,
    properties = {
        dvdMaxVelocity: 3,
        images: ["files/DVD_logoBLUE.png", "files/DVD_logoGREEN.png", "files/DVD_logoPINK.png", "files/DVD_logoPURPLE.png", "files/DVD_logoYELLOW.png"],
        logoWidth: 150,
        logoHeight: 75
    };
    window.onresize = function() {
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
    };
    class Logo extends Image {
        constructor() {
            super();
            this.xposition = Math.random() * w;
            this.yposition = Math.random() * h;
            this.src = properties.images[Math.floor(Math.random()*properties.images.length)];
            this.velocityX = properties.dvdMaxVelocity;
            this.velocityY = properties.dvdMaxVelocity;
        }
        position() {
            this.xposition + this.velocityX + properties.logoWidth > w && this.velocityX > 0 || this.xposition + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.yposition + this.velocityY + properties.logoHeight > h && this.velocityY > 0 || this.yposition + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.xposition += this.velocityX;
            this.yposition += this.velocityY;
             if(this.xposition + this.velocityX + properties.logoWidth > w || this.xposition + this.velocityX < 0 ||
                this.yposition + this.velocityY + properties.logoHeight > h || this.yposition + this.velocityY < 0) {
                 this.src = properties.images[Math.floor(Math.random()*properties.images.length)];
             }
        }
        redraw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, this.xposition, this.yposition, properties.logoWidth, properties.logoHeight);
        }
    } 
    document.querySelector('body').appendChild(canvas);
    var img = new Logo();
    img.addEventListener("load", function() {
        if(!imageCreated) {
            imageCreated = true;
            animate();
        } 
      }, false);
    
    function animate() {
        img.position();
        img.redraw();
        requestAnimationFrame(animate);        
    } 
}())