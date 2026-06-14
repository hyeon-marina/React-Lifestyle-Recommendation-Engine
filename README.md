# React Lifestyle Recommendation Engine

React와 Open API 데이터를 활용해 날씨 정보를 단순 출력하는 데서 끝내지 않고, 옷차림·준비물·미세먼지 대응처럼 사용자의 행동을 유도하는 추천 결과로 변환하는 예제 프로젝트입니다.

## 프로젝트 개요

많은 프로젝트에서 날씨 API는 현재 기온, 날씨 상태, 강수 확률 등을 보여주는 용도로만 사용됩니다.

예를 들어 다음과 같은 방식입니다.

```txt
현재 기온: 5°C
강수 확률: 70%
미세먼지: 나쁨
```

하지만 실제 서비스에서는 단순한 데이터보다 사용자가 바로 판단하고 행동할 수 있는 정보가 더 중요합니다.

이 프로젝트는 날씨와 대기 정보를 기반으로 다음과 같은 추천 결과를 생성합니다.

```txt
오늘은 쌀쌀한 날씨입니다. 두꺼운 외투나 코트를 추천합니다.
현재 비 예보가 있습니다. 외출 시 우산을 챙기는 것이 좋습니다.
미세먼지 농도가 나쁩니다. 장시간 야외활동을 줄이고 마스크 착용을 권장합니다.
```

즉, 이 프로젝트의 핵심은 다음과 같습니다.

```txt
API Raw Data
→ 서비스 내부 데이터로 정규화
→ Rule 기반 추천 로직 적용
→ 사용자 행동 추천 결과 생성
```

## 주요 기능

* Mock 날씨 API 데이터 제공
* API Raw Data를 서비스 내부 모델로 정규화
* 체감온도 기반 옷차림 추천
* 강수 확률 및 날씨 상태 기반 우산 추천
* 미세먼지 등급 기반 행동 가이드 제공
* React 컴포넌트를 통한 추천 결과 표시

## 기술 스택

* React
* TypeScript
* Vite
* CSS

## 프로젝트 구조

```txt
src/
├── api/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── utils/
│   └── normalizeWeatherData.ts
├── recommendation/
│   ├── clothingRules.ts
│   ├── umbrellaRules.ts
│   ├── airQualityRules.ts
│   └── lifestyleRecommendationEngine.ts
├── components/
│   ├── WeatherSummaryCard.tsx
│   └── RecommendationCard.tsx
└── pages/
    └── LifestyleRecommendationPage.tsx
```

## 디렉터리 역할

| 디렉터리             | 역할                        |
| ---------------- | ------------------------- |
| `api`            | 외부 API 또는 Mock API 호출 담당  |
| `types`          | 서비스에서 사용할 데이터 타입 정의       |
| `utils`          | API 응답 데이터를 서비스 내부 모델로 변환 |
| `recommendation` | Rule 기반 추천 로직 구현          |
| `components`     | 재사용 가능한 UI 컴포넌트           |
| `pages`          | 실제 화면 단위 컴포넌트             |

## 실행 방법

### 1. Repository Clone

```bash
git clone https://github.com/hyeon-marina/React-Lifestyle-Recommendation-Engine.git
cd React-Lifestyle-Recommendation-Engine
```

### 2. Dependency Install

```bash
npm install
```

### 3. Development Server Run

```bash
npm run dev
```

Vite 개발 서버가 실행되면 브라우저에서 안내된 주소로 접속합니다.

예시:

```txt
http://localhost:5173
```

## 구현 흐름

이 프로젝트의 전체 데이터 흐름은 다음과 같습니다.

```txt
fetchWeatherData()
        ↓
normalizeWeatherData()
        ↓
createLifestyleRecommendations()
        ↓
RecommendationCard 렌더링
```

### 1. Mock API 데이터 가져오기

`src/api/weatherApi.ts`

```ts
export async function fetchWeatherData() {
  return {
    main: {
      temp: 5,
      feels_like: 2,
    },
    weather: [
      {
        main: 'Rain',
      },
    ],
    rain: {
      probability: 70,
    },
    airQuality: {
      pm10: 90,
    },
  };
}
```

현재는 튜토리얼 목적에 맞게 실제 API 대신 Mock 데이터를 사용합니다.

