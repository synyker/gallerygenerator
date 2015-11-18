mkdir -p thumbs
echo "\"images\":[" >> images.json
for f in img/*.jpg
do
	echo "\"${f##*/}\"," >> images.json
  convert -thumbnail 200 $f thumbs/thumb-${f##*/}
done

echo "]" >> images.json
