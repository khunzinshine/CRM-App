import React from "react";

const Table = () => {
  function htmlToCSV(html, filename) {
    var data = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }

    downloadCSVFile(data.join("\n"), filename);
  }
  function downloadCSVFile(csv, filename) {
    var csv_file, download_link;

    csv_file = new Blob([csv], { type: "text/csv" });

    download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  //   document
  //     .getElementById("download-button")
  //     .addEventListener("click", function () {
  //       var html = document.querySelector("table").outerHTML;
  //       htmlToCSV(html, "students.csv");
  //     });
  return (
    <>
      <button id="download-button">Download</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Roll No</th>
          <th>Section</th>
        </tr>
        <tr>
          <td>Robert Sen</td>
          <td>12th</td>
          <td>34</td>
          <td>A</td>
        </tr>
        <tr>
          <td>Vicky Thakur</td>
          <td>10th</td>
          <td>13</td>
          <td>C</td>
        </tr>
        <tr>
          <td>Ribika Mattu</td>
          <td>11th</td>
          <td>16</td>
          <td>D</td>
        </tr>
        <tr>
          <td>Simran Singh</td>
          <td>9th</td>
          <td>26</td>
          <td>A</td>
        </tr>
      </table>
    </>
  );
};

export default Table;
