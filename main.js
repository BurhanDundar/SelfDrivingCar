const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

let gameTime = document.querySelector("#gameTime");
let carVelocity = document.querySelector("#carVelocity");
let liveCarCount = document.querySelector("#liveCarCount");
let bestCarDistance = document.querySelector("#bestCarDistance");
let gameBestScore = document.querySelector("#gameBestScore");
let brakeCounter = 0;

if(!localStorage.getItem("_gameBestScore")){
    localStorage.setItem("_gameBestScore",0);
}

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0];

mutateCars();

function mutateCars(){
        for (let i = 0; i < cars.length; i++) {
            if (localStorage.getItem("bestBrain")) {
            cars[i].brain = JSON.parse(
                localStorage.getItem("bestBrain"));
            }
                NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }


const traffic = [ // Trafiğe rastgele dolaşan yapay zekaya sahip olmayan araçlar yerleştiriyoruz
new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(2),-900,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(0),-1200,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(1),-1350,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(0),-1550,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(2),-1700,30,50,"DUMMY",2,getRandomColor()),
new Car(road.getLaneCenter(1),-2000,30,50,"DUMMY",2,getRandomColor()),
];

const trafficLights = [ // Trafiğe Her x saniyede (şu an 10) bir yanan ve x (10) saniye sürece açık kalan trafik ışıkları ekliyoruz.
    new TrafficLight(carCanvas.width - 5, -3000, 50, 50),
    new TrafficLight(carCanvas.width - 5, -4000, 50, 50),
    new TrafficLight(carCanvas.width - 5, -200, 50, 50)
]

const trafficLightSensors = [ // Yerleştirdiğimiz trafik ışıklarına ait yapay zekaya sahip arabaların algılayabileceği kırmızı ışık sensörleri ekliyoruz.
    new TrafficLightSensor(trafficLights[0]),
    new TrafficLightSensor(trafficLights[1]),
    new TrafficLightSensor(trafficLights[2])
]

for (let i = 0; i < trafficLightSensors.length; i++) {
    trafficLightSensors[i].update();
}

animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) { // Yapay zekaya sahip N tane araç üretmemizi sağlayan kod
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}



function animate(time) { // Oyunun oynanmasını sağlayan animasyon fonksiyonu
    let timeAsSecond = parseInt(time / 1000);
    let _aliveCarsCount = cars.filter(x => x.damaged == false).length

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [], trafficLightSensors);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic, trafficLightSensors);
    }

    bestCar = cars.find( // en öndeki aracı en iyi araba yapıyoruz
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    carCanvas.height = window.innerHeight; 
    networkCanvas.height = window.innerHeight; 

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);


    road.draw(carCtx); // trafiğin aktığı soldaki ekranı çizdiriyoruz


    // Trafik ışığının her 10 saniyede bir açılıp kapanmasını sağlıyoruz
    for (let k = 0; k < trafficLights.length; k++) {
        if (Math.floor((timeAsSecond / 10)) % 2 == 0) {
            trafficLights[k].update();
            trafficLights[k].draw(carCtx, true);
            trafficLightSensors[k].update();
        } else if (Math.floor(timeAsSecond / 10) % 2 == 1) {
            trafficLights[k].update();
            trafficLights[k].draw(carCtx, false);
            trafficLightSensors[k].update(0, 0);
        }
    }

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, false);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain); // Layerların göründüğü sağdaki katmanı çizdiriyoruz
    requestAnimationFrame(animate);

    _gameBestScore = localStorage.getItem("_gameBestScore")

    if(_gameBestScore < -bestCar.y){
        localStorage.setItem("_gameBestScore",-bestCar.y)
    }

    // Arabalar bir arabanın arkasında sıkışıp kalmışsa en öndeki araba hariç diğer arabaları eğiterek sonucu iyileşltirmeye çalışıyoruz
    if((!trafficLights.length && bestCar.controls.forward == 0 || ( bestCar.controls.forward == 1 && bestCar.controls.reverse == 1 ))){
        if(brakeCounter == 100){
            if (localStorage.getItem("bestBrain")) {
            for (let i = 0; i < cars.length; i++) {
                cars[i].brain = JSON.parse(
                    localStorage.getItem("bestBrain"));
                if (i != 0) {
                    NeuralNetwork.mutate(cars[i].brain, 0.1);
                }
            }
        }
        brakeCounter = -100;
        }
        brakeCounter++;
    }

    // Ekranın en solunda dinamik olarak değişen oyun bilgilerinin ekrana yazdırılması
    gameBestScore.innerHTML = parseInt(_gameBestScore).toFixed(2);
    gameBestScore.style.marginRight = 20 + "px";

    gameTime.innerHTML = "game Time: " +  parseInt(time / 1000) + " saniye";
    gameTime.style.marginRight = 20 + "px";

    carVelocity.innerHTML = "Best Car Velocity: " +  bestCar.speed.toFixed(2);
    carVelocity.style.marginRight = 20 + "px";

    liveCarCount.innerHTML = "Alive Car Count: " +  _aliveCarsCount;
    liveCarCount.style.marginRight = 20 + "px";

    bestCarDistance.innerHTML = "Best Car Distance: " +  -bestCar.y.toFixed(2);
    bestCarDistance.style.marginRight = 20 + "px";

        if(_aliveCarsCount == 0){ // Oyunda hiç canlı (kaza yapmamış) araba kalmamışsa oyunu otomatik olarak tekrar başlatıyoruz.
            location.reload();
        }
}