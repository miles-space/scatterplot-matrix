import React from 'react';
import {
  VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel
} from 'victory';

const ScatterPlot = ({ data, x, y }) => {
  return (
    <VictoryChart
      style={{
        parent: {
          border: '1px solid #ccc'
        }
      }}
      padding={25}
      theme={VictoryTheme.material}
      width={400}
      height={400}
      standalone={true}
    >
      <VictoryAxis
        crossAxis
        dependentAxis
        axisLabelComponent={<VictoryLabel dx={100} dy={-20} />}
        label={y}
        width={400}
        height={400}
        offsetX={200}
        standalone={false}
        tickCount={14}
        data={data}
        tickFormat={t => `${t}`}
        style={{
          tick: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 3, padding: 3 },
          axisLabel: { fontSize: 13, padding: 3 }
        }}
      />
      <VictoryAxis
        crossAxis
        axisLabelComponent={<VictoryLabel dx={100} dy={-20} />}
        label={x}
        width={400}
        height={400}
        offsetY={200}
        standalone={true}
        tickCount={14}
        data={data}
        style={{
          tick: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 3, padding: 3 },
          axisLabel: { fontSize: 13, padding: 3 }
        }}
      />

      <VictoryScatter
        sortOrder="ascending"
        sortKey={x}
        x={x}
        y={y}
        style={{ data: { fill: 'darkorange' } }}
        size={3}
        data={data}
        standalone={false}
      />
    </VictoryChart>
  );
};

export default ScatterPlot;
