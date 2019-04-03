toks=('*.html' '*.scss' '*.json' '*.jpeg' '*.jpg' '*.png' '*.txt' '*.env*')
for tok in "${toks[@]}"; do
  find ./src -name "$tok" -exec rsync -R \{\} ./dist \;
done
cp .env ./dist
cp .env.prod ./dist
cp package.json ./dist
