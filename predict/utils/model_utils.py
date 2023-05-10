from functools import wraps
import os
import logging
from pathlib import Path
from PIL import Image
import pickle

import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras.models import model_from_json
import tensorflow_hub as hub

from Flowerz.settings import  MODEL_LABELS_PATH , MODEL_CONFIG_PATH , MODEL_WEIGHTS_PATH


def get_labels(filename):
    """Loads labels from label_names.json file \n
    return a dictionnary(key = class_id, values= [default_name, better_name])
    - `default_name` is the default name of the class in the original dataset
    - `better_name` is the most refered name of the class on wikipedia (often scientific name)
    """
    assert Path(filename).is_file()
    labels_dict = {}
    
    with open(filename, "r") as file:
        data = json.load(file)
    for idx , i in enumerate(data) :
        labels_dict[idx] = list(i.values())
    return labels_dict

labels = get_labels(MODEL_LABELS_PATH)
custom_objects={'KerasLayer': hub.KerasLayer}

def get_model(model_cfg_path,model_weight_path,custom_object):
    """Build a keras model loading json config , weights and custom_objects """
    if Path(model_cfg_path).is_file() and Path(model_weight_path).is_file():
        try :
            with open(model_cfg_path) as file:
                model_cfg = file.read()
        except Exception as e :
            print(e)
            logging.exception(e)
        else :
            with keras.utils.custom_object_scope(custom_object):
                model = model_from_json(model_cfg)
                model.load_weights(model_weight_path)
                return model


def process_image(img_paths, img_res=224):
    """Process Images for the Model \n Apply : squeeze , resize and expand dim \n Input : images path
     , image resolution , returns single or array of images """
    if not img_paths:
        return []
    processed = []
    for img_path in img_paths:
        if not Path(img_path).is_file():
            raise FileNotFoundError(f"{img_path}")
        img = Image.open(img_path)
        array_img = tf.keras.utils.img_to_array(img)
        squeezed_img = tf.squeeze(array_img)
        resized_img = tf.image.resize(squeezed_img, (img_res, img_res))/255.0
        processed.append(resized_img)
    if len(img_paths) == 1:
        out_img = np.expand_dims(processed[0], axis=0)
        return out_img
    return tf.stack(processed)



def post_process(prediction, labels, top_k=3):
    """Process model predictions\nInput: prediction (array), labels, top_k\nReturns top_k predicted
    values and related classes"""
    if len(prediction.shape) > 1 and prediction.shape[0] > 1:
        prediction = tf.math.reduce_mean(prediction, axis=0)
    top_values, top_indices = tf.math.top_k(prediction, top_k)
    top_indices = tf.squeeze(top_indices)
    top_values = tf.squeeze(top_values)
    #top_classes = [labels[int(key)] for key in top_indices.numpy()]

    prediction_dict = {}
    for idx, value in zip(top_indices.numpy(), top_values):
        class_name = '-'.join(labels[idx])
        prediction_dict[class_name] = value.numpy()

    prediction_dict = {key: str(value) for key, value in prediction_dict.items()}
    return prediction_dict


def custom_predict(model, data, labels, top_k=3):
    """Wraps the model.predict() method , apply post_process \n Input model , data , top_k , \n
    Return post_process"""
    prediction = model.predict(data)
    return post_process(prediction, labels, top_k=top_k)



""" 
def post_process(prediction, labels, top_k=3):
    if len(prediction.shape) > 1 and prediction.shape[0] > 1:
        prediction = tf.math.reduce_mean(prediction, axis=0)
    top_values , top_indices = tf.math.top_k(prediction, top_k)
    top_indices = tf.squeeze(top_indices)
    top_values = tf.squeeze(top_values)
    top_classes = [labels[int(key)] for key in list(top_indices.numpy())]

    prediction_dict = dict(zip(top_classes,top_values.numpy()))
    [prediction_dict.update({i:str(prediction_dict[i])}) for i in prediction_dict.keys()]
    return prediction_dict
 """