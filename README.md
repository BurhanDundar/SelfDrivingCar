# SelfDrivingCar
Created self driving car in javascript using deep learning and genetic algorithm.

## 1. Problemin Tanımı :

Bu projemizde yapay zeka derin öğrenmeyi kullanan bir oyun yaptık. Oyunumuzun konusu ise trafikte kendi kendine giden bir araba oluşturmaktı. Derin Öğrenmenin yanı sıra genetik algoritma da kullanarak arabalarımızın her defasında daha iyi sonuçlar elde etmesini sağladık. Oyunu daha ayrıntılı açıklamamız gerekirse trafik ışıklarının ve arabaların bulunduğu bir trafikte araba(ları)mız kendi kendini sürüyor. Amacımız aracımızın etrafındaki arabalara çarpmaması, yolun dışına çıkmaması ve kırmızı ışıklara dikkat etmektir.

## 2.Araştırma (Ön Çalışma) :
Araştırmalarımızı derin öğrenme ve genetik algoritma konularında yaptık. Öncelikle derin öğrenme ile yapay sinir ağları kullanarak araba nasıl kendisini sürebilir bunu araştırdık. Bu noktada yapay sinir ağlarının nasıl çalıştığını, formülünün nasıl uygulandığını, makinanın insanlara ihtiyaç duymadan nasıl karar verebildiğini öğrendik. Sonrasında yapay zekaya sahip arabalarımızı nasıl genetik algoritmayla eniyileyebiliriz diye araştırmalarda bulunduk. Bu öğrendiklerimizi ve araştırmalarımızı da projemizde uyguladık. (Alt kısımda bu öğrendiklerimizi ayrıntılı şekilde anlattık)

## 3. Kullanılan Ortam Yöntem ve Kütüphaneler :
Projemizde derin öğrenme (yapay sinir ağları) ve genetik algoritma konularını işledik. Geliştirmemizi “Vs Code” ortamında javascript, p5js, html ve css ile yaptık. Herhangi bir kütüphane kullanmadan (no library) şekilde algoritmalarımızı yazdık. Geliştirme esnasında “Object Oriented Programming” yöntemini kullandık.

## 4.Önerilen (Geliştirilen/Kullanılan) Yöntem
### Deep Learning Nedir ?

<img width="410" alt="Screenshot 2023-01-27 at 10 21 15" src="https://user-images.githubusercontent.com/57062662/215030507-51cd3577-b1b6-4552-8194-69ccbf14f163.png">

 Derin öğrenme yani deep learning, yapay sinir ağları (artificial neural
 networks – ANN) adı verilen bir model ailesine odaklanan makine
 öğreniminin (ve dolayısıyla yapay zekanın) bir alt bölümüdür. Derin
 öğrenmenin “deep (derin)” kısmı teknik bir terimdir ve “sinir ağları”nın
 “ağ” kısmındaki katmanların veya bölümlerin sayısını ifade eder. Derin
 öğrenme şu anda sürücüsüz arabalar ve doğal dil tanıma ve anlama gibi
 yüksek düzeyde otomatikleştirilmiş sistemlerin geliştirilmesinde kritik bir
 rol oynar.
 ### Şimdi projede de kullandığımız Derin Öğrenme katmanlarının nasıl çalıştığını inceleyelim:
 
- <b><i>Inputs:</b></i> 
Inputlar dışarıdan gelen harici bir tetikleyici veya diğer yapay
nöronların çıktılarından elde edilir. Ağ tarafından değerlendirilirler ve
nöronlar için “besin” olarak kullanılırlar.Nöronlara verdiğimiz eğitim
sayesinde inputları yorumlayabiliriz.

- <b><i>Weights:</b></i>
Kendisine karşılık gelen input değerleriyle çarpılırlar. Nöronun
içine giren girdileri anlamlandırarak çıktının da daha başarılı olmasını
sağlamaya çalışır. Sinir ağı eğitim algoritmalarının amacı problemin
çözülmesi için gereken en iyi olası ağırlık değerlerinin bulunmasıdır.

