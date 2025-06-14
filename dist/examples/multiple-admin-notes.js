(() => {
  // examples/multiple-admin-notes.js
  AMF.plugin("Multiple Admin Notes", () => {
    AMF.on("content-frame-load", ({ contentWindow }) => {
      const { document } = contentWindow;
      const sourceTextarea = document.querySelector("textarea[name='notes']");
      if (!sourceTextarea)
        return;
      const form = sourceTextarea.closest("form");
      let notes;
      try {
        notes = JSON.parse(sourceTextarea.value);
        if (!Array.isArray(notes) || notes.length === 0) {
          throw new Error("Notes are not a valid array structure");
        }
      } catch (e) {
        notes = [
          {
            title: "",
            content: sourceTextarea.value
          }
        ];
      }
      const container = sourceTextarea.parentElement;
      container.style.display = "none";
      const style = document.createElement("style");
      style.textContent = `
        .flex {
            display: flex;
        }
        .flex-col {
            flex-direction: column;
        }
        #notes-container {
            padding-right: 10px;
        }
        .notes-sidebar {
            width: 150px;
            margin-right: 10px;
        }
        .notes-list button {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
        }
        .notes-list button[data-active="true"] {
            font-weight: bold;
        }
        .flex-1 {
            flex: 1;
        }
        .notes-textarea {
            width: 100%;
        }
        .notes-title {
            width: 100%;
        }
        .notes-list {
            max-height: 190px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin-bottom: 5px;
        }
        .notes-add-button {
            margin-bottom: 5px;
        }
    `;
      document.head.appendChild(style);
      const textarea2point0 = document.createElement("div");
      textarea2point0.id = "notes-container";
      textarea2point0.innerHTML = `
        <div class="flex">
            <div class="flex flex-col notes-sidebar">
                <button class="notes-add-button" id="button" type="button">New note</button>
                <div class="notes-list"></div>
            </div>
            <div class="flex-1">
                <div class="flex">
                    <div class="flex-1">
                        <input type="text" placeholder="Title" class="notes-title" />
                    </div>
                    <button class="notes-delete-button" id="button" type="button">X</button>
                </div>
                <textarea class="notes-textarea" rows="16"></textarea>
            </div>
        </div>`;
      const notesTextarea = textarea2point0.querySelector(".notes-textarea");
      const notesTitle = textarea2point0.querySelector(".notes-title");
      const notesList = textarea2point0.querySelector(".notes-list");
      let currentNoteIndex = 0;
      function selectNote(index) {
        currentNoteIndex = index;
        if (notes[index]) {
          notesTextarea.value = notes[index].content;
          notesTitle.value = notes[index].title;
        } else {
          notesTextarea.value = "";
          notesTitle.value = "";
        }
        renderNotesList();
      }
      notesTextarea.addEventListener("input", (e) => {
        notes[currentNoteIndex].content = e.target.value;
      });
      notesTitle.addEventListener("input", (e) => {
        notes[currentNoteIndex].title = e.target.value;
        renderNotesList();
      });
      form.addEventListener("submit", (e) => {
        sourceTextarea.value = JSON.stringify(notes);
      });
      textarea2point0.querySelector(".notes-add-button").addEventListener("click", (e) => {
        notes.push({ title: "", content: "" });
        selectNote(notes.length - 1);
      });
      textarea2point0.querySelector(".notes-delete-button").addEventListener("click", (e) => {
        notes.splice(currentNoteIndex, 1);
        if (notes.length === 0) {
          notes.push({
            title: "",
            content: ""
          });
        }
        selectNote(Math.min(currentNoteIndex, notes.length - 1));
      });
      function renderNotesList() {
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = note.title || `Note ${index + 1}`;
          button.dataset.index = index;
          if (index === currentNoteIndex) {
            button.dataset.active = "true";
          }
          button.addEventListener("click", () => {
            selectNote(index);
          });
          notesList.appendChild(button);
        });
      }
      selectNote(0);
      container.parentElement.appendChild(textarea2point0);
    });
  });
})();
