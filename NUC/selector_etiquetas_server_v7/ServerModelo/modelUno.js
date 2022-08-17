////////////// MODELOS UNO ////////////////////
let model, webcam, labelContainer, maxPredictions, targetSend, cam, 
    camSelect_html, respuesta, int_plc, contadorSend;

    cam = 0
    function cambiarCam1(){
        camSelect_html = document.querySelector('#CAM')
        //camSelect_html = document.getElementById('#camSelect')
        if (cam == 0) {
          cam = 1;
          camSelect_html.innerHTML = `Camara 1`;
          console.log("Camara " + cam + " modelo uno");
        } else {
          cam = 0;
          camSelect_html.innerHTML = `Camara 2`;
          console.log("Camara " + cam + " modelo uno");
        } 
    }
    async function init1() {
        console.log("modelo uno ejecutandose")
        const modelURL = "model.json";
        const metadataURL = "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        const width = 400;
        const height = 400;
        const devices = await navigator.mediaDevices.enumerateDevices();
        webcam = new tmImage.Webcam(width, height, false);
        await webcam.setup({ deviceId: devices[cam].deviceId });
        await webcam.play();
        window.requestAnimationFrame(loop);

        document
          .getElementById("webcam-container")
          .appendChild(webcam.canvas);
        
        // append elements to the DOM
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
          // and class labels
          labelContainer.appendChild(document.createElement("div"));
        }
        webcam.play();
        window.requestAnimationFrame(loop);
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        let prediction;
        prediction = await model.predict(webcam.canvas);
        
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction =
            prediction[i].className +
            ": " +
            prediction[i].probability.toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        
        int_plc = {
          Id: "Astrazina",
          defectusosa: false,
          prediccion: 0,
          camara: cam
        };

        if (prediction[0].probability.toFixed(2) >= 0.5) {
          respuesta = "Buena";
          int_plc.prediccion = 1;
          int_plc.defectusosa = true;
        } 
        if (prediction[1].probability.toFixed(2) >= 0.5) {
          respuesta = "Linea_vacia";
          int_plc.prediccion = 2;
          int_plc.defectusosa = true;
        } 
        if (prediction[2].probability.toFixed(2) >= 0.5) {
          respuesta = "Sin etiqueta";
          int_plc.prediccion = 3;
          int_plc.defectusosa = true;
        } 
        if (prediction[3].probability.toFixed(2) >= 0.5) {
          respuesta = "Defecto_marcacion";
          int_plc.prediccion = 4;
          int_plc.defectusosa = true;
        } 
        if (prediction[4].probability.toFixed(2) >= 0.5) {
          respuesta = "Defecto_presentacion";
          int_plc.prediccion = 5;
          int_plc.defectusosa = true;
        } 

        document.getElementById("resultado").innerHTML = respuesta;
    
        if (targetSend == 0 & (int_plc.prediccion == 0 || int_plc.prediccion == 1)) {
          targetSend = 1;
          send_data(int_plc)
          console.log(int_plc);
          console.log("buena o vacio")
          console.log("dato enviado")
        }
        if (targetSend == 1 & (int_plc.prediccion != 0 & int_plc.prediccion != 1)) {
          targetSend = 0
          send_data(int_plc)
          console.log(int_plc);
          console.log("defecto")
          console.log("dato enviado")
        }
    }
    async function sendNow1() {
        targetSend = 0
        console.log("Send Activo - Modelo Uno")
        return targetSend
    }
    async function sendStop1() { 
        targetSend = 3
        console.log("Send Pausa - - Modelo Uno")
        return targetSend
    }
    contadorSend = 1;
    async function send_data(int_plc) {
        console.log(contadorSend + " datos enviados - Modelo Uno");
        contadorSend += 1;
          const response = await fetch("http://localhost:5000/send_values1", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            //referrerPolicy: 'no-referrer',
            body: JSON.stringify(int_plc)
        });
          //return response.json();      

    }