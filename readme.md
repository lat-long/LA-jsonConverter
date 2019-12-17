# JSON - CSV Converter

<a href="https://latlo.ng">
  <img src="https://lat-long-cdn.s3.amazonaws.com/Branding/SVG/mark-red.svg" width="100">
</a>

<a href="https://latlo.ng">
  <img src="https://lat-long-cdn.s3.amazonaws.com/LearningAlly/LA_logo.png" width="200">
</a>

## Purpose

* Takes a batch of JSON files and converts them to CSV format.
* Will convert any JSON but is most valuable when provided an array of JSON objects
* Searches an entire directory (non-recursive) for JSON files, converts them all to `{filename}.json.csv` and saves to a new "CSV/" folder in the specified directory.
* You can specify a top-level element to be extracted from the JSON for conversion. For example, in this object, the `data` element contains the actual data:

```
{
    "key": "abcdef",
    "data": [
        {...},
        {...}
    ]
}
```

### Usage
* Download project, then using command line terminal, run `npm start` or `node index.js` from the project root
* You'll be prompted for the path to your JSON files, asked if you want to extract an element for conversion and then asked which element to extract.
* Script will run showing progress and create a `/CSV/` directory containing all your converted files