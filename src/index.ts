function createPill(label: string, color: string): HTMLSpanElement {
  const pill = document.createElement('span');
  pill.textContent = label;
  pill.className = 'pill';
  pill.style.backgroundColor = color;
  return pill;
}

function createPillGroup(
  label: string,
  values: string[],
  color: string,
): HTMLDivElement {
  const groupDiv = document.createElement('div');
  groupDiv.className = 'pill-group';

  const groupLabel = document.createElement('span');
  groupLabel.textContent = `${label}:`;
  groupLabel.className = 'pill-group-label';
  groupDiv.appendChild(groupLabel);

  values.forEach((value) => {
    const pill = createPill(value.trim(), color);
    groupDiv.appendChild(pill);
  });

  return groupDiv;
}

function createTableRow(label: string, value: string): HTMLTableRowElement {
  const row = document.createElement('tr');

  const labelCell = document.createElement('td');
  labelCell.textContent = label;
  row.appendChild(labelCell);

  const valueCell = document.createElement('td');
  valueCell.textContent = value;
  row.appendChild(valueCell);

  return row;
}

function displayParamsAsPills() {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById('pill-container');
  const maxItemCount: number = parseInt(params.get('maxItemCount') || '10', 10);

  let pillColor: string = params.get('pillColor') || '#0073bb';
  if (!pillColor.startsWith('#') && !/^[a-zA-Z]+$/.test(pillColor)) {
    pillColor = `#${pillColor}`;
  }

  const layout: string = params.get('layout') || 'wrap';

  const entries = Array.from(params.entries()).filter(
    ([key]) =>
      key !== 'maxItemCount' && key !== 'pillColor' && key !== 'layout',
  );

  if (container) {
    if (entries.length === 0) {
      displayDefaultMessage(container);
    } else {
      if (layout === 'table') {
        const table = document.createElement('table');
        table.className = 'legacy-table';
        container.appendChild(table);

        entries.forEach(([key, value]) => {
          const valuesArray = value.split(',');
          const displayedValues = valuesArray.slice(0, maxItemCount).join(', ');

          const row = createTableRow(key, displayedValues);
          table.appendChild(row);
        });
      } else if (layout === 'wrap') {
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrap-container';
        container.appendChild(wrapDiv);

        entries.forEach(([key, value]) => {
          const valuesArray = value.split(',');
          const displayedValues = valuesArray.slice(0, maxItemCount);

          const groupDiv = createPillGroup(key, displayedValues, pillColor);
          wrapDiv.appendChild(groupDiv);

          if (valuesArray.length > maxItemCount) {
            const overflowPill = createPill(
              `+${valuesArray.length - maxItemCount} more...`,
              pillColor,
            );
            overflowPill.classList.add('overflow-pill');
            groupDiv.appendChild(overflowPill);
          }
        });
      } else if (layout === 'newrow') {
        entries.forEach(([key, value]) => {
          const valuesArray = value.split(',');
          const displayedValues = valuesArray.slice(0, maxItemCount);

          const groupDiv = createPillGroup(key, displayedValues, pillColor);
          container.appendChild(groupDiv);

          if (valuesArray.length > maxItemCount) {
            const overflowPill = createPill(
              `+${valuesArray.length - maxItemCount} more...`,
              pillColor,
            );
            overflowPill.classList.add('overflow-pill');
            groupDiv.appendChild(overflowPill);
          }
        });
      }
    }
  }
}

function displayDefaultMessage(container: HTMLElement) {
  container.innerHTML = `
      <p>Use the following parameters in the URL:</p>
      <ul>
        <li><b>pillColor</b>: Specify a color name or hex code for the pills (e.g., <span title="Example">pink</span>, <span title="Example">ff5733</span>).</li>
        <li><b>maxItemCount</b>: Limit the number of items displayed per parameter (e.g., <span title="Example">5</span>).</li>
        <li><b>layout</b>: Set to "wrap" to wrap parameters on the same line, "newrow" for each on a new line, or "table" to display parameters in a table (e.g., <span title="Example">wrap</span>).</li>
      </ul>`;
}

document.addEventListener('DOMContentLoaded', displayParamsAsPills);
