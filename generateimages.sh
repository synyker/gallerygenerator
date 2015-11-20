curdir=$PWD
gallery_repo='/home/raksuntalli/repos/gallerygenerator'

cd $gallery_repo
git pull

cd $curdir

cp $gallery_repo/html/* .

mkdir -p thumbs
echo "[" >> images.json
for f in img/*.jpg
do
	echo "\"${f##*/}\"," >> images.json
  convert -thumbnail 200 $f thumbs/thumb-${f##*/}
done

echo "]" >> images.json
