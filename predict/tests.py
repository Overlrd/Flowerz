import os
import random

from django.test import TestCase

from Flowerz.settings import MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, MEDIA_URL, MEDIA_ROOT
from .utils.model_utils import (
    get_model,
    custom_predict,
    process_image,
    labels,
    custom_objects
)

IMAGE_ROOT = os.path.join(MEDIA_ROOT, "images")
def get_random_images(image_media_root, num_images=1):
    images = []
    for i in range(num_images):
        img_file = random.choice(os.listdir(image_media_root))
        img_file = os.path.join(image_media_root, img_file)
        if num_images == 1:
            return img_file
        images.append(img_file)
    return images

class ModelTestCase(TestCase):
    def setUp(self):
        pass

    def test_model_summary(self):
        model = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)
        self.assertIsNotNone(model)
        expected_shape = (None, len(labels))
        self.assertEqual(model.output_shape, expected_shape)

class ProcessImageTestCase(TestCase):
    def setUp(self):
        pass

    def test_process_single_image(self):
        img_path = get_random_images(IMAGE_ROOT)
        img = process_image([img_path])
        self.assertEqual(img.shape, (1, 224, 224, 3))

    def test_process_multiple_images(self):
        img_paths = get_random_images(IMAGE_ROOT, 2)
        img = process_image(img_paths)
        self.assertEqual(img.shape, (2, 224, 224, 3))

    def test_empty_input(self):
        img_paths = []
        img = process_image(img_paths)
        self.assertEqual(img, [])

class CustomPredictTestCase(TestCase):
    def setUp(self):
        self.model = get_model(MODEL_CONFIG_PATH, MODEL_WEIGHTS_PATH, custom_objects)
        self.labels = labels
        self.top_k = 3

    def test_custom_predict(self):
        img_paths = get_random_images(IMAGE_ROOT, 5)
        data = process_image(img_paths)
        result = custom_predict(self.model, data, self.labels, self.top_k)
        self.assertIsInstance(result, dict)
        self.assertGreaterEqual(len(result), 1)
