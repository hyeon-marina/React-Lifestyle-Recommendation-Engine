import type { WeatherData } from '../types/weather';

interface WeatherSummaryCardProps {
    weather: WeatherData;
}

export function WeatherSummaryCard({ weather }: WeatherSummaryCardProps) {
    return (
        <div className="weather-summary-card">
            <h2>오늘의 날씨 정보</h2>

            <ul>
                <li>현재 기온: {weather.temperature}°C</li>
                <li>체감 온도: {weather.feelsLike}°C</li>
                <li>강수 확률: {weather.precipitationProbability}%</li>
                <li>날씨 상태: {weather.condition}</li>
                <li>미세먼지 등급: {weather.airQualityGrade}</li>
            </ul>
        </div>
    );
}