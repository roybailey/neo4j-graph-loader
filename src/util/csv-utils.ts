import * as fs from "fs";
import stringify from "csv-stringify";
import parse from "csv-parse/lib/sync";


export function writeArrayToCsv(filename: string, headers: string[], dataset: any[][]) {

    console.log(`\n\n\n========== writing ${filename} ==========`);
    stringify(dataset, {header: true, columns: headers}, (err: any, output: any) => {
        if (err) throw err;
        fs.writeFileSync(filename, output);
        console.log(`\n---------- written ${filename} ----------`);
    });

}


export function writeObjectToCsv(filename: string, dataset: any[]) {

    console.log(`\n\n\n========== writing ${filename} ==========`);
    stringify(dataset, {header: true}, (err: any, output: any) => {
        if (err) throw err;
        fs.writeFileSync(filename, output);
        console.log(output);
        console.log(`\n---------- written ${filename} ----------`);
    });
}


export function readCsv(filename: string) {

    const input = fs.readFileSync(filename);
    const records = parse(input, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        skip_empty_lines: true,
        columns: (header: string[]) => {
            return header.map(name => name.toLowerCase());
        }
    });

    return records;
}


