module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-shell')
    grunt.initConfig({
        shell: {
            build: {
                options: { stdout: true },
                command: [
                    'echo "=================== Realizando testes unitários ==================="',
                    'ng test --watch=false --browsers=ChromeHeadless',
                    'echo "=================== Gerando build da aplicação para produção ==================="',
                    'ng build --prod --aot --build-optimizer',
                    'echo "=================== Testes e builds finalizados com sucesso! ==================="',
                ].join('&&')
            }
        }
    });
 
    grunt.registerTask('default', ['shell:deploy']);
}