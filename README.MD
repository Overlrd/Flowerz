## Description
This is *Flowerz* , my capstone project for the course CS50’s Web Programming with Python and JavaScript. It's an AI-Powered flower identification and information gathering app  built with Django , Html/Css , React and Tensorflow.
I built it because i love flowers but sadly i don't know so much about them.
The app uses a Tensorflow Model, a wrapper for the [Trefle Botanical Data API](https://trefle.io/), and Wikipedia in the backend, and [React](https://react.dev/), [Pico.css](https://picocss.com/), [Webpack](https://webpack.js.org/) and the [Swiper](https://swiperjs.com/) packages in the front end to provide flower's image recognition , information gathering and search functionnality to the user's.

## Distinctiveness and Complexity
I believe my project satisfies the distinctiveness and complexity requirements because it has nothing in common with the other course projects. 
In fact, in the course, we built:

* A Google search clone
* A project similar to wikipedia that enables us to create an article with a markdown system and edit it.
* A Bid auction website
* A SPA (single page app) - mail app
* A network App similar to tweeter in which we can create/like a post, edit our own post and follow/unfollow people.

My project is an AI-powered website wich allow user's by uploading pictures of a flower to get informations about the flower using a Deep Learning model.
User's can also search for a flower or any plant by the name and get informations about it.
My app also use a wrapper i've  built myself to extract informations from the [Trefle Botanical API](https://trefle.io/).

## Files and directories
This is the content of the root folder of the project.
```
├── Flowerz
├── LICENSE
├── manage.py
├── media
├── package.json
├── package-lock.json
├── predict
├── README.MD
├── requirements.txt
├── search
├── src
├── static
├── templates
└── webpack.config.js
```

The *Flowerz* Django project consists of three apps :
 - ```Flowerz```
 - ```predict```
 - ```search```

Directories :
 - ```media``` : The media root of the app, which includes two subdirectories:
    - ```images``` : Contains the images uploaded and submitted to the model for prediction.
    - ```test_images``` :Contains 5 flower images for testing purposes.
 - ```src``` :  The *src* directory contains the front-end React app with the following subdirectories:
    - ```components``` : Holds the components of the app.
    - ```static``` : Contains the static files (CSS and images).
    - ```utils``` :  Includes JavaScript utilities used to request and process data from the backend.
- ```templates``` : Contains the project's templates rendered by webpack.
- ```static``` : Holds the project's static files and bundles generated by webpack.

Files :
 - ```webpack.config.js``` : contains webpack's configuration 
 - ```package.json & package-lock.json``` :These files contain the configuration for [Node.js](https://nodejs.org/en), listing project dependencies and metadata. 
 - ```requirements.txt``` : Contains the required Python packages to run the app.

### Flowerz
Flowerz: The default app of the project.
```
├── asgi.py
├── __init__.py
├── settings.py
├── tests.py
├── urls.py
├── utils
│   ├── __init__.py
│   └── wikipedia_utils.py
├── views.py
└── wsgi.py
```

- ```settings.py``` : The Django project's settings.
- ```urls.py``` : This file contains all the urls created for our app.
- ```utils(directory)``` : The utils package contains utilitary modules which are used in both the *predict* and *search* apps to extract data from Wikipedia.
- ```utils/wikipedia_utils.py``` : This file contains a class named WikiInfoExtractor which allow to extract and process data from wikipedia trhough their API.This class i used by the search and predict functionnalities of the app to get additional informations about flowers or plants.
- ```views.py``` : contains the views of the app.

### Predict
The predict app allow to recognize a flower by using a Tensorflow Computer Vision  model which takes images as input and predict their potential names.
```
├── admin.py
├── apps.py
├── forms.py
├── __init__.py
├── magi
│   ├── assets
│   │   ├── label_names.json
│   │   ├── model_config.json
│   │   └── model_weights.h5
│   └── __init__.py
├── models.py
├── tests.py
├── urls.py
├── utils
│   ├── model_utils.py
│   └── util.py
└── views.py
```

the predict package contains:
- ```admin.py``` : This is where i register the app's models into the admin panel.
- ```forms.py``` : This file contains the Django __forms.ModelForm__ object which handle images uploading and an utilitary function to process the form input and return images path and a custom image object.
- ```magi(directory)``` :  The *magi* directory holds the assets for the model.
    - ```label_names.json``` : Contains the labels of the [Oxford102_Flowers](https://www.tensorflow.org/datasets/catalog/oxford_flowers102) Dataset.
    - ```model_config.json``` :  Contains the architecture of the model used for rebuilding it saved as a json file.
    - ```model_weights.h5``` : contains the saved weights of the model saved in H5 format.
- ```utils(directory)``` : contains some utility modules for the app.
    - ```model_utils.py``` : contains the functions to build and use the model for inference.
    - ```util.py``` : This file contains utility functions that are independent of the model. These utilities are designed to manage the app's response generation.
- ```models.py``` : contains the models of this app.
- ```tests.py``` : contains the tests of this app.
- ```urls.py``` contains the urls of this app.
- ```views.py``` : contains the views , to upload, process and predit images with the model and gather informations about the predicted image. 

### Search
The search app provides a search functionnality to the users using the [trefle-api](#trefle-api) package.
```
├── admin.py
├── apps.py
├── __init__.py
├── models.py
├── tests.py
├── urls.py
└── views.py
```
- ```admin.py``` : This is where i register the app's models into the admin panel.
- ```models.py``` : contains the models of this app.
- ```urls.py``` contains the urls of this app.
- ```views.py``` : contains the views to gather information via the Trefle wrapper and provide search functionnality.
## How to Run ?

Requirements :
 - Python version ```3.10.6```
 - An API KEY from the [Trefle API](https://trefle.io/)

To run the app :
 - Create and activate a Python virtual environement in the root folder of the project.
    ```shell
    python3 -m venv my_env
    source ./my_env/bin/activate
    ```
 - Install the required python packages listed inside the ```resuirements.txt``` file. 
    ```bash
    pip install -r requirements.txt
    ```
 - Create a ```.env``` file in the *Flowerz* default __app__ , not in the ROOT folder.
    ```shell
    cd Flowerz
    touch .env
    ```
 - Save your api key in the ```.env```  file as follows :
    ```python
    TREFLE_API_KEY = "your api key"
    ```
 - Make migrations and Start the django server 
    ```shell
    python3 manage.py makemigrations
    python3 manage.py migrate
    python3 manage.py runserver
    ```

## Additional information

### The front End
As I used Node.js packages for the front end of the app, if you need to run the project in development mode, make sure to fulfill the following requirements:
- Node.js version ```20.5.0```
- npm version ```9.8.1```
- install the required packages in the package.json file in the root of the project.

To start the webpack bundler in watch mode, updating changes in real-time in the src directory of the project, run:
```shell
npm run dev 
```
To run webpack in production mode, generating production-ready bundles for the project, use:
```shell
npm run build
```

### The Model
The app uses a Tensorflow Computer Vision model that I built by extracting feature vectors from the [MobileNet V2](https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4) model, which was pre-trained on the ImageNet (ILSVRC-2012-CLS) dataset. I then fine-tuned the resulting model on the [Oxford Flowers 102](https://www.tensorflow.org/datasets/catalog/oxford_flowers102) dataset.

The model includes the following components:
 - Data Augmentation: Implemented to reduce overfitting and enhance generalization capabilities.
 - A Classification Head : Designed to generate predictions for flower categories.

The training data comes from the [Oxford Flowers 102 dataset](https://www.tensorflow.org/datasets/catalog/oxford_flowers102), which consists of 102 flower categories. Each class comprises between 40 and 258 images, and there are categories that exhibit significant variations within the category, as well as several very similar categories.
The notebook used for training and exporting the model can be accessed [here](https://github.com/Overlrd/Flowerz-Notebooks/blob/main/flowerz.ipynb).

Note: Within the app, the label_names.json file contains the label names and includes two values for most of the classes: a *default_name*, which represents the label name provided by the dataset, and a *better_name*, which corresponds to the title of the Wikipedia page for the flower (often the scientific or common name of the flower).

### trefle-api
The app uses a Python package called trefle-api to provide a search feature. This package serves as a wrapper for the [Trefle Global Plants API](https://trefle.io/), which I specifically created for the app. . Please check the documentation of the package [here](https://github.com/Overlrd/trefle#trefle-api).


