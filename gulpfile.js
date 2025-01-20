const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const ghPages = require("gulp-gh-pages");

// Static server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  // gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*").on("add", gulp.parallel("icons"));
  gulp.watch("src/img/**/*").on("add", gulp.parallel("images"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});


gulp.task(
    "default",
    gulp.parallel(
        "watch",
        "server",
        "styles",
        "scripts",
        "fonts",
        "icons",
        "html",
        "images"
    )
);

gulp.task("deploy", function () {
    return gulp.src("./dist/**/*")
        .pipe(ghPages({
            branch: 'gh-pages',
            origin: 'origin'
        }));
});