초기 구현 단계에서 Mock 데이터를 사용하는 이유는 다음과 같습니다.

* API Key 발급 없이 바로 실행 가능
* 네트워크 환경과 무관하게 테스트 가능
* 추천 로직 자체에 집중 가능
* 후배 개발자가 프로젝트 구조를 쉽게 이해 가능

## 데이터 정규화

외부 API 응답 구조를 서비스 전체에서 직접 사용하면 유지보수가 어려워집니다.

예를 들어 다음과 같이 API 응답 구조에 직접 의존하는 코드는 좋지 않습니다.

```ts
raw.main.feels_like
raw.weather[0].main
raw.airQuality.pm10
```

API 응답 구조가 변경되면 여러 파일을 수정해야 하기 때문입니다.

따라서 이 프로젝트에서는 API 응답을 한 번 정규화해서 내부 모델로 변환합니다.

`src/types/weather.ts`

```ts
export interface WeatherData {
  temperature: number;
  feelsLike: number;
  precipitationProbability: number;
  condition: WeatherCondition;
  airQualityGrade: AirQualityGrade;
}
```

서비스 내부에서는 API Raw Data 대신 `WeatherData`만 사용합니다.

```txt
RawWeatherApiResponse
        ↓
WeatherData
```

이렇게 하면 API 응답 구조가 바뀌어도 `normalizeWeatherData.ts`만 수정하면 됩니다.

## 추천 로직

추천 로직은 UI 컴포넌트와 분리되어 있습니다.

```txt
recommendation/
├── clothingRules.ts
├── umbrellaRules.ts
├── airQualityRules.ts
└── lifestyleRecommendationEngine.ts
```

### 옷차림 추천

`clothingRules.ts`에서는 체감온도를 기준으로 옷차림을 추천합니다.

예시 기준:

```txt
체감온도 0°C 이하   → 패딩, 목도리, 장갑 추천
체감온도 8°C 이하   → 두꺼운 외투 또는 코트 추천
체감온도 16°C 이하  → 가벼운 외투 또는 니트 추천
체감온도 23°C 이하  → 긴팔 또는 얇은 겉옷 추천
그 이상             → 반팔 또는 얇은 옷차림 추천
```

### 우산 추천

`umbrellaRules.ts`에서는 강수 확률과 날씨 상태를 함께 사용합니다.

예시 기준:

```txt
현재 날씨가 RAIN        → 우산 추천
강수 확률 70% 이상      → 우산 추천
강수 확률 40% 이상      → 장시간 외출 시 우산 권장
그 외                  → 우산 없이 외출 가능
```

### 미세먼지 대응 추천

`airQualityRules.ts`에서는 미세먼지 등급에 따라 행동 가이드를 제공합니다.

예시 기준:

```txt
GOOD      → 야외활동 가능
NORMAL    → 민감군 주의
BAD       → 장시간 야외활동 자제, 마스크 권장
VERY_BAD  → 불필요한 외출 자제
UNKNOWN   → 미세먼지 정보 없음
```

## 추천 엔진 통합

각 추천 규칙은 `lifestyleRecommendationEngine.ts`에서 하나로 통합됩니다.

```ts
export function createLifestyleRecommendations(
  weather: WeatherData,
): RecommendationResult[] {
  return [
    recommendClothing(weather),
    recommendUmbrella(weather),
    recommendAirQualityAction(weather),
  ];
}
```

컴포넌트는 추천 로직을 직접 알 필요 없이 추천 엔진만 호출하면 됩니다.

```ts
const recommendations = createLifestyleRecommendations(weather);
```

## 화면 구성

화면은 크게 두 부분으로 구성됩니다.

```txt
1. 오늘의 날씨 정보
2. 오늘의 추천 결과
```

### WeatherSummaryCard

정규화된 날씨 데이터를 표시합니다.

```txt
현재 기온
체감 온도
강수 확률
날씨 상태
미세먼지 등급
```

### RecommendationCard

추천 엔진이 생성한 결과를 카드 형태로 표시합니다.

```txt
추천 제목
추천 위험도
추천 메시지
```

## 현재 구현 결과 예시

