#!/bin/bash

repodir=`dirname $0`

ln -sf $repodir/index.html index.html
ln -sf $repodir/reset.css reset.css
ln -sf $repodir/script.js script.js
ln -sf $repodir/style.css style.css

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
