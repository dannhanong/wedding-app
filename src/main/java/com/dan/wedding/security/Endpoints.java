package com.dan.wedding.security;

public class Endpoints {
    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/auth/**",
            "/wishes/public/**",
    };

    public static final String[] PRIVATE_POST_ENDPOINTS = {
            "/galleries/private/**",
            "/files/private/**",
            "/stories/private/**",
    };

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/galleries/**",
            "/files/**",
            "/stories/public/**",
            "/wishes/public/**",
    };

    public static final String[] PRIVATE_GET_ENDPOINTS = {
    };

    public static final String[] PUBLIC_PUT_ENDPOINTS = {
            "/auth/reset-password",
    };

    public static final String[] PRIVATE_PUT_ENDPOINTS = {
            "/galleries/private/**",
            "/stories/private/**",
    };

    public static final String[] PRIVATE_DELETE_ENDPOINTS = {
            "/galleries/private/**",
            "/stories/private/**",
            "/wishes/private/**",
    };
}
