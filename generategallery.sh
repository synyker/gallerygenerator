cp /home/raksuntalli/repos/gallerygenerator/html/* .

mkdir -p thumbs
echo "[" >> images.json

dir=('img/*.jpg')
files=($dir)
for f in "${files[@]::${#files[@]}-1}"
#for f in img/*.jpg
do
	echo "\"${f##*/}\"," >> images.json
  convert -thumbnail 200 $f thumbs/thumb-${f##*/}
done

last=${files[@]: -1:1}
echo "\"${last##*/}\"" >> images.json

echo "]" >> images.json
