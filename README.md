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
* OpenWeatherMap Current Weather Data API 선택 연동
* API 요청 실패 시 Mock 데이터 fallback
* API Raw Data를 서비스 내부 모델로 정규화
* 체감온도 기반 옷차림 추천
* 강수 가능성 및 날씨 상태 기반 우산 추천
* 미세먼지 등급 기반 행동 가이드 제공
* React 컴포넌트를 통한 추천 결과 표시
* 추천 규칙 단위 테스트
* 날씨 데이터 정규화 테스트

## 기술 스택

* React
* TypeScript
* Vite
* Vitest
* CSS

## 프로젝트 구조

```txt
src/
├── api/
│   └── weatherApi.ts
├── components/
│   ├── RecommendationCard.tsx
│   └── WeatherSummaryCard.tsx
├── data/
│   └── mockWeatherData.ts
├── pages/
│   └── LifestyleRecommendationPage.tsx
├── recommendation/
│   ├── __tests__/
│   │   ├── airQualityRules.test.ts
│   │   ├── clothingRules.test.ts
│   │   ├── lifestyleRecommendationEngine.test.ts
│   │   └── umbrellaRules.test.ts
│   ├── airQualityRules.ts
│   ├── clothingRules.ts
│   ├── lifestyleRecommendationEngine.ts
│   └── umbrellaRules.ts
├── types/
│   └── weather.ts
└── utils/
    ├── __tests__/
    │   └── normalizeWeatherData.test.ts
    └── normalizeWeatherData.ts
```

## 디렉터리 역할

| 디렉터리             | 역할                        |
| ---------------- | ------------------------- |
| `api`            | 외부 API 또는 Mock API 호출 담당  |
| `components`     | 재사용 가능한 UI 컴포넌트           |
| `data`           | Mock 데이터 관리               |
| `pages`          | 실제 화면 단위 컴포넌트             |
| `recommendation` | Rule 기반 추천 로직 구현          |
| `types`          | 서비스에서 사용할 데이터 타입 정의       |
| `utils`          | API 응답 데이터를 서비스 내부 모델로 변환 |

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

## 환경변수 설정

이 프로젝트는 기본적으로 Mock 날씨 데이터를 사용합니다.
따라서 별도의 API Key가 없어도 프로젝트를 실행하고 추천 엔진의 동작을 확인할 수 있습니다.

실제 날씨 데이터를 사용하려면 OpenWeatherMap의 Current Weather Data API Key를 발급받은 뒤, 프로젝트 루트에 `.env` 파일을 생성하고 다음 값을 추가합니다.

```env
VITE_OPEN_WEATHER_API_KEY=your_open_weather_api_key
```

환경변수를 추가하거나 수정한 뒤에는 Vite 개발 서버를 재시작해야 합니다.

```bash
npm run dev
```

### `.env.example`

Repository에는 실제 API Key를 포함하지 않습니다.
대신 다음과 같은 `.env.example` 파일을 제공할 수 있습니다.

```env
VITE_OPEN_WEATHER_API_KEY=
```

### `.gitignore`

실제 API Key가 들어가는 `.env` 파일은 Git에 올라가면 안 됩니다.

`.gitignore`에 다음 항목이 포함되어 있어야 합니다.

```gitignore
.env
.env.local
```

## OpenWeatherMap API 연동

이 프로젝트에서 사용하는 실제 날씨 API는 OpenWeatherMap의 Current Weather Data API입니다.

요청 형태는 다음과 같습니다.

```txt
GET https://api.openweathermap.org/data/2.5/weather
```

예시 요청 URL은 다음과 같습니다.

```txt
https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=YOUR_API_KEY&units=metric
```

현재 구현에서는 `q=Seoul`을 기준으로 서울의 날씨 데이터를 가져옵니다.

## API Key가 없는 경우

`.env` 파일이 없거나 `VITE_OPEN_WEATHER_API_KEY` 값이 비어 있으면 프로젝트는 자동으로 Mock 데이터를 사용합니다.

```txt
API Key 없음
→ Mock 날씨 데이터 사용
→ 추천 결과 정상 표시
```

## API 요청 실패 시 fallback

API Key가 잘못되었거나 OpenWeatherMap 요청에 실패하면 화면을 중단하지 않고 Mock 데이터를 사용합니다.

```txt
OpenWeatherMap API 요청 실패
→ 콘솔에 경고 출력
→ Mock 날씨 데이터 사용
→ 추천 결과 정상 표시
```

예를 들어 API Key가 유효하지 않으면 OpenWeatherMap에서 다음과 같은 응답이 발생할 수 있습니다.

```json
{
  "cod": 401,
  "message": "Invalid API key."
}
```

이 경우에도 프로젝트는 Mock 데이터로 fallback되어 계속 동작합니다.

## Mock 데이터 사용 이유

이 프로젝트는 기술자료와 튜토리얼 목적의 예제 프로젝트입니다.
따라서 API Key 발급 여부와 관계없이 누구나 클론 후 바로 실행할 수 있어야 합니다.

Mock fallback 구조를 사용하는 이유는 다음과 같습니다.

* API Key 없이도 프로젝트 실행 가능
* API 요청 실패 시에도 화면 동작 유지
* 추천 로직 테스트와 학습에 집중 가능
* 외부 API 상태에 영향을 덜 받는 예제 구성 가능

