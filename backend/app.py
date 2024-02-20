from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from PIL import Image
import io
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# Load the pre-trained Keras model (make sure to provide the correct path to the model)
model = load_model('model/model.h5')

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)  # Adjust the target_size to match your model's input shape
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image/255.0  # Normalize image if your model expects normalized inputs

    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return {'error': 'No file provided'}, 400
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No selected file'}, 400
    # Process the file and predict
    img = Image.open(file.stream)
    processed_image = preprocess_image(img, target_size=(300, 300))  # Update this line

    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)  # Assuming a categorical classification model
    categories = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]
    return  jsonify({
        'predicted_class': categories[int(predicted_class[0])]
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  
