////////////// MODELOS DOS ////////////////////
let model2, webcam2, labelContainer2, maxPredictions2, targetSend2, cam2, 
    camSelect_html2, respuesta2, int_plc2, contadorSend2;
    
    // Load the image model and setup the webcam2
    cam2 = 0
    function cambiarCam2(){
        camSelect_html2 = document.querySelector('#CAM2')
        //camSelect_html2 = document.querySelector('#camSelect')
        if (cam2 == 0) {
          cam2 = 1;
          camSelect_html2.innerHTML = `Camara 1`;
          console.log("Camara " + cam2 + " modelo dos");
        } else {
          cam2 = 0;
          camSelect_html2.innerHTML = `Camara 2`;
          console.log("Camara " + cam2 + " modelo dos");
        } 
    }
    async function init2() {
        const modelURL2 = "model.json";
        const metadataURL2 = "metadata.json";
        model2 = await tmImage.load(modelURL2, metadataURL2);
        maxPredictions2 = model2.getTotalClasses();

        // Convenience function to setup a webcam2
        const flip2 = true; // whether to flip the webcam2
        const width2 = 400;
        const height2 = 400;
        const devices2 = await navigator.mediaDevices.enumerateDevices();
        webcam2 = new tmImage.Webcam(width2, height2, false);
        await webcam2.setup({ deviceId: devices2[cam2].deviceId });
        await webcam2.play();
        window.requestAnimationFrame(loop2);

        document
          .getElementById("webcam-container2")
          .appendChild(webcam2.canvas);
        
        // append elements to the DOM
        labelContainer2 = document.getElementById("label-container2");
        for (let i = 0; i < maxPredictions2; i++) {
          // and class labels
          labelContainer2.appendChild(document.createElement("div"));
        }
        webcam2.play();
        window.requestAnimationFrame(loop2);
    }

    async function loop2() {
        webcam2.update(); // update the webcam2 frame
        await predict2();
        window.requestAnimationFrame(loop2);
    }

    // run the webcam2 image through the image model
    async function predict2() {
        // predict can take in an image, video or canvas html element
        let prediction2;
        prediction2 = await model2.predict(webcam2.canvas);
        
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction2 =
            prediction2[i].className +
            ": " +
            prediction2[i].probability.toFixed(2);
          labelContainer2.childNodes[i].innerHTML = classPrediction2;
        }
        
        int_plc2 = {
          Id: "Astrazina",
          defectusosa: false,
          prediccion: 0,
          camara: cam2
        };
        if (prediction2[0].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Sin marca";
          int_plc2.prediccion = 1;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[1].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Rasgada";
          int_plc2.prediccion = 2;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[2].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Sin etiqueta";
          int_plc2.prediccion = 3;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[3].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Arrugada";
          int_plc2.prediccion = 4;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[4].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Fuera de marco";
          int_plc2.prediccion = 5;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[5].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Invertida";
          int_plc2.prediccion = 6;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[6].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Traslapada";
          int_plc2.prediccion = 7;
          int_plc2.defectusosa = true;
        }
        if (prediction2[7].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Movida";
          int_plc2.prediccion = 8;
          int_plc2.defectusosa = true;
        } 
        if (prediction2[8].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Vacio";
          int_plc2.prediccion = 9;
          int_plc2.defectusosa = false;
        } 
        if (prediction2[9].probability.toFixed(2) >= 0.5) {
          respuesta2 = "Buena";
          int_plc2.prediccion = 10;
          int_plc2.defectusosa = false;
        }

        document.getElementById("resultado2").innerHTML = respuesta2;

        if (targetSend2 == 0 & (int_plc2.prediccion == 0 || int_plc2.prediccion == 9)) {
          
          targetSend2 = 1;
          send_data2(int_plc2)
          console.log(int_plc2);
          console.log("buena o vacio")
          console.log("dato enviado")
        }
        if (targetSend2 == 1 & (int_plc2.prediccion != 0 & int_plc2.prediccion != 9)) {
          targetSend2 = 0
          send_data2(int_plc2)
          console.log(int_plc2);
          console.log("defecto")
          console.log("dato enviado")
        }

      }
      async function sendNow2() {
        targetSend2 = 0
        console.log("Send Activo - Modelo Dos")
        return targetSend2
      }
      async function sendStop2() {
        targetSend2 = 3
        console.log("Send Pausa - Modelo Dos")
        return targetSend2
      }
      contadorSend2 = 1;
      async function send_data2(int_plc2) {
        console.log(contadorSend2 + " datos enviados - Modelo Dos");
        contadorSend2 += 1;
          const response = await fetch("http://localhost:5000/send_values2", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            //referrerPolicy: 'no-referrer',
            body: JSON.stringify(int_plc2)
          });
          //return response.json();      

      }
      