package com.dan.wedding.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    String id;
    String name;
    String username;
    @JsonIgnore
    String password;
    boolean enabled = true;
    Set<Role> roles = new HashSet<>();

    public User(String name, String username, String encode) {
        this.name = name;
        this.username = username;
        this.password = encode;
    }
}
