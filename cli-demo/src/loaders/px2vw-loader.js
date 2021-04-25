let loaderUtils = require('loader-utils');

module.exports = (content) => {
    // console.log(content)
    let options = loaderUtils.getOptions(this);
    console.log(options)


    // console.log(options)
    return content;
}