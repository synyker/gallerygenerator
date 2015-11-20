
base=/home/raksuntalli/webapps/synyker_eu/img/
#ssh raksuntalli@raksuntalli.fi "cd $base; mkdir -p $1/img" &&
#scp ./* raksuntalli@raksuntalli.fi:$base/$1/img/


ssh raksuntalli@raksuntalli.fi "bash -s" << EOF


cd $base/$1

curdir=$base/$1

#gallery_repo='/home/raksuntalli/repos/gallerygenerator'

#cd $gallery_repo
#git pull

#cd $curdir


#html='/html/*'


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


EOF
