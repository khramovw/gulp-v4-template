const project_folder = 'dist'
const source_folder = 'src'

const path = {
    build: {
        html: `${project_folder}/`,
        css: `${project_folder}/css/`,
        js: `${project_folder}/js/`,
        img: `${project_folder}/img/`,
        fonts: `${project_folder}/fonts/`,
    },
    src: {
        html: [`${source_folder}/layouts/**/*.html`, `!${source_folder}/layouts/**/_*.html`],
        css: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/**/*.js`,
        img: `${source_folder}/img/**/*.{jpg, png, svg, gif, ico, webp}`,
        fonts: `${source_folder}/fonts/*.ttf`,
    },
    watch: {
        html: `${source_folder}/**/*.html`,
        css: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/script.js`,
        img: `${source_folder}/img/**/*.{jpg, png, svg, gif, ico, webp}`
    },
    baseDir: `./${project_folder}/`,
    clean: `./${project_folder}/`
}

let _gulp = require('gulp');
let {src, dest} = _gulp;
let _browsersync = require('browser-sync').create();
let _fileinclude = require('gulp-file-include');
let _del = require('del');
let _sass = require('gulp-sass');
let _autoprefixer = require('gulp-autoprefixer');
let _group_css_media = require('gulp-group-css-media-queries');
let _clean_css = require('gulp-clean-css');
let _babel = require("gulp-babel");
let _uglify = require('gulp-uglify-es').default;
let _rename = require('gulp-rename');

function browserSync() {
    _browsersync.init({
        server: {
            baseDir: path.baseDir
        },
        port: 3000,
        notify: true,
    });
}

function html() {
    return src(path.src.html)
        .pipe(_fileinclude({
            prefix: '~',
            basepath: '@file'
        }))
        .pipe(dest(path.build.html))
        .pipe(_browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(_sass({
            outputStyle: 'expanded'
        }))
        .pipe(_group_css_media())
        .pipe(_autoprefixer({
            overrideBrowserslist: ['last 2 version', '>1%'],
            cascade: true,
            comments: true
        }))
        .pipe(dest(path.build.css))
        .pipe(_clean_css())
        .pipe(_rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(_browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(_fileinclude({
            prefix: '~',
            basepath: '@file'
        }))
        .pipe(_babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest(path.build.js))
        .pipe(_rename({
            extname: '.min.js'
        }))
        .pipe(_uglify())
        .pipe(dest(path.build.js))
        .pipe(_browsersync.stream());
}

function watchFiles(params) {
    _gulp.watch([path.watch.html], html)
    _gulp.watch([path.watch.css], css)
    _gulp.watch([path.watch.js], js)
}

function clean() {
    return _del(path.clean);
}

let build = _gulp.series(clean, _gulp.parallel(js, css, html));
let watch = _gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.html = html;

exports.build = build;
exports.watch = watch;

exports.default = watch;
