import { SelectedGraphType } from '@/stores/dataTable';
import AreaChartVisualization from './areaChartVisualization';
import BarChartVisualization from './barChartVisualization';
import LineChartVisualization from './lineChartVisualization';
import PieChartVisualization from './pieChartVisualization';
import TableVisualization from './tableVisualization';

export type VisualizationComponentMap = Record<SelectedGraphType, JSX.Element>;

const visualizationComponentMap: VisualizationComponentMap = {
  table: <TableVisualization></TableVisualization>,
  barChart: <BarChartVisualization></BarChartVisualization>,
  lineChart: <LineChartVisualization></LineChartVisualization>,
  areaChart: <AreaChartVisualization></AreaChartVisualization>,
  pieChart: <PieChartVisualization></PieChartVisualization>,
};

export {
  visualizationComponentMap,
  TableVisualization,
  BarChartVisualization,
  LineChartVisualization,
  AreaChartVisualization,
  PieChartVisualization,
};
