import { WeatherIcon } from '../../assets/weather-icons';
import {
  Bar,
  BarChart,
  CartesianGrid,
  DotProps,
  LabelList,
  LabelListProps,
  LabelProps,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { extend } from 'leaflet';

// export const HourlyForecast = ({ hours }: { hours: Forecast[] }) => (
//     <HourlyChart chartData={hours.filter(hour => hour.temperature && hour.startTime)} />
// );
// hours.map((forecast: Forecast) => (
//   <WeatherHourItem key={forecast.startTime} {...forecast} />
// ));

const formatHours = (time: string) => {
  const hours = new Date(time).getHours();
  return (hours % 12 ? hours % 12 : 12) + (hours >= 12 ? 'PM' : 'AM');
};

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface ChartProps {
  chartData: Forecast[];
}

interface HourlyChartProps extends ChartProps {
  type?: 'temperature' | 'probabilityOfPrecipitation.value' | 'windSpeed';
}

export const HourlyForecast = ({ hours }: { hours: Forecast[] }) => {
  const chartData = hours
    .filter((hour) => hour.temperature && hour.startTime)
    .map((d) => ({
      ...d,
      startTime: formatHours(d.startTime),
    }));
  return (
    <Tabs defaultValue='temperature' className='w-[400px]'>
      <TabsList className='ml-auto'>
        <TabsTrigger value='temperature'>Temperature</TabsTrigger>
        <TabsTrigger value='percipitation'>Percipitation %</TabsTrigger>
        {/* <TabsTrigger value='wind'>Wind</TabsTrigger> */}
      </TabsList>
      <TabsContent value='temperature'>
        <TempChart chartData={chartData} />
      </TabsContent>
      <TabsContent value='percipitation'>
        <PercipChart chartData={chartData} />
      </TabsContent>
      {/* <TabsContent value='wind'>
        <HourlyChart type='windSpeed' chartData={chartData} />
      </TabsContent> */}
    </Tabs>
  );
};

const PercipChart = ({ chartData }: ChartProps) => (
  <ChartContainer config={chartConfig} className='max-h-[150px] w-full'>
    <BarChart
      accessibilityLayer
      data={chartData}
      margin={{
        top: 24,
      }}
    >
      <CartesianGrid vertical={false} />
      <YAxis domain={['dataMin', 'dataMax']} hide />
      <XAxis
        dataKey='startTime'
        tickLine={false}
        axisLine={false}
        tick={{ fill: 'var(--color-foreground)' }}
      />
      <ChartTooltip
        cursor={false}
        content={
          <ChartTooltipContent
            formatter={(val) => [val, '% of percipitation']}
          />
        }
      />
      <Bar
        dataKey='probabilityOfPrecipitation.value'
        fill='var(--color-secondary)'
        radius={8}
      >
        <LabelList
          position='top'
          className='fill-foreground'
          dataKey='probabilityOfPrecipitation.value'
          content={(props) => <CustomBarLabel {...props} data={chartData} />}
        />
      </Bar>
    </BarChart>
  </ChartContainer>
);

const TempChart = ({ chartData }: ChartProps) => (
  <ChartContainer config={chartConfig} className='max-h-[150px] w-full'>
    <LineChart
      accessibilityLayer
      data={chartData}
      margin={{
        top: 24,
        left: 16,
        right: 16,
      }}
    >
      {console.log('chart', chartData)}
      <YAxis domain={['dataMin', 'dataMax']} hide />
      <XAxis
        dataKey='startTime'
        tickLine={false}
        // axisLine={false}
        tick={{ fill: 'var(--color-foreground)' }}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator='line' />}
      />
      <Line
        dataKey='temperature'
        type='natural'
        stroke='var(--color-secondary)'
        strokeWidth={2}
        dot={<CustomDot />}
      >
        <LabelList position='top' content={<CustomLabel />} />
      </Line>
    </LineChart>
  </ChartContainer>
);

interface CustomDotProps extends DotProps {
  index?: number; // Recharts doesn't always include index, so make it optional
}

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, index } = props;
  return index !== undefined && index % 2 === 0 ? (
    <circle cx={cx} cy={cy} r={4} fill='var(--color-foreground)' />
  ) : null;
};

interface BarLabelProps extends LabelProps {
  data: Forecast[];
}

const CustomBarLabel = ({ x, y, value, index, data }: BarLabelProps) => {
  if (x === undefined || y === undefined || value === undefined) return null;
  index = index || 0;

  // Find indices where values change
  const changeIndices: number[] = [];
  for (let i = 1; i < data.length; i++) {
    if (
      data[i].probabilityOfPrecipitation.value !==
      data[i - 1].probabilityOfPrecipitation.value
    ) {
      changeIndices.push(i);
    }
  }

  // Ensure last value is labeled if it's part of a zero sequence
  const lastValue = data[data.length - 1].probabilityOfPrecipitation.value;
  if (Number(lastValue) === 0 && !changeIndices.includes(data.length - 1)) {
    changeIndices.push(data.length - 1);
  }

  // Count how frequently values change
  const frequentChanges = changeIndices.length > data.length / 2;

  // If frequent changes exist, only show every 3rd change index
  if (frequentChanges && index % 3 !== 0) return null;

  // Find midpoints of value change groups
  const midpoints = changeIndices
    .map((changeIndex, i) => {
      if (i < changeIndices.length - 1) {
        return Math.floor((changeIndices[i] + changeIndices[i + 1]) / 2);
      }
      return changeIndex; // Ensure last zero is labeled
    })
    .filter((index) => index !== null) as number[];

  // Only show label if it's a calculated midpoint OR a targeted frequent change
  if (!midpoints.includes(index) && !frequentChanges) return null;

  return (
    <text
      x={x ? Number(x) + 8 : 0}
      y={y ? Number(y) - 10 : 0}
      fontSize={12}
      className='fill-foreground'
      fontWeight='bold'
      textAnchor='middle'
    >
      {value}%
    </text>
  );
};

const CustomLabel = ({ x, y, value, index }: LabelProps) => {
  return index !== undefined && index % 2 === 0 ? (
    <text
      x={x}
      y={y ? Number(y) - 10 : 0}
      fontSize={12}
      textAnchor='middle'
      className='fill-foreground'
    >
      {value}
    </text>
  ) : (
    <></>
  );
};
