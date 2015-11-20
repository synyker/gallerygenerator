
base=/home/raksuntalli/webapps/synyker_eu/img/
ssh raksuntalli@raksuntalli.fi "cd $base; mkdir -p $1/img" &&
scp ./* raksuntalli@raksuntalli.fi:$base/$1/img/


ssh raksuntalli@raksuntalli.fi "cd $base/$1 && /home/raksuntalli/repos/gallerygenerator/generategallery.sh" 
