#!/usr/bin/env bash

set -e
set -o pipefail

branch=$(git rev-parse --abbrev-ref HEAD)
revision=$(git rev-parse --short HEAD)

echo "----------"
echo "Deploying:"
echo $branch
echo $revision
echo "----------"
echo "scp install.sh deploy@server-singapore.nabu.io:/var/www/moonmother.com.au"
scp install.sh deploy@server-singapore.nabu.io:/var/www/moonmother.com.au
echo "----------"
echo 'ssh deploy@server-singapore.nabu.io "cd /var/www/moonmother.com.au; ./install.sh $branch $revision; rm ./install.sh"'
ssh deploy@server-singapore.nabu.io "cd /var/www/moonmother.com.au; ./install.sh $branch $revision; rm ./install.sh"
