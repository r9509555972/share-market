import { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { Candle } from '@/types';
import { useLang } from '@/context/LangContext';

interface Props {
  candles: Candle[];
  height?: number;
  showVolume?: boolean;
}

/** Candlestick-style chart built from recharts composed chart. */
export function PriceChart({ candles, height = 300, showVolume = true }: Props) {
  const { t } = useLang();
  const data = useMemo(() => candles.map(c => ({
    time: c.time,
    open: c.open,
    close: c.close,
    high: c.high,
    low: c.low,
    volume: c.volume,
    wickTop: c.high,
    wickBottom: c.low,
    bodyTop: Math.max(c.open, c.close),
    bodyBottom: Math.min(c.open, c.close),
    isUp: c.close >= c.open,
  })), [candles]);

  const prices = data.map(d => [d.high, d.low]).flat();
  const yMin = Math.min(...prices) * 0.995;
  const yMax = Math.max(...prices) * 1.005;
  const maxVol = Math.max(...data.map(d => d.volume), 1);

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="time"
            tickFormatter={ts => new Date(ts).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
            stroke="var(--color-border)"
            minTickGap={40}
          />
          <YAxis
            domain={[yMin, yMax]}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
            stroke="var(--color-border)"
            tickFormatter={v => v.toFixed(0)}
            orientation="right"
            width={50}
          />
          {showVolume && (
            <YAxis
              yAxisId="vol"
              orientation="left"
              domain={[0, maxVol * 4]}
              hide
            />
          )}
          <Tooltip content={<CandleTooltip />} />

          {/* Volume bars at bottom */}
          {showVolume && (
            <Bar
              yAxisId="vol"
              dataKey="volume"
              barSize={6}
              isAnimationActive={false}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                const color = payload.isUp ? 'var(--color-up)' : 'var(--color-down)';
                return <rect x={x} y={y} width={width} height={height} fill={color} opacity={0.35} rx={1} />;
              }}
            />
          )}

          {/* Wick: thin line from low to high */}
          <Line
            dataKey="wickTop"
            stroke="none"
            dot={false}
            isAnimationActive={false}
          />
          {/* Candle bodies rendered as bars between open & close */}
          <Bar
            dataKey="bodyTop"
            barSize={7}
            isAnimationActive={false}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const bodyH = Math.max(Math.abs(payload.close - payload.open), (yMax - yMin) * 0.002);
              const top = payload.close >= payload.open ? y : y + height - bodyH;
              const color = payload.isUp ? 'var(--color-up)' : 'var(--color-down)';
              const cx = x + width / 2;
              const wickX = cx - width / 14;
              const wickW = width / 7;
              return (
                <g>
                  {/* wick */}
                  <rect x={cx + width / 2 - 0.5} y={y - (payload.high - payload.bodyTop) * (height / Math.max(bodyH, 1))} width={1} height={(payload.high - payload.low) * (height / Math.max(bodyH, 1))} fill={color} opacity={0.6} />
                  <rect x={x} y={top} width={width} height={bodyH} fill={color} rx={1} />
                  {wickX > x && <rect x={wickX} y={top} width={wickW} height={bodyH} fill={color} rx={1} opacity={0.85} />}
                </g>
              );
            }}
          />

          {candles.length > 0 && (
            <ReferenceLine y={candles[candles.length - 1].close} stroke="var(--color-accent)" strokeDasharray="3 3" strokeOpacity={0.5} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function CandleTooltip({ active, payload }: any) {
  const { t } = useLang();
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-3)] px-3 py-2 text-xs shadow-xl">
      <div className="mb-1 text-[var(--color-text-muted)]">{new Date(d.time).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        <span className="text-[var(--color-text-muted)]">O</span><span className="text-right font-medium">{d.open.toFixed(2)}</span>
        <span className="text-[var(--color-text-muted)]">H</span><span className="text-right font-medium text-[var(--color-up)]">{d.high.toFixed(2)}</span>
        <span className="text-[var(--color-text-muted)]">L</span><span className="text-right font-medium text-[var(--color-down)]">{d.low.toFixed(2)}</span>
        <span className="text-[var(--color-text-muted)]">C</span><span className={`text-right font-medium ${d.isUp ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>{d.close.toFixed(2)}</span>
        {d.volume > 0 && (<><span className="text-[var(--color-text-muted)]">Vol</span><span className="text-right font-medium">{d.volume.toLocaleString('en-IN')}</span></>)}
      </div>
    </div>
  );
}
