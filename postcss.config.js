/**
 * Created by xiaojianli on 2017/3/24.
 */
module.exports = (ctx) =>{
    var options ={
        plugins: [
            require('autoprefixer')({browsers:['last 3 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4']})
        ]
    }
    return options;
}