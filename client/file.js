const fs = require('fs');
const iconv = require('iconv-lite')

function readFile (path) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path, { encoding: 'binary' });
        let data = '';
        stream.on('error', err => {
            console.error('读取行错误');
            reject(err)
        });
        stream.on('data', chunk => {
            data += chunk;
        });
        stream.on('end', () => {
            const buf = Buffer.from(data, 'binary');
            const str = iconv.decode(buf, 'GBK'); // 得到正常的字符串，没有乱码
            console.debug('读取成功')
            let dataArray = str.split(/\r?\n/);
            let keys = dataArray.shift().split(',')
            dataArray = dataArray.map((line, column) => {
                const obj = {}
                const values = line.split(',')
                keys.forEach((key, index) => {
                    obj[key] = values[index]
                })
                return obj
            })
            resolve({
                table: dataArray,
                columns: keys
            })
        });
    })
}
module.exports = {
    readFile
}


