console.log("hola");

function loadCSV() {
  const fileInput = document.getElementById("csvFileInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const csvData = e.target.result;
      const rows = csvData.split("\n");
      donutChartGenerate(rows);
      heighGraphGenerate(rows);
      cityGraphGenerate(rows);
    };

    reader.readAsText(file);
  } else {
    console.error("No se seleccionó ningún archivo.");
  }
}
function cityGraphGenerate(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(",");
    return columns[10];
  });
  const filteredValues = ageColumn.filter(
    (value) =>
      value &&
      value !== "Escriba el nombre de la ciudad donde vive actualmente."
  );
  const frequency = {};
  filteredValues.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  delete frequency["22/01/2003"];
  const labels = Object.keys(frequency);
  const values = Object.values(frequency);

  const ctx = document.getElementById("barChart").getContext("2d");

  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Frecuencia de Ciudades",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: Math.max(...values) + 10
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Gráfico de Barras'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return value + ' veces'; // Agregamos 'veces' al valor de cada subdivisión
              }
            }
          }
        }
      },
  });
}

function heighGraphGenerate(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(",");
    if (columns[8] == "63") {
      console.log(row);
    }
    return columns[8];
  });
  const filteredValues = ageColumn.filter(
    (value) =>
      value && value !== "Escriba la cantidad de anos que tiene actualmente."
  );
  const frequency = {};
  filteredValues.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  delete frequency['63"'];
  const labels = Object.keys(frequency);
  const values = Object.values(frequency);
  const ctx = document.getElementById("lineChart").getContext("2d");

  lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Frecuencia de Edad",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Frecuencia de Edad",
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Edad",
          },
        },
        y: {
          title: {
            display: true,
            text: "Frecuencia",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

function donutChartGenerate(rows) {
  const fifthColumn = rows.map((row) => {
    const columns = row.split(",");
    return columns[4];
  });

  const filteredValues = fifthColumn.filter(
    (value) =>
      value &&
      value !==
        "Escriba el nombre de las asignatura que actualmente esta cursando."
  );

  const frequency = {};
  filteredValues.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  const labels = Object.keys(frequency);
  const values = Object.values(frequency);

  const ctx = document.getElementById("donutChart").getContext("2d");

  donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(0, 255, 0, 0.7)",
          ],
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Gráfico de Anillo",
      },
    },
  });
}
