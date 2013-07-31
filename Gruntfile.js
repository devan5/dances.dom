module.exports = function(grunt){
	var
        onfDOM,
		onfMDO,

		buildJSON
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

	buildJSON = grunt.file.readJSON("build.json");

	buildJSON.default.splice(buildJSON.default.length - 1, 0, "_" + onfMDO.name + ".js");

	grunt.initConfig({
		pkg      : grunt.file.readJSON("package.json"),

		concat   : {
			generic: {
				options: {
					banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
					        '<%= grunt.template.today("yyyy-mm-dd") %> */' +
							'\n'
				},
				expand : true,
				cwd    : onfDOM.srcPath,
				src    : buildJSON.default,
				rename : function(){
					return onfDOM.destPath + onfDOM.name + ".js";
				}
			},

			mdoForGeneric: {
				expand : true,
				cwd    : onfMDO.srcPath,
				src    : buildJSON.mdo_For_dom,
				rename : function(){
					return onfDOM.srcPath + "_" + onfMDO.name + ".js";
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
				src    : buildJSON.mdo,
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
			generic      : {
				src: onfDOM.destPath + onfDOM.name + "*.js"
			},
			mdo          : {
				src: onfDOM.destPath + onfMDO.name + "*.js"
			},
			afterMdoForGeneric: {
				src: onfDOM.srcPath + "_" + onfMDO.name + ".js"
			}

		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", []);

	var arrDomBuild = ["clean", "concat:mdoForGeneric", "concat:mdo", "concat:generic", "uglify", "clean:afterMdoForGeneric"];
	grunt.registerTask("build", arrDomBuild);
	grunt.registerTask("build-dom", arrDomBuild);

	grunt.registerTask("build-mdo", ["clean:mdo", "concat:mdo", "uglify:mdo"]);

};