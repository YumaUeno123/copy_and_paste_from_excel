(function () {
  console.log("loaded javascript: v2");

  const pasteContainer = document.getElementById("paste-container");
  const rePasteBtn = document.getElementById("re-paste");
  const table = document.getElementById("table");

  pasteContainer.addEventListener("paste", (event) => {
    const pasteData = (event.clipboardData || window.clipboardData).getData(
      "text"
    );
    let rawData;

    if (pasteData.indexOf("\r\n") !== -1) {
      rawData = pasteData.split("\r\n");
      if (rawData[rawData.length - 1] === "") {
        rawData.pop();
      }
    } else if (pasteData.indexOf("\n") !== -1) {
      rawData = pasteData.split("\n");
    }

    const tbody = document.createElement("tbody");
    tbody.id = "tbody";

    rawData.forEach((raw) => {
      const tr = document.createElement("tr");
      const data = raw.split("\t");
      data.forEach((d) => {
        const td = document.createElement("td");
        td.textContent = d;
        td.classList.add("td");
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    pasteContainer.classList.add("hidden");
    rePasteBtn.classList.remove("hidden");
  });

  rePasteBtn.addEventListener("click", () => {
    const tbody = document.getElementById("tbody");
    if (tbody === null) {
      console.log("テーブルがないよん");
      return;
    }

    table.removeChild(tbody);
    pasteContainer.classList.remove("hidden");
    rePasteBtn.classList.add("hidden");
  });
})();
