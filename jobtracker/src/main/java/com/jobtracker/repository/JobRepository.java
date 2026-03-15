package com.jobtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobtracker.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

}