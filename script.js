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
      ageGraphGenerate(rows);
      cityGraphGenerate(rows);
      familiarCores(rows);
      heightData(rows);

      carrerData(rows);
    };

    reader.readAsText(file);
  } else {
    console.error("No se seleccionó ningún archivo.");
  }
}
function carrerData(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(";");
    return columns[3];
  });
  const filteredValues = ageColumn.filter(
    (value) => value && value !== "Seleccione el Programa"
  );
  const frequency = {};
  filteredValues.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  console.log(frequency);
  var tablaHTML = "<h2 class=\"display-6\">Carreras</h2> <table class=\"table table-hover\">" + "<tr><th>Carrera</th><th>Frecuencia</th></tr>";

  for (var carrera in frequency) {
    tablaHTML +=
      "<tr><td>" + carrera + "</td><td>" + frequency[carrera] + "</td></tr>";
  }

  tablaHTML += "</table>";
  const fileInput = document.getElementById("medidas");
  fileInput.innerHTML += tablaHTML;
}
function heightData(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(";");
    return columns[7];
  });
  const filteredValues = ageColumn.filter(
    (value) =>
      value &&
      value !==
        "Escriba la estatura. Separado con puntos. Por ejemplo (1.63 or 1.70. metros)"
  );
  console.log(filteredValues);

  // Calcular la media
  var suma = 0;
  for (var i = 0; i < filteredValues.length; i++) {
    suma += parseFloat(filteredValues[i]);
  }
  var media = suma / filteredValues.length;

  // Calcular la mediana
  filteredValues.sort(function (a, b) {
    return parseFloat(a) - parseFloat(b);
  });
  var mediana;
  if (filteredValues.length % 2 === 0) {
    mediana =
      (parseFloat(filteredValues[filteredValues.length / 2 - 1]) +
        parseFloat(filteredValues[filteredValues.length / 2])) /
      2;
  } else {
    mediana = parseFloat(filteredValues[Math.floor(filteredValues.length / 2)]);
  }

  // Crear la tabla HTML
  var tablaHTML =
    '<h1 class="display-4"> Medidas</h1> <h2 class="display-6">Altura</h2>';
  tablaHTML += '<table class="table table-hover">';
  tablaHTML +=
    "<tr ><th>Media</th><td>" +
    media.toFixed(2) +
    "</td></tr>" +
    "<tr><th>Mediana</th><td>" +
    mediana.toFixed(2) +
    "</td></tr>" +
    "</table>";

  // Agregar la tabla al documento HTML

  const fileInput = document.getElementById("medidas");
  fileInput.innerHTML += tablaHTML;
}
function familiarCores(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(";");
    return columns[11];
  });
  const filteredValues = ageColumn.filter(
    (value) =>
      value && value !== "Actualmente con quien vive seleccione una opcion."
  );
  const frequency = {};
  filteredValues.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  const labels = Object.keys(frequency);
  const values = Object.values(frequency);

  const ctx = document.getElementById("polarChart").getContext("2d");
  const polarChart = new Chart(ctx, {
    type: "polarArea",
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
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 50,
          stepSize: 10,
        },
      },
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Gráfico Polar",
      },
    },
  });
}
function cityGraphGenerate(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(";");
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
          suggestedMax: Math.max(...values) + 10,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Gráfico de Barras",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              return value + " veces"; // Agregamos 'veces' al valor de cada subdivisión
            },
          },
        },
      },
    },
  });
}
function ageGraphGenerate(rows) {
  const ageColumn = rows.map((row) => {
    const columns = row.split(";");
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
    const columns = row.split(";");
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