- <b><i>Bias:</b></i>
Kendisine -1 ile 1 arasında bir değer atanır.
- <b><i>Output:</b></i>
Kütüphane kullanmadan kullandığımız algoritmamızda her bir
input kısmı için input ile input’un weight değerini çarpıp bu değer bias
değerinden büyük mü diye bakıyoruz. Eğer büyükse Outputumuz 1 değilse
0 oluyor. Kendi layerlarımız üzerinden incelersek:

 ### NEURAL NETWORK LAYERS:
 
 <img width="369" alt="Screenshot 2023-01-27 at 10 22 08" src="https://user-images.githubusercontent.com/57062662/215030632-40d9cfd9-0937-4110-a4ef-a621ecc20244.png">
 
“İLERİ HAREKET ETME” INPUT DEĞERİ İLE WEIGHT DEĞERLERİNİN ÇARPIMI:

<img width="366" alt="Screenshot 2023-01-27 at 10 22 27" src="https://user-images.githubusercontent.com/57062662/215030681-86696b89-40ce-4559-ae74-448692636b7b.png">
  
INPUT * WEIGHT DEĞERİ İLE BIAS DEĞERİNİN KARŞILAŞTIRILMASI:

<img width="364" alt="Screenshot 2023-01-27 at 10 22 47" src="https://user-images.githubusercontent.com/57062662/215030712-02dabe47-48bc-4583-9aeb-7ba65d56afcf.png">

 
### INPUT VE OUTPUT DEĞERLERİNİ NASIL OLUŞTURUYORUZ ? :

Neural Network sistemimizde 2 katman kullandık.Dolayısıyla önce ilk seviyeye inputlar geliyor.Bu inputlar işlenerek belli outputlar üretiyor.Seviye 0’da Üretilen outputlar ise Seviye 1’in inputları oluyor.Bu inputları da işleyerek arabamızın hangi yöne gideceğini belirlemiş oluyoruz.
Seviye 0’da girdilere ihtiyaç duyuyoruz.Bu girdileri elde edebilmek için arabamıza şekildeki gibi sensörler ekledik.

<img width="231" alt="Screenshot 2023-01-27 at 10 23 13" src="https://user-images.githubusercontent.com/57062662/215030781-f03e0369-dcb0-4818-8991-79ab0a13f484.png">
  
Sensörlerin sağ ve sol köşelerinde siyahlıklar olduğunu görüyoruz. Sensörler çarpıp öleceği yerleri (trafikteki arabalar, kırmızı ışık ve yolun kenarları) sensörler sayesinde bu şekilde anlayabiliyor. Hiç siyah kısmı olmayan sensörün değerini 1 kabul edelim ve en soldaki siyahlığın 0.2 değerine karşılık geldiğini düşünelim. Böylece 1 – 0.2 bize arabanın en solu için input değerini verecektir. Bu hesapla beraber Seviye (Layer) 0’ın input değerlerinin [0.8,1,1,1,0.8] olduğunu görebiliriz. Bu değerler ile her input için -1 ile 1 arasında oluşturulmuş weight değerlerini çarpıyoruz. Sonrasında yine -1 ile 1 arasında oluşturmuş olduğumuz bias değeri ile tüm input * weight değerlerini toplayıp bunları karşılaştırıyoruz.
toplam(input^i + weight^i) > bias ise level.outputs[i] = 1 toplam(input^i + weight^i) > bias ise level.outputs[i] = 0 olarak belirleniyor.
Bu çıktılara göre de Seviye 1 (Layer 1) outputlarımız oluşuyor.Bu outpular şekildeki gibi atanarak arabanın hareket etmesi sağlanıyor.

this.controls.forward=outputs[0];
this.controls.left=outputs[1];
this.controls.right=outputs[2];
this.controls.reverse=outputs[3];

</b></i>Katman Yapımız:</b></i>

4 (ileri – sol – sağ - geri)
6 (ara katman)
5 (araba sensörleri)
Şeklinde bir katman tasarladık

###### Videolarda da neural network sisteminin nasıl çalıştığı incelenebilir.

