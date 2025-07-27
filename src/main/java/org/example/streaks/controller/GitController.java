package org.example.streaks.controller;

import org.example.streaks.dto.StreakResponse;
import org.example.streaks.dto.UsernameRequest;
import org.example.streaks.service.GitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/streaks")
public class GitController {
    @Autowired
    private GitService gitService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public List<StreakResponse> getStreaks(@RequestBody UsernameRequest usernameRequest) {
        return gitService.getStreaks(usernameRequest.getUsernames());
    }
}
