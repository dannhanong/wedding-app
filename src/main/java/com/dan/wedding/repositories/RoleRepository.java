package com.dan.wedding.repositories;

import com.dan.wedding.enums.RoleName;
import com.dan.wedding.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByName(RoleName name);
    boolean existsByName(RoleName name);
}
