# PUF on ME - image editing app
Make PUF!! PUF (Put 'Ur Filter) On Me - image editing app in a browser that supports 4 different filters: greyscale, sepia, reflect and blur.

![app screenshot](https://github.com/katerynaHutyryak/PUFonME-server/blob/main/Screenshot%202023-08-30%20at%2016.21.38.png)

## Table of content
* [Features](#features)
* [How it works](#how-it-works)
* [How to use it](#how-to-use-it)

  
## Features
* Image upload,
* Applying filters to images,
* Files auto-deletion from the server every 24h.

## How it works
On the lowest level - every file is a simple array of bits. We can manipulate bit values to change a file. In my app I process JPEG files, which are 32-bit images, meaning that every 32 bits (aka 4 bytes) represent 1 pixel, while every pixel represents an RGBA: red, green, blue, and alpha ordered channels (1 byte each).

To obtain a pixel data out of an image I used jpeg-js - a pure javascript JPEG encoder and decoder for node.js. It decodes an image and returs an object with the neccesarry image data and a Buffer - an array of pixels.

I used these values to apply filter logic to every pixel of an image with `ImageEditor class`. 
Then a new object with edited Buffer and image data are used to encode an image to a JPEG file, and return to a client.

![Schema](https://github.com/katerynaHutyryak/PUFonME-server/blob/main/CLI.png)

## How to use it
### To try it in the browser
Go to: https://pufonme-app-rcepd.ondigitalocean.app 

Press 'Choose File' button, choose an image, upload it, select and apply a filter.

![gif](https://github.com/katerynaHutyryak/PUFonME-server/blob/main/ezgif.com-resize.gif)

#### Please, note: 
* depending on an image size, loading might take a few seconds,
* application of a greyscale, sepia or reflect filter might take 1-10 seconds,
* application of blur usually takes up to 30 seconds (I work on impoving it!),
* an original vertical IPhone image will be rotated 90* to the left once you apply a filter due to the specifics of EXIF data. However, if an image was edited in any way (native IPhone editing solutions or apps like Lightroom), the original image rotation will be preserved.

### To run it locally
Clone the Git repo, open in a code editor of your choice and run `npm init` command to install the dependencies. 

Once all the dependencies were installed, run `npm run start` to start the server. 

Open a browser and go to http://127.0.0.1:8080/index.html where the page should be served.

