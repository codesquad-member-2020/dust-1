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

`GET` 요청으로 `/강남구/dust-status`를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)

```json
{
    "pm10Grade1h": 2,
    "pm10Value": 74,
    "location": "강남구"
}
```

`GET` 요청으로 `/location/@=37.49085787273425,127.03369659888592` 를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)

```json
{
    "stationName": "강남구",
    "location": "서울 강남구 학동로 426강남구청 별관 1동"
}
```

`GET` 요청으로 `/forecast` 를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)

```json
{
    "informOverall": "○ [미세먼지] 전 권역이 '좋음'∼'보통'으로 예상됨. 다만, 경기남부·충청권은 오전에 일시적으로 '나쁨' 수준일 것으로 예상됨.",
    "informGrade": "서울 : 보통,제주 : 좋음,전남 : 보통,전북 : 보통,광주 : 보통,경남 : 좋음,경북 : 좋음,울산 : 좋음,대구 : 좋음,부산 : 좋음,충남 : 보통,충북 : 보통,세종 : 보통,대전 : 보통,영동 : 좋음,영서 : 보통,경기남부 : 보통,경기북부 : 보통,인천 : 보통",
    "images": [
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138845"
        },
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138846"
        },
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138847"
        },
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138848"
        },
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138849"
        },
        {
            "imageUrl": "http://www.airkorea.or.kr/file/viewImage/?atch_id=138850"
        }
    ]
}
```
