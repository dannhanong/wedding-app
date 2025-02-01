package com.dan.wedding.dtos.requests;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginForm {
    private String username;
    private String password;
}
