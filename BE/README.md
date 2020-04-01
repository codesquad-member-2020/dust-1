# 미세먼지 프로젝트 BE README 문서

설정 파일을 분리하여 배포시 보다 편리하게 설정을 변경할 수 있도록 하였습니다.

## API Manual

접속주소/swagger-ui.html의 fine-dust-api-controller를 이용하면 테스트도 가능합니다.

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

`GET` 요청으로 `/강남구/daily-dust-status`를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)  
pm10Grade1h, pm10Value: 가 "-1"을 반환하는 경우 데이터가 조회되지 않았다는 의미입니다.  
pm10Grade1h: 1: 좋음, 2: 보통, 3: 나쁨, 4: 매우나쁨

```json
[
    {
        "pm10Grade1h": "4",
        "pm10Value": "205",
        "dateTime": "2020-03-31 12:00"
    },
    {
        "pm10Grade1h": "4",
        "pm10Value": "180",
        "dateTime": "2020-03-31 11:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "55",
        "dateTime": "2020-03-31 10:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "51",
        "dateTime": "2020-03-31 09:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "42",
        "dateTime": "2020-03-31 08:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "41",
        "dateTime": "2020-03-31 07:00"
    },
    {
        "pm10Grade1h": "1",
        "pm10Value": "0",
        "dateTime": "2020-03-31 06:00"
    },
    {
        "pm10Grade1h": "1",
        "pm10Value": "30",
        "dateTime": "2020-03-31 05:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "36",
        "dateTime": "2020-03-31 04:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "38",
        "dateTime": "2020-03-31 03:00"
    },
    {
        "pm10Grade1h": "3",
        "pm10Value": "99",
        "dateTime": "2020-03-31 02:00"
    },
    {
        "pm10Grade1h": "3",
        "pm10Value": "150",
        "dateTime": "2020-03-31 01:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "35",
        "dateTime": "2020-03-30 24:00"
    },
    {
        "pm10Grade1h": "3",
        "pm10Value": "81",
        "dateTime": "2020-03-30 23:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "39",
        "dateTime": "2020-03-30 22:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "42",
        "dateTime": "2020-03-30 21:00"
    },
    {
        "pm10Grade1h": "4",
        "pm10Value": "151",
        "dateTime": "2020-03-30 20:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "54",
        "dateTime": "2020-03-30 19:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "80",
        "dateTime": "2020-03-30 18:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "52",
        "dateTime": "2020-03-30 17:00"
    },
    {
        "pm10Grade1h": "",
        "pm10Value": "-",
        "dateTime": "2020-03-30 16:00"
    },
    {
        "pm10Grade1h": "",
        "pm10Value": "-",
        "dateTime": "2020-03-30 15:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "49",
        "dateTime": "2020-03-30 14:00"
    },
    {
        "pm10Grade1h": "1",
        "pm10Value": "15",
        "dateTime": "2020-03-30 13:00"
    },
    {
        "pm10Grade1h": "2",
        "pm10Value": "51",
        "dateTime": "2020-03-30 12:00"
    }
]
```

`GET` 요청으로 `/location/@=37.49085787273425,127.03369659888592` 를 호출하면 아래와 같은 데이터를 반환합니다. (Mock)

```json
{
    "stationName": "강남구",
    "location": "서울 강남구 학동로 426강남구청 별관 1동"
}
```

`GET` 요청으로 `/forecast` 를 호출하면 아래와 같은 데이터를 반환합니다. 실제 데이터입니다.

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
        }
    ]
}
```
