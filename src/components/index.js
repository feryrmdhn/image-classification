import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

import './index.css'

const ImageClassification = () => {
    const [image, setImage] = useState(null)
    const [predictions, setPredictions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classifyImage = async () => {
        setIsLoading(true);
        const model = await mobilenet.load();

        if (image) {
            const imgElement = document.createElement("img"); // Create an image element
            imgElement.src = image; // Set the source of the image element to the URL
            await imgElement.decode(); // Wait for the image to load

            const imgTensor = tf.browser.fromPixels(imgElement); // Convert pixel from HTML to data tensor
            const predictions = await model.classify(imgTensor);
            setPredictions(predictions);
            setIsLoading(false);
        }

    }

    const handleImageUpload = (e) => {
        const file = e.target?.files[0];
        setImage(URL.createObjectURL(file));
    }

    return (
        <section className="wrapper">
            <h2>Image Classification</h2>
            <p>using Tensorflow.js</p>

            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <br/>

            {image && (
                <>
                    <div className="img-wrapper">
                        <img src={image} alt="Uploaded" />
                    </div>

                    <button onClick={classifyImage} disabled={isLoading} className="btn-action">
                        {isLoading ? "Classifying..." : "Classify Image"}
                    </button>
                </>
            )}


            {predictions.length > 0 && (
                <>
                    <h3 className="title">Prediction Result</h3>
                    <ul className="list-result">
                        {predictions.map((prediction, index) => (
                            <li key={index} className="result">
                                {prediction.className} :{" "}
                                <strong>{Math.round(prediction.probability * 100)}%</strong>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <p className="note">NOTE: More accurate results can be trained with complex machine learning model concepts</p>
        </section>
    );
}

export default ImageClassification;
