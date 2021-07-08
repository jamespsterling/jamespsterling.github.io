const { src, dest, parallel, series, watch } = require("gulp");

// Load plugins
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const browsersync = require("browser-sync").create();

// BrowserSync
function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clear() {
  return src("./dist/*", {
    read: false,
  }).pipe(clean());
}

function img() {
  return src("./src/img/*").pipe(imagemin()).pipe(dest("./dist/img"));
}

function js() {
  const source = "./src/js/*.js";

  return src(source)
    .pipe(changed("./dist/js/"))
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest("./dist/js/"))
    .pipe(browsersync.stream());
}

function css() {
  const source = [
    "node_modules/bootstrap/scss/*.scss",
    "./src/scss/**/*.scss",
    "./src/scss/**/*.sass",
  ];

  return src(source)
    .pipe(changed("./dist/css/"))
    .pipe(sass())
    .pipe(concat("styles.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(cssnano())
    .pipe(dest("./dist/css/"))
    .pipe(browsersync.stream());
}

function watchFiles() {
  watch("./src/scss/*", css);
  watch("./src/js/*", js);
  watch("./src/img/*", img);
  series(browserSyncReload);
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(parallel(js, css));
exports.img = parallel(img);
