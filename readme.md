# Application for Cloud Web Service
## 설명
 - 시간, 할 일, 날씨, 미세먼지, 코로나19 확진자 정보를 모아보는 웹 페이지
 - 공공데이터 API를 불러와 사용
 - API Gateway, Lambda의 기능을 주로 사용
## 날씨
- openweathermap 사용
## 미세먼지
- 공공데이터포털 API 사용
- 사용자의 위치로부터 인근의 측정소를 구함.
- 구한 측정소로부터 미세먼지 정보를 불러온다.
## 코로나19
- 공공데이터포털 API 사용
- 검색일 기준으로 코로나19 확진자 정보를 불러온다.
## 사용
 - 깃허브 페이지(static)
 - AWS API Gateway
 - AWS Lambda