### Genetik Algoritma Nedir ve Nasıl Çalışır ? :
 Genetik algoritmalar, doğada gözlemlenen evrimsel mekanizmalara benzer
 mekanizmalar kullanarak çalışan eniyileştirme yöntemidir. Çok boyutlu uzayda
 belirli bir maliyet fonksiyonuna göre en iyileştirme amacıyla iterasyonlar yapan ve
 her iterasyonda en iyi sonucu üreten kromozomun hayatta kalması prensibine
 dayanan en iyi çözümü arama yöntemidir. Genetik algoritmalar problemlere tek
 bir çözüm üretmek yerine farklı çözümlerden oluşan bir çözüm kümesi üretir.
 Böylelikle, arama uzayında aynı anda birçok nokta değerlendirilmekte ve sonuçta
 global çözüme ulaşma olasılığı yükselmektedir. Çözüm kümesindeki çözümler
 birbirinden tamamen bağımsızdır.
 
 <img width="379" alt="Screenshot 2023-01-27 at 10 24 56" src="https://user-images.githubusercontent.com/57062662/215031050-2db819ca-5b81-453c-9c6d-72483e3b6c85.png">

#### Alttaki fotoğrafta genetik algoritmayla üretilen 100 adet yapay zekalı araba görmekteyiz :

<img width="277" alt="Screenshot 2023-01-27 at 10 25 20" src="https://user-images.githubusercontent.com/57062662/215031122-538a931d-612b-45ba-a638-ca0d18b5f57a.png">
 
Arabaların gidişatını beğenmeyip eğitimlerine baştan başlamak istersek “Discard Best Brain” butonuna basıyoruz ve localStorage içerisindeki bestBrain değerini silebiliyoruz.


### Oyun İçi Bilgilendirmeler:
</b></i>Game Best Score:</b></i> Tüm oyunlardaki elde edilen en yüksek skor.
About Game altında oyunla ilgili bilgiler yer almaktadır.
</b></i>Game Time:</b></i> Oyunun kaç saniyedir devam ettiği.
</b></i>Best Car Velocity:</b></i> En öndeki aracın hızı.
</b></i>Alive Car Count:</b></i> Oluşturduğumuz yapay zekaya sahip araçlardan kaç tanesi bir yere çarpmadan oyuna devam ediyor.
</b></i>Best Car Distance:</b></i> O anki oyunda arabanın en fazla ne kadar yol aldığı
 
## 5.Deneysel Çalışmalar

Önce genetik algoritmada kaç araba kullanacağımızı belirledik. Bu değer ne kadar yüksek olursa o kadar iyi ancak çok da fazla yaparsak bilgisayarda kasmalar başlayabilmektedir. 100 arabayla oyunu başlattığımızı düşünelim. Arabalar ilk başta hiçbir dayanağa (başarılı veriye) sahip olmadıklarından çok az miktarda araba başarılı şekilde hareket edecektir. Kullanıcı arabanın hareketlerini amacına her uygun gördüğünde ekrandaki “Save Best Brain” butonuna tıklamalıdır. Böylece en başarılı aracın (en öndeki araç) “brain” verileri localStorage içine kaydediliyor. Bundan sonra oyun yeniden başladığında 100 araba da en iyi beyin verilerine göre hareket edecektir. Eğer kaydedilmiş bir “en iyi” beyin varsa en öndeki araba hariç tüm arabalar tekrar “mutate” işlemine tabi tutulur çünkü eğer bunu yapmazsak arabalar her tur aynı şekilde hareket eder ve bir gelişme kaydedemezdi. Bu şekilde tüm arabaların bir yere çarpmadan gittiğini varsayarsak en öndeki araba hariç tüm arabalar en iyi araba verilerini de dikkate alarak tekrar “mutate” işlemine tabi tutuluyor ve bulunulan durumdan daha iyi bir duruma geçme şansı oldukça artıyor. Daha iyi bir durum gözlendiği anda da Bilgisayar başındaki kullanıcı tekrar “save best brain” butonuna basıyor. Bu işlemler tekrarlanarak giderek çok daha iyi sürüş yapabilen otonom araçlar elde ediyoruz. Burada her mutate’de 0.1 oranında seçim yapıyoruz.

### BİZİM ELDE ETTİĞİMİZ BAŞARILI SONUÇLARI PROJE KONTROL AŞAMASINDA ZAMAN KAYBETMEDEN KONTROL EDEBİLMEK İÇİN AŞAĞIDAKİ İNPUTLAR KULLANILABİLİR:

Buraya yazılan girdiler oyunun index.html dosyası chrome’da açıldıktan sonra şu adımlar izlenerek yerleştirilmelidir.

