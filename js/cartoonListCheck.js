const list = require("./../json/cartoonList.json");
const c = require('child_process');
const count = list.length;
const start = 0;
let index = start;

function check () {
    const { homepage, name } = list[index];
    c.exec(`start http://${ homepage }`);
    console.log([index + 1, name, "\n"].join("  "));
    index++;
    if (index < count)
    {
        setTimeout(check, 4000);
    }
}

check();
