package com.codesquad.team1.dust.constants;

public class KakaoAPIConstants {

    public static String KAKAO_API_APP_KEY = "6241f25eb7531c4b1eca36dd65c4b709";

    // 경위도에서 경도가 X
    public static String KAKAO_API_TRANS_GEO_COORDINATE_SYSTEM_AND_X = "https://dapi.kakao.com/v2/local/geo/transcoord.json?x=";

    // 경위도에서 위도가 Y
    public static String AND_Y = "&y=";
    public static String AND_INPUT_COORDINATE_SYSTEM_WGS84 = "&input_coord=WGS84";
    public static String AND_OUTPUT_COORDINATE_SYSTEM_TM = "&output_coord=TM";

    private KakaoAPIConstants() {}
}
