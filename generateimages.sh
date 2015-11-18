mkdir -p thumbs
echo "[" >> images.json
for f in *.jpg
do
	echo "'$f'," >> images.json
  convert -thumbnail 200 $f thumbs/thumb-$f
done

echo "]" >> images.json
