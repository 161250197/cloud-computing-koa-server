node_xj = require("xls-to-json");

function xlsToJson (input, output, sheet) {
    node_xj(
        {
            input,
            output,
            sheet,
        },
        function (err) {
            if (err)
            {
                console.error(err);
            }
        }
    );
}

xlsToJson("./xls/cartoonInfoList.xls", "./json/rawCartoonInfoList.json", "Sheet1");