1.Chrome sayfasında sağ tıklayınız ve inceleye basınız
2.Alttaki şekilde görüldüğü gibi Application sekmesinin bulunup
bestBrain karşısına verilen inputları girip sayfayı yenileyiniz.

<img width="546" alt="Screenshot 2023-01-27 at 10 27 07" src="https://user-images.githubusercontent.com/57062662/215031386-5c1d9215-a79b-49e8-a855-7c021065b8dd.png">

#### Trafik Işığı Kullanmadan (Arabaları Geçerek Sürüş) :

{"levels":[{"inputs":[0.02348594003872262,0.03164406782139184,0.2322865061966437,0,0.2655939633704416],"outputs":[0,1,1,1,1,1],"biases":[0.09297822152 049931,-0.27328541600108514,-0.0016449456029122358,-0.07520656222112074,-0.4293541169661284,- 0.3279127487240576],"weights":[[0.08769463411039442,-0.20525787940326268,0.14003961700644643,0.1043851277217048,- 0.3691710400429605,0.08670607795802623],[-0.207367828508094,0.3186562300725941,0.01976640242774084,-0.037625436278908464,- 0.37022452046616816,0.46572623925739637],[-0.43415981306444246,0.21383820561735722,0.08857513143532102,0.40329523646451904,- 0.2768191036060498,-0.6546733418568735],[0.18390659190470998,-0.18376744175635684,0.33262673764568707,- 0.41549834474630754,0.07097723970439074,- 0.39325880565738],[0.0883400257723848,0.3603886130223335,0.39608344908309856,0.2519185589250716,0.5654514339214273,0.13714958969467506]]},{"i nputs":[0,1,1,1,1,1],"outputs":[1,0,0,0],"biases":[0.0655654788051658,-0.2785955246880485,-0.22709448652322511,-0.34075734505366667],"weights":[[- 0.2583349349315358,-0.05001926042616811,-0.29167150334354647,-0.4280593375553857],[-0.22514419549554004,0.22632512782210507,- 0.08469268132174286,-0.4014008445903336],[0.06066213058058589,-0.39585891085793845,0.4317851598219412,- 0.18259075317802892],[0.5293400662344856,-0.28914400156473896,-0.3967479095136819,- 0.11204912637868336],[0.3876441931466752,0.23576970208265807,-0.3733612977049337,0.2277439404109114],[0.6307003641235356,-0.2901409587795225,- 0.10241756055337975,-0.4088241251678542]]}]}

#### Trafik Işığı Kullanarak (Işıklara Uyarak ve Arabalara
Çarpmadan Güvenli Sürüş) :

{"levels":[{"inputs":[0.7444987497309877,0.8044478091469646,0.8193333333331398,0.8044478091469646,0.7444987497309877],"outputs":[1,1,1,1,1,0],"biases" :[0.8501546413716821,-0.7974595945236459,0.06617523635956672,-0.816712516428708,-0.962972830724471,- 0.39914939884476763],"weights":[[0.28870271802701836,-0.5577688494317377,0.07430366600156853,-0.03786300697932225,-0.11478857318347252,- 0.007552085447248877],[0.4712967582121296,-0.7038136002061226,0.01321525425357506,0.8052413263148939,0.6100810403056125,- 0.07006998345196726],[0.5927978044443415,0.5872374816500855,0.9446095731936673,-0.7548382121234812,0.6428356690327779,-0.4931115498057693],[- 0.5981189393340189,0.7979328499099527,0.7544250857871335,-0.5863041964081737,0.23603969786854898,-0.8669689747486905],[0.5151245607832291,- 0.548864694638644,0.0822303478877405,0.3361966427556694,0.8115812704085349,- 0.6880336120545487]]},{"inputs":[1,1,1,1,1,0],"outputs":[0,1,1,0],"biases":[-0.43263842298623134,-0.40846030433845365,- 0.46833411650573187,0.7980254685671557],"weights":[[0.04266209240667722,-0.22146399981300058,0.7741490354684679,0.45389850275297294],[- 0.06415399138160147,0.7896831661421895,0.46568285790042235,-0.4002620639333967],[-0.6421402556635472,0.19008116167447486,0.692333522803839,- 0.45875859281127696],[0.7344138307368712,0.3103788897957188,0.40996749454615533,-0.11615256817383415],[- 0.6435557766155903,0.40838040261621134,0.6247186503093534,-0.6279384391310641],[0.580556543942049,-0.8536022905015582,- 0.44381107646226364,0.5162635080285016]]}]}

