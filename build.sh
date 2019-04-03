cd backend
yarn build
cd ..

# cd frontend
# yarn build
# cd ..

cp -r ./frontend/dist/* ./backend/dist/src/public
