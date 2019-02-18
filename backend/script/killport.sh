lsof -i :$1 | xargs bash -c 'kill -9 ${10}'