Mock 데이터 기준으로 다음과 같은 결과가 표시됩니다.

```txt
오늘의 날씨 정보

현재 기온: 5°C
체감 온도: 2°C
강수 확률: 70%
날씨 상태: RAIN
미세먼지 등급: BAD

오늘의 추천

옷차림 추천
쌀쌀한 날씨입니다. 두꺼운 외투나 코트를 추천합니다.

준비물 추천
현재 비 예보가 있습니다. 외출 시 우산을 챙기는 것이 좋습니다.

미세먼지 대응
미세먼지 농도가 나쁩니다. 장시간 야외활동을 줄이고 마스크 착용을 권장합니다.
```

## 이 프로젝트의 핵심 설계 포인트

### 1. API 응답과 서비스 로직 분리

외부 API 응답 구조를 추천 로직이나 UI에서 직접 사용하지 않습니다.

```txt
API 응답 구조 변경
→ normalizeWeatherData만 수정
→ 추천 로직과 UI는 유지
```

### 2. 추천 규칙 분리

옷차림, 우산, 미세먼지 추천 로직을 각각 별도 파일로 분리했습니다.

이 구조는 추천 기준이 변경되거나 추천 항목이 추가될 때 유리합니다.

### 3. UI는 결과 표시만 담당

React 컴포넌트는 추천 기준을 판단하지 않습니다.

컴포넌트는 추천 엔진이 반환한 결과를 화면에 표시하는 역할만 담당합니다.

## 확장 방향

현재 프로젝트는 Mock API 기반의 Rule 기반 추천 예제입니다.

추후 다음과 같이 확장할 수 있습니다.

### 1. 실제 OpenWeatherMap API 연동

Mock 데이터를 제거하고 실제 날씨 API를 연결할 수 있습니다.

```txt
OpenWeatherMap API
→ Backend API
→ React Client
```

API Key 보호를 위해 실제 서비스에서는 프론트엔드에서 직접 외부 API를 호출하기보다 백엔드를 거치는 구조가 적합합니다.

### 2. 공공데이터 API 기반 미세먼지 정보 연동

현재는 Mock 데이터의 `pm10` 값을 기준으로 미세먼지 등급을 계산합니다.

추후 공공데이터 API를 연결하면 실제 지역별 미세먼지 정보를 기반으로 추천할 수 있습니다.

### 3. 사용자 설정 기반 개인화 추천

사용자의 성향을 반영할 수 있습니다.

예시:

```ts
interface UserPreference {
  coldSensitivity: 'LOW' | 'NORMAL' | 'HIGH';
}
```

추위를 많이 타는 사용자에게는 같은 온도에서도 더 따뜻한 옷차림을 추천할 수 있습니다.

### 4. 일정 서비스와 연동

일정 정보와 날씨 정보를 함께 활용할 수 있습니다.

예시:

```txt
오전 9시 외출 일정 있음
오전 강수 확률 80%

추천:
출근 시간대 비 예보가 있으므로 우산을 챙기는 것이 좋습니다.
```

### 5. 추천 엔진 백엔드 분리

추천 규칙이 복잡해지거나 여러 클라이언트에서 동일한 추천 로직을 사용해야 한다면 추천 엔진을 백엔드로 분리할 수 있습니다.

```txt
React Client
    ↓
Backend API
    ↓
Recommendation Engine
    ↓
Weather API / Air Quality API
```

## 마무리

이 프로젝트는 단순한 날씨 정보 출력 예제가 아닙니다.

핵심은 외부 API 데이터를 그대로 보여주는 것이 아니라, 서비스 목적에 맞게 가공하고 사용자의 행동을 유도하는 추천 결과로 변환하는 것입니다.

```txt
기온 5°C
강수 확률 70%
미세먼지 나쁨
```

위와 같은 데이터를 다음과 같이 바꾸는 것이 이 프로젝트의 목적입니다.

```txt
오늘은 두꺼운 외투를 추천합니다.
외출 시 우산을 챙기는 것이 좋습니다.
장시간 야외활동은 줄이는 것이 좋습니다.
```

이 구조를 활용하면 날씨 추천뿐만 아니라 운동, 일정, 루틴, 건강 관리 등 다양한 추천 기능으로 확장할 수 있습니다.
