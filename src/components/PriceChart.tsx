import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, ColorType, CrosshairMode, LineStyle, type IChartApi, type ISeriesApi, type UTCTimestamp } from 'lightweight-charts';
import type { Candle } from '@/types';

interface Props {
  candles: Candle[];
  height?: number;
  showVolume?: boolean;
  currentPrice?: number;
}

export function PriceChart({ candles, height = 300, showVolume = true, currentPrice }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const priceLineRef = useRef<ReturnType<ISeriesApi<'Candlestick'>['createPriceLine']> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#6b7280',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(42, 49, 61, 0.5)', style: LineStyle.Solid, visible: true },
      },
      rightPriceScale: {
        borderColor: '#2a313d',
        scaleMargins: { top: 0.08, bottom: showVolume ? 0.22 : 0.08 },
      },
      timeScale: {
        borderColor: '#2a313d',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 2,
        barSpacing: 8,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { visible: false },
        horzLine: { color: '#3b82f6', labelBackgroundColor: '#3b82f6' },
      },
      handleScale: { axisPressedMouseMove: true },
      handleScroll: { pressedMouseMove: true },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#16c784',
      downColor: '#ea3943',
      borderUpColor: '#16c784',
      borderDownColor: '#ea3943',
      wickUpColor: '#16c784',
      wickDownColor: '#ea3943',
      borderVisible: false,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height, showVolume]);

  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;

    const data = candles.map(c => ({
      time: Math.floor(c.time / 1000) as UTCTimestamp,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    // Deduplicate by time (lightweight-charts requires unique ascending timestamps)
    const seen = new Set<number>();
    const deduped = data.filter(d => {
      if (seen.has(d.time as number)) return false;
      seen.add(d.time as number);
      return true;
    });

    series.setData(deduped);

    // Current price dashed line
    if (priceLineRef.current) {
      series.removePriceLine(priceLineRef.current);
      priceLineRef.current = null;
    }
    const price = currentPrice ?? candles[candles.length - 1]?.close;
    if (price) {
      priceLineRef.current = series.createPriceLine({
        price,
        color: '#3b82f6',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: '',
      });
    }

    chartRef.current?.timeScale().fitContent();
  }, [candles, currentPrice]);

  return <div ref={containerRef} className="w-full" style={{ height }} />;
}
