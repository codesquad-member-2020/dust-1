package com.codesquad.team1.dust.domain;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (!(o instanceof Image)) { return false; }
        Image image = (Image) o;
        return Objects.equals(getImageUrl(), image.getImageUrl());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getImageUrl());
    }
}
