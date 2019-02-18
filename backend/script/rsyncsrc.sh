toks=('*.html' '*.scss' '*.json' '*.jpeg' '*.jpg' '*.png' '*.txt')
for tok in "${toks[@]}"; do
  find ./src -name $tok -exec rsync -R \{\} ./dist \;
done
