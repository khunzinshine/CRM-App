import { loadingAction } from '../features/system/SystemSlice';
import axios from 'axios';

export const getApiResponse = async (
  { url, body },
  { fulfillWithValue, rejectWithValue, dispatch }
) => {
  try {
    dispatch(loadingAction(true));
    const response = await axios.get(url, { params: body });
    dispatch(loadingAction(false));
    return fulfillWithValue(response);
  } catch (err) {
    dispatch(loadingAction(false));
    return rejectWithValue(err);
  }
};

export function htmlToCSV(html, filename) {
  let data = [];
  let rows = document.querySelectorAll('table tr');

  for (let i = 0; i < rows.length; i++) {
    let row = [],
      cols = rows[i].querySelectorAll('td, th');

    for (let j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }

    data.push(row.join(','));
  }
  downloadCSVFile(data.join('\n'), filename);
}

export function downloadCSVFile(csv, filename) {
  let csv_file, download_link;
  csv_file = new Blob([csv], { type: 'text/csv' });
  download_link = document.createElement('a');
  download_link.download = filename;
  download_link.href = window.URL.createObjectURL(csv_file);
  download_link.style.display = 'none';
  document.body.appendChild(download_link);
  download_link.click();
}
