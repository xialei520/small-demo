let imgUrl = [
    "http://localhost:8888/mm/0f536c69ada247429b8a9e38d3dba8bb.jpg",
    "http://localhost:8888/mm/19c99c447e0a40a6b3ff89951957cfb1.jpg",
    "http://localhost:8888/mm/1a515f1508e345e2bf24673c2c2d50c4.jpg",
    "http://localhost:8888/mm/1c5cebd307fd49eaa75b368b11118b61.jpg",
    "http://localhost:8888/mm/25d3e3db2c1248bb917c09dc4f50a46f.jpg",
    "http://localhost:8888/mm/28fc02e86d584ff08802c8dcd9535b35.jpg",
    "http://localhost:8888/mm/291ee91a554f4cd88bf9a09a9fa2e95e.jpg",
    "http://localhost:8888/mm/2c924db2a1b84c5d8fdb9f8c5f6d1b71.jpg",
    "http://localhost:8888/mm/31f485fdc49047f6883f52b73ac102aa.jpg",
    "http://localhost:8888/mm/341ecaacdd7d4cc09cd0de100f3eab46.jpg",
    "http://localhost:8888/mm/3fdbaffdf3374578a82313621123dace.jpg",
    "http://localhost:8888/mm/4002b1fd18544802b80193fad27eaa62.jpg",
    "http://localhost:8888/mm/4817628a6762410895f814079a6690a1.jpg",
    "http://localhost:8888/mm/5888858f49bd4608b12633115687ddc3.jpg",
    "http://localhost:8888/mm/5a29ab0fc093408c82febe7c7e42e156.jpg",
    "http://localhost:8888/mm/5cc0fd124d2443448b6156284720707c.jpg",
    "http://localhost:8888/mm/5fe5b1e9168d4a8a8f6f4e0acefef8f5.jpg",
    "http://localhost:8888/mm/6368ae2770414162819aba90f251cf08.jpg",
    "http://localhost:8888/mm/65c8ea426cc7423987692872968c25b9.jpg",
    "http://localhost:8888/mm/6b2efa591564475fb8bc32291fb0007c.jpg",
    "http://localhost:8888/mm/6e57b254da79416bbe58248b570ea85f.jpg",
    "http://localhost:8888/mm/6f1708af33d647f3809ea551e18894ce.jpg",
    "http://localhost:8888/mm/7878d08eb776401a85deeb203372665c.jpg",
    "http://localhost:8888/mm/80d2906331444e658aa876f5d4355f70.jpg",
    "http://localhost:8888/mm/8a9837115fb64d22b0484e3d4c4cab50.jpg",
    "http://localhost:8888/mm/92989b6a707b44dfb1c734e8d53d39a2.jpg",
    "http://localhost:8888/mm/95ddb01b6bd34a85aedfda4c9e9bd003.jpg",
    "http://localhost:8888/mm/9fa43020cf724c69842eec3e13f6d21c.jpg",
    "http://localhost:8888/mm/9fb66f5c4a214b26be6e0218b93bdf46.jpg",
    "http://localhost:8888/mm/a2d3115b8d464d93933e79e88af03580.jpg",
    "http://localhost:8888/mm/b25e97747ed041fbb7a11f59f7fed5da.jpg",
    "http://localhost:8888/mm/bdb35e4b3c0045c799cc7a494a3db3e0.jpg",
    "http://localhost:8888/mm/c6d3b2b6b5e24e1cbf576946dbec5907.jpg",
    "http://localhost:8888/mm/ccf0316264d245018fc651cffa6e90de.jpg",
    "http://localhost:8888/mm/d237f507bf1946d2b0976e581f8aab9b.jpg",
    "http://localhost:8888/mm/d5c0dc1618194a65b928c932dd2de3a7.jpg",
    "http://localhost:8888/mm/d6bba8cf5b8c40f9ad229844475e9149.jpg",
    "http://localhost:8888/mm/dc75cbde1d98448183e2f9514b4d1320.jpg",
    "http://localhost:8888/mm/e0b652d2a0cb46ba888a935c525bd312.jpg",
    "http://localhost:8888/mm/e831e004436f4fffb657a77aef48b9ca.jpg",
    "http://localhost:8888/mm/e92911f5ff9446d5a899b652b1934b93.jpg",
    "http://localhost:8888/mm/e941fa5d2cfb4a8297128178c371908c.jpg",
    "http://localhost:8888/mm/f08e8ab6030d41a0ada3e6cecea0e60c.jpg",
    "http://localhost:8888/mm/f0c192e3e335400db8a709a07a891b2e.jpg",
    "http://localhost:8888/mm/f12526b3e9654a47842db6ce21222874.jpg",
    "http://localhost:8888/mm/f4f6d68bf30147e1bdd4ddbc6ad7c2a2.jpg",
    "http://localhost:8888/mm/f7b320f1a89a4aaebadb1922c2a7a368.jpg",
    "http://localhost:8888/mm/f9523ebe24a34edfaedf2dd0df8e2b99.jpg",
    "http://localhost:8888/mm/fae111696a8b418297833324ff93bd1a.jpg",
    "http://localhost:8888/mm/fb1c315d54e1413494223aca31a9c47c.jpg"
]
for(let item of imgUrl){

    let req = new XMLHttpRequest();
    req.open('GET', item, true);
    req.responseType = 'blob';
    
    req.onreadystatechange = () => {
        if(req.readyState == 4){
            
            postMessage(req.response)
           
            if(imgUrl.length === imgUrl.indexOf(item)+1){
                self.close()
            }
        }
    }
    req.send(null)
}

console.log(self, 'ahhah')