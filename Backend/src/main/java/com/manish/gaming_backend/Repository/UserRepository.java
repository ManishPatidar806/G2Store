package com.manish.gaming_backend.Repository;

import com.manish.gaming_backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User , Long> {

  Optional<User> findByEmail(String email);

  Optional<User> findByMobile(String mobile);

  void deleteByEmail(String email);

}
