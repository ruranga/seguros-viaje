#!/bin/bash

if ["$1" == ""]; then
	echo "especifique comentario para el commit entre comillas"
	exit 1;
fi

git add -A .
git commit -m "$1"
git push