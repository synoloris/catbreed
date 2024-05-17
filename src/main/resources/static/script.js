function checkFiles(files) {
  if (files.length != 1) {
    alert("Bitte genau eine Datei hochladen.");
    return;
  }

  const fileSize = files[0].size / 1024 / 1024; // in MiB
  if (fileSize > 10) {
    alert("Datei zu gross (max. 10Mb)");
    return;
  }

  const file = files[0];

  // Preview
  if (file) {
    preview.src = URL.createObjectURL(files[0]);
  }

  // Upload
  const formData = new FormData();
  for (const name in files) {
    formData.append("image", files[name]);
  }

  fetch("/analyze", {
    method: "POST",
    headers: {},
    body: formData,
  })
    .then((response) => {
      console.log(response);
      response.text().then(function (answer) {
        var data = JSON.parse(answer);
        // Convert data into Highcharts-compatible format
        var chartData = [];
        data.forEach(function (item) {
          chartData.push({
            name: item.className,
            y: item.probability,
          });
        });

        // Create the pie chart
        Highcharts.chart("chart-container", {
          chart: {
            type: "pie",
            backgroundColor: "transparent", // Set transparent background
          },
          title: {
            text: "Cat Breed Probability",
            style: {
              color: "#ffffff", // Set white color for title
            },
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                style: {
                  color: "#ffffff", // Set white color for data labels
                },
              },
            },
          },
          series: [
            {
              name: "Probability",
              data: chartData,
            },
          ],
        });
        answerPart.style.display = "block";
      });
    })
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
}