## 현재 구현의 강수 확률 처리 방식

OpenWeatherMap Current Weather Data API는 일반적인 강수 확률 값을 직접 제공하지 않습니다.

따라서 현재 프로젝트에서는 다음 기준으로 강수 가능성을 단순 추정합니다.

```txt
weather.main 값이 Rain인 경우
→ 강수 가능성 70으로 처리

rain.1h 또는 rain.3h 값이 존재하는 경우
→ 강수 가능성 70으로 처리

그 외
→ 강수 가능성 0으로 처리
```

정확한 시간대별 강수 확률이 필요한 경우에는 Current Weather Data API가 아니라 Forecast API 또는 One Call API 사용을 고려해야 합니다.

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

### 1. 날씨 데이터 가져오기

`fetchWeatherData()`는 다음 순서로 동작합니다.

```txt
1. VITE_OPEN_WEATHER_API_KEY 확인
2. API Key가 없으면 Mock 데이터 반환
3. API Key가 있으면 OpenWeatherMap API 호출
4. API 요청 성공 시 실제 API 응답 반환
5. API 요청 실패 시 Mock 데이터 반환
```

### 2. API Raw Data 정규화

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

`umbrellaRules.ts`에서는 강수 가능성과 날씨 상태를 함께 사용합니다.

예시 기준:

```txt
현재 날씨가 RAIN        → 우산 추천
강수 가능성 70 이상     → 우산 추천
강수 가능성 40 이상     → 장시간 외출 시 우산 권장
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
강수 가능성
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

## 테스트

이 프로젝트는 추천 로직과 데이터 정규화 로직을 테스트합니다.

### 테스트 실행

```bash
npm run test:run
```

### Watch 모드 실행

```bash
npm run test
```

### 테스트 대상

```txt
recommendation/
├── clothingRules.test.ts
├── umbrellaRules.test.ts
├── airQualityRules.test.ts
└── lifestyleRecommendationEngine.test.ts

utils/
└── normalizeWeatherData.test.ts
```

### 테스트하는 내용

* 체감온도 기준 옷차림 추천 결과
* 강수 가능성과 날씨 상태 기준 우산 추천 결과
* 미세먼지 등급 기준 행동 가이드
* 추천 엔진의 통합 결과
* API Raw Data가 WeatherData로 정상 변환되는지
* 누락된 API 데이터가 기본값 또는 UNKNOWN으로 안전하게 처리되는지

## 빌드

```bash
npm run build
```

## Lint

```bash
npm run lint
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

### 4. API 실패에 안전한 fallback 구조

외부 API 호출이 실패해도 화면이 중단되지 않습니다.

```txt
외부 API 실패
→ Mock 데이터 fallback
→ 추천 엔진 정상 실행
```

튜토리얼형 프로젝트에서는 이 구조가 중요합니다.
학습자는 API Key 발급 여부와 관계없이 프로젝트를 실행하고 핵심 로직을 확인할 수 있습니다.

## 확장 방향

현재 프로젝트는 Mock API와 OpenWeatherMap API를 함께 지원하는 Rule 기반 추천 예제입니다.

추후 다음과 같이 확장할 수 있습니다.

### 1. 지역 선택 기능

현재는 서울 기준으로 날씨 데이터를 가져옵니다.

추후 사용자가 지역을 선택하거나 브라우저 위치 정보를 활용해 지역별 추천을 제공할 수 있습니다.

```txt
서울 사용자 → 서울 날씨 기준 추천
부산 사용자 → 부산 날씨 기준 추천
제주 사용자 → 제주 날씨 기준 추천
```

### 2. 공공데이터 API 기반 미세먼지 정보 연동

현재는 Mock 데이터의 `pm10` 값을 기준으로 미세먼지 등급을 계산합니다.

추후 공공데이터 API를 연결하면 실제 지역별 미세먼지 정보를 기반으로 추천할 수 있습니다.

### 3. 정확한 강수 확률 연동

현재는 Current Weather Data API의 응답을 기반으로 강수 가능성을 단순 추정합니다.

정확한 시간대별 강수 확률이 필요하다면 Forecast API 또는 One Call API를 사용할 수 있습니다.

### 4. 사용자 설정 기반 개인화 추천

사용자의 성향을 반영할 수 있습니다.

예시:

```ts
interface UserPreference {
  coldSensitivity: 'LOW' | 'NORMAL' | 'HIGH';
}
```

추위를 많이 타는 사용자에게는 같은 온도에서도 더 따뜻한 옷차림을 추천할 수 있습니다.

### 5. 일정 서비스와 연동

일정 정보와 날씨 정보를 함께 활용할 수 있습니다.

예시:

```txt
오전 9시 외출 일정 있음
오전 강수 확률 80%

추천:
출근 시간대 비 예보가 있으므로 우산을 챙기는 것이 좋습니다.
```

### 6. 추천 엔진 백엔드 분리

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

백엔드 분리가 필요한 경우는 다음과 같습니다.

* API Key를 안전하게 관리해야 하는 경우
* 사용자별 추천 이력을 저장해야 하는 경우
* 여러 클라이언트에서 동일한 추천 결과를 사용해야 하는 경우
* 추천 규칙이 복잡해지는 경우

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
