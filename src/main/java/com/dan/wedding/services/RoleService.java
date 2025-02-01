package com.dan.wedding.services;

import com.dan.wedding.enums.RoleName;
import com.dan.wedding.models.Role;

public interface RoleService {
    Role findByName(RoleName name);
}
