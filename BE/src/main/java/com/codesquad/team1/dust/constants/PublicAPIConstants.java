package com.codesquad.team1.dust.constants;

public class PublicAPIConstants {

    public static final String PUBLIC_API_SERVICE_KEY = "qh1W9WhS1Wl%2BH90EXv4PO2hR1k11hXsBngVTfuehLCm%2BxDFqBzITeVMij4tmxljJSyA%2FstR9HRpfidM6Vi%2BG3Q%3D%3D";

    public static final String PUBLIC_API_FORECAST_URL_AND_SEARCH_DATE =
            "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth?searchDate=";
    public static final String PUBLIC_API_REALTIME_MEASURE_URL =
            "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=";
    public static final String PUBLIC_API_GET_NEARBY_MEASURE_STATION_LIST_URL_AND_TMX =
            "http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=";

    public static final String AND_DATA_TERM_DAILY = "&dataTerm=daily";
    public static final String AND_PAGE_NO_1 = "&pageNo=1";
    public static final String AND_NUM_OF_ROWS_24 = "&numOfRows=24";
    public static final String AND_SERVICE_KEY = "&ServiceKey=";
    public static final String AND_VERSION = "&ver=";
    public static final String AND_RETURN_TYPE_JSON = "&_returnType=json";
    public static final String AND_TMY = "&tmY=";

    private PublicAPIConstants() {}
}
