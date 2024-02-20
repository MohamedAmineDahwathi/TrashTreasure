# TrashTreasure


TrashTreasure is a React Native application aimed at making the world a better place by encouraging more people to recycle. By allowing users to take pictures of waste items, the app leverages a machine learning model to identify the type of the recyclable item and how it should be properly disposed of or recycled.
This app integrates with a Flask backend for image processing, where the machine learning model developed in the Garbage Segregation repository by srijarkoroy is utilized to classify the waste items.

## Setup Frontend - React Native

Follow these steps to set up and run the TrashTreasure app:

### Prerequisites

- Node.js and npm installed on your machine.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Python and pip installed for running the Flask backend.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/TrashTreasure.git

2.   ```bash
     cd TrashTreasure

3.   ```bash
     npm install
  
## Setup Backend - Flask

### Prerequisites
Python installed on your machine

### Dependencies
    
         pip install Flask tensorflow numpy Pillow flask-cors


# Get the Trained Machine Learning Model

The Flask backend relies on a TensorFlow model trained and developed in the Garbage Segregation repository [[link](doc:linking-to-pages#anchor-links)](https://github.com/srijarkoroy/Garbage_Segregation).

# Input Data

Using the API, send an image captured from the mobile client to the API endpoint. The API classifies the data and responds with the predicted material type.

# Acknowledgments
Significant thanks to the machine learning community and, most notably, the creators and contributors of the Garbage Segregation project [[link](doc:linking-to-pages#anchor-links)](https://github.com/srijarkoroy/Garbage_Segregation), which empowered the TrashTreasure platform to bring this intelligent recycling system to reality.
