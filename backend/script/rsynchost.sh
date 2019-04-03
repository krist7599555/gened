server="root@128.199.216.159:/root/gened"
rsync -r ./dist $server
rsync ./package.json $server
