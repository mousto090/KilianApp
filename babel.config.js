module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
       'module-resolver',
       {
         root: ['./src'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           "@components": "./src/components",
           "@navigation": "./src/navigation",
           "@screens": "./src/screens",
           "@store": "./src/store",
           "@utils": "./src/utils",
         }
       }
     ]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
