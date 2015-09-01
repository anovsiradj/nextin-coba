@echo off
mkdir release

rem Combine all source files
type src\*.js > pianoHero.collated.js

rem Compress the source file
java -jar ..\yui\yuicompressor-2.4.6.jar --type js -o release\pianoHero.min.js pianoHero.collated.js
rem The following does the same thing using Closure
rem java -jar ..\closure\compiler.jar --js=pianoHero.collated.js --js_output_file=release\pianoHero.min.js

rem Copy resources
xcopy /Y src\*.html release
xcopy /Y src\*.css release
xcopy /Y /S /I src\lib release\lib
xcopy /Y /S /I src\audio release\audio

pause
