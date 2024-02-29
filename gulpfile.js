import gulp from 'gulp';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import replace from 'gulp-replace';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpIf from 'gulp-if';
import autoPrefixer from 'gulp-autoprefixer';
import group_media from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import ttf2woff2 from 'gulp-ttf2woff2';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';
import webpackStream from 'webpack-stream';
import newer from 'gulp-newer';

// Переменные gulp и плагинов
const { src, dest, watch, parallel, series } = gulp;
const brSync = browserSync.create();
const sass = gulpSass(dartSass);

// Переменная окружения
let isDev = true;

// Если не нужен webp переключить на false
let isWebp = true;

// Пути ========================================
const srcFolder = './src';
const distFolder = './dist';
const path = {
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/main.js`,
    img: `${srcFolder}/img/**/*.*`,
    // webp: `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
    svg: `${srcFolder}/img/svg/*.svg`,
    font: `${srcFolder}/fonts`,
    copy: `${srcFolder}/files/**/*.*`,
  },
  dist: {
    html: `${distFolder}`,
    scss: `${distFolder}/css`,
    js: `${distFolder}/js`,
    img: `${distFolder}/img`,
    svg: `${distFolder}/img/svg`,
    font: `${distFolder}/fonts`,
    copy: `${distFolder}/files`,
  },
  watch: {
    html: [`${srcFolder}/*.html`, `${srcFolder}/partials/**/*.html`],
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.*`,
    svg: `${srcFolder}/img/svg/*.svg`,
    font: `${srcFolder}/fonts/**/*.*`,
    copy: `${srcFolder}/files/**/*.*`,
  },
};

// Очиистка папки dist ====================================
const clean = () => {
  return deleteAsync(distFolder);
};

// browsersync ===========================================
const browsersync = () => {
  brSync.init({
    server: {
      baseDir: distFolder,
    },
    browser: 'chrome',
    notify: false,
    // tunnel: true,
  });
};

// watcher ===========================================
const watcher = () => {
  watch(path.watch.html, html);
  watch(path.watch.scss, styles);
  watch(path.watch.js, js);
  watch(path.watch.img, images);
  watch(path.watch.svg, sprite);
  watch(path.watch.font, fonts);
  watch(path.watch.copy, copyFiles);
};

// html =======================================================
const html = () => {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(replace('../../img', 'img'))
    .pipe(replace('../img', 'img'))
    .pipe(gulpIf(isWebp, replace('.jpg', '.webp')))
    .pipe(gulpIf(isWebp, replace('.png', '.webp')))
    .pipe(dest(path.dist.html))
    .pipe(brSync.stream());
};

// styles =======================================================
const styles = () => {
  return (
    src(path.src.scss, { sourcemaps: isDev })
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpIf(!isDev, group_media()))
      .pipe(replace('../../../img', '../img'))
      .pipe(replace('../../img', '../img'))
      .pipe(gulpIf(isWebp, replace('.jpg', '.webp')))
      .pipe(gulpIf(isWebp, replace('.png', '.webp')))
      .pipe(autoPrefixer())
      // Без сжатия, если файл без сжатия не нужен, закомментировать строчку
      .pipe(gulpIf(!isDev, dest(path.dist.scss)))
      // Сжатый файл
      .pipe(
        sass(gulpIf(!isDev, { outputStyle: 'compressed' })).on(
          'error',
          sass.logError
        )
      )
      .pipe(rename({ extname: '.min.css' }))
      .pipe(dest(path.dist.scss, { sourcemaps: isDev }))
      .pipe(brSync.stream())
  );
};

// js ============================================================
function getWebpackOptions(isMinimize) {
  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'source-map' : false,
    output: {
      filename: isDev ? 'main.min.js' : isMinimize ? 'main.min.js' : 'main.js',
    },
    performance: {
      hints: isMinimize ? 'warning' : false,
    },
    module: {
      rules: [
        !isDev
          ? {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', { targets: 'defaults' }]],
                },
              },
            }
          : null,
      ],
    },
    optimization: {
      minimize: isMinimize,
    },
  };
}

const js = () => {
  return (
    src(path.src.js)
      // Без сжатия
      .pipe(webpackStream(getWebpackOptions(false)))
      .pipe(dest(path.dist.js))
      // Сжатый файл
      .pipe(gulpIf(!isDev, webpackStream(getWebpackOptions(true))))
      .pipe(gulpIf(!isDev, dest(path.dist.js)))
      .pipe(brSync.stream())
  );
};

// images ============================================================
// const images = () => {
//   return (
//     src(path.src.img)
//       // webp
//       .pipe(gulpIf(isWebp, newer(path.dist.img)))
//       .pipe(gulpIf(isWebp, webp()))
//       .pipe(gulpIf(isWebp, dest(path.dist.img)))
//       // image
//       .pipe(gulpIf(isWebp, src(path.src.img)))
//       .pipe(newer(path.dist.img))
//       .pipe(gulpIf(!isDev, imagemin({ verbose: true })))
//       .pipe(dest(path.dist.img))
//       .pipe(brSync.stream())
//   );
// };

const images = () => {
  return (
    src(path.src.img)
      // webp
      .pipe(gulpIf(isWebp, newer(path.dist.img)))
      .pipe(gulpIf(isWebp, webp()))
      .pipe(gulpIf(isWebp, dest(path.dist.img)))
      // image
      .pipe(gulpIf(!isWebp, newer(path.dist.img)))
      .pipe(gulpIf(!isDev, gulpIf(!isWebp, imagemin({ verbose: true }))))
      .pipe(gulpIf(!isWebp, dest(path.dist.img)))
      .pipe(brSync.stream())
  );
};

// sprite =================================================================
const sprite = () => {
  return src(path.src.svg)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: '../../',
            sprite: 'sprite.svg',
            example: isDev,
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '(fill|stroke)',
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.dist.svg))
    .pipe(brSync.stream());
};

// fonts =================================================================
const fonts = () => {
  return src(path.src.font + '/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest(path.dist.font))
    .pipe(src(path.src.font + '/*.woff2'))
    .pipe(dest(path.dist.font));
};

// Копирует файлы
const copyFiles = () => {
  return src(path.src.copy).pipe(dest(path.dist.copy)).pipe(brSync.stream());
};

// Переключает переменную окружения
function toProd(cb) {
  isDev = false;
  cb();
}

export { clean };
export { browsersync };
export { watcher };
export { html };
export { styles };
export { js };
export { images };
export { sprite };
export { fonts };
export { copyFiles };

const base = series(
  clean,
  parallel(html, styles, js, images, sprite, fonts, copyFiles),
  parallel(browsersync, watcher)
);

const build = series(toProd, base);

export { build };
export default series(base);
