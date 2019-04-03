{
  "compilerOptions": {
    "allowJs": true,
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "noImplicitAny": false,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "types": ["webpack-env"],
    "rootDir": "./",
    "baseUrl": "./src",
    "outDir": "./dist",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "plugins": [{ "name": "ts-vue-plugin" }],
    "strictPropertyInitialization": false,
    "paths": {
      "@/*": ["*", "components/*", "views/*"],
      "@components/*": ["components/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  }
}
