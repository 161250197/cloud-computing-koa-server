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

const path = require("path")

xlsToJson(path.resolve(__dirname, "./../xls/cartoonInfoList.xlsx"), path.resolve(__dirname,"./../json/rawCartoonInfoList.json"), "Sheet1");
