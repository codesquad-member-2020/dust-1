package com.codesquad.team1.dust.domain;

public class Image {

    private String imageUrl;

    public Image(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Image{" + "imageUrl='" + imageUrl + '\'' + '}';
    }
}
