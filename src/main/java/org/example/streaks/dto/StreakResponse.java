package org.example.streaks.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StreakResponse {
    private String username;
    private int currentstreak;
    private String lastCommitDate;
    private boolean commitedToday;
}
