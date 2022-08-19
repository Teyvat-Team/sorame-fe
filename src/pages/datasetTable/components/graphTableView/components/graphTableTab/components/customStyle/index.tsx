import { SelectedGraphType } from '@/stores/dataTable';
import AreaChartCustomStyle from './areaChartCustomStyle';
import BarChartCustomStyle from './barChartCustomStyle';
import LineChartCustomStyle from './lineChartCustomStyle';
import PieChartCustomStyle from './pieChartCustomStyle';
import TableCustomStyle from './tableCustomStyle';

export type VisualizationCustomStyleComponentMap = Record<
  SelectedGraphType,
  JSX.Element
>;

const visualizationCustomStyleComponentMap: VisualizationCustomStyleComponentMap =
  {
    table: <TableCustomStyle></TableCustomStyle>,
    barChart: <BarChartCustomStyle></BarChartCustomStyle>,
    lineChart: <LineChartCustomStyle></LineChartCustomStyle>,
    areaChart: <AreaChartCustomStyle></AreaChartCustomStyle>,
    pieChart: <PieChartCustomStyle></PieChartCustomStyle>,
  };

export {
  visualizationCustomStyleComponentMap,
  TableCustomStyle,
  BarChartCustomStyle,
  LineChartCustomStyle,
  AreaChartCustomStyle,
  PieChartCustomStyle,
};
