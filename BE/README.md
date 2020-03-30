# 미세먼지 프로젝트 BE README 문서

설정 파일을 분리하여 배포시 보다 편리하게 설정을 변경할 수 있도록 하였습니다.

## API Manual

`GET` 요청으로 `/locations` 를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)

```json
[
    {
        "stationName": "강남구",
        "location": "서울 강남구 학동로 426강남구청 별관 1동"
    },
    {
        "stationName": "구로구",
        "location": "서울 구로구 가마산로 27길 45구로고등학교"
    }
]
```
