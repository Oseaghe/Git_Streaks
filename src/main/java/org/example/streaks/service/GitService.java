package org.example.streaks.service;

import org.example.streaks.dto.StreakResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class GitService {

    private final String GITHUB_API_URL = "https://api.github.com/graphql";
    private final String TOKEN = "Bearer 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";

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
                boolean committedToday = false;
                LocalDate today = LocalDate.now();

                Collections.reverse(allDays);
                for (Map<String, Object> day : allDays) {
                    String date = (String) day.get("date");
                    int count = (int) day.get("contributionCount");

                    LocalDate commitDate = LocalDate.parse(date);
                    if (count > 0) {
                        if (streak == 0) lastCommitDate = date;
                        if (commitDate.equals(today)) committedToday = true;

                        streak++;
                    } else {
                        if (!commitDate.equals(today)) break;
                    }
                }

                results.add(new StreakResponse(username, streak, lastCommitDate, committedToday));

            } catch (Exception e) {
                results.add(new StreakResponse(username, 0, "Error fetching data", false));
            }
        }

        return results;
    }

}
