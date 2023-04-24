from django.test import TestCase
import os 
import tensorflow as tf 
from tensorflow import keras
from keras.models import model_from_json
import tensorflow_hub as hub
from Flowerz.settings import MODEL_WEIGHTS_PATH , MODEL_CONFIG_PATH
from .utils.modelutils import MlModel

# Create your tests here.
class ModelTestCase(TestCase):

    def seTup(self):
        pass

    def test_model_summary(self):
        custom_objects={'KerasLayer': hub.KerasLayer}
        model = MlModel(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH,custom_objects ).get_model()
        self.assertTrue(len(model.trainable_weights))