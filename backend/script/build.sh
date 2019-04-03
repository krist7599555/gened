rm -rf ./dist
tsc --build
bash "./${BASH_SOURCE%/*}/rsyncsrc.sh"
