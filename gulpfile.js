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
let {production, development} = require('gulp-mode')({
    modes: ["production", "development"],
    default: "development",
    verbose: false
});
let gulp = require('gulp');
let {src, dest, parallel, series, watch} = gulp;
let browsersync = require('browser-sync').create();
let fileinclude = require('gulp-file-include');
let del = require('del');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let group_css_media = require('gulp-group-css-media-queries');
let clean_css = require('gulp-clean-css');
let babel = require("gulp-babel");
let uglify = require('gulp-uglify-es').default;
let rename = require('gulp-rename');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: path.baseDir,
            notify: false,
            online: true
        },
        port: 3000,
        notify: true,
    });
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '~',
            basepath: '@file'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(group_css_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 version', '>1%'],
            grid: true,
            cascade: true,
            comments: true
        }))
        .pipe(dest(path.build.css))
        .pipe(production(clean_css()))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude({
            prefix: '~',
            basepath: '@file'
        }))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest(path.build.js))
        .pipe(production(rename({
            extname: '.min.js'
        })))
        .pipe(production(uglify()))
        .pipe(production(dest(path.build.js)))
        .pipe(browsersync.stream());
}

function watchFiles() {
    watch([path.watch.html], html)
    watch([path.watch.css], css)
    watch([path.watch.js], js)
}

function clean() {
    return del(path.clean);
}

let build = series(clean, parallel(js, css, html));
let watchP = parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.html = html;

exports.build = build;
exports.watchP = watchP;

exports.default = watchP;
