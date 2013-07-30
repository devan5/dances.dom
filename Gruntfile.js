module.exports = function(grunt){
	var
        onfDOM,
		onfMDO
	;

	onfDOM = {
		name    : "dances.dom",
		srcPath : "src/",
		destPath: "dist/"
	};

	onfMDO = {
		name    : "dances.mdo",
		srcPath : "src/dances.mdo/",
		destPath: "dist/"
	};

	grunt.initConfig({
		pkg      : grunt.file.readJSON("package.json"),
		buildData: grunt.file.readJSON("build.json"),

		concat   : {
			generic: {
				options: {
					banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
					        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
							'\n'
				},
				expand : true,
				cwd    : onfDOM.srcPath,
				src    : "<%= buildData.default %>",
				rename : function(){
					return onfDOM.destPath + onfDOM.name + ".js";
				}
			},

			mdo: {
				options: {
					banner: '/* ' + onfMDO.name + ' - ' +
					        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
							'\n'
				},
				expand : true,
				cwd    : onfMDO.srcPath,
				src    : "<%= buildData.mdo %>",
				rename : function(){
					return onfMDO.destPath + onfMDO.name + ".js";
				}
			}
		},

		uglify   : {
			generic: {
				expand : true,
				options: {
					banner   : '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
					           '<%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */' +
					           '\n',
					report   : "gzip",
					sourceMap: onfDOM.destPath + onfDOM.name + "-map.js"
				},
				src    : onfDOM.destPath + onfDOM.name + ".js",
				ext    : (onfDOM.name.slice(onfDOM.name.indexOf(".")) + ".min.js")
			},

			mdo: {
				expand : true,
				options: {
					banner   : '/* <%= pkg.name %> - ' +
					           '<%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */' +
					           '\n',
					report   : "gzip",
					sourceMap: onfMDO.destPath + onfMDO.name + "-map.js"
				},
				src    : onfMDO.destPath + onfMDO.name + ".js",
				ext    : (onfMDO.name.slice(onfMDO.name.indexOf(".")) + ".min.js")
			}
		},

		clean: {
			def: {
				src: "dist/"
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", []);
	grunt.registerTask("build", ["clean:def", "concat", "uglify"]);
	grunt.registerTask("build-dom", ["clean:def", "concat:generic", "uglify:generic"]);

};