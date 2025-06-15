(() => {
  // examples/webpage-sorting.js
  AMF.plugin("Multiple Admin Notes", () => {
    AMF.on("content-frame-load", ({ contentWindow }) => {
      const url = new URL(contentWindow.location.href);
      if (url.searchParams.get("act") !== "webpages" || url.searchParams.get("show_all") !== "1")
        return;
      const table = contentWindow.document.querySelector(".tableborder");
      const tbody = table.querySelector("tbody");
      const trs = Array.from(tbody.querySelectorAll("tr"));
      const headRow = trs.shift();
      const paginationRow = trs.pop();
      const [pageHeader, includeKeyHeader, modifiedHeader] = headRow.querySelectorAll(".titlemedium");
      const maintitle = contentWindow.document.querySelector(".maintitle");
      if (maintitle) {
        const filterInput = contentWindow.document.createElement("input");
        filterInput.type = "text";
        filterInput.placeholder = "Filter...";
        filterInput.style.margin = "-4px 4px";
        filterInput.style.float = "right";
        maintitle.appendChild(filterInput);
        filterInput.addEventListener("input", () => {
          const filterValue = filterInput.value.trim().toLowerCase();
          trs.forEach((tr) => {
            const firstTd = tr.querySelector("td");
            if (!firstTd)
              return;
            const text = firstTd.textContent.toLowerCase();
            tr.style.display = filterValue === "" || text.includes(filterValue) ? "" : "none";
          });
        });
      }
      let pageSortAsc = true;
      let modifiedSortAsc = true;
      const applySort = () => {
        tbody.appendChild(headRow);
        trs.forEach((tr) => tbody.appendChild(tr));
        tbody.appendChild(paginationRow);
      };
      pageHeader.style.cursor = "pointer";
      pageHeader.addEventListener("click", () => {
        trs.sort((a, b) => {
          const aText = a.querySelector("td:nth-child(1)").textContent;
          const bText = b.querySelector("td:nth-child(1)").textContent;
          return pageSortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        pageSortAsc = !pageSortAsc;
        applySort();
      });
      modifiedHeader.style.cursor = "pointer";
      modifiedHeader.addEventListener("click", () => {
        trs.sort((a, b) => {
          const aText = new Date(a.querySelector("td:nth-child(3)").textContent);
          const bText = new Date(b.querySelector("td:nth-child(3)").textContent);
          return modifiedSortAsc ? aText.getTime() - bText.getTime() : bText.getTime() - aText.getTime();
        });
        modifiedSortAsc = !modifiedSortAsc;
        applySort();
      });
    });
  });
})();
