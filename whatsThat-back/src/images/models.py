from django.db import models
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
# importing the model
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2, decode_predictions, preprocess_input

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classification = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    probability = models.FloatField(max_length=50, blank=True)

    def __str__(self):
        return "Image classified at {}".format(self.uploaded.strftime("%m-%d-%Y, %H:%M"))

    def save(self, *args, **kwargs):
        try:
            img = load_img(self.picture, target_size=(299,299))
            img_array = img_to_array(img)
            ## model takes 4D array bcoz it can use multiple images
            ## but our is only 1 so 1 at the beginning 
            ## we need to convert our 3D array to 4d array (299, 299, 3) -> (1, 299, 299, 3)
            ## we can do so by using numpy
            to_pred = np.expand_dims(img_array, axis=0) #(1,299,299, 3)

            # preprocess input
            preprocess = preprocess_input(to_pred)
            ## assign model
            model = InceptionResNetV2(weights='imagenet')
            prediction = model.predict(preprocess) ## returns large array of 0,0...some number
            
            # this decodes the prediction
            decoded = decode_predictions(prediction)[0][0]
            thingName = decoded[1]
            probab = decoded[2]
            #print(decoded)
            #print(thingName)
            #print(probab)

            self.classification = thingName
            self.probability = probab
            print('success')
        except Exception as e:
            print('classification failed', e)
        super().save(*args, **kwargs)

