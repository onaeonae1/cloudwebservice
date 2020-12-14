# Application for Cloud Web Service
## 설명
 - 시간, 할 일, 날씨, 미세먼지, 코로나19 확진자 정보를 모아보는 웹 페이지
 - 공공데이터 API를 불러와 사용
 - API Gateway, Lambda의 기능을 주로 사용
 - [배포 Page](https://onaeonae1.github.io/cloudwebservice)
## 날씨
- openweathermap 사용
## 미세먼지
- 공공데이터포털 API 사용
- 사용자의 위치로부터 인근의 측정소를 구함.
- 구한 측정소로부터 미세먼지 정보를 불러온다.
- 만약 측정소 정보를 알고 있다면, 바로 이로부터 미세먼지 정보를 불러온다.
## 코로나19
- 공공데이터포털 API 사용
- 검색일 기준으로 코로나19 확진자 정보를 불러온다.
- 시각화 아직 부족함
## 사용
- 깃허브 페이지(static)
- AWS API Gateway
- AWS Lambda
- 기본적인 JS

### 메인 화면
![img1](/example/main.PNG)

### 코로나19 데이터
![img2](/example/covid.PNG)