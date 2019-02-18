rm -rf ./dist
tsc --build tsconfig.json
bash "./${BASH_SOURCE%/*}/rsyncsrc.sh"
