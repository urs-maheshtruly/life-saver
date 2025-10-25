package com.ursmahesh.securex.service;

import com.ursmahesh.securex.model.Users;
import com.ursmahesh.securex.model.UserPrincipal;
import com.ursmahesh.securex.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("myUserDetailsService")

//@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepo repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = repo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new UserPrincipal(user);
    }


}