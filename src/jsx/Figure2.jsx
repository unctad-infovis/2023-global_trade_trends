import React, { useState, useEffect } from 'react';

// Load helpers.
import { transpose } from 'csv-transpose';
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLineFigure2.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => val);
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
    return ({
      data: values.map((val, j) => ({
        dataLabels: {
          y: (i === 0) ? -10 : 30
        },
        name: labels[j],
        y: val
      })),
      labels,
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-global_trade_trends/' : './'}assets/data/2023-global_trade_trends_figure2.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        allow_decimals={false}
        idx="2"
        data={dataFigure}
        note="Environmental goods are defined as in the Combined List of Environmental Goods (OECD). Statistics are locally weighted smoothed averages."
        show_first_label
        source="UNCTAD calculations based on national statistics of China, the United States of America and the European Union."
        subtitle="Index, January 2022 = 100"
        suffix=""
        title="Global trade is growing greener"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure2;