### Bizim Elde Ettiğimiz Başarılı Sürüş Video Linkleri:

1.) https://drive.google.com/file/d/1pTZOl7Uy7D8IkM_cBJ4DoxEFOkOTZjRY/view?usp=sharing 2.) https://drive.google.com/file/d/139DbY0bWFFXtyDJemQ-CFzTU5NG3t7CP/view?usp=sharing
3.) https://drive.google.com/file/d/1e0- DKuUMPDVGTEddV40PT_dod3mIMHh5/view?usp=sharing
6.) Sonuç :
Projenin Başarısı :
Proje gayet başarılı sonuçlandı.Hem derin öğrenme hem de genetik algoritmayı kullanarak belli kurallara uyarak kendi kendini sürebilen arabalar oluşturmayı başardık.
Gerçek Hayattaki İşlevi :
Gerçek hayatta tüm araçlarda kullanılabilir. Günümüzdeki otonom araçları buna örnek gösterebiliriz. Son dönemlerde üzerinde çalışılan popüler bir konudur. Araba süremeyen, uzun yolda sıkıntı çeken, araba sürmeyi sevmeyen ama seyahat etmekte zorunda olan vb. tüm insanlara yararlı olabilir.
İnsanlara ve Canlılara Yararı :
İnsanlara zaman kazandırır. Tüm kurallara uyarlar dolayısıyla kaza riskini azaltarak canlıların zarar görmesini engellerler. Trafik
sıkışıklıkları azalır.
Kazanımlarımız :
Bu projemizde yapay sinir ağları nasıl çalışır ve formülü nasıl uygulanır bunları, genetik algoritma ile derin öğrenme nasıl bir araya getirilip verim arttırılabilir bunu öğrendik. Bunları kütüphane kullanmadan yaptığımız için bize katkısı normalden daha fazla oldu. Yapay zekayı oyun yaparak kullanmak da bize web geliştirme açısından hayli bilgi kattı.

## 6.Sonuç :
#### Projenin Başarısı :

Proje gayet başarılı sonuçlandı.Hem derin öğrenme hem de genetik algoritmayı kullanarak belli kurallara uyarak kendi kendini sürebilen arabalar oluşturmayı başardık.

#### Gerçek Hayattaki İşlevi :

Gerçek hayatta tüm araçlarda kullanılabilir. Günümüzdeki otonom araçları buna örnek gösterebiliriz. Son dönemlerde üzerinde çalışılan popüler bir konudur. Araba süremeyen, uzun yolda sıkıntı çeken, araba sürmeyi sevmeyen ama seyahat etmekte zorunda olan vb. tüm insanlara yararlı olabilir.

#### İnsanlara ve Canlılara Yararı :

İnsanlara zaman kazandırır. Tüm kurallara uyarlar dolayısıyla kaza riskini azaltarak canlıların zarar görmesini engellerler. Trafik
sıkışıklıkları azalır.

#### Kazanımlarımız :

Bu projemizde yapay sinir ağları nasıl çalışır ve formülü nasıl uygulanır bunları, genetik algoritma ile derin öğrenme nasıl bir araya getirilip verim arttırılabilir bunu öğrendik. Bunları kütüphane kullanmadan yaptığımız için bize katkısı normalden daha fazla oldu. Yapay zekayı oyun yaparak kullanmak da bize web geliştirme açısından hayli bilgi kattı.

##### Not 1:

Başarının artması için genetik algoritma kullandık. Başarıya yakın her sonucu kaydettik ve makinanın her seferinde o en iyi durumdan itibaren daha iyi sonuçlar oluşturmasını sağladık.

##### Not 2: 

Seçtiğimiz konu şu an tüm dünyada çok popüler durumda. Farklı olarak biz projemizde kütüphane kullanmadık. İnceleme fırsatı bulduğumuz birçok proje python
veya rasperry pi ile kütüphane destekli yapılmıştı. Konuyu derinlemesine incelemek istediğimizden kütüphane kullanmadan ilerlemeyi tercih ettik.
