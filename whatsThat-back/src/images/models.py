from django.db import models
from keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classification = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

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
            print(to_pred.shape)
        except:
            print('classification failed')
        super().save(*args, **kwargs)

