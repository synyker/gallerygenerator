#!/bin/bash

userdata="`dirname $0`/userdata.txt"

user=$(sed -n '1p' < $userdata)
host=$(sed -n '2p' < $userdata)

base=$(sed -n '3p' < $userdata)
script=$(sed -n '4p' < $userdata)
ssh $user@$host "cd $base; mkdir -p $1/img" &&
scp ./* $user@$host:$base/$1/img/

ssh $user@$host "cd $base/$1 && $script"
