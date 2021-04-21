var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    extender = require('gulp-html-extend'), // Инклюдим отдельные части кода
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    plumber = require('gulp-plumber');

var pub = './public/';

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/scss/style.scss') // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('js', function () {
    return gulp.src(['app/js/*.js', '!app/js/*.min.js']) // Берем источник
        .pipe(plumber())
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('extend', function () {
    gulp.src('app/md/**/*.html')
        .pipe(extender({
            annotations: true,
            verbose: false,
            noEmitHelpers: false
        })) // default options
        .pipe(gulp.dest('app/'))
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - appgy
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('clean', function () {
    return del.sync('public'); // Удаляем папку public перед сборкой
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'sass', 'js', 'extend'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/js/*.js', ['js']); // Наблюдение за js файлами в папке js
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/md/**/*.html', ['extend']);

});

gulp.task('build', ['clean', 'sass', 'js', 'extend'], function () {

    var buildCss = gulp.src('app/css/**/*.min.css') // Переносим css в продакшн
        .pipe(gulp.dest('public/css'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('public/fonts'));

    var buildImg = gulp.src('app/img/**/*') // Переносим картинки в продакшен
        .pipe(gulp.dest('public/img'));

    var buildJs = gulp.src('app/js/**/*.min.js') // Переносим скрипты в продакшен
        .pipe(gulp.dest('public/js'));

    var buildPhp = gulp.src('app/*.php') // Переносим php в продакшен
        .pipe(gulp.dest('public'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['watch']);