ln -s index.html ~/repos/gallerygenerator/html/index.html
ln -s reset.css ~/repos/gallerygenerator/html/reset.css
ln -s script.js ~/repos/gallerygenerator/html/script.js .
ln -s style.css ~/repos/gallerygenerator/html/style.css .

mkdir -p thumbs
rm images.json

echo "[" >> images.json

dir=('img/*.jpg')
files=($dir)
for f in "${files[@]::${#files[@]}-1}"
do
	echo "\"${f##*/}\"," >> images.json
  convert -thumbnail 200 $f thumbs/thumb-${f##*/}
done

last=${files[@]: -1:1}
echo "\"${last##*/}\"" >> images.json
convert -thumbnail 200 $last thumbs/thumb-${last##*/}

echo "]" >> images.json
