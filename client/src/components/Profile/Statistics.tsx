import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import "./Profile.css";

export default function Statistics({ data }: any) {
    const wins = parseInt(data.win) || 0;
    const losses = parseInt(data.lose) || 0;
    const total = wins + losses;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return (
        <Box className="glass-card" sx={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Header */}
            <Typography sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
            }}>
                Statistics
            </Typography>

            {total === 0 ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, py: 4 }}>
                    <Typography sx={{ fontSize: '2.5rem' }}>🏓</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter', fontSize: '0.9rem' }}>
                        No games played yet
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Chart */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PieChart
                            series={[{
                                data: [
                                    { id: 0, value: wins, label: 'Wins', color: '#34d399' },
                                    { id: 1, value: losses, label: 'Losses', color: '#f87171' },
                                ],
                                innerRadius: 48,
                                outerRadius: 80,
                                paddingAngle: 3,
                                cornerRadius: 4,
                            }]}
                            width={280}
                            height={190}
                            sx={{
                                '& .MuiChartsLegend-root text': {
                                    fill: 'rgba(255,255,255,0.6) !important',
                                    fontFamily: 'Inter, sans-serif !important',
                                    fontSize: '12px !important',
                                },
                            }}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'bottom', horizontal: 'middle' },
                                    padding: { top: 10 },
                                    itemMarkWidth: 10,
                                    itemMarkHeight: 10,
                                    markGap: 6,
                                    itemGap: 20,
                                },
                            }}
                        />
                    </Box>

                    {/* Win rate ring label */}
                    <Box sx={{ textAlign: 'center', mt: -1 }}>
                        <Typography sx={{ fontFamily: 'Rubik', fontWeight: 700, fontSize: '2rem', color: winRate >= 50 ? '#34d399' : '#f87171', lineHeight: 1 }}>
                            {winRate}%
                        </Typography>
                        <Typography sx={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                            Win Rate
                        </Typography>
                    </Box>

                    {/* W / L chips */}
                    <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center', mt: 'auto' }}>
                        {[
                            { label: 'W', value: wins, color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' },
                            { label: 'L', value: losses, color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
                            { label: 'Total', value: total, color: '#93c5fd', bg: 'rgba(147,197,253,0.1)', border: 'rgba(147,197,253,0.25)' },
                        ].map(({ label, value, color, bg, border }) => (
                            <Box key={label} sx={{ flex: 1, textAlign: 'center', background: bg, border: `1px solid ${border}`, borderRadius: '12px', padding: '10px 8px' }}>
                                <Typography sx={{ fontFamily: 'Rubik', fontWeight: 700, fontSize: '1.25rem', color }}>
                                    {value}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    {label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}