module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-exec'); 
    grunt.initConfig({
        exec: {
            deploy: {
                cmd: function(user){
                    return 'mkdir /home/tiago/Documentos/' + user
                }
            }
          }
        }); 
    grunt.registerTask('default', ['exec']);  
};