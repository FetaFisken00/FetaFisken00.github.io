import gulp from 'gulp'
const { task, src, dest, series, parallel } = gulp;
import browserify from "browserify";
import source from "vinyl-source-stream";
import tsify from "tsify";
import uglify from "gulp-uglify";
import gulpSourcemaps from 'gulp-sourcemaps'
const { init, write } = gulpSourcemaps;
import buffer from "vinyl-buffer";
var paths = {
  pages: ["src/*.html"],
};
task("copy-html", function () {
  return src(paths.pages).pipe(dest("dist"));
});
task(
  "default",
  series(parallel("copy-html"), function () {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/main.ts"],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(write("./"))
      .pipe(dest("dist"));
  })
);
