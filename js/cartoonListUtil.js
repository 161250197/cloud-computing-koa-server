const list = require("./../json/cartoonList.json");

function getMaxLengthName () {
    let maxLengthName = list[0].name;
    let index = 0;
    const count = list.length;
    for (let i = 1; i < count; i++)
    {
        const { name } = list[i];
        if (name.length > maxLengthName.length)
        {
            maxLengthName = name;
            index = i;
        }
    }
    console.log([index, maxLengthName].join(" "));
}

getMaxLengthName();
