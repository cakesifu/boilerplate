var path = require("path"),
    _ = require("lodash"),
    sequence = require("run-sequence"),
    gulp = require("gulp"),
    less = require("gulp-less"),
    clean = require("gulp-clean"),
    source = require("vinyl-source-stream"),
    sourcemaps = require("gulp-sourcemaps"),
    watchify = require("watchify"),
    browserify = require("browserify"),
    livereload = require("gulp-livereload"),

    mappedPaths = {
      'styles': 'client/styles',
      'dist': '.dist'
    },

    options = {
      env: process.env.NODE_ENV || "development",
      sourcemaps: false,
      minify: false,
      watch: false,
      debug: false
    };

gulp.task("watch", ["build"], function() {
  livereload.listen();

  gulp.watch(dir("styles", "**/*.less"), ["styles"]);
  gulp.watch(dir("dist", "**/*")).on("change", livereload.changed);
});

gulp.task("dist", function(done) {
  options.env = "production";
  options.minify = true;

  sequence(
    "build",
    done
  );
});

gulp.task("build", function(done) {
  sequence(
    "clean",
    "buildFiles",
    done
  );
});

gulp.task("clean", function() {
  return gulp.src(OPTS.outputDir, { read: false }).pipe(clean());
});

gulp.task("buildFiles", ["styles", "scripts"], function() {

gulp.task('styles', buildStyles);
gulp.task("scripts", buildScripts);


function dir(root) {
  var args = _.toArray(arguments);
  args[0] = mappedPaths[root] || root;
  return path.join.apply(path, args);
}

function handleError(errSection) {
  return function(err) {
    console.log(errSection, err);
  }
}

function buildScripts() {
  var bundler,
      entryPoint = "./client",

      bundlerOptions = {
        debug: options.debug
      };

  if (options.watch) {
    bundler = watchify(entryPoint);
    bundler.on("update", makeBundle);
  } else {
    bundler = browserify(entryPoint);
  }

  function makeBundle() {
    var bundle = bundler.bundle(bundlerOptions);

    bundle.on("error", handleError("browserify"))
          .pipe(source("client.js"))
          .pipe(gulp.dest(dir("dist")));

    return bundle;
  }

  return makeBundle();
}

function buildStyles() {
  var srcDir = dir('styles', 'client.less'),
      destDir = dir('dist', 'styles'),
      lessOptions = {
        paths: [ "node_modules" ]
      },
      stream;

  if (options.minify) {
    lessOptions.compress = true;
  }

  stream = gulp.src(srcDir);
  if (!options.production) {
    stream = stream.pipe(sourcemaps.init());
  }
  stream = stream.pipe(less(lessOptions));
  if (!options.production) {
    stream = stream.pipe(sourcemaps.write());
  }
  return stream.pipe(gulp.dest(destDir));
}
