								///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////	--	GulpFile by Nazar K. 11.2018	--	////////////////////////////////////////////////////
							///////////////////////////////////////////////////////////////////////////////////////////////////////

var gulp          = require('gulp'),								///	Gulp
		cleanCSS      = require('gulp-clean-css'),			/// minify CSS
		sass          = require('gulp-sass'),						///	compile SASS to CSS
		notify        = require('gulp-notify'),
		rename        = require('gulp-rename'),					///	rename
		concat        = require('gulp-concat'),					///	concatination
		uglify        = require('gulp-uglify'),					///	minify JavaScript
		autoprefixer  = require('gulp-autoprefixer'),		///	autoprefixer
		browserSync   = require('browser-sync'),				///	browser-sync
		del         	= require('del'),									///	delated files
		run         	= require('run-sequence'),				///	run a series of gulp tasks in order.
		imagemin			= require('gulp-imagemin'),				///	minify Image
		pngquant			= require('imagemin-pngquant'),	
		htmlmin				= require('gulp-htmlmin'),				/// minify HTML
		cache					= require('gulp-cache');			
		rsync					= require('gulp-rsync');
		ftp			 			= require( 'vinyl-ftp' );


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function () {
  return gulp.src('src/scss/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
		// .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions', '> 0.1%'], {cascade: true}))
		// .pipe(cleanCSS({level: { 2: { specialComments: 0 } } }))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/owl.carousel/dist/owl.carousel.min.js',
		'node_modules/wow.js/dist/wow.min.js',

		'src/js/common.js', // Always at the end
		])
	.pipe(concat('main.min.js'))
	.pipe(uglify({ toplevel: true})) // Mifify js (opt.)
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch(['libs/**/*.js', 'src/js/common.js'], ['js']);
	gulp.watch('src/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);


					/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////	--	Build	--	////////////////////////////////////////////////////////

gulp.task('build', ['clean', 'img', 'styles', 'js', 'minhtml'], function() {
	var buildCSS = gulp.src('src/css/main.css')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
	
	var buildJS = gulp.src('src/js/main.min.js')
		.pipe(gulp.dest('dist/js'));

	var buildPHP = gulp.src('src/*.php')
		.pipe(gulp.dest('dist/'));

	// var buildHtml = gulp.src('src/*.html')
	// 	.pipe(gulp.dest('dist/'));

	var phpMail = gulp.src('src/phpmailer/*')
		.pipe(gulp.dest('dist/phpmailer'));
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img/'))
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task("minhtml", function() {
  return gulp.src("src/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("dist"));
});

// gulp.task('build', function(done) {
// 	run('clear', 'copy', 'minhtml', 'minimg', done)
// });

				///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////	--	Deploy to:	--	////////////////////////////////////////////////

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'nazar619@88.99.94.73',
		destination: 'www/ovenbird.tk/',
		password: 'kOuV51IzEd',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('deploy', function() {
	var conn = ftp.create({
		host:     '88.99.94.73',
		user:     'nazar619',
		password: 'kOuV51IzEd',
		parallel: 10
		// log:      gutil.log
	});
	return gulp.src('dist/**')
	.pipe(conn.newer('www/veselka.lviv.ua/')) // only upload newer files
	.pipe(conn.dest('www/veselka.lviv.ua/'));

});