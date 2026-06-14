import type { RecommendationResult } from '../types/weather';

interface RecommendationCardProps {
    recommendation: RecommendationResult;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
    return (
        <div className="recommendation-card">
            <div className="recommendation-card__header">
                <h3>{recommendation.title}</h3>
                <span>{recommendation.level}</span>
            </div>

            <p>{recommendation.message}</p>
        </div>
    );
}