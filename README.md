
![piggy-icon-180](https://github.com/user-attachments/assets/777ce368-4b1c-41d4-a0ab-267bb30a4c06)

# Piggy AI 홈페이지


### 🐷 서비스 링크
[웹사이트 연결](https://piggyai-git-main-daegyuhans-projects.vercel.app/)
### 🐷 개발 일지
[https://hanstory33.tistory.com/category/Project/%EC%B6%95%EA%B5%AC%EB%AA%A8%EC%9E%84%20%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%9C%EB%B0%9C](https://hanstory33.tistory.com/category/Project/Piggy%20AI)
### 🐷 개발 기간
> 기간 2025.04 ~ 진행 중

### 👥 개발 인원
> 1인 (BE,FE)

### 사용 기술
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-D82C20?style=for-the-badge&logo=redis&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-0F172A?style=for-the-badge&logo=upstash&logoColor=00E599)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
---

## 💡 프로젝트 소개
Piggy AI는 위치 기반 또는 검색어 기반으로 주변 카페 정보를 수집하고,
OpenAI GPT를 활용해 사용자에게 맞춤형으로 카페를 추천해주는 서비스입니다.
추천 결과는 LLM의 자연어 분석을 통해 더욱 직관적으로 제시됩니다.

## 💡 주요 기능
### 🐷 LLM 기반 추천 시스템

![image](https://github.com/user-attachments/assets/3a74c038-64d5-4cd8-8127-a3789fcbe7d9)


- 프롬프트 최적화 및 카페 정보 요약 전달


### 🐷 내 주변 카페 추천

![image](https://github.com/user-attachments/assets/44d51bb5-20ac-45e7-90de-9db67dd3a74c)

  
- 사용자의 위도/경도 기반으로 Kakao API 를 통해 카페 정보 수집

### 🐷 Redis 기반 기능들

- 캐싱 : 동일 검색어에 대한 응답속도 개선 및 API 호출 비용 절감

![image](https://github.com/user-attachments/assets/9b429cf9-2b15-4c6f-8820-3a67a20c5273)

  
- 검색 횟수 제한 : IP 기준 6시간당 5회 제한 (rate limiter)

![image](https://github.com/user-attachments/assets/409d350a-bb80-407f-a2cc-a9aaca88cdf8)

  
- 인기 키워드 집계 : 인기 검색 지역 집계

