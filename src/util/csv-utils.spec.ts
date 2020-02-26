import { writeArrayToCsv, readCsv } from "./csv-utils";

test("write CSV", async () => {

    const filename = "test.csv";
    const headers = ["A","B","C"];

    writeArrayToCsv(filename, headers, [
        ["1a","1b","1c"],
        ["2a","2b","2c"],
        ["3a","3b","3c"],
    ]);

    const dataset = readCsv(filename);

    console.log(JSON.stringify(dataset));

    expect(dataset[0]).toEqual({a:"1a", b: "1b", c: "1c"});
});

