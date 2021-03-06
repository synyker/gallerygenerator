# Photo Gallery Generator
Generates neat JavaScript galleries of a bunch of your photos. You can either use the script to both upload the photos to the server of your choosing (copyimages.sh) or just do that yourself and run the gallery generation script (generategallery.sh).

# Usage instructions, from local machine:
1. Have a bunch of images in a folder on your local machine.
2. Clone this repository on your server.
3. Clone this repository on your local machine.
4. Create a file called userdata.txt in the repository folder on your local machine.
5. Fill in the following data in this order, one item per line into userdata.txt:
  1. Server username
  2. Server hostname
  3. Destination folder for your gallery on the server
  4. Location of the repository on your server
6. To avoid inputting your password multiple times set up public key authentication.
7. Run the copyimage.sh script in the folder where you have your images.
8. The script uploads the images, generates thumbnails and creates symlinks to the where you have the repository.


# Usage instructions, just on server side
1. Have a bunch of images in a folder on your server.
2. Clone this repository
3. Run the generategallery.sh script in the photo folder
4. The script generates thumbnails and creates symlinks to the where you have the repository.
