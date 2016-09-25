"use strict"

// Подключаем/регистрируем GULP пакеты/модули
const gulp         = require('gulp'), // Подключаем Gulp
			sass         = require('gulp-sass'), //Подключаем Sass пакет,
			browserSync  = require('browser-sync'), // Подключаем Browser Sync
			concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
			uglify       = require('gulp-uglify'), // Подключаем gulp-uglify (для сжатия JS)
			cleanCSS     = require('gulp-clean-css'), // Подключаем пакет для минификации CSS
			rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
			del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
			cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
			autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
			csscomb 		 = require('gulp-csscomb'), // Подключаем библиотеку для сортировки css свойств
			notify = require("gulp-notify"), // Подключаем обработчик ошибок Notify
			plumber = require('gulp-plumber'); // Подключаем Plumber

// // ==========================================================
// Создаем задачу для browserSync (Обновление без перезагрузки)
// // ==========================================================
gulp.task('browser-sync', function() {

	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});

});

// // ======================
// Создаем задачу для SASS
// // ======================
gulp.task('styles', function() {

	return gulp.src('src/sass/**/*.sass') // Берем все файлы с расширением sass
		.pipe(plumber({
				errorHandler: notify.onError(function(err) {
					return {
						title: 'Styles',
						message: err.message
					};
				})
			}))
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		})) // Преобразуем Sass и Bourbon в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions'])) // добавляем вендорные префиксы
		.pipe(csscomb()) // Сортировка css свойств
		.pipe(cleanCSS()) // Минимифицируем CSS
		.pipe(rename({suffix: '.min', prefix : ''})) // Добавляем к файлу суфикс .min
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении

	});

// // ===================================================
// Создаем задачу js скриптов (сборка/сжимание/выгрузка)
// // ===================================================
gulp.task('scripts', function() {

	return gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/foundation-sites/dist/foundation.min.js',
		'bower_components/bxslider-4-master/dist/jquery.bxslider.min.js',
		'bower_components/what-input/what-input.js'
		// сюда через заяпятую перечисляем все библиотеки
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js

	});

// // =============================
// Создаем задачу для очистки кеша
// // =============================
gulp.task('clearcache', function (callback) {

	return cache.clearAll();

});

// // ========================
// Создаем задачу для очистки
// // ========================
gulp.task('removebuild', function() {

	return del.sync('build'); // Удаляем папку build перед сборкой

});

// // =========================================
// Создаем задачу для финальной сборки проекта
// // =========================================
gulp.task('build', ['removebuild', 'styles', 'scripts'], function() {

	var buildCss = gulp.src('src/css/**/*')
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в build
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в build
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в build
	.pipe(gulp.dest('build'))

	var buildImage = gulp.src('src/img/**/*') // Переносим Image в build
	.pipe(gulp.dest('build/img'));

});

// // ========================================
// Создаем задачу для слежения за изменениями
// // ========================================
gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {

	gulp.watch('src/sass/**/*.sass', ['styles']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/libs/**/*.js', ['scripts']); // Наблюдение за js файлами в папке libs
	gulp.watch('src/js/**/*.js').on("change", browserSync.reload);; // Наблюдение за js файлами в папке js
	gulp.watch('src/*.html').on("change", browserSync.reload);; // Наблюдение за html файлами в корне проекта

});

// // ===============
// Дефолтная задача
// // ===============
gulp.task('default', ['watch']); // Дефолтная задача запускающаяя слежение