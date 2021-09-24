var babel = require("@babel/core");

var result = babel.transformSync("let a = `0000`", {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: 'usage',
                modules: false,
                debug: false,
                corejs: 3,
                targets: {
                    browsers: ['last 2 versions', 'safari >= 7']
                }
            }
        ]
    ]
});
console.log(result, '-----')