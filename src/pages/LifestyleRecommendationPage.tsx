import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/weatherApi';
import { RecommendationCard } from '../components/RecommendationCard';
import { WeatherSummaryCard } from '../components/WeatherSummaryCard';
import { createLifestyleRecommendations } from '../recommendation/lifestyleRecommendationEngine';
import type { RecommendationResult, WeatherData } from '../types/weather';
import { normalizeWeatherData } from '../utils/normalizeWeatherData';

export function LifestyleRecommendationPage() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function loadWeather() {
            try {
                setIsLoading(true);
                setErrorMessage('');

                const rawWeatherData = await fetchWeatherData();
                const normalizedWeatherData = normalizeWeatherData(rawWeatherData);
                const recommendationResults = createLifestyleRecommendations(normalizedWeatherData);

                setWeather(normalizedWeatherData);
                setRecommendations(recommendationResults);
            } catch {
                setErrorMessage('날씨 기반 추천 정보를 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        }

        loadWeather();
    }, []);

    if (isLoading) {
        return <div className="page">추천 정보를 불러오는 중입니다.</div>;
    }

    if (errorMessage) {
        return <div className="page error-message">{errorMessage}</div>;
    }

    if (!weather) {
        return <div className="page">날씨 정보가 없습니다.</div>;
    }

    return (
        <main className="page">
            <header className="page-header">
                <h1>라이프스타일 추천 엔진</h1>
                <p>
                    날씨와 대기 정보를 기반으로 오늘의 옷차림, 준비물, 행동 가이드를 추천합니다.
                </p>
            </header>

            <WeatherSummaryCard weather={weather} />

            <section className="recommendation-section">
                <h2>오늘의 추천</h2>

                <div className="recommendation-list">
                    {recommendations.map((recommendation) => (
                        <RecommendationCard
                            key={recommendation.title}
                            recommendation={recommendation}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}