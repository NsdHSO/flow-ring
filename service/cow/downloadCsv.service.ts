import {CsvParser} from 'json2csv';

export const downloadCsvService = function (fields: string[], data: any, res) {
  
  
  this.csvFields = fields;
  this.csvParser = new CsvParser({fileds: fields});
  this.csvData = this.csvParser.parse(data);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=tutorials.csv');
  res.status(200)
    .end(this.csvData);
};
