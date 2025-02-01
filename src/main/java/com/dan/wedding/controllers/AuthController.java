package com.dan.wedding.controllers;

import com.dan.wedding.dtos.requests.ChangePasswordForm;
import com.dan.wedding.dtos.requests.LoginForm;
import com.dan.wedding.dtos.responses.LoginResponse;
import com.dan.wedding.dtos.responses.ResponseMessage;
import com.dan.wedding.security.jwt.JwtService;
import com.dan.wedding.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword()));
            if (authentication.isAuthenticated()) {
                final String jwt = jwtService.generateToken(loginForm.getUsername());
                return new ResponseEntity<>(new LoginResponse(jwt), HttpStatus.OK);
            }
        }catch (AuthenticationException e){
            if (userService.getUserByUsername(loginForm.getUsername()) != null) {
                return new ResponseEntity<>(new ResponseMessage(500, "wrong_password"), HttpStatus.BAD_REQUEST);
            }else {
                return new ResponseEntity<>(new ResponseMessage(500, "username_not_exists"), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new ResponseMessage(500, "An unknown error"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/change-password")
    public ResponseEntity<ResponseMessage> changePassword(HttpServletRequest request,
                                                          @RequestBody ChangePasswordForm changePasswordForm) {
        String token = getTokenFromRequest(request);
        String username = jwtService.extractUsername(token);
        return new ResponseEntity(userService.changePassword(username, changePasswordForm), HttpStatus.OK);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        throw new RuntimeException("JWT Token is missing");
    }
}