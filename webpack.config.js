// ИМПОРТИРУЕМ МОДУЛИ И ОПРЕДЕЛЯЕМ МОДУЛИ В КОНСТАНТЫ.
const path = require('path')
// HtmlWebpackPlugin - плагин для автоматического создания html файла в готовой сборке из исходного шаблона.
const HtmlWebpackPlugin = require('html-webpack-plugin')
// FileManagerPlugin - плагин для автоматического удаления каталога dist.
const FileManagerPlugin = require('filemanager-webpack-plugin')
// MiniCssExtractPlugin - плагин для извлечения стилей из JS в отдельный файл.
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// ВСЕ НАСТРОЙКИ ВЕБПАКА ПОМЕЩАЕМ В ОБЪЕКТ module.exports

module.exports = {
  // entry (точка входа) - файл, который Webpack компилирует первым и если в этом файле подключаются зависимости, то эти зависимости тоже обрабатываются.
  entry: path.join(__dirname, 'src', 'index.js'),
  // output (Точка выхода) - каталог, в который Webpack компилирует точки входа.
  output: {
    path: path.join(__dirname, 'dist'),
    // filename - итоговый файл, в который компилируется вся сборка.
    filename: 'index.[contenthash:7].js',
  },

  module: {
    rules: [
      {
        // Для всех модулей с расширением .js
        test: /\.js$/,
        // webpack будет применять плагин babel-loader
        use: 'babel-loader',
        // Кроме каталога, который указан в свойстве exclude
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|css)$/,
        // sass-loader - загрузчик файлов Sass/SCSS
        // sass компилятор файлов .scss в .css.
        // postcss-loader - загрузчик CSS файлов для пост-обработки. Должен работать с каким нибудь плагином.
        // postcss-preset-env - плагин для PostCSS, который конвертирует современный CSS в код, понятный большинству браузеров, включением необходимых полифилов.
        // css-loader загрузчик CSS-файлов
        // style-loader загрузчик стилей в DOM
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    // Создаём экземпляр плагина HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      // template - путь к входному файлу
      // __dirname - это файл webpack.config.js, содержит абсолютный путь корневому каталогу проекта
      template: path.join(__dirname, 'src', 'template.html'),
      // filename - имя выходного файла
      filename: 'index.html',
    }),
    // Создаём экземпляр плагина FileManagerPlugin
    new FileManagerPlugin({
      events: {
        // onStart - Запуск действия перед началом сборки
        onStart: {
          delete: ['dist'],
        },
      },
    }),
    // Создаём экземпляр плагина MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
    }),
  ],

  // DEVSERVER КОМПИЛИРУЕТ ИСХОДНЫЙ КОД, И ЗАПИСЫВАЕТ ФАЙЛЫ НЕ НА ДИСК, А В ОПЕРАТИВНУЮ ПАМЯТЬ.
  devServer: {
    // watchFiles указывает на каталог src, за которыми будет вестись наблюдение и в случае, если в каталоге произойдут изменения, веб сервер автоматически сделает сборку проекта и перезагрузит страницу браузера.
    watchFiles: path.join(__dirname, 'src'),
    // port указывает порт на котором будет работать веб-сервер, по умолчанию - localhost:8080.
    port: 5858,
  },
}
