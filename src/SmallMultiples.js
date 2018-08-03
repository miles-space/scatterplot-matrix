import React from 'react';
import ScatterPlot from './ScatterPlot';
import pc from './PearsonCorrelation';

const CORRELATION_THRESH = 0.4;

const SmallMultiples = ({ data = [] }) => {
  if (data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${headers.length}, ${(1.0 /
          headers.length) *
          100}%)`,
        gridGap: '1',
        paddingleft: '10px',
        paddingRight: '20px',
        fontFamily: 'Roboto',
        fontWeight: 'bold'
      }}
    >
      {headers.map(h => <div> {h} </div>)}
      {headers.map((h1, index, headers) => {
        return headers.map((h2, index, headers) => {
          if (data[index][[h1]] <= data[index][[h2]]) {
            return <div>{}</div>;
          }
          const prefs = {};
          prefs[h1] = data.map(d => d[h1]);
          prefs[h2] = data.map(d => d[h2]);
          const correlation = pc(prefs, h1, h2);
          if (Math.abs(correlation) < CORRELATION_THRESH) {
            return (
              <div>
                {h1}
                <br /> {h2} <br />
                {correlation.toFixed(2)}
              </div>
            );
          }

          return (
            <div>
              {' '}
              {correlation.toFixed(2)}{' '}
              <ScatterPlot key={`${h1}_${h2}`} data={data} x={h1} y={h2} />
            </div>
          );
        });
      })}
    </div>
  );
};

export default SmallMultiples;
