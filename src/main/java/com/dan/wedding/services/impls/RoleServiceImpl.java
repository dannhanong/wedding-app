package com.dan.wedding.services.impls;

import com.dan.wedding.enums.RoleName;
import com.dan.wedding.models.Role;
import com.dan.wedding.repositories.RoleRepository;
import com.dan.wedding.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findByName(RoleName name) {
        return roleRepository.findByName(name);
    }
}
