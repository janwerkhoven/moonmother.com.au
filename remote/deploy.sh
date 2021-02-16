#!/usr/bin/env bash

set -e
set -o pipefail

user=jw
host=singapore.floatplane.dev
domain=moonmother.com.au

echo "----------"
echo "Deploying:"
echo $domain
echo $user@$host
echo "----------"

(
  set -x
  scp remote/deploy-remote.sh $user@$host:~/
  ssh -t $user@$host "~/deploy-remote.sh $domain; rm -f ~/deploy-remote.sh"
)
