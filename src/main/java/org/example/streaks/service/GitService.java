package org.example.streaks.service;

import org.example.streaks.dto.StreakResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import io.github.cdimascio.dotenv.Dotenv;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class GitService {
    Dotenv dotenv = Dotenv.load();
    @Value("${GIT_TOKEN}") String TOKEN;

    private final String GITHUB_API_URL = "https://api.github.com/graphql";

    private final WebClient webClient = WebClient.builder()
            .baseUrl(GITHUB_API_URL)
            .defaultHeader("Authorization", TOKEN)
            .build();

    public List<StreakResponse> getStreaks(List<String> usernames) {
        List<StreakResponse> results = new ArrayList<>();

        for (String username : usernames) {
            String query = String.format("""
                {
                  user(login: "%s") {
                    contributionsCollection {
                      contributionCalendar {
                        weeks {
                          contributionDays {
                            date
                            contributionCount
                          }
                        }
                      }
                    }
                  }
                }
                """, username);

            Map<String, Object> response = webClient.post()
                    .bodyValue(Map.of("query", query))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            try {
                // Check for GraphQL errors
                if (response.containsKey("errors")) {
                    System.out.println("GitHub API error for user " + username + ": " + response.get("errors"));
                    results.add(new StreakResponse(username, 0, "GitHub API error", false));
                    continue;
                }

                Map<String, Object> data = (Map<String, Object>) response.get("data");
                Map<String, Object> user = (Map<String, Object>) data.get("user");
                Map<String, Object> contributions = (Map<String, Object>) user.get("contributionsCollection");
                Map<String, Object> calendar = (Map<String, Object>) contributions.get("contributionCalendar");
                List<Map<String, Object>> weeks = (List<Map<String, Object>>) calendar.get("weeks");

                List<Map<String, Object>> allDays = new ArrayList<>();
                for (Map<String, Object> week : weeks) {
                    allDays.addAll((List<Map<String, Object>>) week.get("contributionDays"));
                }

                int streak = 0;
                String lastCommitDate = null;
                String latestCommitDate = null;
                boolean committedToday = false;
                LocalDate today = LocalDate.now(ZoneOffset.UTC); // Use UTC like GitHub

                // Traverse from latest to oldest
                for (int i = allDays.size() - 1; i >= 0; i--) {
                    Map<String, Object> day = allDays.get(i);
                    String date = (String) day.get("date");
                    int count = (int) day.get("contributionCount");
                    LocalDate commitDate = LocalDate.parse(date);

                    if (count > 0) {
                        // Always track the latest commit date
                        if (latestCommitDate == null || commitDate.isAfter(LocalDate.parse(latestCommitDate))) {
                            latestCommitDate = date;
                        }

                        if (commitDate.equals(today)) {
                            committedToday = true;
                        }

                        if (streak == 0) {
                            lastCommitDate = date;
                        }

                        streak++;
                    } else {
                        if (commitDate.isBefore(today)) {
                            break;
                        }
                    }
                }

// If no streak, use the last known commit date
                if (streak == 0) {
                    lastCommitDate = latestCommitDate;
                }

                // Debug logs (optional)
                System.out.println("Username: " + username);
                System.out.println("Today (UTC): " + today);
                System.out.println("Last commit date: " + lastCommitDate);
                System.out.println("Committed today: " + committedToday);
                System.out.println("Streak: " + streak);

                results.add(new StreakResponse(username, streak, lastCommitDate, committedToday));

                System.out.println("=== Raw contribution days for " + username + " ===");
                for (Map<String, Object> day : allDays.subList(allDays.size() - 5, allDays.size())) {
                    System.out.println(day);
                }


            } catch (Exception e) {
                System.out.println("Error processing user " + username + ": " + e.getMessage());
                results.add(new StreakResponse(username, 0, "Error fetching data", false));
            }
        }

        return results;
    }
}
