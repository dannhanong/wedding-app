package com.dan.wedding.services;

import com.dan.wedding.dtos.requests.ChangePasswordForm;
import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.Instant;
import java.util.List;

public interface UserService extends UserDetailsService {
    boolean existsByUsername(String username);
    User getUserByUsername(String username);
    ResponseMessage changePassword(String username, ChangePasswordForm changePasswordForm);
}
