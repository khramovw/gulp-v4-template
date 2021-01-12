# Gulp template

### Структура
    src/
        |- /js/
        |    |- /libs/
        |        |- /libname/
        |        |    /readme.md
        |        |    /libname.js
        |        |- /libname2.js
        |     /script.js
        |     /home.js
        |     /about.js
        |- /layouts/
        |   |- /pages/
        |       /home.html
        |       /about.html
        |   |- /components/
        |       |- /header/
        |           /main-header.html
        |           /about-header.html
        |- /scss/
        |   |- /components/
        |       |- /home page/
        |           /_home.scss
        |       |- /about page/
        |           /_about.scss
        |   |- /elements/
        |       |- /contols/
        |           /_buttons.scss
        |           /_selcts.scss
        |           /_inputs.scss
        |           /_controls.scss
        |       |- _colorols.scss
        |       |- _typgraphics.scss
        |   /_defaults.scss
        |   /_fonts.scss
        |   /_grid.scss
        |   /_reset.scss
        |   /_vars.scss
        |   /style.scss

### JS 
    В папку JS находятся скрипты.
    Для сторонних библиотек папка lids/.
    Для отдельной библиотеки можно создать папку
    если файлов несколько или есть readme к этой библиотеке.

### LAYOUTS 
    Папка для шаблонов .html .
    Вложеная папка отдельно для страниц и компонентов.
    
### SCSS 
    Папка для стилей.
    Вложеная папка отдельно для элементов и компонентов.
