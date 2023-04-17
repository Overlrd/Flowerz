import os
from PIL import Image
import pickle

import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras.models import model_from_json
import tensorflow_hub as hub

from Flowerz.settings import  MODEL_LABELS_PATH


class MlModel():
    def __init__(self, config_path , weights_path ,custom_objects):
        """Build the Prediction model with provided config and set the provided weights """
        with open(config_path, 'r') as file :
            json_config = file.read()

        with keras.utils.custom_object_scope(custom_objects):
            self.model = model_from_json(json_config)

        self.model.load_weights(weights_path)

        with open(MODEL_LABELS_PATH, "rb") as file :
            self.label_names = pickle.load(file)

    def get_model(self):
        return self.model
    
    def process_image(self,img, img_res=224):
        image = np.squeeze(img)     
        image = tf.image.resize(image , (img_res,img_res))/255.0
        return image

    def predict(self, img_path, top_k=3):
        img = Image.open(img_path) 
        img = np.asarray(img)
        processed_img = self.process_image(img)        
        prediction = self.model.predict(np.expand_dims(processed_img, axis=0))  
        top_values , top_indices = tf.math.top_k(prediction, top_k)
        top_classes = [self.label_names[label_key] for label_key in top_indices.numpy()[0]]
        return top_values.numpy()[0], top_classes

    def predict_batch(self, img_paths, top_k=5):
        imgs = [Image.open(path) for path in img_paths]
        processed_imgs = [self.process_image(tf.keras.utils.img_to_array(img)) for img in imgs]        
        batch = tf.stack(processed_imgs)
        predictions = self.model.predict(batch)
        avg_prediction = tf.math.reduce_mean(predictions, axis=0)
        top_values, top_indices = tf.math.top_k(avg_prediction, top_k)
        top_classes = [self.label_names[key] for key in top_indices.numpy()]
        return top_values.numpy(), top_classes
