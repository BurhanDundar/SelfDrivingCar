class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3,color="blue"){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged=false;

        this.useBrain=controlType=="AI";

        if(controlType!="DUMMY"){ // Yapay zekaya sahip araçlara önündeki 5 sensörü çizdiriyoruz
            this.sensor=new Sensor(this);
            this.brain=new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );
        }
        this.controls=new Controls(controlType);

        this.img=new Image();
        this.img.src="images.png"

        this.mask=document.createElement("canvas");
        this.mask.width=width;
        this.mask.height=height;

        const maskCtx=this.mask.getContext("2d");
        this.img.onload=()=>{
            maskCtx.fillStyle=color;
            maskCtx.rect(0,0,this.width,this.height);
            maskCtx.fill();

            maskCtx.globalCompositeOperation="destination-atop";
            maskCtx.drawImage(this.img,0,0,this.width,this.height);
        }
    }

    update(roadBorders,traffic,tLightSensors){
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged=this.#assessDamage(roadBorders,traffic,tLightSensors);
        }
        if(this.sensor){
           this.sensor.update(roadBorders,traffic,tLightSensors);
            const offsets=this.sensor.readings.map( // Sensörlerden 1 tanesi bir noktaya 30% değiyor olsun.O zaman bu değeri 1 - 0.3 = 0.7 olacak gibi düşünebiliriz.Böylece Ağırlık öbür tarafa kayacak ve araç sensörün algıladığı yere çarpmayacaktır.
                s=>s==null?0:1-s.offset
            );
            const outputs=NeuralNetwork.feedForward(offsets,this.brain); // Sensörlerden alınan verileri yapay zekamızda input olarak kullanıyoruz

            if(this.useBrain){
                this.controls.forward=outputs[0]; // NeuralNetwork.feedForward'dan dönen outputları arabanın yön değişkenlerine atıyoruz ve arabanın hareket etmesini sağlıyoruz
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];
            }
        }
    }

    #assessDamage(roadBorders,traffic,tLightSensors){ // arabanın kaza yapması (çarpma) durumlarıunı bu fonksiyonla ele alıyoruz
        for(let i=0;i<roadBorders.length;i++){ // yol için
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){ // trafikteki arabalar için
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
            }
        }
        if(this.useBrain){
            for(let i=0;i<tLightSensors.length;i++){ // kırmızı trafik ışığı için
                if(polysIntersect(this.polygon,tLightSensors[i].polygon)){
                    return true;
                }
            }
        }
        return false;
    }

    #createPolygon(){ // Arabanın etrafındaki cisimleri algılaması için (çarpmalar esnasında) arabayı bir poligon haline getiriyoruz
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){ // arabanın hareket etmesini sağlayan komutların işlendiği fonksiyon
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx,drawSensor=false){ // p5js ile arabanın canvas üzerinde çizilmesi
        if(this.sensor && drawSensor){
            this.sensor.draw(ctx);
        }

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        if(!this.damaged){
            ctx.drawImage(this.mask,
                -this.width/2,
                -this.height/2,
                this.width,
                this.height);
            ctx.globalCompositeOperation="multiply";
        }
        ctx.drawImage(this.img,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height);
        ctx.restore();

    }
}