package com.dan.wedding.inits;

import com.dan.wedding.enums.RoleName;
import com.dan.wedding.models.Role;
import com.dan.wedding.models.User;
import com.dan.wedding.repositories.RoleRepository;
import com.dan.wedding.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class InitDatabase {
    @Bean
    CommandLineRunner initRole(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            if (!roleRepository.existsByName(RoleName.ADMIN)) {
                Role adminRole = new Role();
                adminRole.setName(RoleName.ADMIN);
                roleRepository.save(adminRole);
            }
            if (!roleRepository.existsByName(RoleName.USER)) {
                Role userRole = new Role();
                userRole.setName(RoleName.USER);
                roleRepository.save(userRole);
            }

            if (!userRepository.existsByUsername("admin")) {
                Set<Role> roles = new HashSet<>();
                User admin = new User();
                admin.setName("Admin");
                admin.setUsername("admin");
                admin.setEnabled(true);
                admin.setPassword("$2a$10$VKaM/fVmaOr6KOGL69Ea9.ZfPMAXCIKSk8b5dS9qtV1gaz/59WFdu");
                Role adminRole = roleRepository.findByName(RoleName.ADMIN);
                Role adminUserRole = roleRepository.findByName(RoleName.USER);
                roles.add(adminRole);
                roles.add(adminUserRole);
                admin.setRoles(roles);
                userRepository.save(admin);
            }
        };
    }
}
