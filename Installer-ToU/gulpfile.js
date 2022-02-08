import gulp from 'gulp'
const { task, src, dest, series, parallel } = gulp;
import browserify from "browserify";
import source from "vinyl-source-stream";
import watchify from "watchify";
import tsify from "tsify";
import fancy_log from "fancy-log";
var paths = {
  pages: ["src/*.html"],
};
var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
task("copy-html", function () {
  return src(paths.pages).pipe(dest("dist"));
});
function bundle() {
  return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(dest("dist"));
}
task("default", series(parallel("copy-html"), bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);
