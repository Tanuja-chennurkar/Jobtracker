package com.jobtracker.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.jobtracker.model.Job;
import com.jobtracker.repository.JobRepository;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setCompany(jobDetails.getCompany());
        job.setRole(jobDetails.getRole());
        job.setStatus(jobDetails.getStatus());
        job.setInterviewDate(jobDetails.getInterviewDate());

        return jobRepository.save(job);
    }
}
